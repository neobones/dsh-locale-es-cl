# Pack de idioma `es-CL` (español de Chile) — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar la interfaz web de DeepSeek Harness en español de Chile como un pack de idioma `es-CL` instalable, con cobertura 100 % y hoja de revisión del delta.

**Architecture:** Se parte del pack `Oskarosan/dsh-locale-es` (castellano, 2.603 claves / 57 namespaces) clonado en `default-workspace/dsh-locale-es-cl`. Se le cambia la identidad a un id propio `es-CL` con `fallback: 'en'`, se conserva el catálogo inglés extraído del `app.asar` de referencia y se adaptan los diccionarios a español de Chile en dos capas: una **pasada mecánica** dirigida por `i18n/terminology.json`, y una **pasada editorial** por lotes de namespace. Todo el trabajo se verifica con las puertas que ya trae el pack (cobertura, marcadores, auditoría, portabilidad, metadatos, carga real del bundle).

**Tech Stack:** JavaScript CommonJS para herramientas (`node`, sin dependencias), JSON para diccionarios, el protocolo lazy-CJS del cargador de clientes de DSH (`window.__ModuleLoader__.load`), y `pnpm` a través de `dsh plugin` para la instalación.

**Spec:** [`docs/superpowers/specs/2026-10-12-locale-es-cl-design.md`](../specs/2026-10-12-locale-es-cl-design.md)

## Global Constraints

- **Idioma del pack:** `LANG_ID = 'es-CL'`, `LANG_LABEL = 'Español (Chile)'`, `fallback: 'en'`.
- **Nombre del paquete:** `dsh-locale-es-cl`; id de la fila del loader: `locale-es-cl`.
- **Directorio de traducción:** `i18n/es-cl/` (nunca `i18n/es`, que pasa a ser `i18n/reference/es.json`).
- **Referencia castellana:** `i18n/reference/es.json`, fusionada y de solo lectura.
- **Registro:** tuteo chileno, imperativos en tú, cero voseo, cero `vosotros`, voz activa, etiquetas cortas.
- **Se quedan en inglés:** `plugin`, `prompt`, `token`, `commit`, `push`, `pull request`, `diff`, `log`, `shell`, `tool call`, `chat`, `API`, `JSON`, `Markdown`, `deploy`. La lista es vinculante **para cada lote**: al cerrar un lote hay que comprobar que ninguna de estas palabras se tradujo. Sospechosos ya detectados en el corpus: `diff` renderizado como «diferencias»/«cambios» y `tool call` como «llamada a herramienta» (aparecen en `conversation`, `chat`, `cordis`, `trajectory`, `question`, `permission.access`, `settings`, `deliverables`). Comprobación por lote:

  ```powershell
  Select-String -Path i18n/es-cl/<namespace>.json -Pattern "llamada a herramienta|llamadas a herramienta|diferencias de código|Contraer las diferencias|Expandir.*diferencias"
  ```
- **Se traducen:** `branch` → `rama`, `model` → `modelo`, `settings` → `Ajustes`, `workspace` → `espacio de trabajo` (salvo identificador técnico).
- **Marcadores `{...}` intactos** en cada clave; `--check` es la puerta.
- **No se traducen** tokens de comando (`/compact`, `/plan`), nombres de herramientas (`Bash`, `Read`), rutas ni identificadores técnicos.
- **Nada se edita a mano** en `lib/`, `cordis.patch.yml` ni en los campos estructurales de `package.json`: los emite `tools/build-locale-pack.cjs`.
- **Node ≥ 18**, sin dependencias npm para las herramientas.
- **Rutas de trabajo** (Windows, PowerShell):
  - Repo del pack: `C:\Users\jmeli\Documents\deepseek-harness\default-workspace\dsh-locale-es-cl`
  - `app.asar` de referencia: `C:\Users\jmeli\AppData\Local\Programs\DeepSeek Harness\resources\app.asar`
  - CLI de la app: `C:\Users\jmeli\AppData\Local\Programs\DeepSeek Harness\resources\runtime\cli\bin\dsh.cmd`
  - Perfil: `desktop` (`C:\Users\jmeli\.dsh\profiles\desktop`)

Todos los comandos se ejecutan con el repo del pack como directorio de trabajo.

---

### Task 1: Extracción del catálogo inglés y paridad con la app de referencia

**Files:**
- Modify: `.gitignore` (añadir `_referencia-dsh/`)
- Create: `i18n/reference/es.json`, `docs/ns-list.tsv`
- Regenerate: `i18n/catalog.json`

**Interfaces:**
- Consumes: `tools/extract-app.cjs`, `tools/extract-locale.cjs`, `tools/show-ns.cjs` (ya existen).
- Produces: `i18n/catalog.json` (57 namespaces, 2.603 claves), `i18n/reference/es.json` (`{ "<ns>": { "<clave>": "<texto>" } }`), `docs/ns-list.tsv` (`rango<TAB>namespace<TAB>claves`), usado por todas las tareas de traducción.

- [ ] **Step 1: Extraer la app de referencia y verificar hashes**

```powershell
cd C:\Users\jmeli\Documents\deepseek-harness\default-workspace\dsh-locale-es-cl
node tools/extract-app.cjs "C:\Users\jmeli\AppData\Local\Programs\DeepSeek Harness\resources\app.asar" _referencia-dsh
```

Esperado: `discrepancias de hash: 0` y salida 0. Si hay discrepancias, **parar**: el `app.asar` no es el esperado.

- [ ] **Step 2: Regenerar el catálogo desde esa extracción**

```powershell
node tools/extract-locale.cjs _referencia-dsh/dsh/node_modules/@deepseek-ai i18n/catalog.json
```

Esperado: el script informa de los namespaces y claves encontradas. Comprobar que son **57 namespaces y 2.603 claves**:

```powershell
node -e "const c=require('./i18n/catalog.json');const ns=Object.keys(c.namespaces);const k=ns.reduce((s,n)=>s+Object.keys(c.namespaces[n].locales.en).length,0);console.log(ns.length+' namespaces, '+k+' claves')"
```

Esperado: `57 namespaces, 2603 claves`. Si difiere, el catálogo manda: actualizar las cifras de `docs/ns-list.tsv` (Step 4) y de la spec, y seguir.

- [ ] **Step 3: Fusionar la traducción castellana en la referencia**

```powershell
node -e "const fs=require('fs'),p=require('path');const dir='i18n/es';const out={};for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.json')).sort()){Object.assign(out,JSON.parse(fs.readFileSync(p.join(dir,f),'utf8')))}fs.mkdirSync('i18n/reference',{recursive:true});fs.writeFileSync('i18n/reference/es.json',JSON.stringify(out,null,2)+'\n');console.log('namespaces en la referencia: '+Object.keys(out).length)"
```

Esperado: `namespaces en la referencia: 57`. El fichero queda con el mismo formato que leerán `tools/delta-report.cjs` y `tools/apply-terminology.cjs`.

- [ ] **Step 4: Guardar la lista de namespaces ordenada por tamaño**

```powershell
node -e "const fs=require('fs');const c=require('./i18n/catalog.json');const rows=Object.entries(c.namespaces).map(([n,b])=>[n,Object.keys(b.locales.en).length]).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]));let cum=0;const out=rows.map(([n,k],i)=>{cum+=k;return [i+1,n,k,cum].join('\t')}).join('\n');fs.mkdirSync('docs',{recursive:true});fs.writeFileSync('docs/ns-list.tsv','rango\tnamespace\tclaves\tacumulado\n'+out+'\n');console.log('filas: '+rows.length)"
```

Esperado: `filas: 57`. El acumulado final debe ser 2603.

- [ ] **Step 5: Ignorar el árbol de referencia y commitear**

Añadir `_referencia-dsh/` a `.gitignore` (junto a `_i18n/` y `_out/`), de modo que quede:

```
node_modules/
_i18n/
_out/
_referencia-dsh/
*.log
*.tmp
.DS_Store
Thumbs.db
desktop.ini
```

```powershell
git add .gitignore i18n/catalog.json i18n/reference/es.json docs/ns-list.tsv
git commit -m "feat(catalogo): extraer el corpus ingles del app.asar 0.2.0-rc.2 y fijar la referencia castellana"
```

---

### Task 2: Identidad `es-CL`, metadatos de la tarjeta y atribución

**Files:**
- Modify: `tools/build-locale-pack.cjs` (constantes de identidad y textos del generador)
- Modify: `package.json` (nombre, descripción, palabras clave, scripts, repositorio local)
- Rename: `i18n/es/` → `i18n/es-cl/` (57 ficheros)
- Create: `locale/es-CL.json`
- Modify: `locale/en.json`, `locale/es.json`, `NOTICE.md`, `CHANGELOG.md`

**Interfaces:**
- Consumes: `i18n/reference/es.json` (Task 1), `i18n/es-cl/*.json` (semilla castellana).
- Produces: build que emite `LANGUAGE = {"id":"es-CL","label":"Español (Chile)","fallback":"en"}`, fila de loader `locale-es-cl`, y `package.json` con `name: "dsh-locale-es-cl"`. Todas las tareas siguientes dependen de estos nombres.

- [ ] **Step 1: Comprobar el estado inicial del build (debe fallar por identidad castellana)**

```powershell
Select-String -Path tools/build-locale-pack.cjs -Pattern "PKG_NAME|LANG_ID|LANG_LABEL|locale-es"
```

Esperado: `PKG_NAME = 'dsh-locale-es'`, `LANG_ID = 'es'`, `LANG_LABEL = 'Español'` y la fila `id: locale-es`. Ese es el estado a cambiar.

- [ ] **Step 2: Renombrar el directorio de traducción**

```powershell
git mv i18n/es i18n/es-cl
node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl . --check
```

Esperado: `=== RESUMEN ===` con `problemas : 0` y `RESULTADO: OK` (la semilla castellana cubre el 100 %). Si falla, el `git mv` no se hizo o el catálogo cambió.

- [ ] **Step 3: Cambiar las constantes y los textos del generador**

En `tools/build-locale-pack.cjs`:

```js
const PKG_NAME = 'dsh-locale-es-cl';
const LANG_ID = 'es-CL';
const LANG_LABEL = 'Español (Chile)';
```

Además:
- Línea del parche: `'    - id: locale-es',` → `'    - id: locale-es-cl',`
- Etiquetas de efecto: `"locale-es: idioma"` → `"locale-es-cl: idioma"` y `"locale-es: " + ns` → `"locale-es-cl: " + ns`
- Comentarios y descripciones emitidas que dicen `castellano (es)` → `español de Chile (es-CL)` (cabecera del fichero, `description` del paquete emitido, cabecera del bundle, cabecera de la mitad host, comentario del parche).

- [ ] **Step 4: Comprobar que la identidad emitida es la correcta**

```powershell
node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl .
Select-String -Path lib/client.js -Pattern "locale-es-cl|es-CL|Español \(Chile\)|__ModuleLoader__" | Select-Object -First 6
Select-String -Path cordis.patch.yml -Pattern "locale-es-cl|dsh-locale-es-cl"
node -e "const p=require('./package.json');console.log(p.name, p.dsh.bundle.patch, p.dsh.client.inject.join(','))"
```

Esperado: `id: "dsh-locale-es-cl"`, `{"id":"es-CL","label":"Español (Chile)","fallback":"en"}`, fila `locale-es-cl`, y `dsh-locale-es-cl ./cordis.patch.yml @deepseek-ai/dsh-client-locale`.

- [ ] **Step 5: Ajustar la ficha del paquete**

En `package.json` (los campos conservables sobreviven al build, pero deben quedar correctos en el repo):
- `"name": "dsh-locale-es-cl"` (ya lo fija el generador)
- `"description": "Pack de idioma español de Chile (es-CL) para la interfaz web de DeepSeek Harness"`
- `"keywords"`: `deepseek-harness`, `dsh`, `dsh-plugin`, `deepseek`, `locale`, `language-pack`, `i18n`, `spanish`, `espanol`, `es-CL`, `chile`
- `"repository"`, `"homepage"`, `"bugs"`: dejar el repositorio **local** (`"type": "git"` con la URL de `upstream` solo como remoto de sincronización) — sin URLs de publicación inventadas; `author` pasa a reflejar la adaptación.
- `"scripts"`: `build` → `node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl .`; `check` → el mismo con `--check`; `audit` → `node tools/audit-es.cjs i18n/catalog.json i18n/es-cl`; añadir `"terms": "node tools/apply-terminology.cjs i18n/terminology.json i18n/es-cl --check"` y `"delta": "node tools/delta-report.cjs i18n/catalog.json i18n/reference/es.json i18n/es-cl"`.

**Importante:** `package.json` lo reescribe el generador en cada build conservando estos campos; los estructurales (`name`, `type`, `main`, `exports`, `files`, `dsh`) siempre los fija el generador.

- [ ] **Step 6: Metadatos de la tarjeta del plugin**

`locale/en.json` (actualizar) y `locale/es-CL.json` (crear):

```json
{
  "meta": {
    "title": "Español de Chile (es-CL)",
    "description": "Interfaz de DeepSeek Harness en español de Chile: 2.603 claves en 57 namespaces, con respaldo automático al inglés para lo que falte."
  }
}
```

`locale/es.json` se deja con el mismo contenido que `es-CL.json`, por si el resolutor de metadatos indexa por subetiqueta primaria. `locale/en.json` lleva el título y la descripción en inglés.

```powershell
node tools/check-plugin-meta.cjs .
```

Esperado: sin problemas (declara `dsh.bundle.patch`, `exports["./locale/*.json"]`, icono válido).

- [ ] **Step 7: Atribución de la obra derivada**

En `NOTICE.md`, añadir una sección al inicio del apartado de contenido:

```markdown
## Obra derivada

- **Adaptación al español de Chile** (`i18n/es-cl/*.json`) y la pasada de terminología
  (`i18n/terminology.json`): trabajo original de este repositorio, MIT.
- **Traducción castellana de referencia** (`i18n/reference/es.json`): derivada de
  [Oskarosan/dsh-locale-es](https://github.com/Oskarosan/dsh-locale-es) (MIT), usada como
  referencia de partida y conservada para poder auditar el delta.
- El **catálogo inglés** (`i18n/catalog.json`) sigue siendo de sus autores originales y se
  incluye solo para verificar cobertura, paridad y marcadores.
```

Sustituir la URL de incidencias final por la del repositorio local (o quitarla si no hay remoto público).

- [ ] **Step 8: Regenerar, verificar y commitear**

```powershell
node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl . --check
node tools/verify-pack.cjs lib/client.js
git add -A
git commit -m "feat(identidad): pack autonomo es-CL (Espanol (Chile)) con metadatos de tarjeta y atribucion"
```

Esperado: `RESULTADO: OK` y `verify-pack` sin problemas.

---

### Task 3: Pasada mecánica de terminología y herramienta de delta

**Files:**
- Create: `i18n/terminology.json`, `tools/apply-terminology.cjs`, `tools/delta-report.cjs`
- Modify: `i18n/es-cl/*.json` (57 ficheros, sustituciones mecánicas)
- Delete: `tools/_scan_terms.py` (script temporal de análisis)

**Interfaces:**
- Consumes: `i18n/reference/es.json`, `i18n/catalog.json`, `i18n/es-cl/`.
- Produces:
  - `tools/apply-terminology.cjs <terminology.json> <dir> [--check]` → aplica sustituciones y verifica términos prohibidos; salida 1 si algo queda pendiente.
  - `tools/delta-report.cjs <catalog.json> <reference.json> <dir es-cl> [--md f] [--csv f]` → tabla por namespace (`claves`, `cambiadas`, `sin_tocar`, `faltantes`, `marcadores_rotos`), hoja de revisión opcional; salida 1 si hay faltantes o marcadores rotos.

- [ ] **Step 1: Escribir la tabla de terminología**

`i18n/terminology.json`. Las entradas `from` son expresiones regulares sin flags (el tool aplica límites de palabra y `i`), y `to` va en minúscula: el tool restituye la mayúscula inicial cuando el original la tenía.

```json
{
  "replacements": [
    { "from": "inténtalo de nuevo", "to": "intenta de nuevo" },
    { "from": "inténtalo", "to": "intenta" },
    { "from": "compruébalo", "to": "revísalo" },
    { "from": "comprueba", "to": "revisa" },
    { "from": "comprobar", "to": "revisar" },
    { "from": "comprobación", "to": "revisión" },
    { "from": "e introduce", "to": "y escribe" },
    { "from": "introduce", "to": "escribe" },
    { "from": "introducir", "to": "escribir" },
    { "from": "ordenador", "to": "computador" },
    { "from": "añade", "to": "agrega" },
    { "from": "añadir", "to": "agregar" },
    { "from": "añádelos", "to": "agrégalos" },
    { "from": "gestor de archivos", "to": "explorador de archivos" },
    { "from": "en breve", "to": "en un momento" },
    { "from": "no se ha podido", "to": "no se pudo" },
    { "from": "se ha guardado", "to": "quedó guardado" },
    { "from": "se han guardado", "to": "quedaron guardados" },
    { "from": "se ha actualizado", "to": "se actualizó" },
    { "from": "se ha eliminado", "to": "se eliminó" },
    { "from": "se ha creado", "to": "se creó" },
    { "from": "se ha producido", "to": "ocurrió" },
    { "from": "reajustar", "to": "volver a ajustar" },
    { "from": "pulsar", "to": "presionar" },
    { "from": "ratón", "to": "mouse" },
    { "from": "móvil", "to": "celular" }
  ],
  "banned": [
    "inténtalo", "compruébalo", "comprueba", "comprobar", "comprobación",
    "introduce", "introducir", "ordenador", "ficheros", "pulsar", "ratón",
    "móvil", "reajustar", "vosotros", "vuestro", "coger", "vale"
  ]
}
```

Nota: `se ha podido` aparece también en construcciones como «No se ha podido contactar»; la entrada `no se ha podido` → `no se pudo` cubre el caso frecuente, y los que queden se resuelven a mano en el lote correspondiente.

- [ ] **Step 2: Escribir `tools/apply-terminology.cjs`**

```js
/**
 * Aplica la tabla de terminologia es-CL sobre los diccionarios de un directorio.
 *
 * Uso: node apply-terminology.cjs <terminology.json> <dir de diccionarios> [--check]
 *
 * Sin --check reescribe los ficheros *.json in situ (indentacion de 2 espacios) e
 * informa de cada sustitucion. Con --check no escribe: informa de las
 * sustituciones pendientes y de los terminos prohibidos que sigan apareciendo, y
 * sale con codigo 1 si queda alguno.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const termPath = process.argv[2];
const dir = process.argv[3];
const checkOnly = process.argv.includes('--check');

const table = JSON.parse(fs.readFileSync(termPath, 'utf8'));
const LETTER = 'A-Za-z\\u00C0-\\u024F\\u00D1\\u00F1';
const boundaries = (pattern) => new RegExp('(?<![' + LETTER + '])(' + pattern + ')(?![' + LETTER + '])', 'gi');
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
```

- [ ] **Step 3: Escribir el test que debe fallar (la pasada mecánica aún no se aplicó)**

```powershell
node tools/apply-terminology.cjs i18n/terminology.json i18n/es-cl --check
```

Esperado: `RESULTADO: FALLO`, con al menos 150 sustituciones pendientes y `prohibidos restantes : 0` (la comprobación de prohibidos se hace sobre el texto **ya sustituido**, así que los términos que además son reglas de sustitución nunca aparecen como pendientes; es una puerta de no regresión, no un detector de peninsulaísmos). Guardar las cifras exactas para la comprobación siguiente.

- [ ] **Step 4: Aplicar la pasada mecánica**

```powershell
node tools/apply-terminology.cjs i18n/terminology.json i18n/es-cl
node tools/apply-terminology.cjs i18n/terminology.json i18n/es-cl --check
```

Esperado: la primera orden aplica las sustituciones; la segunda termina en `RESULTADO: OK` con `prohibidos restantes : 0`.

- [ ] **Step 5: Proteger cobertura y marcadores tras la pasada**

```powershell
node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl . --check
```

Esperado: `problemas : 0` y `RESULTADO: OK` (ninguna sustitución puede comerse un `{marcador}`).

- [ ] **Step 6: Escribir `tools/delta-report.cjs`**

```js
/**
 * Compara la traduccion es-CL con la referencia castellana y emite la hoja de revision.
 *
 * Uso: node delta-report.cjs <catalog.json> <reference.json> <dir es-cl> [--md out.md] [--csv out.csv]
 *
 * <reference.json> es { "<ns>": { "<clave>": "<texto>" } } fusionado.
 * Sale con codigo 1 si falta alguna clave del catalogo o si algun marcador no cuadra.
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

const rows = [];
const changed = [];
let totals = { keys: 0, changed: 0, untouched: 0, missing: 0, broken: 0 };

for (const [ns, body] of Object.entries(catalog.namespaces)) {
  const en = body.locales.en || {};
  const es = current[ns] || {};
  const ref = reference[ns] || {};
  let c = 0, missing = 0, broken = 0;
  for (const [key, source] of Object.entries(en)) {
    const mine = es[key];
    if (typeof mine !== 'string' || mine.trim() === '') { missing++; continue; }
    if (source.trim() === '' ) continue;
    if (!same(marks(source), marks(mine))) { broken++; continue; }
    if (mine !== ref[key]) {
      c++;
      changed.push({ ns, key, en: source, ref: ref[key] === undefined ? '' : ref[key], es: mine });
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
console.log('claves: ' + totals.keys + ' | cambiadas: ' + totals.changed + ' | sin tocar: ' + totals.untouched + ' | faltan: ' + totals.missing + ' | marcadores rotos: ' + totals.broken);

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

process.exit(totals.missing || totals.broken ? 1 : 0);
```

- [ ] **Step 7: Comprobar que el delta se mide bien**

```powershell
node tools/delta-report.cjs i18n/catalog.json i18n/reference/es.json i18n/es-cl
```

Esperado: `faltan: 0`, `marcadores rotos: 0`, y `0 < cambiadas <= sustituciones aplicadas` en Step 4. La igualdad **no** se espera: una clave afectada por dos reglas cuenta una vez en `cambiadas` y dos veces en el recuento de sustituciones. Salida 0.

- [ ] **Step 8: Limpiar el script temporal y commitear**

```powershell
Remove-Item tools/_scan_terms.py
git add -A
git commit -m "feat(terminologia): pasada mecanica es-CL dirigida por tabla, con delta-report y apply-terminology"
```

---

### Task 4: Lote A — `conversation` (369 claves)

**Files:**
- Modify: `i18n/es-cl/conversation.json`

**Interfaces:**
- Consumes: `i18n/terminology.json`, `tools/apply-terminology.cjs`, `tools/delta-report.cjs` (Task 3); `i18n/reference/es.json` y `i18n/catalog.json` como referencia.
- Produces: diccionario `conversation` adaptado; sirve de patrón de estilo para los lotes siguientes.

- [ ] **Step 1: Línea base del lote**

```powershell
node tools/delta-report.cjs i18n/catalog.json i18n/reference/es.json i18n/es-cl | Select-String -Pattern "^conversation"
```

Esperado: `cambiadas` = solo las sustituciones mecánicas de Task 3 en ese namespace. Anotar la cifra.

- [ ] **Step 2: Adaptar las cadenas**

Reglas de reescritura, en orden de prioridad:

1. **Pretérito perfecto compuesto → indefinido**: «Se ha guardado» → «Quedó guardado»; «No se ha podido…» → «No se pudo…».
2. **Verbo peninsular → verbo chileno (el enclítico no es el problema)**: el enclítico es español correcto y se conserva («agrégalos», «hazla más chica», «inténtalo», «renómbrala»). Lo que se cambia es el verbo cuando es de España: «compruébalo» → «revísalo»; «echa un vistazo» → «revisa»; «coger» → «tomar». **Ojo:** `renombrar` **no** es peninsular —es español chileno estándar— y **no** se sustituye por «cambiar el nombre»: alarga la etiqueta («Renombrar» → «Cambiar el nombre») sin ganancia.
   **Regla 1 no se aplica a estados.** Si el origen inglés es una cópula o una descripción en presente («You are not signed in», «Your draft changed. The transcript is preserved…»), el pretérito cambia el significado: esas cadenas conservan el perfecto compuesto. Solo se convierten los perfectos que reflejan un **pasado simple** inglés o una acción terminada.
3. **Léxico chileno**: «añadir» → «agregar»; «comprobar» → «revisar/verificar»; «introducir» → «escribir/ingresar»; «gestor de archivos» → «explorador de archivos»; «en breve» → «en un momento». («fallo» → «falla» es sensible al artículo: se resuelve caso a caso como «falla» con su artículo femenino o como «error», nunca en un barrido mecánico.)
4. **Tuteo chileno**: «puedes detener la ejecución» se mantiene; nunca `vos`, `tenés`, `querés`, `vosotros`.
5. **Etiquetas cortas** donde el ancho es fijo (botones, chips, filas de sidebar): preferir «Guardar» sobre «Guardar los cambios» solo si el inglés también es corto.
6. **Términos técnicos en inglés** según Global Constraints.

Ejemplos reales de la referencia y su adaptación esperada:

| clave | referencia `es` | `es-CL` |
|---|---|---|
| `attachment.pathUnsupported` | «La ruta contiene caracteres que una referencia no puede transportar; renómbrala e inténtalo de nuevo.» | «La ruta tiene caracteres que una referencia no puede transportar; cámbiale el nombre e intenta de nuevo.» |
| `placeholder.parentOffline` | «Sesión principal sin conexión; no se puede enviar, pero aún puedes detener la ejecución» | «Sesión principal sin conexión; no se puede enviar, pero aún puedes detener la ejecución» (sin cambios) |
| `queue.editFailed` | «Error de edición: puede que este mensaje ya haya empezado a enviarse.» | «Error de edición: puede que este mensaje ya se esté enviando.» |

Los 369 pares `inglés / referencia es` están en `i18n/catalog.json` e `i18n/reference/es.json`; este lote cubre **todas** las claves del namespace `conversation`.

- [ ] **Step 3: Verificar el lote**

```powershell
node tools/apply-terminology.cjs i18n/terminology.json i18n/es-cl --check
node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl . --check
node tools/delta-report.cjs i18n/catalog.json i18n/reference/es.json i18n/es-cl | Select-String -Pattern "^conversation|TOTALES|claves:"
```

Esperado: `RESULTADO: OK` en las dos primeras; `conversation` con `cambiadas` **mayor** que la línea base, `faltan 0` y `marcadores 0`; totales con `faltan: 0` y `marcadores rotos: 0`.

- [ ] **Step 4: Commit**

```powershell
git add i18n/es-cl/conversation.json
git commit -m "feat(es-CL): adaptar conversation (369 claves) al espanol de Chile"
```

---

### Task 5: Lote B — `trajectory` (192) y `pluginManager` (189)

**Files:**
- Modify: `i18n/es-cl/trajectory.json`, `i18n/es-cl/pluginManager.json`

**Interfaces:**
- Consumes: las mismas herramientas de Task 3 y el patrón de estilo de Task 4.
- Produces: diccionarios `trajectory` y `pluginManager` adaptados.

- [ ] **Step 1: Línea base del lote**

```powershell
node tools/delta-report.cjs i18n/catalog.json i18n/reference/es.json i18n/es-cl | Select-String -Pattern "^trajectory|^pluginManager"
```

- [ ] **Step 2: Adaptar las cadenas**

Mismas reglas que Task 4. Casos concretos ya identificados en `pluginManager`:

| clave | referencia `es` | `es-CL` |
|---|---|---|
| `installProblemNetwork` | «No se ha podido contactar con el registro de plugins; comprueba la red e inténtalo de nuevo.» | «No pudimos contactar con el registro de plugins; revisa tu conexión e intenta de nuevo.» |
| `installDescription` | «Introduce el nombre del paquete del plugin, la dirección del repositorio de GitHub o la ruta…» | «Escribe el nombre del paquete del plugin, la dirección del repositorio de GitHub o la ruta…» |
| `installReconcile` | «Comprobar el estado de la instalación» | «Revisar el estado de la instalación» |
| `installGithubFailedTitle` | «No se puede acceder a GitHub» | «No se puede acceder a GitHub» (sin cambios) |

- [ ] **Step 3: Verificar el lote**

```powershell
node tools/apply-terminology.cjs i18n/terminology.json i18n/es-cl --check
node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl . --check
node tools/delta-report.cjs i18n/catalog.json i18n/reference/es.json i18n/es-cl | Select-String -Pattern "^trajectory|^pluginManager|claves:"
```

Esperado: `RESULTADO: OK` en las dos puertas, ambos namespaces con `faltan 0`, `marcadores 0` y `cambiadas` por encima de su línea base.

- [ ] **Step 4: Commit**

```powershell
git add i18n/es-cl/trajectory.json i18n/es-cl/pluginManager.json
git commit -m "feat(es-CL): adaptar trajectory y pluginManager al espanol de Chile"
```

---

### Task 6: Lote C — `schedule.manager` (187) y `chat` (186)

**Files:**
- Modify: `i18n/es-cl/schedule.manager.json`, `i18n/es-cl/chat.json`
- Modify: `tools/delta-report.cjs` (nuevo contador de términos protegidos)

**Interfaces:** igual que Task 5.

**Paso 0 — cerrar el gate de términos protegidos (antes de traducir).** La comprobación por `Select-String` de las Global Constraints solo cubre frases compuestas y no cazó `trajectory.tab.diff` = «Diferencias» en la Task 5, ni las 6 claves de `trajectory` que traducen `prompt` como «Indicaciones del sistema». El gate correcto compara por clave: para cada clave cuyo **origen inglés** contiene un término protegido (los **quince** de las Global Constraints, sin recortes: `diff`, `tool call`, `commit`, `push`, `pull request`, `prompt`, `plugin`, `token`, `log`, `shell`, `chat`, `API`, `JSON`, `Markdown`, `deploy`), el valor `es-CL` debe seguir conteniendo ese término.

**Precisión del matcher** (para no dar falsos positivos): emparejar con límites de palabra y plural opcional, es decir `(?<![A-Za-z])<término>s?(?![A-Za-z])` sobre el texto en minúsculas. Con eso «Tool calls» cuenta como acierto, y «Subtool calls» (`trajectory.details.subtoolCalls` = «Llamadas a subherramientas») **no** se marca, porque `subtoll` no es `tool call` precedido de límite. No marcar por subcadena simple.

**Ruling sobre `log`:** el término cuenta cuando es el sustantivo. Si el origen inglés empareja `\blog(ged|ging|s)?\s+(in|out)\b` (verbo «log in/out», `settings.account.json:4`), la clave se excluye de la comprobación de `log`. Todo lo demás —incluidos los compuestos «session log» (`command.json:16`, `feedback.json:10`, `session-log-download.json:4`, `settings.sessionLog.json:3`, `workspace.json:51`)— debe conservar `log`, así que su lote lo renderiza como «log de sesión» y no como «registro de sesión».

**Regla 1 al barrer:** el matcher del perfecto compuesto debe cubrir `he|has|ha|hemos|habéis|han|había|habían` + participio, incluidos los irregulares cortos («ha ido mal» → «salió mal», que un matcher de participios regulares no ve) y con flag `i`, porque una auxiliar al inicio de frase se escapaba.

**Regla 1 no se aplica a estados**, y el criterio correcto es: se conserva el perfecto cuando la frase describe un **estado resultante con consecuencia en presente** («Your draft changed. The transcript is preserved…»; «they were left for you to correct»; «you can still answer»). Si el inglés es un pasado simple de una acción terminada **sin** consecuencia en presente, se convierte al pretérito.

**Punto ciego conocido del gate de términos protegidos (endurecer en la Task 9):** la comprobación es de presencia a nivel de valor, así que un valor que conserva el término **de forma incidental** —una ruta (`logs/`), una URL, un identificador— enmascara una ocurrencia que sí se tradujo en el resto de la misma cadena (`settings.agentPreset.guidePtcUsage`: «Analiza los archivos de registro de logs/»). Hay que **descartar los tokens que contienen `/` o `\` en ambos lados** antes de decidir si el término está presente: así una ruta deja de satisfacer la comprobación y también deja de dispararla. Con ese endurecimiento el conjunto enmascarado del pack es exactamente una clave (`guidePtcUsage`) más dos literales benignos (una URL en `settings.models` y una ruta en `shortcuts.desktop-document`), así que el cambio no genera ruido.

Añadir a `tools/delta-report.cjs` una **columna por namespace** `protegidos` (cuántas claves de ese namespace perdieron un término protegido) más el total en `=== TOTALES ===`, con muestra acotada, al estilo del contador `minusculas_indebidas` que ya existe. El **código de salida no cambia** (lo siguen decidiendo `faltan` y `marcadores rotos`): un contador global fallaría en los lotes intermedios, porque los namespaces aún no adaptados —`cordis`, `question`, `settings.agentLoop`, `settings.agentPreset`, `settings`, `permission.access`— lo mantendrían por encima de cero. Cada lote exige **cero en sus propios namespaces**, y la Task 13 exige **cero en el total** como puerta final.

Verificarlo en los dos sentidos: no vacuo (los namespaces pendientes que traducen `diff`/`tool call` deben aparecer con `protegidos > 0`) y limpio para los namespaces ya adaptados (`conversation`, `trajectory`, `pluginManager`).

- [ ] **Step 1: Línea base**

```powershell
node tools/delta-report.cjs i18n/catalog.json i18n/reference/es.json i18n/es-cl | Select-String -Pattern "^schedule.manager|^chat"
```

- [ ] **Step 2: Adaptar las cadenas**

Mismas reglas. Casos concretos de `chat` ya identificados:

| clave | referencia `es` | `es-CL` |
|---|---|---|
| `message.retry.failure` | «Motivo del fallo: » | «Motivo de la falla: » |
| `settings.links.newTab` | «Navegador predeterminado» | «Navegador predeterminado» (sin cambios) |
| `message.stepProcess.read` | «Leyendo archivos» | «Leyendo archivos» (sin cambios) |

- [ ] **Step 3: Verificar el lote**

```powershell
node tools/apply-terminology.cjs i18n/terminology.json i18n/es-cl --check
node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl . --check
node tools/delta-report.cjs i18n/catalog.json i18n/reference/es.json i18n/es-cl | Select-String -Pattern "^schedule.manager|^chat|claves:"
```

Esperado: `RESULTADO: OK` en las dos puertas; ambos namespaces con `faltan 0`, `marcadores 0`, `protegidos 0` y `cambiadas` por encima de su línea base.

- [ ] **Step 4: Commit**

```powershell
git add i18n/es-cl/schedule.manager.json i18n/es-cl/chat.json tools/delta-report.cjs
git commit -m "feat(es-CL): adaptar schedule.manager y chat, con gate de terminos protegidos por clave"
```

---

### Task 7: Lote D — `settings.models` (113), `workspace` (112), `voice-input` (101), `settings.account` (93)

**Files:**
- Modify: `i18n/es-cl/settings.models.json`, `i18n/es-cl/workspace.json`, `i18n/es-cl/voice-input.json`, `i18n/es-cl/settings.account.json`

**Interfaces:** igual que Task 5.

- [ ] **Step 1: Línea base**

```powershell
node tools/delta-report.cjs i18n/catalog.json i18n/reference/es.json i18n/es-cl | Select-String -Pattern "^settings.models|^workspace|^voice-input|^settings.account"
```

- [ ] **Step 2: Adaptar las cadenas**

Mismas reglas, con dos decisiones de terminología que hay que respetar en todo el pack:

- `settings` → **«Ajustes»** (nunca «Configuración» para este concepto; «configuración» se reserva para *configuration* cuando el original la nombra).
- `workspace` → **«espacio de trabajo»** en texto de interfaz; se deja `workspace` cuando es un identificador técnico o una ruta.

Caso concreto ya identificado en `settings.account`:

| clave | referencia `es` | `es-CL` |
|---|---|---|
| `onboardingIntroduction` | contiene «ordenador» | «computador» (ya cubierto por la pasada mecánica; revisar concordancia) |
| `onboardingDevelopmentDescription` | «Editar código, depurar errores, ejecutar comandos, gestionar archivos de proyecto…» | «Editar código, depurar errores, ejecutar comandos, gestionar archivos del proyecto…» |

- [ ] **Step 3: Verificar el lote**

```powershell
node tools/apply-terminology.cjs i18n/terminology.json i18n/es-cl --check
node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl . --check
node tools/delta-report.cjs i18n/catalog.json i18n/reference/es.json i18n/es-cl | Select-String -Pattern "^settings.models|^workspace|^voice-input|^settings.account|claves:"
```

Esperado: `RESULTADO: OK` en las dos puertas; los cuatro namespaces con `faltan 0`, `marcadores 0` y `cambiadas` por encima de su línea base.

- [ ] **Step 4: Commit**

```powershell
git add i18n/es-cl/settings.models.json i18n/es-cl/workspace.json i18n/es-cl/voice-input.json i18n/es-cl/settings.account.json
git commit -m "feat(es-CL): adaptar settings.models, workspace, voice-input y settings.account"
```

---

### Task 8: Lote E — `schedule.catalog` (70), `deliverables` (60), `shortcuts` (56), `cordis` (51), `open-in-app` (45)

**Files:**
- Modify: `i18n/es-cl/schedule.catalog.json`, `i18n/es-cl/deliverables.json`, `i18n/es-cl/shortcuts.json`, `i18n/es-cl/cordis.json`, `i18n/es-cl/open-in-app.json`

**Interfaces:** igual que Task 5.

- [ ] **Step 1: Línea base**

```powershell
node tools/delta-report.cjs i18n/catalog.json i18n/reference/es.json i18n/es-cl | Select-String -Pattern "^schedule.catalog|^deliverables|^shortcuts|^cordis|^open-in-app"
```

- [ ] **Step 2: Adaptar las cadenas**

Mismas reglas. En `shortcuts` los nombres de teclas y atajos **no se traducen** (`Ctrl`, `Shift`, `Esc`, `Tab`), solo su descripción. Caso concreto ya identificado:

| clave | referencia `es` | `es-CL` |
|---|---|---|
| `deliverables.presented.revealError` | «No se pudo mostrar en el gestor de archivos. Inténtalo de nuevo.» | «No se pudo mostrar en el explorador de archivos. Intenta de nuevo.» |
| `cordis.panel.hint` | «Los controles de ejecución están en el panel de Cordis, encima de Ajustes» | sin cambios (ya cumple) |

- [ ] **Step 3: Verificar el lote**

```powershell
node tools/apply-terminology.cjs i18n/terminology.json i18n/es-cl --check
node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl . --check
node tools/delta-report.cjs i18n/catalog.json i18n/reference/es.json i18n/es-cl | Select-String -Pattern "^schedule.catalog|^deliverables|^shortcuts|^cordis|^open-in-app|claves:"
```

Esperado: `RESULTADO: OK` en las dos puertas; los cinco namespaces con `faltan 0`, `marcadores 0` y `cambiadas` por encima de su línea base.

- [ ] **Step 4: Commit**

```powershell
git add i18n/es-cl/schedule.catalog.json i18n/es-cl/deliverables.json i18n/es-cl/shortcuts.json i18n/es-cl/cordis.json i18n/es-cl/open-in-app.json
git commit -m "feat(es-CL): adaptar el lote E (schedule.catalog, deliverables, shortcuts, cordis, open-in-app)"
```

---

### Task 9: Lote F — ranks 15–24 del catálogo (362 claves)

**Files:**
- Modify: `i18n/es-cl/common.json`, `settings.agentPreset.json`, `settings.pluginInventory.json`, `job.json`, `subagent.json`, `settings.subagent.json`, `settings.json`, `sidebarRight.json`, `question.json`, `command.json`

**Interfaces:** igual que Task 5. Los nombres exactos y sus recuentos están en `docs/ns-list.tsv` (Task 1), rangos 15–24.

- [ ] **Step 1: Línea base**

```powershell
node tools/delta-report.cjs i18n/catalog.json i18n/reference/es.json i18n/es-cl | Select-String -Pattern "^(common|settings|settings.agentPreset|settings.pluginInventory|job|subagent|settings.subagent|sidebarRight|question|command)\s"
```

- [ ] **Step 2: Adaptar las cadenas**

Mismas reglas. Casos concretos ya identificados:

| clave | referencia `es` | `es-CL` |
|---|---|---|
| `question.error.unanswered` | «Selecciona una opción o introduce una respuesta personalizada.» | «Elige una opción o escribe tu propia respuesta.» |
| `common.copy.optionsHint` | «…haz clic con el botón derecho para ver las opciones de copia» | sin cambios (ya cumple) |
| `common.codeBlock.wrap` | «Ajustar líneas» | sin cambios |
| `sidebarRight.dock.addTab` | «Nueva pestaña» | sin cambios |
| `command.description.export` | «Descargar el registro de esta sesión como archivo ZIP» | sin cambios |

`subagent` y `settings.subagent` deben usar la misma terminología entre sí (por ejemplo, `subagent` → «subagente» en ambos).

- [ ] **Step 3: Verificar el lote**

```powershell
node tools/apply-terminology.cjs i18n/terminology.json i18n/es-cl --check
node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl . --check
node tools/delta-report.cjs i18n/catalog.json i18n/reference/es.json i18n/es-cl | Select-String -Pattern "^(common|settings|settings.agentPreset|settings.pluginInventory|job|subagent|settings.subagent|sidebarRight|question|command)\s|claves:"
```

Esperado: `RESULTADO: OK` en las dos puertas; los diez namespaces con `faltan 0`, `marcadores 0` y `cambiadas` por encima de su línea base.

- [ ] **Step 4: Commit**

```powershell
git add i18n/es-cl/common.json i18n/es-cl/settings.agentPreset.json i18n/es-cl/settings.pluginInventory.json i18n/es-cl/job.json i18n/es-cl/subagent.json i18n/es-cl/settings.subagent.json i18n/es-cl/settings.json i18n/es-cl/sidebarRight.json i18n/es-cl/question.json i18n/es-cl/command.json
git commit -m "feat(es-CL): adaptar el lote F (ranks 15-24 del catalogo)"
```

---

### Task 10: Lote G — ranks 25–40 del catálogo (303 claves)

**Files:**
- Modify: `i18n/es-cl/sidebarTerminal.json`, `sidebarBrowser.json`, `agent-team.json`, `model.json`, `sidebarDocumentPreview.json`, `feedback.json`, `settings.webSearch.json`, `workflowRun.json`, `permission.access.json`, `plan.json`, `sidebarFiles.json`, `sidebarExcel.json`, `sidebarOffice.json`, `sidebarPdf.json`, `settings.shell.json`, `directory-browser.json`

**Interfaces:** igual que Task 5; nombres y recuentos en `docs/ns-list.tsv`, rangos 25–40.

- [ ] **Step 1: Línea base**

```powershell
New-Item -ItemType Directory -Force _out | Out-Null
node tools/delta-report.cjs i18n/catalog.json i18n/reference/es.json i18n/es-cl > _out/delta-g.txt 2>&1
Get-Content _out/delta-g.txt | Select-String -Pattern "^sidebarTerminal|^sidebarBrowser|^agent-team|^model|^sidebarDocumentPreview|^feedback|^settings.webSearch|^workflowRun|^permission.access|^plan|^sidebarFiles|^sidebarExcel|^sidebarOffice|^sidebarPdf|^settings.shell|^directory-browser"
```

(`_out/` está en `.gitignore`, así que el informe no se commitea)

- [ ] **Step 2: Adaptar las cadenas**

Mismas reglas. Restricciones propias de estos namespaces:
- `permission.access`: los identificadores de preset (`Read Only`, `Workspace Write`, `Full access`) **no** se traducen si el core no les da nombre para mostrar; solo se traduce el texto descriptivo.
- `model`: «Ventana de contexto» se mantiene; `model` → «modelo».
- `sidebarExcel`, `sidebarOffice`, `sidebarPdf`: `sidebarOffice.busy` → «La vista previa de Office está ocupada. Intenta de nuevo en un momento.»
- `plan` y `workflowRun`: los tokens de comando (`/plan`) no se traducen.

- [ ] **Step 3: Verificar el lote**

```powershell
node tools/apply-terminology.cjs i18n/terminology.json i18n/es-cl --check
node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl . --check
node tools/delta-report.cjs i18n/catalog.json i18n/reference/es.json i18n/es-cl | Select-String -Pattern "TOTALES|claves:"
```

Esperado: `OK` en las dos puertas; totales con `faltan: 0`, `marcadores rotos: 0`.

- [ ] **Step 4: Commit**

```powershell
git add i18n/es-cl
git commit -m "feat(es-CL): adaptar el lote G (ranks 25-40 del catalogo)"
```

---

### Task 11: Lote H — ranks 41–57 del catálogo (114 claves)

**Files:**
- Modify: `i18n/es-cl/goal.json`, `settings.agentLoop.json`, `reference.json`, `sidebarImage.json`, `session-log-download.json`, `settings.theme.json`, `slash.menu.json`, `skill.json`, `approval.json`, `settings.plugins.json`, `sidebar.json`, `documentHtml.json`, `documentMarkdown.json`, `settings.sessionLog.json`, `sidebarCodePreview.json`, `settings.locale.json`, `shortcuts.layout.json`

**Interfaces:** igual que Task 5; nombres y recuentos en `docs/ns-list.tsv`, rangos 41–57.

- [ ] **Step 1: Línea base**

```powershell
node tools/delta-report.cjs i18n/catalog.json i18n/reference/es.json i18n/es-cl | Select-Object -Last 25
```

- [ ] **Step 2: Adaptar las cadenas**

Mismas reglas. Atención especial:
- `settings.locale`: es la fila **Idioma**; el texto del selector debe coincidir con `LANG_LABEL` («Español (Chile)» aparece como opción registrada por el propio pack, no en este diccionario); aquí solo va la etiqueta de la fila.
- `slash.menu`: los comandos (`/compact`, `/plan`) y sus nombres no se traducen; sí sus descripciones.
- `documentHtml`, `documentMarkdown`, `sidebarCodePreview`, `sidebarImage`: etiquetas cortas de vista previa.

- [ ] **Step 3: Verificar el lote**

```powershell
node tools/apply-terminology.cjs i18n/terminology.json i18n/es-cl --check
node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl . --check
node tools/delta-report.cjs i18n/catalog.json i18n/reference/es.json i18n/es-cl | Select-String -Pattern "TOTALES|claves:"
```

Esperado: `RESULTADO: OK` en las dos puertas; totales con `faltan: 0`, `marcadores rotos: 0` y `cambiadas` acumuladas por encima de las del lote G.

- [ ] **Step 4: Commit**

```powershell
git add i18n/es-cl
git commit -m "feat(es-CL): adaptar el lote H (ranks 41-57 del catalogo)"
```

---

### Task 12: Hoja de revisión, README y bitácora

**Files:**
- Create: `docs/revision-es-cl.md`, `docs/revision-es-cl.csv`, `tools/check-coherence.cjs`
- Modify: `README.md`, `CHANGELOG.md`, `NOTICE.md`, `icon.svg`

**Interfaces:**
- Consumes: `tools/delta-report.cjs` (Task 3) y los 57 diccionarios ya adaptados (Tasks 4–11).
- Produces: la hoja que el usuario revisa por muestreo; sin ella no se considera entregada la revisión.

- [ ] **Step 1: Generar la hoja**

```powershell
node tools/delta-report.cjs i18n/catalog.json i18n/reference/es.json i18n/es-cl --md docs/revision-es-cl.md --csv docs/revision-es-cl.csv
node -e "const fs=require('fs');const l=fs.readFileSync('docs/revision-es-cl.csv','utf8').trim().split('\n');console.log('filas de revision: '+(l.length-1))"
```

Esperado: salida 0 (`faltan 0`, `marcadores rotos 0`) y un número de filas coherente con el total de `cambiadas` del informe.

- [ ] **Step 2: Revisar coherencia de terminología entre lotes**

Escribir `tools/check-coherence.cjs`:

```js
/**
 * Informa de como se ha traducido cada termino de la lista en todo el pack, para
 * detectar un mismo termino ingles escrito de dos formas distintas.
 *
 * Uso: node check-coherence.cjs <dir de diccionarios>
 */
'use strict';
const fs = require('fs');
const path = require('path');

const dir = process.argv[2];
const TERMS = ['plugin', 'prompt', 'token', 'commit', 'workspace', 'branch', 'model',
  'subagent', 'settings', 'tool call', 'session', 'skill', 'goal', 'job'];

const found = new Map(TERMS.map((t) => [t, new Map()]));
for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort()) {
  const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
  for (const [ns, dict] of Object.entries(data)) {
    for (const [key, value] of Object.entries(dict)) {
      if (typeof value !== 'string') continue;
      for (const term of TERMS) {
        for (const match of value.matchAll(new RegExp('([\\p{L}]+)\\s+(?=' + term + ')', 'giu'))) {
          found.get(term).set(match[1].toLowerCase(), (found.get(term).get(match[1].toLowerCase()) || 0) + 1);
        }
      }
    }
  }
}

for (const [term, words] of found) {
  const list = [...words.entries()].sort((a, b) => b[1] - a[1]).map(([w, n]) => w + '(' + n + ')');
  console.log(term.padEnd(12) + (list.length ? list.join(' ') : '(sin traduccion adyacente)'));
}
```

```powershell
node tools/check-coherence.cjs i18n/es-cl
```

Esperado: inspección manual. Un mismo término inglés no debe aparecer traducido de dos formas distintas (por ejemplo `subagent` siempre «subagente», `plugin` siempre `plugin`). Corregir directamente en `i18n/es-cl/` las inconsistencias que aparezcan, volver a pasar las puertas `--check` de la Task 13 Step 1 y commitear las correcciones junto con la hoja de revisión.

- [ ] **Step 3: Cerrar README, NOTICE e icono (revisión de delta)**

El README **ya fue reescrito en la Task 2** (título, introducción, comandos de instalación, tabla de estado, árbol del repositorio y sección en inglés). Aquí no se reescribe: se revisa y se completa con los datos que solo existen ahora:

- Cobertura: la cifra real del `delta-report` (claves adaptadas sobre el total).
- Cómo se mantiene: extraer catálogo nuevo, `--check`, traducir lo que falte, reconstruir.
- Créditos: Oskarosan (traducción castellana de base) y DeepSeek (diccionarios `en`/`zh`).
- Que no quede ninguna referencia a `i18n/es` ni a la identidad `es` antigua.

La Task 2 dejó además tres cabos sueltos que solo se pueden cerrar cuando la adaptación existe de verdad; se resuelven en este mismo paso:

1. `NOTICE.md`: el texto afirma «trabajo original» sobre `i18n/es-cl/*.json`, pero hasta la Task 11 ese contenido era idéntico a la referencia derivada. Reescribir para decir que la adaptación chilena es una **obra derivada** de `Oskarosan/dsh-locale-es` (MIT), y quitar la URL de incidencias de terceros: este fork no tiene tracker público, así que no debe redirigir reclamaciones al repositorio ajeno.
2. `icon.svg`: la etiqueta accesible ya dice «español de Chile» mientras el glifo sigue siendo `ES` sobre la bandera de España. Dejar etiqueta y glifo coherentes: texto neutro («Pack de idioma (es-CL)») o glifo `CL`.
3. `NOTICE.md` y `README.md` citan `i18n/terminology.json`, que ya existe desde la Task 3: comprobar que la descripción corresponde a lo que hay.

- [ ] **Step 4: Entrada de bitácora**

Ampliar la entrada `## [Sin publicar]` que la Task 2 ya creó en `CHANGELOG.md` (no crear una sección nueva ni subir la versión: el pack no se publica en npm), dejándola así:

```markdown
## [Sin publicar] — es-CL

- Adaptación al español de Chile del pack castellano de referencia.
- Id de idioma propio `es-CL` («Español (Chile)») con `fallback: 'en'`.
- Pasada mecánica de terminología (`i18n/terminology.json`) y reescritura de estilo por lotes.
- Hoja de revisión del delta en `docs/revision-es-cl.md` y `docs/revision-es-cl.csv`.
- Metadatos de tarjeta, aviso de obra derivada e icono coherentes con la identidad `es-CL`.
```

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "docs(es-CL): hoja de revision del delta, README y bitacora del pack"
```

---

### Task 13: Puertas finales, instalación y verificación en la interfaz

**Files:**
- Modify: `package.json` (solo si el build conserva mal algún campo)
- Regenerate: `lib/client.js`, `lib/index.js`, `cordis.patch.yml`, `package.json`
- Modify: (fuera del repo) `C:\Users\jmeli\.dsh\profiles\desktop\package.json` y `pnpm-lock.yaml` mediante `dsh plugin`

**Interfaces:**
- Consumes: todo lo anterior.
- Produces: pack instalado y verificado en la GUI; perfil `desktop` con la dependencia y el bundle declarados.

- [ ] **Step 1: Las seis puertas, en orden, y cierre de la política de términos en inglés**

```powershell
node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl . --check
node tools/audit-es.cjs i18n/catalog.json i18n/es-cl
node tools/check-portable.cjs i18n
node tools/check-plugin-meta.cjs .
node tools/verify-pack.cjs lib/client.js
node tools/delta-report.cjs i18n/catalog.json i18n/reference/es.json i18n/es-cl
```

Con todos los namespaces ya adaptados, convertir la lista «se quedan en inglés» en una puerta permanente: añadir a `i18n/terminology.json` las traducciones prohibidas de esos términos, en su array `banned` (la comprobación de prohibidos no es tautológica para entradas que no son reglas de sustitución):

```json
"banned": [
  "inténtalo", "compruébalo", "comprueba", "comprobar", "comprobación",
  "introduce", "introducir", "ordenador", "ficheros", "pulsar", "ratón",
  "móvil", "reajustar", "vosotros", "vuestro", "coger", "vale",
  "llamada a herramienta", "llamadas a herramienta", "diferencias de código"
]
```

```powershell
node tools/apply-terminology.cjs i18n/terminology.json i18n/es-cl --check
```

Esperado: `prohibidos restantes : 0` y `RESULTADO: OK`. Si aparece alguno, el namespace citado aún traduce un término que debe quedar en inglés: corregirlo antes de seguir (la re-revisión de la Task 4 dejó localizados los que quedaban: `chat.json:29,99,140,141`, `cordis.json:4`, `permission.access.json:15,17`, `question.json:25`, `settings.agentLoop.json:4,5`, `settings.agentPreset.json:11,14,18`, `settings.json:31`, `trajectory.json:93,98,123,124,143,144,155,167,177`).

Esperado: la 1 termina `RESULTADO: OK`; la 2 no informa de claves ausentes ni repetidas; la 3 no encuentra rutas locales ni secretos; la 4 no encuentra problemas de metadatos; la 5 carga el bundle y expone idioma y diccionarios; la 6 informa `faltan: 0`, `marcadores rotos: 0`, `minusculas_indebidas: 0` y `protegidos: 0` en el total (con todos los namespaces adaptados, ninguna clave puede haber perdido un término que debe quedar en inglés).

- [ ] **Step 2: Paridad contra el `app.asar` real**

```powershell
node -e "const c=require('./i18n/catalog.json');const fs=require('fs');let ns=0,keys=0,mal=[];for(const [n,b] of Object.entries(c.namespaces)){ns++;const en=b.locales.en;keys+=Object.keys(en).length;const f='i18n/es-cl/'+n+'.json';if(!fs.existsSync(f)){mal.push(n);continue}const d=JSON.parse(fs.readFileSync(f,'utf8'))[n]||{};for(const k of Object.keys(en))if(typeof d[k]!=='string'||!d[k].trim())mal.push(n+'.'+k)}console.log('namespaces: '+ns+' | claves: '+keys+' | problemas: '+mal.length);if(mal.length)console.log(mal.slice(0,20).join('\n'))"
```

Esperado: `namespaces: 57 | claves: 2603 | problemas: 0`.

- [ ] **Step 3: Reconstruir el artefacto final y commitear**

```powershell
node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl .
node tools/verify-pack.cjs lib/client.js
git add -A
git commit -m "build(es-CL): artefacto final verificado (bundle, parche y ficha)"
git log --oneline -3
```

- [ ] **Step 4: Instalar en el perfil `desktop`**

**Antes de ejecutar, avisar al usuario:** el gestor recompone el perfil en caliente; si el comando se lanza desde dentro de una sesión de DSH, esa sesión se dispone y la aplicación abre una conversación nueva (el historial no se pierde). Lo ideal es ejecutarlo en una terminal aparte.

```powershell
& "C:\Users\jmeli\AppData\Local\Programs\DeepSeek Harness\resources\runtime\cli\bin\dsh.cmd" plugin --profile desktop add C:\Users\jmeli\Documents\deepseek-harness\default-workspace\dsh-locale-es-cl
```

Esperado: la operación informa del paquete añadido y de la selección del bundle.

- [ ] **Step 5: Verificar la instalación en el perfil**

```powershell
node -e "const p=require('C:/Users/jmeli/.dsh/profiles/desktop/package.json');console.log('deps:',Object.keys(p.dependencies||{}).join(',')||'(ninguna)');console.log('bundles:',(p.dsh&&p.dsh.profile&&p.dsh.profile.bundles||[]).join(','))"
Test-Path "C:\Users\jmeli\.dsh\profiles\desktop\node_modules\dsh-locale-es-cl\lib\client.js"
```

Esperado: `dsh-locale-es-cl` en `deps` y en `bundles`, y `True` en el `Test-Path`. Si el perfil no crea `node_modules` (la app enlaza sus propios paquetes), comprobar en su lugar que el bundle aparece en la lista de bundles y que el paquete resuelve desde el perfil.

- [ ] **Step 6: Verificación funcional en la GUI**

Pedir al usuario, tras recargar con Ctrl+R:
1. *Ajustes → General → Idioma* muestra **Español (Chile)** junto a English y 中文.
2. Al elegirlo, la interfaz cambia de idioma y la elección sobrevive un reinicio.
3. Un par de cadenas de `conversation` y `settings` se ven en español de Chile (sin «inténtalo», sin «compruebe»).
4. La tarjeta del plugin en *Plugins* muestra el título y la descripción del pack.

Si algo falla: revisar la consola del Host por `duplicate loader entry id` o errores de registro del idioma, y `verify-pack` sobre el bundle instalado.

- [ ] **Step 7: Registrar el resultado**

Anotar en `docs/revision-es-cl.md`, al final, la fecha de instalación, la versión del pack y las correcciones que el usuario marque durante la revisión por muestreo, para aplicarlas como lote de ajuste:

```powershell
git add docs/revision-es-cl.md
git commit -m "docs(es-CL): registrar la instalacion y las observaciones de revision"
```

---

## Apéndice: los 57 namespaces y sus claves

`docs/ns-list.tsv` (generado en Task 1) es la fuente; estos son los recuentos esperados con el `app.asar` `0.2.0-rc.2`:

| # | namespace | claves | # | namespace | claves |
|---|---|---|---|---|---|
| 1 | conversation | 369 | 30 | feedback | 20 |
| 2 | trajectory | 192 | 31 | settings.webSearch | 18 |
| 3 | pluginManager | 189 | 32 | workflowRun | 18 |
| 4 | schedule.manager | 187 | 33 | permission.access | 17 |
| 5 | chat | 186 | 34 | plan | 17 |
| 6 | settings.models | 113 | 35 | sidebarFiles | 17 |
| 7 | workspace | 112 | 36 | sidebarExcel | 15 |
| 8 | voice-input | 101 | 37 | sidebarOffice | 15 |
| 9 | settings.account | 93 | 38 | sidebarPdf | 15 |
| 10 | schedule.catalog | 70 | 39 | settings.shell | 14 |
| 11 | deliverables | 60 | 40 | directory-browser | 13 |
| 12 | shortcuts | 56 | 41 | goal | 12 |
| 13 | cordis | 51 | 42 | settings.agentLoop | 12 |
| 14 | open-in-app | 45 | 43 | reference | 11 |
| 15 | common | 41 | 44 | sidebarImage | 11 |
| 16 | settings.agentPreset | 41 | 45 | session-log-download | 10 |
| 17 | settings.pluginInventory | 40 | 46 | settings.theme | 9 |
| 18 | job | 39 | 47 | slash.menu | 9 |
| 19 | subagent | 39 | 48 | skill | 8 |
| 20 | settings.subagent | 35 | 49 | approval | 5 |
| 21 | settings | 34 | 50 | settings.plugins | 5 |
| 22 | sidebarRight | 34 | 51 | sidebar | 5 |
| 23 | question | 31 | 52 | documentHtml | 4 |
| 24 | command | 28 | 53 | documentMarkdown | 4 |
| 25 | sidebarTerminal | 28 | 54 | settings.sessionLog | 4 |
| 26 | sidebarBrowser | 26 | 55 | sidebarCodePreview | 3 |
| 27 | agent-team | 25 | 56 | settings.locale | 1 |
| 28 | model | 23 | 57 | shortcuts.layout | 1 |
| 29 | sidebarDocumentPreview | 22 | | **total** | **2603** |
