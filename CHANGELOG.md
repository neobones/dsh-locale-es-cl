# Historial de cambios

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el proyecto se
acoge a [Versionado semántico](https://semver.org/lang/es/): la versión mayor cambia cuando
cambia el contrato con el Loader de DSH, la menor al añadir idioma o cobertura, y la de
parche al corregir traducciones.

## [Sin publicar]

### Cambiado

- **Identidad propia del pack**: pasa de heredar la castellana (`dsh-locale-es`, `es`) a la
  suya (`dsh-locale-es-cl`, idioma `es-CL`, etiqueta «Español (Chile)», respaldo `en`). El
  bundle declara `{ id: 'es-CL', label: 'Español (Chile)', fallback: 'en' }` y se carga bajo la
  fila `locale-es-cl` del Loader.
- Las traducciones se mueven de `i18n/es/` a `i18n/es-cl/` (57 ficheros).
- **Pasada mecánica de terminología** sobre los 57 diccionarios, dirigida por
  `i18n/terminology.json` y ejecutada por `tools/apply-terminology.cjs`: léxico y fraseología
  chilenos (138 cadenas), más una lista de términos prohibidos que la puerta `terms` comprueba.
  La tabla se cierra con los participios de «agregar» y con las traducciones prohibidas de los
  términos que deben quedar en inglés (`llamada a herramienta`, `llamadas a herramienta`,
  `diferencias de código`).
- **Ocho lotes editoriales** por namespace reescriben la interfaz a español de Chile: 284 de
  las 2.603 cadenas (10,9 %) difieren ya de la referencia castellana, y los quince términos que
  la política mantiene en inglés siguen ahí en todo el pack (`protegidos: 0`).
- **Cierre de coherencia entre lotes** (`tools/check-coherence.cjs`): una sola forma por
  término y por concepto — unidades de tiempo con espacio, `log de sesión`, «Restablecer al
  valor predeterminado», «los tool calls», «Procesando el documento…», «Intenta de nuevo»,
  «falla» con su artículo correcto, «Cada día»/«Cada semana» y el participio «agregada»—.
- `locale/es.json` y el nuevo `locale/es-CL.json` llevan los metadatos de la tarjeta en
  español de Chile; `locale/en.json` los lleva en inglés.
- Los comandos de la documentación, la integración continua y las plantillas de incidencias
  apuntan a `i18n/es-cl`.
- `tools/verify-pack.cjs` comprueba la identidad nueva (`dsh-locale-es-cl` / `es-CL`) en lugar
  de la castellana.
- **Icono e identidad coherentes**: `icon.svg` pasa a la bandera de Chile (antes la de España
  con el glifo `ES`) y su título accesible (`aria-label` y `<title>`) queda en «Pack de idioma
  (es-CL)».

### Añadido

- **Hoja de revisión del delta** en `docs/revision-es-cl.md` (agrupada por namespace, con
  inglés, referencia y `es-CL`) y `docs/revision-es-cl.csv` (284 filas, una por cadena
  adaptada), generadas por `tools/delta-report.cjs`.
- **Atribución de la obra derivada** en `NOTICE.md`: la adaptación chilena es una **obra
  derivada** de [Oskarosan/dsh-locale-es](https://github.com/Oskarosan/dsh-locale-es) (MIT),
  con el delta auditable contra `i18n/reference/es.json`; se retira la URL de incidencias de
  terceros, porque este fork no tiene tracker público.
- Scripts `terms` y `delta` en `package.json`, que ejecutan las herramientas de terminología y
  el informe de delta.

## [1.0.1] — 2026-10-10

### Añadido

- **Metadatos de tarjeta** para el gestor de plugins de DSH: `locale/en.json` y `locale/es.json`
  con `meta.title` y `meta.description`, más un icono `icon.svg`.
- `exports["./locale/*.json"]` en el `package.json` —sin esa entrada el resolutor ESM de DSH no
  encuentra los ficheros de idioma y la tarjeta sale sin título ni descripción— y el campo
  `icon` de nivel superior, que es donde DSH lo busca.
- `tools/check-plugin-meta.cjs`: replica las comprobaciones que hace DSH sobre el `package.json`
  (bundle, mitad de cliente, mapa de exports, diccionarios e icono) y corre en la integración
  continua.
- Documentación de la instalación por el gestor de plugins
  (`dsh plugin --profile <perfil> add …`) y de qué busca DSH para listar un plugin.

## [1.0.0] — 2026-10-10

Primera publicación.

### Añadido

- Traducción completa al castellano de la interfaz: **2.603 claves** en **57 namespaces**
  (cobertura 100 % sobre el catálogo de la app de escritorio con `app.asar` de 121 MB).
- Pack instalable como plugin de cliente, con respaldo automático a inglés para cualquier
  clave ausente.
- Cadena de herramientas sin dependencias: `extract-app.cjs`, `extract-locale.cjs`,
  `split-batches.cjs`, `split-by-namespace.cjs`, `build-locale-pack.cjs`, `audit-es.cjs` y
  `verify-pack.cjs`.
- Comprobación estricta de cobertura, marcadores y claves repetidas con código de salida
  utilizable en integración continua.
- Integración continua que reconstruye el bundle y falla si el fichero versionado no
  coincide con las fuentes de traducción.
