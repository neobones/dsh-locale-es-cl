/**
 * Genera el pack de idioma espanol de Chile (es-CL) para la GUI de DeepSeek Harness.
 *
 * Entradas:
 *   <catalog.json>  catalogo extraido de la app (namespaces -> locales.en)
 *   <es-cl dir>     ficheros *.json con { "<ns>": { "<clave>": "<espanol de Chile>" } }
 *   <salida>        directorio del paquete a emitir
 *
 * Uso: node build-locale-pack.cjs <catalog.json> <es-cl dir> <salida> [--check]
 *
 * El bundle emitido respeta el protocolo lazy-CJS del cargador de la app:
 *   window.__ModuleLoader__.load({ id, factory })
 * y registra el idioma y cada diccionario como efectos propios del plugin.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const PKG_NAME = 'dsh-locale-es-cl';
const LANG_ID = 'es-CL';
const LANG_LABEL = 'Español (Chile)';

const catalogPath = process.argv[2];
const esDir = process.argv[3];
const outDir = process.argv[4];
const checkOnly = process.argv.includes('--check');

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

/** Une todos los ficheros de traduccion; los posteriores ganan por clave. */
function loadTranslations(dir) {
  const merged = new Map();
  const owners = new Map();
  const conflicts = [];
  if (!fs.existsSync(dir)) return { merged, owners, conflicts };
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort()) {
    let data;
    try {
      data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
    } catch (error) {
      conflicts.push({ kind: 'json-invalido', file, detail: error.message });
      continue;
    }
    for (const [ns, dict] of Object.entries(data)) {
      if (dict === null || typeof dict !== 'object' || Array.isArray(dict)) {
        conflicts.push({ kind: 'ns-no-objeto', file, ns });
        continue;
      }
      if (!merged.has(ns)) merged.set(ns, new Map());
      const target = merged.get(ns);
      for (const [key, value] of Object.entries(dict)) {
        if (typeof value !== 'string') {
          conflicts.push({ kind: 'valor-no-texto', file, ns, key });
          continue;
        }
        if (target.has(key) && target.get(key) !== value) {
          conflicts.push({ kind: 'duplicado-distinto', ns, key, previo: owners.get(ns + '\u0000' + key), nuevo: file });
        }
        target.set(key, value);
        owners.set(ns + '\u0000' + key, file);
      }
    }
  }
  return { merged, owners, conflicts };
}

const placeholders = (text) => {
  const out = new Set();
  for (const m of String(text).matchAll(/\{([A-Za-z0-9_.]+)\}/g)) out.add(m[1]);
  return out;
};

const { merged, conflicts } = loadTranslations(esDir);

const report = { translated: 0, missing: 0, extra: 0, badPlaceholders: [], missingDetail: [], perNamespace: [] };
const finalDicts = {};
const nsNames = Object.keys(catalog.namespaces).sort();
for (const ns of nsNames) {
  const en = (catalog.namespaces[ns].locales && catalog.namespaces[ns].locales.en) || {};
  const enKeys = Object.keys(en);
  const es = merged.get(ns) || new Map();
  const out = {};
  let missing = 0;
  for (const key of enKeys) {
    const value = es.get(key);
    const source = typeof en[key] === 'string' ? en[key] : '';
    // Un origen vacio o de solo espacios (separadores, prefijos) se replica tal cual.
    if (source.trim() === '' && (value === undefined || String(value).trim() === '')) {
      out[key] = value === undefined ? '' : value;
      continue;
    }
    if (typeof value !== 'string' || value.trim() === '') {
      missing++;
      report.missingDetail.push({ ns, key, en: source, motivo: 'sin traduccion' });
      continue;
    }
    const want = placeholders(en[key]);
    const got = placeholders(value);
    const lost = [...want].filter((p) => !got.has(p));
    const added = [...got].filter((p) => !want.has(p));
    if (lost.length || added.length) {
      report.badPlaceholders.push({ ns, key, en: en[key], es: value, lost, added });
      missing++;
      report.missingDetail.push({ ns, key, en: source, motivo: 'marcadores: faltan ' + JSON.stringify(lost) + ' sobran ' + JSON.stringify(added) });
      continue;
    }
    out[key] = value;
  }
  const extraKeys = [...es.keys()].filter((k) => !enKeys.includes(k));
  report.translated += Object.keys(out).length;
  report.missing += missing;
  report.extra += extraKeys.length;
  if (extraKeys.length) report.badPlaceholders.push({ ns, extra: extraKeys.slice(0, 8), nota: 'claves que no existen en el catalogo; se descartan' });
  if (Object.keys(out).length > 0) finalDicts[ns] = out;
  report.perNamespace.push({ ns, en: enKeys.length, es: Object.keys(out).length, missing, extra: extraKeys.length });
}

const totalEn = nsNames.reduce((s, ns) => s + Object.keys((catalog.namespaces[ns].locales && catalog.namespaces[ns].locales.en) || {}).length, 0);
console.log('=== COBERTURA ===');
console.log('claves en el catalogo: ' + totalEn);
console.log('claves traducidas al español de Chile: ' + report.translated + ' (' + ((report.translated / totalEn) * 100).toFixed(1) + '%)');
console.log('claves sin traducir (caen a ingles): ' + report.missing);
console.log('claves sobrantes descartadas: ' + report.extra);
console.log('namespaces con diccionario es-CL: ' + Object.keys(finalDicts).length + '/' + nsNames.length);
if (conflicts.length) {
  console.log('\n--- CONFLICTOS ---');
  for (const c of conflicts) console.log(JSON.stringify(c));
}
if (report.badPlaceholders.length) {
  console.log('\n--- MARCADORES O CLAVES AJENAS ---');
  for (const b of report.badPlaceholders) console.log(JSON.stringify(b));
}
console.log('\n--- POR NAMESPACE (en / es / falta) ---');
for (const row of report.perNamespace) if (row.en) console.log(row.ns + '\t' + row.en + '\t' + row.es + '\t' + row.missing);

if (report.missingDetail.length) {
  console.log('\n--- DETALLE DE LO NO TRADUCIDO ---');
  for (const d of report.missingDetail) console.log(d.ns + '\t' + d.key + '\t' + JSON.stringify(d.en) + '\t' + d.motivo);
}

const problemas = report.missing + conflicts.length + report.badPlaceholders.length;
console.log('\n=== RESUMEN ===');
console.log('claves traducidas : ' + report.translated + '/' + totalEn);
console.log('problemas         : ' + problemas);
console.log('RESULTADO: ' + (problemas ? 'FALLO' : 'OK'));

// Con --check no se emite nada: solo se informa, y el codigo de salida sirve
// como puerta de integracion continua.
if (checkOnly) process.exit(problemas ? 1 : 0);

/* ---------------------------------------------------------------- emision */

fs.mkdirSync(path.join(outDir, 'lib'), { recursive: true });

const pkg = {
  name: PKG_NAME,
  version: '1.0.0',
  description: 'Pack de idioma español de Chile (es-CL) para la interfaz web de DeepSeek Harness',
  type: 'module',
  main: 'lib/index.js',
  exports: {
    '.': './lib/index.js',
    './client': './lib/client.js',
    './cordis.patch.yml': './cordis.patch.yml',
    './package.json': './package.json',
    // DSH resuelve `locale/en.json` y sus hermanos a traves de este mapa: sin
    // esta linea, la tarjeta del plugin se queda sin titulo ni descripcion.
    './locale/*.json': './locale/*.json',
  },
  files: ['lib/index.js', 'lib/client.js', 'cordis.patch.yml', 'locale', 'icon.svg'],
  dsh: {
    bundle: { patch: './cordis.patch.yml' },
    client: { inject: ['@deepseek-ai/dsh-client-locale'], platform: 'web' },
  },
};

/*
 * El package.json del paquete es a la vez contrato con el cargador y ficha
 * publica del proyecto. Los campos estructurales los fija SIEMPRE este
 * generador; el resto (licencia, autor, palabras clave, scripts, icono) se
 * conserva del fichero que ya exista, para que reconstruir no borre la ficha
 * del repositorio.
 *
 * `repository`, `homepage` y `bugs` NO se conservan: este fork no tiene remoto
 * publico ni tracker propio, y apuntarlos al repositorio del que deriva
 * desviaria las reclamaciones a un tercero. La procedencia se documenta en
 * NOTICE.md, no en la ficha del paquete. Si alguna vez se publica, anadirlos
 * aqui a mano y volver a incluirlos en esta lista.
 */
const ESTRUCTURALES = new Set(['name', 'type', 'main', 'exports', 'files', 'dsh']);
const CONSERVABLES = [
  'version', 'private', 'description', 'license', 'author', 'contributors',
  'keywords', 'engines', 'scripts',
  'publishConfig', 'dependencies', 'devDependencies', 'icon', 'peerDependencies',
];
const pkgPath = path.join(outDir, 'package.json');
let previo = {};
try {
  previo = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
} catch {
  previo = {};
}
const conservados = [];
for (const key of CONSERVABLES) {
  if (!ESTRUCTURALES.has(key) && previo[key] !== undefined) {
    pkg[key] = previo[key];
    conservados.push(key);
  }
}
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

const patch = [
  '# Pack de idioma español de Chile: inserta la fila que carga este plugin de cliente.',
  '# El fallback a ingles es automatico para cualquier clave no traducida.',
  '- insert:',
  '    - id: locale-es-cl',
  "      name: '" + PKG_NAME + "'",
  '',
].join('\n');
fs.writeFileSync(path.join(outDir, 'cordis.patch.yml'), patch);

const hostHalf = [
  '/**',
  ' * Mitad host del pack de idioma español de Chile.',
  ' *',
  ' * El trabajo real ocurre en el cliente (`lib/client.js`): alli se registran el',
  ' * idioma y sus diccionarios. Esta mitad existe para que el paquete sea una fila',
  ' * cargable del Loader y para que el escaneo de plugins de cliente encuentre su',
  ' * declaracion `dsh.client`.',
  ' */',
  'export function apply() {}',
  '',
].join('\n');
fs.writeFileSync(path.join(outDir, 'lib', 'index.js'), hostHalf);

const header = [
  '/**',
  ' * Pack de idioma español de Chile (es-CL) para la interfaz web de DeepSeek Harness.',
  ' *',
  ' * GENERADO AUTOMATICAMENTE por tools/build-locale-pack.cjs: no editar a mano.',
  ' *',
  ' * Protocolo: el cargador de modulos de cliente ejecuta esta fabrica y despues',
  ' * llama a `apply(ctx)` cuando el servicio `locale` esta disponible. Cada registro',
  ' * se declara como efecto propio para que se retire limpiamente al descargar el plugin.',
  ' */',
  'window.__ModuleLoader__.load({',
  '\tid: ' + JSON.stringify(PKG_NAME) + ',',
  '\tfactory: (require) => {',
  '\t\tvar module = { exports: {} };',
  '\t\tvar exports = module.exports;',
  '\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: "Module" });',
  '\t\t/** Servicio requerido: el registro de idiomas y diccionarios. */',
  '\t\tconst inject = ["locale"];',
  '\t\t/** Idioma y diccionarios de este pack. */',
  '\t\tconst LANGUAGE = ' + JSON.stringify({ id: LANG_ID, label: LANG_LABEL, fallback: 'en' }) + ';',
  '\t\tconst DICTIONARIES = ' + JSON.stringify(finalDicts, null, '\t\t').replace(/\n/g, '\n\t\t') + ';',
  '\t\t/**',
  '\t\t* Registra el idioma y todos sus diccionarios por namespace.',
  '\t\t* @param ctx - contexto raiz del cliente.',
  '\t\t*/',
  '\t\tfunction apply(ctx) {',
  '\t\t\tctx.effect(() => ctx.locale.addLanguage(LANGUAGE), "locale-es-cl: idioma");',
  '\t\t\tfor (const [ns, dict] of Object.entries(DICTIONARIES)) {',
  '\t\t\t\tctx.effect(() => ctx.locale.register(ns, LANGUAGE.id, dict), "locale-es-cl: " + ns);',
  '\t\t\t}',
  '\t\t}',
  '\t\texports.apply = apply;',
  '\t\texports.inject = inject;',
  '\t\treturn module.exports;',
  '\t}',
  '});',
  '',
].join('\n');
fs.writeFileSync(path.join(outDir, 'lib', 'client.js'), header);

const clientBytes = fs.statSync(path.join(outDir, 'lib', 'client.js')).size;
console.log('\n=== EMITIDO ===');
console.log(path.join(outDir, 'package.json') + (conservados.length ? ' (conservados: ' + conservados.join(', ') + ')' : ''));
console.log(path.join(outDir, 'cordis.patch.yml'));
console.log(path.join(outDir, 'lib', 'index.js'));
console.log(path.join(outDir, 'lib', 'client.js') + ' (' + (clientBytes / 1024).toFixed(1) + ' KB, ' + Object.keys(finalDicts).length + ' namespaces)');
