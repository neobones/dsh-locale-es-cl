/**
 * Compara la traduccion es-CL con la referencia castellana y emite la hoja de revision.
 *
 * Uso: node delta-report.cjs <catalog.json> <reference.json> <dir es-cl> [--md out.md] [--csv out.csv]
 *
 * <reference.json> es { "<ns>": { "<clave>": "<texto>" } } fusionado.
 * Sale con codigo 1 si falta alguna clave del catalogo, si algun marcador no cuadra
 * o si alguna traduccion pierde la mayuscula inicial de la referencia.
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

const rows = [];
const changed = [];
const minusculas = [];
let totals = { keys: 0, changed: 0, untouched: 0, missing: 0, broken: 0, minusculas: 0 };

for (const [ns, body] of Object.entries(catalog.namespaces)) {
  const en = body.locales.en || {};
  const es = current[ns] || {};
  const ref = reference[ns] || {};
  let c = 0, missing = 0, broken = 0;
  for (const [key, source] of Object.entries(en)) {
    // Un origen vacio o de solo espacios (separadores, prefijos) no se traduce:
    // se replica tal cual, asi que no puede contar como traduccion faltante.
    if (source.trim() === '' ) continue;
    const mine = es[key];
    if (typeof mine !== 'string' || mine.trim() === '') { missing++; continue; }
    if (!same(marks(source), marks(mine))) { broken++; continue; }
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
  rows.push({ ns, keys, changed: c, untouched: keys - c - missing - broken, missing, broken });
}

const pad = (s, n) => String(s).padEnd(n);
console.log(pad('namespace', 26) + pad('claves', 8) + pad('cambiadas', 11) + pad('sin_tocar', 11) + pad('faltan', 8) + 'marcadores');
for (const r of rows.sort((a, b) => b.changed - a.changed)) {
  console.log(pad(r.ns, 26) + pad(r.keys, 8) + pad(r.changed, 11) + pad(r.untouched, 11) + pad(r.missing, 8) + r.broken);
}
console.log('\n=== TOTALES ===');
console.log('claves: ' + totals.keys + ' | cambiadas: ' + totals.changed + ' | sin tocar: ' + totals.untouched + ' | faltan: ' + totals.missing + ' | marcadores rotos: ' + totals.broken + ' | minusculas_indebidas: ' + totals.minusculas);

console.log('\n=== MINUSCULAS INDEBIDAS === (referencia en mayuscula, traduccion en minuscula)');
for (const row of minusculas) console.log(row.ns + '\t' + row.key + '\t' + JSON.stringify(row.ref) + ' -> ' + JSON.stringify(row.es));
if (totals.minusculas > minusculas.length) console.log('... y ' + (totals.minusculas - minusculas.length) + ' mas (muestra de ' + minusculas.length + ')');

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
