/**
 * Aplica la tabla de terminologia es-CL sobre los diccionarios de un directorio.
 *
 * Uso: node apply-terminology.cjs <terminology.json> <dir de diccionarios> [--check]
 *
 * Sin --check reescribe los ficheros *.json in situ (indentacion de 2 espacios) e
 * informa de cada sustitucion. Con --check no escribe: informa de las
 * sustituciones pendientes y de los terminos prohibidos que sigan apareciendo, y
 * sale con codigo 1 si queda alguno.
 *
 * Los argumentos se validan ANTES de abrir nada: un flag desconocido —una errata
 * como `--chek`— aborta con la linea de uso y codigo 2 en vez de caer en el modo
 * de escritura y reescribir los 57 diccionarios in situ. Este script es el unico
 * de la cadena que escribe en las fuentes, asi que la validacion es lo que separa
 * una errata de un lote entero de sustituciones no deseadas.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const argv = process.argv.slice(2);
const FLAGS = new Set(['--check']);
const desconocidos = argv.filter((a) => a.startsWith('-') && !FLAGS.has(a));
const posicionales = argv.filter((a) => !a.startsWith('-'));
if (desconocidos.length || posicionales.length < 2) {
  if (desconocidos.length) console.error('Flag desconocido: ' + desconocidos.join(', '));
  else console.error('Faltan argumentos: se esperan <terminology.json> y <dir de diccionarios>.');
  console.error('Uso: node apply-terminology.cjs <terminology.json> <dir de diccionarios> [--check]');
  process.exit(2);
}

const termPath = posicionales[0];
const dir = posicionales[1];
const checkOnly = argv.includes('--check');

const table = JSON.parse(fs.readFileSync(termPath, 'utf8'));
const LETTER = 'A-Za-z\\u00C0-\\u024F\\u00D1\\u00F1';
const boundaries = (pattern) => new RegExp('(?<![' + LETTER + '])(' + pattern + ')(?![' + LETTER + '])', 'gi');
// La mayuscula inicial se copia del texto EMPAREJADO, no de `to` (que va en
// minuscula por contrato): si el original empieza en mayuscula, la sustitucion
// tambien, y si no, se deja como esta.
const upper = (match, replacement) => (/^[A-Z\u00C0-\u00DE]/.test(match.charAt(0)) ? replacement.charAt(0).toUpperCase() + replacement.slice(1) : replacement);

const applied = [];
const pending = [];
const banned = [];
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort();

for (const file of files) {
  const full = path.join(dir, file);
  const data = JSON.parse(fs.readFileSync(full, 'utf8'));
  let touched = false;
  for (const [ns, dict] of Object.entries(data)) {
    for (const [key, value] of Object.entries(dict)) {
      if (typeof value !== 'string') continue;
      let next = value;
      for (const rule of table.replacements) {
        const before = next;
        next = next.replace(boundaries(rule.from), (match) => upper(match, rule.to));
        if (next !== before) {
          const row = { file, ns, key, from: before, to: next };
          (checkOnly ? pending : applied).push(row);
        }
      }
      // La deteccion de prohibidos se hace siempre sobre el texto final.
      for (const term of table.banned) {
        if (boundaries(term).test(next)) banned.push({ file, ns, key, term, texto: next });
      }
      if (next !== value && !checkOnly) {
        dict[key] = next;
        touched = true;
      }
    }
  }
  if (touched) fs.writeFileSync(full, JSON.stringify(data, null, 2) + '\n');
}

const list = checkOnly ? pending : applied;
console.log('=== SUSTITUCIONES ' + (checkOnly ? 'PENDIENTES' : 'APLICADAS') + ' ===');
for (const row of list) console.log(row.file + '\t' + row.ns + '.' + row.key + '\t' + JSON.stringify(row.from) + ' -> ' + JSON.stringify(row.to));
console.log('\n=== TERMINOS PROHIBIDOS ' + (checkOnly ? 'PENDIENTES' : 'RESTANTES') + ' ===');
for (const row of banned) console.log(row.file + '\t' + row.ns + '.' + row.key + '\t' + JSON.stringify(row.term) + '\t' + JSON.stringify(row.texto));
console.log('\n=== RESUMEN ===');
console.log('ficheros revisados   : ' + files.length);
console.log('sustituciones        : ' + list.length);
console.log('prohibidos restantes : ' + banned.length);
const ok = banned.length === 0 && (!checkOnly || pending.length === 0);
console.log('RESULTADO: ' + (ok ? 'OK' : 'FALLO'));
process.exit(ok ? 0 : 1);
