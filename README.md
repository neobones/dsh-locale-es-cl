# dsh-locale-es-cl

Pack de idioma **español de Chile (es-CL)** para la interfaz de **DeepSeek Harness** (DSH).

- **2.603 de 2.603 claves traducidas (100 %)**, repartidas en **57 namespaces**.
- **284 de esas 2.603 cadenas (10,9 %) se separan de la traducción castellana de partida**: es
  la adaptación chilena propiamente tal y está listada cadena por cadena, con su inglés y su
  referencia, en [docs/revision-es-cl.md](docs/revision-es-cl.md) y
  [docs/revision-es-cl.csv](docs/revision-es-cl.csv).
- Entra como **plugin de cliente** del Loader de DSH: **no parchea `app.asar`** ni ningún
  fichero de la aplicación.
- Cualquier clave que falte o que añada una versión nueva de DSH **cae automáticamente al
  inglés**, así que el pack nunca rompe la interfaz.

## Estado

| | |
|---|---|
| Cobertura | 2.603/2.603 claves (100 %), 57/57 namespaces |
| Adaptación chilena | 284/2.603 cadenas (10,9 %) distintas de la referencia castellana |
| Términos en inglés | 15 conservados por política; el informe de delta cierra con `protegidos 0` |
| Idioma | `es-CL` — etiqueta «Español (Chile)», respaldo `en` |
| Paquete | `dsh-locale-es-cl` 1.0.1 |
| Licencia | MIT (ver [LICENSE](LICENSE) y [NOTICE.md](NOTICE.md)) |
| Núcleo de DSH probado | app de escritorio con `app.asar` de 121 MB, 70 plugins de UI |

Estas comprobaciones se pueden repetir en cualquier momento y, salvo la última, no necesitan la
aplicación:

```powershell
node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl . --check    # cobertura y marcadores
node tools/audit-es.cjs i18n/catalog.json i18n/es-cl                       # claves ausentes y repetidas
node tools/apply-terminology.cjs i18n/terminology.json i18n/es-cl --check  # términos y fraseología prohibidas
node tools/check-coherence.cjs i18n/es-cl                                  # un término, una sola traducción
node tools/check-portable.cjs i18n                                         # ni rutas ni secretos locales
node tools/verify-pack.cjs lib/client.js                                   # ejecuta el bundle como lo hace DSH
```

## Instalación

Hay dos caminos. El corto usa el gestor de plugins que trae DSH; el manual edita el perfil.

### Vía corta: el gestor de plugins

En la interfaz: barra lateral → **Plugins** → **Add plugin**, y pega la especificación. O desde
la terminal, con el mismo resultado:

```powershell
# desde una copia local (este fork no tiene remoto público propio)
dsh plugin --profile desktop add C:\ruta\a\dsh-locale-es-cl

# si algún día se publica en npm
dsh plugin --profile desktop add dsh-locale-es-cl
```

El gestor acepta nombre de paquete npm (con versión opcional), `github:autor/repo` o una URL de
repositorio git, un `.tgz` y una ruta local. Antes de instalar comprueba que el paquete declare
`dsh.bundle`; al terminar lo añade a `dsh.profile.bundles` del perfil. Después, recarga la
interfaz y elige el idioma en **Ajustes → General → Idioma → Español (Chile)**.

### Vía manual: editar el perfil

Los plugins de un perfil se declaran en `~/.dsh/profiles/<perfil>/package.json`. Añade el pack
como dependencia **y** como bundle:

```json
{
  "dependencies": {
    "dsh-locale-es-cl": "link:C:/ruta/a/dsh-locale-es-cl"
  },
  "dsh": {
    "profile": {
      "bundles": [
        "@deepseek-ai/dsh-base",
        "@deepseek-ai/dsh-web-app",
        "dsh-locale-es-cl"
      ]
    }
  }
}
```

Después, en la carpeta del perfil:

```powershell
pnpm install
```

### Qué busca DSH para listar un plugin

Comprobado en el código de la aplicación (0.2.0-rc.2), por si hay que diagnosticar una tarjeta
que no aparece:

- `dsh.bundle.patch` en el `package.json` — **imprescindible**: sin ese campo el paquete se
  instala como dependencia plana, no como capa del perfil.
- La tarjeta se pinta con los metadatos que DSH lee de `locale/<idioma>.json`
  (`meta.title`, `meta.description`), con el `name` y la `description` del `package.json` como
  respaldo; el icono sale del campo `icon` de nivel superior. Para que el resolutor ESM los
  encuentre, el mapa `exports` tiene que declarar `./locale/*.json` y `./package.json`.
- `tools/check-plugin-meta.cjs` replica esas comprobaciones y corre en la integración continua.
- DSH **no** lee las palabras clave de npm ni consulta ningún catálogo propio: no hay nada que
  «indexar». El descubrimiento es el README, npm o el directorio de la comunidad.

### Notas

- La ruta `link:` y `github:` están soportadas por pnpm; la primera es la que está probada aquí.
- El fichero [cordis.patch.yml](cordis.patch.yml) del paquete es lo que inserta la fila
  `locale-es-cl` en el árbol de plugins; lo aplica DSH al cargar el bundle, no hay que copiarlo
  a mano.
- Si tras instalar el pack no ves «Español (Chile)» en Ajustes, desactiva y vuelve a activar la
  fila `locale-es-cl` en el gestor de plugins para forzar una revisión nueva del bundle de
  cliente.
- **Aviso comprobado:** si modificas el perfil **desde dentro de una sesión de DSH**, la
  recarga en caliente dispone esa sesión y la aplicación abre una conversación nueva. Hazlo
  desde fuera o asume que esa conversación se corta (el historial no se pierde).
- El rescate «Disable third-party plugins» del escritorio deja el perfil con los bundles de
  fábrica, así que se lleva por delante este pack: para volver a tenerlo hay que reinstalarlo.

## Cómo funciona

Los plugins de cliente de DSH son fábricas *lazy-CJS* que el cargador ejecuta en el
navegador:

```js
window.__ModuleLoader__.load({ id, factory: (require) => { /* … */ return module.exports } })
```

`lib/client.js` —generado, no editado a mano— inyecta el servicio `locale` y, cuando está
disponible, registra el idioma y un diccionario por namespace declarando cada registro como
efecto propio del plugin, de modo que se retira limpiamente al descargarlo:

```js
const LANGUAGE = { id: 'es-CL', label: 'Español (Chile)', fallback: 'en' };

function apply(ctx) {
  ctx.effect(() => ctx.locale.addLanguage(LANGUAGE), 'locale-es-cl: idioma');
  for (const [ns, dict] of Object.entries(DICTIONARIES)) {
    ctx.effect(() => ctx.locale.register(ns, 'es-CL', dict), 'locale-es-cl: ' + ns);
  }
}
```

`lib/index.js` es la mitad host: existe para que el paquete sea una fila cargable del Loader
y para que el escaneo de plugins de cliente encuentre su declaración `dsh.client` del
`package.json`. Todo el trabajo real ocurre en el cliente.

## Estructura del repositorio

```
dsh-locale-es-cl/
├── package.json            ficha del paquete y contrato con el Loader (dsh.bundle / dsh.client)
├── cordis.patch.yml        fila que inserta el plugin en el árbol (generado)
├── lib/
│   ├── client.js           bundle del cliente con los 57 diccionarios (generado)
│   └── index.js            mitad host (generado)
├── i18n/
│   ├── catalog.json        catálogo inglés extraído de la app (claves + textos de origen)
│   ├── terminology.json    tabla de reemplazos y términos prohibidos (política de estilo)
│   ├── reference/es.json   traducción castellana de referencia, de solo lectura (obra derivada)
│   └── es-cl/<namespace>.json  un fichero por namespace con la traducción chilena
├── locale/
│   ├── en.json             metadatos de la tarjeta del plugin (meta.title / meta.description)
│   ├── es-CL.json          los mismos metadatos en español de Chile
│   └── es.json             copia de es-CL.json, por si el resolutor indexa por subetiqueta
├── docs/
│   ├── revision-es-cl.md   hoja de revisión del delta, agrupada por namespace
│   └── revision-es-cl.csv  la misma hoja en CSV (namespace, clave, inglés, referencia, es-CL)
├── icon.svg                icono de la tarjeta (relativo, ≤256 KiB, SVG/PNG/JPEG/WebP)
├── tools/                  cadena de herramientas, sin dependencias externas
│   ├── extract-app.cjs          extrae el código de app.asar verificando SHA-256
│   ├── extract-locale.cjs       extrae los diccionarios en/zh de los plugins de UI
│   ├── split-batches.cjs        reparte el catálogo en lotes para traducir en paralelo
│   ├── split-by-namespace.cjs   convierte los lotes en un fichero por namespace
│   ├── show-ns.cjs              imprime los diccionarios ingleses de los namespaces indicados
│   ├── apply-terminology.cjs    aplica (o comprueba con --check) la tabla de terminología
│   ├── delta-report.cjs         compara con la referencia y emite la hoja de revisión
│   ├── check-coherence.cjs      informa de cómo se tradujo cada término, para detectar dobles formas
│   ├── build-locale-pack.cjs    emite lib/ y cordis.patch.yml, e informa de la cobertura
│   ├── audit-es.cjs             busca claves ausentes, ficheros mal alineados y repetidas
│   ├── check-portable.cjs       evita publicar rutas de la máquina que extrajo el catálogo
│   ├── check-plugin-meta.cjs    comprueba lo que DSH exige para listar el plugin
│   └── verify-pack.cjs          ejecuta el bundle en un cargador simulado y lo comprueba
├── .github/workflows/ci.yml     cobertura, auditoría, portabilidad, metadatos y bundle sincronizado
└── CONTRIBUTING.md · NOTICE.md · CHANGELOG.md · LICENSE · README.md
```

## Flujo de trabajo

### Traducir o corregir

1. Edita `i18n/es-cl/<namespace>.json` (un namespace por fichero).
2. **Conserva los marcadores** `{count}`, `{label}`, `{toolName}`… exactamente como están en
   `i18n/catalog.json`: el compilador rechaza cualquier traducción que pierda o invente uno.
3. Reconstruye y comprueba:

```powershell
node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl . --check   # cobertura y marcadores
node tools/audit-es.cjs i18n/catalog.json i18n/es-cl                      # claves ausentes y repetidas
node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl .           # regenera lib/
node tools/verify-pack.cjs lib/client.js                                  # el bundle carga como en DSH
```

`--check` sale con código 1 si falta alguna clave o hay marcadores mal, así que sirve como
puerta en integración continua, igual que `audit-es.cjs`.

### Actualizar el catálogo tras una actualización de DSH

```powershell
# 1. Extraer el catálogo de la instalación nueva
node tools/extract-app.cjs "C:\ruta\a\resources\app.asar" _referencia-dsh
node tools/extract-locale.cjs _referencia-dsh/dsh/node_modules/@deepseek-ai i18n/catalog.json
node tools/check-portable.cjs i18n                                      # el catálogo no lleva rutas locales

# 2. Ver qué falta y traducirlo en i18n/es-cl/<namespace>.json
node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl . --check # lista lo nuevo por traducir

# 3. Volver a pasar las puertas de estilo y reconstruir el bundle
node tools/apply-terminology.cjs i18n/terminology.json i18n/es-cl --check
node tools/apply-terminology.cjs i18n/terminology.json i18n/es-cl        # aplica lo que quede pendiente
node tools/check-coherence.cjs i18n/es-cl                               # un término, una sola traducción
node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl .          # regenera lib/ y cordis.patch.yml
node tools/verify-pack.cjs lib/client.js

# 4. Refrescar la hoja de revisión que revisa el usuario
node tools/delta-report.cjs i18n/catalog.json i18n/reference/es.json i18n/es-cl --md docs/revision-es-cl.md --csv docs/revision-es-cl.csv
```

Las claves nuevas aparecen como «sin traducir» y en la interfaz se ven en inglés hasta que
alguien las traduzca. [docs/revision-es-cl.md](docs/revision-es-cl.md) y su `.csv` son
informes generados: se rehacen con el último comando y no se editan a mano.

### Empezar otro idioma con este repositorio como plantilla

Haz un *fork* y cambia tres constantes en `tools/build-locale-pack.cjs`
(`PKG_NAME`, `LANG_ID`, `LANG_LABEL`), el identificador de la fila en el generador de
`cordis.patch.yml` (`- id: locale-es-cl`) y los campos `name` del `package.json`. El catálogo
inglés y toda la cadena de herramientas se reutilizan tal cual.

### Traducir en paralelo con agentes o por lotes

```powershell
node tools/split-batches.cjs i18n/catalog.json _i18n/batches     # lotes equilibrados
# … cada lote se traduce a _i18n/es-cl/batch-NN.json …
node tools/split-by-namespace.cjs _i18n/es-cl i18n/es-cl         # vuelve al formato del repositorio
```

## Contribuir

Las correcciones de traducción son bienvenidas, y también los avisos de textos que suenen a
máquina. Lee [CONTRIBUTING.md](CONTRIBUTING.md): es corto y evita que un envío se quede sin
poder fusionar por un marcador perdido.

## Créditos

- **Traducción castellana de base** ([i18n/reference/es.json](i18n/reference/es.json)):
  [Oskarosan/dsh-locale-es](https://github.com/Oskarosan/dsh-locale-es), MIT. La adaptación
  chilena es una **obra derivada** suya: ver [NOTICE.md](NOTICE.md).
- **Diccionarios `en` y `zh`** ([i18n/catalog.json](i18n/catalog.json)): los que registran los
  plugins de interfaz de **DeepSeek Harness**; se extraen de una instalación local solo para
  verificar la cobertura, la paridad de claves y los marcadores.
- **Adaptación al español de Chile y herramientas** (`i18n/es-cl/`, `tools/`): este
  repositorio, MIT.

## Aviso legal

DeepSeek Harness es una aplicación de DeepSeek; este repositorio **no contiene código de la
aplicación**. El catálogo inglés (`i18n/catalog.json`) se extrae de una instalación local
únicamente para poder verificar la cobertura, la paridad de claves y los marcadores. La
adaptación al español de Chile es una **obra derivada** de la traducción castellana de
[Oskarosan/dsh-locale-es](https://github.com/Oskarosan/dsh-locale-es) (MIT), que se conserva
como `i18n/reference/es.json` justamente para poder auditar ese delta. Los detalles y las
marcas están en [NOTICE.md](NOTICE.md). La licencia MIT cubre el contenido propio de este
repositorio: la adaptación, las herramientas y la documentación.

---

## English

Chilean Spanish (`es-CL`) language pack for the **DeepSeek Harness** (DSH) web interface:
**2,603 of 2,603 keys (100 %) across 57 namespaces**, shipped as a client plugin — the
application's `app.asar` is never patched, and untranslated keys fall back to English
automatically. **284 of the 2,603 strings (10.9 %) differ from the Castilian base
translation**; every one of them is listed, with its English source and its reference, in
`docs/revision-es-cl.md` (and the matching `.csv`).

This fork has no public remote of its own; install it from a local checkout by adding
`dsh-locale-es-cl` to `dependencies` and to `dsh.profile.bundles` in your DSH profile's
`package.json`, then run `pnpm install` in the profile folder and pick **Español (Chile)** in
*Settings → General → Language*. See [Cómo funciona](#cómo-funciona) for the plugin protocol,
and [CONTRIBUTING.md](CONTRIBUTING.md) to send translation fixes (keep placeholders such as
`{count}` intact). Licensed under MIT; the Chilean adaptation is a derived work of
[Oskarosan/dsh-locale-es](https://github.com/Oskarosan/dsh-locale-es) and the `en`/`zh`
dictionaries come from DSH itself — see [NOTICE.md](NOTICE.md).
