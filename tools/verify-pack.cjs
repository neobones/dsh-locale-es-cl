/**
 * Verificacion end-to-end del bundle generado: lo ejecuta igual que el
 * cargador de modulos de la app y comprueba que registra el idioma 'es-CL' y
 * todos sus diccionarios.
 *
 * Uso: node verify-pack.cjs <ruta lib/client.js>
 */
'use strict';
const fs = require('fs');
const vm = require('vm');

const file = process.argv[2];
const src = fs.readFileSync(file, 'utf8');

let loaded = null;
const sandbox = {
  console,
  window: {
    __ModuleLoader__: {
      load(o) {
        loaded = o;
      },
    },
  },
};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(src, sandbox, { filename: file, timeout: 10000 });

if (!loaded) throw new Error('FALLO: el fichero no llamo a window.__ModuleLoader__.load');
if (!loaded.id) throw new Error('FALLO: la carga no declara id');
if (typeof loaded.factory !== 'function') throw new Error('FALLO: la carga no declara factory');

let requiredNothing = true;
const mod = loaded.factory(() => {
  requiredNothing = false;
  throw new Error('el pack no deberia requerir modulos externos');
});
if (typeof mod.apply !== 'function') throw new Error('FALLO: exports.apply no es funcion');
if (!Array.isArray(mod.inject)) throw new Error('FALLO: exports.inject no es un array');

const calls = { lang: [], reg: [] };
const ctx = {
  effect(fn) {
    const disposer = fn();
    return typeof disposer === 'function' ? disposer : () => {};
  },
  locale: {
    addLanguage(input) {
      calls.lang.push(input);
      return () => {};
    },
    register(ns, locale, dict) {
      calls.reg.push({ ns, locale, keys: dict && typeof dict === 'object' ? Object.keys(dict).length : 0 });
      return () => {};
    },
  },
};
mod.apply(ctx);

const total = calls.reg.reduce((s, r) => s + r.keys, 0);
const wrong = calls.reg.filter((r) => r.locale !== 'es-CL');
const dupes = calls.reg.map((r) => r.ns).filter((ns, i, all) => all.indexOf(ns) !== i);
const empty = calls.reg.filter((r) => r.keys === 0);

console.log('id del modulo      : ' + loaded.id);
console.log('inject             : ' + JSON.stringify(mod.inject));
console.log('require externos   : ' + (requiredNothing ? 'ninguno (correcto)' : 'SI (incorrecto)'));
console.log('addLanguage        : ' + JSON.stringify(calls.lang));
console.log('register llamadas  : ' + calls.reg.length);
console.log('claves totales     : ' + total);
console.log('locale != es-CL    : ' + wrong.length);
console.log('namespaces duplic. : ' + dupes.length + (dupes.length ? ' -> ' + dupes.join(',') : ''));
console.log('namespaces vacios  : ' + empty.length + (empty.length ? ' -> ' + empty.map((e) => e.ns).join(',') : ''));

const problems = [];
if (calls.lang.length !== 1) problems.push('addLanguage llamado ' + calls.lang.length + ' veces');
if (loaded.id !== 'dsh-locale-es-cl') problems.push("id del modulo distinto de 'dsh-locale-es-cl': " + JSON.stringify(loaded.id));
const lang = calls.lang[0] || {};
if (lang.id !== 'es-CL') problems.push("id de idioma distinto de 'es-CL': " + JSON.stringify(lang));
if (lang.fallback !== 'en') problems.push("fallback distinto de 'en': " + JSON.stringify(lang));
if (!lang.label) problems.push('falta la etiqueta del idioma');
if (wrong.length) problems.push('registros con locale incorrecto: ' + wrong.length);
if (dupes.length) problems.push('namespaces duplicados: ' + dupes.join(','));
if (total === 0) problems.push('no se registro ninguna clave');

if (problems.length) {
  console.log('\nRESULTADO: FALLO');
  for (const p of problems) console.log(' - ' + p);
  process.exit(1);
}
console.log('\nRESULTADO: OK');
