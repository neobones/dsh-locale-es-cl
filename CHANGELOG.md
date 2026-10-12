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
- **Ocho lotes editoriales** por namespace reescriben la interfaz a español de Chile: 285 de
  las 2.603 cadenas (10,9 %) difieren ya de la referencia castellana, y los términos que la
  política mantiene en inglés siguen ahí en todo el pack (`protegidos: 0`). La política nombra
  **quince** términos, pero de esos solo **once** tienen claves que los ejerzan en el catálogo
  —`plugin` (95 claves), `api` (25), `tool call` (23), `token` (14), `json` (14), `prompt` (12),
  `log` (6), `shell` (5), `chat` (5), `diff` (4) y `markdown` (4)—: **`commit`, `push`,
  `pull request` y `deploy` no aparecen ni una vez** en el catálogo de la app, así que
  `protegidos 0` mide las once primeras y no quince.
- **Cierre de coherencia entre lotes**: el repaso de que un mismo término tuviera una sola forma
  ya no es solo una pasada a mano. `tools/check-coherence.cjs` incorpora un **barrido de
  duplicados sistemático** sobre `i18n/catalog.json` + `i18n/es-cl/` con dos pasadas: (a) un
  mismo origen inglés literal en más de una clave con más de una forma en español, y (b) una
  misma forma española alcanzada desde orígenes ingleses distintos. Sobre el pack **antes** de
  las correcciones de esta versión informa de 39 grupos en la pasada (a) y 24 cadenas en la (b),
  y **no decide nada**: presenta los grupos para que los lea la revisión, porque el género del
  sujeto puede justificar la variación. Tras corregir los tres puntos que el barrido destapó, la
  pasada (a) baja a 38 grupos (la pareja «API key is invalid» queda unificada y deja de ser
  divergencia). Es la versión automática —no la sustitución— del repaso manual, que sigue cubriendo
  el caso en que el inglés distingue dos textos por una elección léxica que ningún emparejamiento
  automático puede demostrar (p. ej. «…click to retry» frente a «…try again»).
  **Medido, no sostenido**: la pasada manual unificó —entre otros— las unidades de tiempo con
  espacio de los namespaces `workspace` y `reference` (`{n} min`, `{n} h`, `{n} d`; los formatos
  compactos de `job`, `chat.duration` y `subagent.duration` se dejan como están), `log de
  sesión`, «Restablecer al valor predeterminado», «los tool calls», «Procesando el documento…»,
  «Intenta de nuevo», «falla» con su artículo correcto, «Cada día»/«Cada semana», «Todas las
  semanas» —esta última en `conversation`, donde el inglés de origen es otro (`Weekly on
  {days}…`, no el `Weekly on {weekdays}…` de los namespaces del programador), así que no es una
  segunda forma del mismo término— y el participio «agregada». El barrido sistemático encontró
  además tres divergencias que la pasada a mano no había cerrado —«achícala» frente a
  «redúcela», «para intentarlo de nuevo» frente a la forma mayoritaria «intenta de nuevo» y el
  artículo de «API key is invalid»— y las tres quedan unificadas en esta versión; las
  divergencias que **no** se tocan son las que el género del sujeto exige (`Fallido` para un
  turno, `Fallida` para una tarea) y así se documentan.
- **`tools/delta-report.cjs --strict-protegidos`**: la puerta del cero final deja de depender de
  leer la consola. Sin la bandera el total de `protegidos` se informa pero no afecta al código de
  salida (lo que necesitan los lotes intermedios); con ella, un total mayor que cero sale con
  código 1. Va cableada en `package.json` (`npm run delta:strict`) y en la integración continua.
- **Argumentos validados en `tools/apply-terminology.cjs`**: es el único script de la cadena que
  escribe en las fuentes, y aceptaba cualquier cosa que no fuera el literal `--check` cayendo en
  modo de escritura. Ahora un flag desconocido —una errata como `--chek`— aborta con la línea de
  uso y código 2 antes de tocar un solo fichero.
- **`tools/audit-es.cjs` sale con código 1 por cualquier problema**, no solo por JSON inválido o
  claves ausentes: el `if` final ignoraba `repetidas` y `ficheroDesalineado`, así que la cabecera
  prometía una puerta más ancha de la que el script aplicaba. Ahora coinciden, que es lo que
  exige su promoción a puerta de integración continua.
- **Precisión del matcher de términos protegidos**: `tools/delta-report.cjs` documenta en su
  cabecera que ignora los tokens con `/` o `\`, de modo que un término que solo vive dentro de
  una ruta queda fuera del recuento. Hoy son dos claves (`settings.models.deepSeekBaseUrl` para
  `api`, `shortcuts.desktop-document` para `json`), las dos benignas; `protegidos 0` no debe
  leerse como cobertura total.
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
  inglés, referencia y `es-CL`) y `docs/revision-es-cl.csv` (285 filas, una por cadena
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
