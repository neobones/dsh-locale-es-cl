/**
 * Auditoria de las traducciones: claves ausentes, ficheros invalidos, claves
 * repetidas y nombres de fichero que no se corresponden con su namespace.
 *
 * Uso: node audit-es.cjs <catalog.json> <dir es>
 *
 * Devuelve codigo de salida 1 si encuentra cualquier problema, para poder
 * usarlo como puerta en integracion continua.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const catalogo = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const dir = process.argv[3];
const ficheros = fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort();

const merged = new Map();
const raws = new Map();
const problemas = { jsonInvalido: 0, ausentes: 0, repetidas: 0, ficheroDesalineado: 0 };

for (const f of ficheros) {
  const raw = fs.readFileSync(path.join(dir, f), 'utf8');
  raws.set(f, raw);
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    problemas.jsonInvalido++;
    console.log('JSON INVALIDO\t' + f + '\t' + e.message);
    continue;
  }
  const namespaces = Object.keys(data);
  // Un fichero por namespace: el nombre del fichero debe ser el namespace.
  if (namespaces.length !== 1 || namespaces[0] + '.json' !== f) {
    problemas.ficheroDesalineado++;
    console.log('FICHERO DESALINEADO\t' + f + '\tnamespace(s): ' + namespaces.join(', ') + '\tesperado: ' + f.replace(/\.json$/, ''));
  }
  for (const [ns, dict] of Object.entries(data)) {
    if (!merged.has(ns)) merged.set(ns, new Map());
    for (const [k, v] of Object.entries(dict)) merged.get(ns).set(k, v);
  }
}

console.log('=== CLAVES AUSENTES ===');
for (const ns of Object.keys(catalogo.namespaces).sort()) {
  const en = (catalogo.namespaces[ns].locales && catalogo.namespaces[ns].locales.en) || {};
  const es = merged.get(ns) || new Map();
  for (const k of Object.keys(en)) {
    if (!es.has(k)) {
      problemas.ausentes++;
      console.log('AUSENTE\t' + ns + '\t' + k + '\t' + JSON.stringify(en[k]));
    }
  }
}
console.log('total ausentes: ' + problemas.ausentes);

console.log('\n=== CLAVES REPETIDAS EN EL MISMO NAMESPACE ===');
for (const [f, raw] of raws) {
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    continue;
  }
  for (const ns of Object.keys(data)) {
    const marca = '"' + ns.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"\\s*:\\s*\\{';
    const hit = new RegExp(marca).exec(raw);
    if (!hit) continue;
    let depth = 0;
    let end = hit.index + hit[0].length - 1;
    for (let i = hit.index + hit[0].length - 1; i < raw.length; i++) {
      if (raw[i] === '{') depth++;
      else if (raw[i] === '}') {
        depth--;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }
    const seen = new Map();
    for (const m of raw.slice(hit.index, end).matchAll(/"([^"\\]+)"\s*:/g)) {
      if (m[1] === ns) continue;
      seen.set(m[1], (seen.get(m[1]) || 0) + 1);
    }
    for (const [key, n] of seen) {
      if (n > 1) {
        problemas.repetidas++;
        console.log('REPETIDA\t' + f + '\t' + ns + '\t' + key + '\t' + n + ' veces');
      }
    }
  }
}
console.log('total repetidas: ' + problemas.repetidas);

const total = Object.values(problemas).reduce((s, n) => s + n, 0);
console.log('\n=== RESUMEN ===');
console.log('ficheros de traduccion  : ' + ficheros.length);
console.log('namespaces traducidos   : ' + merged.size + '/' + Object.keys(catalogo.namespaces).length);
console.log('claves traducidas       : ' + [...merged.values()].reduce((s, m) => s + m.size, 0));
console.log('problemas               : ' + total);

if (problemas.jsonInvalido || problemas.ausentes || problemas.repetidas || problemas.ficheroDesalineado) {
  console.log('\nRESULTADO: FALLO');
  process.exit(1);
}
console.log('\nRESULTADO: OK');
