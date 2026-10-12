/**
 * Compara la traduccion es-CL con la referencia castellana y emite la hoja de revision.
 *
 * Uso: node delta-report.cjs <catalog.json> <reference.json> <dir es-cl> [--md out.md] [--csv out.csv]
 *
 * <reference.json> es { "<ns>": { "<clave>": "<texto>" } } fusionado.
 * Sale con codigo 1 si falta alguna clave del catalogo, si algun marcador no cuadra
 * o si alguna traduccion pierde la mayuscula inicial de la referencia.
 *
 * La columna `protegidos` (y su total) cuenta las claves cuyo origen ingles tiene
 * un termino protegido y cuya traduccion ya no lo conserva. NO entra en el codigo
 * de salida a proposito: en los lotes intermedios los namespaces aun no adaptados
 * lo mantienen por encima de cero. Cada lote exige cero en sus propios namespaces
 * y la Task 13 exige cero en el total.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const [catalogPath, refPath, dir] = process.argv.slice(2);
const mdPath = process.argv.includes('--md') ? process.argv[process.argv.indexOf('--md') + 1] : null;
const csvPath = process.argv.includes('--csv') ? process.argv[process.argv.indexOf('--csv') + 1] : null;

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const reference = JSON.parse(fs.readFileSync(refPath, 'utf8'));
const current = {};
for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort()) {
  Object.assign(current, JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8')));
}

const marks = (text) => new Set([...String(text).matchAll(/\{([A-Za-z0-9_.]+)\}/g)].map((m) => m[1]));
const same = (a, b) => a.size === b.size && [...a].every((x) => b.has(x));

// Contador de regresion de mayusculas: la referencia empieza en mayuscula y la
// traduccion en minuscula. Protege la clase de defecto que introdujo la pasada
// mecanica (sustituir sin copiar la mayuscula inicial del texto emparejado).
const MAYUSCULA = /^[A-Z\u00C0-\u00DE]/;
const MINUSCULA = /^[a-z\u00E0-\u00F6\u00F8-\u00FE]/;
const MUESTRA = 10;

// Terminos protegidos: si el origen INGLES contiene uno de estos terminos, el
// valor es-CL debe seguir conteniendo ese mismo termino (politica de terminos
// en ingles del plan). La comprobacion es por clave, que es lo que una busqueda
// por frases compuestas no ve: `trajectory.tab.diff` = «Diferencias» y las seis
// claves de `trajectory` que traducen `prompt` como «Indicaciones del sistema».
// Emparejamiento con limites de palabra y plural opcional, nunca subcadena:
// «Tool calls» cuenta, «Subtool calls» no (le precede una letra).
const TERMINOS_PROTEGIDOS = ['diff', 'tool call', 'commit', 'push', 'prompt', 'plugin', 'token', 'log', 'shell', 'chat', 'deploy'];
const TERM_RE = new Map(TERMINOS_PROTEGIDOS.map((term) => [
  term,
  new RegExp('(?<![A-Za-z])' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + 's?(?![A-Za-z])'),
]));
// `log` cuenta como sustantivo. El verbo «log in/out» (settings.account.json:4)
// se excluye de la comprobacion de `log`; los compuestos («session log») no.
const LOG_VERBO = /\blog(ged|ging|s)?\s+(in|out)\b/;
function terminosPerdidos(source, mine) {
  const en = String(source).toLowerCase();
  const cl = String(mine).toLowerCase();
  const lost = [];
  for (const term of TERMINOS_PROTEGIDOS) {
    if (term === 'log' && LOG_VERBO.test(en)) continue;
    if (TERM_RE.get(term).test(en) && !TERM_RE.get(term).test(cl)) lost.push(term);
  }
  return lost;
}

const rows = [];
const changed = [];
const minusculas = [];
const protegidos = [];
let totals = { keys: 0, changed: 0, untouched: 0, missing: 0, broken: 0, minusculas: 0, protegidos: 0 };

for (const [ns, body] of Object.entries(catalog.namespaces)) {
  const en = body.locales.en || {};
  const es = current[ns] || {};
  const ref = reference[ns] || {};
  let c = 0, missing = 0, broken = 0, prot = 0;
  for (const [key, source] of Object.entries(en)) {
    // Un origen vacio o de solo espacios (separadores, prefijos) no se traduce:
    // se replica tal cual, asi que no puede contar como traduccion faltante.
    if (source.trim() === '' ) continue;
    const mine = es[key];
    if (typeof mine !== 'string' || mine.trim() === '') { missing++; continue; }
    if (!same(marks(source), marks(mine))) { broken++; continue; }
    const perdidos = terminosPerdidos(source, mine);
    if (perdidos.length) {
      prot++;
      totals.protegidos++;
      if (protegidos.length < MUESTRA) protegidos.push({ ns, key, terms: perdidos.join(','), en: source, es: mine });
    }
    if (mine !== ref[key]) {
      c++;
      changed.push({ ns, key, en: source, ref: ref[key] === undefined ? '' : ref[key], es: mine });
      if (MAYUSCULA.test(String(ref[key])) && MINUSCULA.test(mine)) {
        totals.minusculas++;
        if (minusculas.length < MUESTRA) minusculas.push({ ns, key, ref: ref[key], es: mine });
      }
    }
  }
  const keys = Object.keys(en).length;
  totals.keys += keys; totals.changed += c; totals.missing += missing; totals.broken += broken;
  totals.untouched += keys - c - missing - broken;
  rows.push({ ns, keys, changed: c, untouched: keys - c - missing - broken, missing, broken, protegidos: prot });
}

const pad = (s, n) => String(s).padEnd(n);
console.log(pad('namespace', 26) + pad('claves', 8) + pad('cambiadas', 11) + pad('sin_tocar', 11) + pad('faltan', 8) + pad('marcadores', 11) + 'protegidos');
for (const r of rows.sort((a, b) => b.changed - a.changed)) {
  console.log(pad(r.ns, 26) + pad(r.keys, 8) + pad(r.changed, 11) + pad(r.untouched, 11) + pad(r.missing, 8) + pad(r.broken, 11) + r.protegidos);
}
console.log('\n=== TOTALES ===');
console.log('claves: ' + totals.keys + ' | cambiadas: ' + totals.changed + ' | sin tocar: ' + totals.untouched + ' | faltan: ' + totals.missing + ' | marcadores rotos: ' + totals.broken + ' | minusculas_indebidas: ' + totals.minusculas + ' | protegidos: ' + totals.protegidos);

console.log('\n=== MINUSCULAS INDEBIDAS === (referencia en mayuscula, traduccion en minuscula)');
for (const row of minusculas) console.log(row.ns + '\t' + row.key + '\t' + JSON.stringify(row.ref) + ' -> ' + JSON.stringify(row.es));
if (totals.minusculas > minusculas.length) console.log('... y ' + (totals.minusculas - minusculas.length) + ' mas (muestra de ' + minusculas.length + ')');

console.log('\n=== TERMINOS PROTEGIDOS === (el origen ingles tiene el termino, la traduccion lo perdio)');
for (const row of protegidos) console.log(row.ns + '\t' + row.key + '\t[' + row.terms + ']\t' + JSON.stringify(row.en) + ' -> ' + JSON.stringify(row.es));
if (totals.protegidos > protegidos.length) console.log('... y ' + (totals.protegidos - protegidos.length) + ' mas (muestra de ' + protegidos.length + ')');

if (mdPath) {
  const byNs = new Map();
  for (const row of changed) {
    if (!byNs.has(row.ns)) byNs.set(row.ns, []);
    byNs.get(row.ns).push(row);
  }
  const lines = [
    '# Revisión de la adaptación al español de Chile',
    '',
    'Cadenas cuyo texto difiere de la referencia castellana, agrupadas por namespace.',
    'Marcadores `{...}` verificados contra el inglés. Faltantes: ' + totals.missing + '. Marcadores rotos: ' + totals.broken + '.',
    '',
  ];
  for (const ns of [...byNs.keys()].sort()) {
    lines.push('## ' + ns + ' (' + byNs.get(ns).length + ' de ' + (rows.find((r) => r.ns === ns) || {}).keys + ')', '');
    lines.push('| clave | inglés | referencia `es` | `es-CL` |', '|---|---|---|---|');
    for (const row of byNs.get(ns)) lines.push('| `' + row.key + '` | ' + esc(row.en) + ' | ' + esc(row.ref) + ' | **' + esc(row.es) + '** |');
    lines.push('');
  }
  fs.writeFileSync(mdPath, lines.join('\n'));
  console.log('hoja markdown: ' + mdPath);
}
if (csvPath) {
  const csv = (s) => '"' + String(s).replace(/"/g, '""') + '"';
  const lines = ['namespace,clave,ingles,es_referencia,es_cl'];
  for (const row of changed) lines.push([row.ns, row.key, row.en, row.ref, row.es].map(csv).join(','));
  fs.writeFileSync(csvPath, lines.join('\n') + '\n');
  console.log('hoja csv: ' + csvPath);
}
function esc(text) { return String(text).replace(/\|/g, '\\|').replace(/\n/g, ' '); }

process.exit(totals.missing || totals.broken || totals.minusculas ? 1 : 0);
