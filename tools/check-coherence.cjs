/**
 * Dos comprobaciones de coherencia sobre los diccionarios es-CL.
 *
 * Uso: node check-coherence.cjs <dir de diccionarios> [catalog.json]
 *
 * 1) CONCORDANCIA. Para cada termino de la lista que debe quedarse en ingles,
 *    lista la palabra que lo precede y cuantas veces aparece, para revisar el
 *    articulo y la marca de genero que lo acompanan. No decide nada: presenta
 *    los contextos.
 *
 * 2) DUPLICADOS SISTEMATICOS. Con el catalogo (segundo argumento; por defecto
 *    `../i18n/catalog.json`, relativo al directorio del propio script) recorre las
 *    claves y compara traducciones, en dos pasadas que informan con las claves y
 *    los ficheros de cada forma:
 *
 *    a) POR ORIGEN EXACTO: el mismo texto ingles literal en mas de una clave, con
 *       mas de una cadena espanola distinta. Cubre el caso de un mismo termino
 *       ingles escrito de dos maneras.
 *    b) POR FORMA COMPARTIDA: una misma cadena espanola alcanzada desde origenes
 *       ingleses distintos. Cubre el caso complementario, que (a) no puede ver
 *       porque alli los origenes no coinciden: el catalogo distingue dos textos
 *       con un adorno, el pack los resuelve con la misma frase hecha, y la
 *       decision se tomo dos veces.
 *
 *    Ninguna de las dos pasadas decide: informan para que la revision elija. Son
 *    la version automatica del repaso que hasta ahora se hacia a mano entre lotes.
 *
 *    Una forma distinta NO es por si sola un defecto, y el informe no lo
 *    pretende: el genero del sujeto puede exigirla («Fallido» para un turno,
 *    «Fallida» para una tarea). Lo que detecta es la divergencia, que es lo que
 *    hay que mirar.
 *
 *    Queda fuera del alcance automatico —y lo sigue cubriendo el repaso manual—
 *    el caso en que el ingles distingue dos textos por una eleccion lexica que
 *    ninguna de las dos pasadas puede emparejar (p. ej. «…click to retry» frente a
 *    «…try again»). El informe no lo inventa: lo que no puede demostrar, no lo
 *    afirma.
 *
 * Solo necesita el catalogo y el directorio de diccionarios. Sale con codigo 0
 * siempre: es un informe, no una puerta.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const dir = process.argv[2];
if (!dir) {
  console.error('Uso: node check-coherence.cjs <dir de diccionarios> [catalog.json]');
  process.exit(2);
}
const catalogPath = process.argv[3] || path.join(__dirname, '..', 'i18n', 'catalog.json');

const TERMS = ['plugin', 'prompt', 'token', 'commit', 'workspace', 'branch', 'model',
  'subagent', 'settings', 'tool call', 'session', 'skill', 'goal', 'job'];

// El termino se interpola en una expresion regular: hay que escaparlo. Sin esto
// un termino con metacaracteres —o, en el caso que lo destapo, un termino como
// `tool call`, cuyo espacio es inocuo pero cuya generalizacion a `(`, `+`, `?`
// no lo seria— se compila a una pauta que no es la del termino literal, y los
// plurales y contextos que deberia encontrar quedan invisibles. Ver M1.
const escapeRe = (text) => String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort();

const found = new Map(TERMS.map((t) => [t, new Map()]));
/** ns -> clave -> { file, value }, para el informe de duplicados. */
const byNs = new Map();

for (const file of files) {
  const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
  for (const [ns, dict] of Object.entries(data)) {
    if (!byNs.has(ns)) byNs.set(ns, new Map());
    for (const [key, value] of Object.entries(dict)) {
      if (typeof value !== 'string') continue;
      byNs.get(ns).set(key, { file, value });
      for (const term of TERMS) {
        for (const match of value.matchAll(new RegExp('([\\p{L}]+)\\s+(?=' + escapeRe(term) + ')', 'giu'))) {
          found.get(term).set(match[1].toLowerCase(), (found.get(term).get(match[1].toLowerCase()) || 0) + 1);
        }
      }
    }
  }
}

console.log('=== CONCORDANCIA JUNTO A LOS TERMINOS EN INGLES ===');
console.log('(la palabra que precede a cada termino, para revisar articulo y genero)');
for (const [term, words] of found) {
  const list = [...words.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([w, n]) => w + '(' + n + ')');
  console.log(term.padEnd(12) + (list.length ? list.join(' ') : '(sin palabra adyacente)'));
}

/* ---------------------------------------------- duplicados sistematicos */

if (!fs.existsSync(catalogPath)) {
  console.log('\n=== DUPLICADOS ENTRE CLAVES ===');
  console.log('catalogo no encontrado en ' + catalogPath + ': se omite el barrido por origen ingles.');
  console.log('pasa la ruta del catalogo como segundo argumento para activarlo.');
  process.exit(0);
}
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

/** origen ingles -> [{ ns, key, file, value }] */
const groups = new Map();
for (const [ns, body] of Object.entries(catalog.namespaces)) {
  const en = (body.locales && body.locales.en) || {};
  for (const [key, source] of Object.entries(en)) {
    if (typeof source !== 'string' || source.trim() === '') continue;
    const hit = byNs.get(ns) && byNs.get(ns).get(key);
    if (!hit || typeof hit.value !== 'string') continue;
    if (!groups.has(source)) groups.set(source, []);
    groups.get(source).push({ ns, key, file: hit.file, value: hit.value });
  }
}

const repeated = [];
for (const [source, rows] of groups) {
  if (rows.length < 2) continue;
  const values = new Set(rows.map((r) => r.value));
  if (values.size < 2) continue;
  repeated.push({ source, rows, values: values.size });
}
repeated.sort((a, b) => b.values - a.values || b.rows.length - a.rows.length || a.source.localeCompare(b.source));

console.log('\n=== DUPLICADOS ENTRE CLAVES (origen ingles exacto) ===');
const shared = [...groups.values()].filter((rows) => rows.length >= 2).length;
console.log('grupos de claves con el mismo origen ingles: ' + shared
  + ' | grupos con mas de una forma: ' + repeated.length);
for (const { source, rows, values } of repeated) {
  console.log('\nEN  ' + JSON.stringify(source) + '   (' + rows.length + ' claves, ' + values + ' formas)');
  for (const row of rows) {
    console.log('   ' + row.file.padEnd(26) + (row.ns + '.' + row.key).padEnd(48) + JSON.stringify(row.value));
  }
}
if (!repeated.length) console.log('(ninguno: cada origen ingles repetido tiene una sola forma)');

/*
 * Segunda pasada: la misma forma espanola alcanzada desde origenes ingleses
 * distintos. Es lo que la pasada (a) no puede ver —alli los origenes no son
 * iguales— y cubre el caso en que dos textos que el catalogo distingue con un
 * adorno acaban resueltos con la misma frase hecha: la decision de estilo se
 * tomo dos veces y conviene saber que fue coherente.
 */
const porEspanol = new Map();
for (const [source, rows] of groups) {
  for (const row of rows) {
    if (!porEspanol.has(row.value)) porEspanol.set(row.value, new Map());
    const sources = porEspanol.get(row.value);
    if (!sources.has(source)) sources.set(source, []);
    sources.get(source).push(row);
  }
}
const compartidas = [];
for (const [value, sources] of porEspanol) {
  if (sources.size < 2) continue;
  compartidas.push({ value, sources, rows: [...sources.values()].flat() });
}
compartidas.sort((a, b) => b.sources.size - a.sources.size || b.rows.length - a.rows.length || a.value.localeCompare(b.value));

console.log('\n=== DUPLICADOS ENTRE CLAVES (una misma forma espanola para origenes ingleses distintos) ===');
console.log('cadenas espanolas compartidas por mas de un origen ingles: ' + compartidas.length);
for (const { value, sources, rows } of compartidas) {
  console.log('\nES  ' + JSON.stringify(value) + '   (' + sources.size + ' origenes distintos, ' + rows.length + ' claves)');
  for (const [source, hits] of [...sources.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    console.log('   EN ' + JSON.stringify(source));
    for (const row of hits) console.log('      ' + row.file.padEnd(26) + (row.ns + '.' + row.key).padEnd(48) + JSON.stringify(row.value));
  }
}
if (!compartidas.length) console.log('(ninguna: cada forma espanola corresponde a un solo origen ingles)');
