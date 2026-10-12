# Pack de idioma `es-CL` (español de Chile) para DeepSeek Harness — diseño

- **Fecha:** 2026-10-12
- **Estado:** aprobado por el usuario (diseño), pendiente de plan de implementación
- **Repo del proyecto:** `default-workspace/dsh-locale-es-cl/`
- **Base:** [Oskarosan/dsh-locale-es](https://github.com/Oskarosan/dsh-locale-es) @ `caadeea` (MIT)
- **DSH de referencia:** app de escritorio `0.2.0-rc.2` instalada en esta máquina
  (`app.asar` de 121.348.951 bytes, commit de build `04f392c9`)

## 1. Objetivo y criterios de éxito

Entregar la interfaz web de DSH en **español de Chile**: neutro latinoamericano con
sabor chileno, tuteo, sin voseo ni `vosotros`, tecnicismos en inglés. El pack se
instala como plugin de cliente, sin modificar `app.asar`, `node_modules` ni el código
de DeepSeek.

Criterios de éxito, todos verificables:

1. El selector *Ajustes → General → Idioma* ofrece **«Español (Chile)»** y al elegirlo
   la interfaz completa cambia de idioma.
2. **Cobertura 100 %**: todas las claves que el catálogo extraído de **tu** `app.asar`
   declare tienen traducción chilena; `--check` termina en `OK`. El pack base audita
   ese mismo build en **2.603 claves / 57 namespaces**, cifra que la extracción del
   catálogo (paso 1 de la implementación) confirma o corrige; el criterio es el
   catálogo, no la cifra.
3. **Cero marcadores rotos**: `{count}`, `{label}`, `{toolName}`… idénticos al origen
   inglés en cada clave.
4. Un navegador en `es-CL` abre en español de Chile sin intervención; uno en `es`
   también (coincidencia por subetiqueta primaria).
5. Las claves que una futura versión de DSH agregue caen a inglés, nunca muestran el
   nombre crudo de la clave.
6. Existe una **hoja de revisión** con solo las cadenas que cambiaron respecto a la
   base, agrupada por namespace.

## 2. Alcance

**Dentro:** adaptación y reescritura de estilo de las 2.603 cadenas del cliente web;
identidad del paquete; metadatos de la tarjeta del plugin; cadena de verificación;
instalación en el perfil `desktop`.

**Fuera:** cadenas de la mitad host (descripciones de herramientas, salida de CLI,
chrome de la ventana), nombres de herramientas (`Bash`, `Read`…), identificadores de
presets de permisos, metadatos de otros plugins (`ctx.locale.resolveText`), salida del
modelo, rutas de archivos. Publicación en npm. Traducción de la documentación del
repositorio base.

## 3. Arquitectura y empaquetado

Un **único plugin de cliente autónomo**, con id de idioma propio `es-CL` y respaldo
directo a inglés:

```js
const LANGUAGE = { id: 'es-CL', label: 'Español (Chile)', fallback: 'en' }

function apply(ctx) {
  ctx.effect(() => ctx.locale.addLanguage(LANGUAGE), 'locale-es-cl: idioma')
  for (const [ns, dict] of Object.entries(DICTIONARIES)) {
    ctx.effect(() => ctx.locale.register(ns, 'es-CL', dict), 'locale-es-cl: ' + ns)
  }
}
```

Decisiones y por qué:

- **Id propio `es-CL`** en vez de reemplazar `es`: es un identificador BCP 47 válido
  para el registro (`/^[A-Za-z]{2,8}(?:-[A-Za-z0-9]{1,8})*$/`), permite conservar el
  pack genérico si algún día se instala, y hace que la detección del navegador sea
  exacta.
- **`fallback: 'en'`**, no `'es'`: el pack es autónomo y completo; no depende de otro
  plugin ni de su orden de carga (`addLanguage` exige que el respaldo ya esté
  registrado, así que encadenar a `es` introduciría una dependencia de activación).
- **Sin parchear el runtime**: se usa solo el API público (`addLanguage`, `register`).
  `register` rechaza un par namespace+idioma repetido; `es-CL` no existe en ningún
  namespace, así que no hay conflicto con `zh`/`en`.
- **Cada registro como efecto propio**, de modo que desinstalar o desactivar el plugin
  devuelve el runtime a su estado original.

Detección verificada en `dsh-client-locale@0.2.0-rc.2` (`detectBrowserLocale`): compara
etiqueta completa y luego subetiqueta primaria, por lo que `es-CL` gana exacto y `es`
coincide por subetiqueta. La preferencia explícita del usuario siempre manda y se
persiste en `locale.preference` del documento de ajustes del Host.

## 4. Componentes y flujo de datos

```
app.asar (0.2.0-rc.2)
    │  tools/extract-app.cjs        (extrae con verificación SHA-256)
    ▼
_referencia-dsh/…/dsh-client-*/lib/client.js
    │  tools/extract-locale.cjs     (lee los diccionarios en/zh de cada plugin de UI)
    ▼
i18n/catalog.json                   ← corpus inglés, 57 namespaces, 2.603 claves
    │
    │  i18n/reference/es.json       ← traducción base de Oskarosan (solo lectura)
    │  + tabla de terminología es-CL + reescritura de estilo
    ▼
i18n/es-cl/<namespace>.json         ← fuente de verdad (57 archivos)
    │  tools/build-locale-pack.cjs
    ▼
lib/client.js + lib/index.js + cordis.patch.yml + package.json
    │  dsh plugin --profile desktop add <ruta>
    ▼
perfil desktop → GUI en español de Chile
```

**Ficheros del repositorio y su rol:**

| Ruta | Rol |
|---|---|
| `i18n/catalog.json` | Corpus inglés extraído de la app de referencia; entradas y paridad de claves. |
| `i18n/reference/es.json` | Traducción base (Oskarosan). Nunca se edita: es el origen del delta. |
| `i18n/es-cl/*.json` | Traducción chilena, un fichero por namespace. Única fuente de verdad. |
| `i18n/terminology.json` | Tabla revisada de términos y reemplazos de frase (nuevo). |
| `tools/build-locale-pack.cjs` | Genera bundle, mitad host, parche y `package.json`; `--check` es la puerta. |
| `tools/extract-app.cjs`, `tools/extract-locale.cjs` | Regeneran el catálogo desde un `app.asar`. |
| `tools/audit-es.cjs`, `tools/check-portable.cjs`, `tools/check-plugin-meta.cjs`, `tools/verify-pack.cjs` | Auditoría de claves, portabilidad, metadatos y carga real del bundle. |
| `lib/`, `cordis.patch.yml`, `package.json` | **Generados**; no se editan a mano. |
| `locale/en.json`, `locale/es-CL.json` | Metadatos de la tarjeta del plugin (título y descripción). |
| `docs/revision-es-cl.md`, `docs/revision-es-cl.csv` | Hoja de revisión del delta (solo cadenas cambiadas). |

**Puntos de identidad a cambiar respecto a la base** (todos localizados):

- `tools/build-locale-pack.cjs`: `PKG_NAME = 'dsh-locale-es-cl'`, `LANG_ID = 'es-CL'`,
  `LANG_LABEL = 'Español (Chile)'`, id de fila del parche `locale-es-cl`, etiquetas de
  efecto `locale-es-cl: …`, descripción y comentarios del generador.
- `package.json`: `name`, `description`, `keywords`, `repository`/`homepage`/`bugs`
  (destino local, sin publicar), `scripts` (`build`/`check`/`audit` con `i18n/es-cl`),
  `dsh.client` sin cambios (`inject: ['@deepseek-ai/dsh-client-locale']`, `platform: 'web'`).
- `locale/es-CL.json` (nuevo) y `locale/en.json` (actualizado); se emite además
  `locale/es.json` con el mismo contenido que `es-CL` por si el resolutor de metadatos
  indexa por subetiqueta primaria.
- `icon.svg` se conserva; `LICENSE` y `NOTICE.md` se conservan y se amplía el aviso de
  obra derivada (ver §10).

## 5. Política de traducción

### 5.1 Registro

Tuteo chileno; imperativos en tú (*intenta, verifica, haz clic, elige, abre, revisa*);
cero voseo y cero `vosotros`; voz activa y concisa; nada de `por favor` salvo en
errores; etiquetas cortas donde el ancho es fijo (botones, chips, filas del sidebar).

### 5.2 Terminología

**Se quedan en inglés:** `plugin`, `prompt`, `token`, `commit`, `push`, `pull request`,
`diff`, `log`, `shell`, `tool call`, `chat`, `API`, `JSON`, `Markdown`, `deploy`.

**Se traducen:** `branch` → `rama`, `model` → `modelo`, `settings` → `Ajustes`,
`workspace` → `espacio de trabajo` (salvo cuando es un identificador técnico: rutas,
nombres de campo, en cuyo caso queda `workspace`).

**España → Chile:** `ordenador` → `computador` · `fichero` → `archivo` ·
`pulsar` → `hacer clic` / `presionar` · `ratón` → `mouse` · `móvil` → `celular` ·
`comprobar` → `verificar` / `revisar` · `reajustar` → `volver a ajustar` ·
`correo electrónico` → `correo`.

**Neutros que se conservan:** `pestaña`, `descargar`, `subir`, `pantalla`, `instalar`,
`predeterminado`, `guardar`, `cancelar`, `enviar`.

`i18n/terminology.json` registra cada decisión como reemplazo de frase, para que el
build pueda aplicarla de forma reproducible y auditable.

### 5.3 Invariantes

- Marcadores `{...}` idénticos al inglés; `--check` falla si se pierde o se inventa uno.
- No se traducen tokens de comando (`/compact`, `/plan`, `/export`), nombres de
  herramientas, rutas de archivos ni identificadores técnicos.
- Sin plurales ni formatos de fecha/número: el registro de locale no los ofrece.
- Las claves que no existan en el catálogo se descartan (el build las reporta).

## 6. Proceso por lotes

Se traduce namespace por namespace, del mayor al menor, con el inglés y la base `es`
delante como referencia:

| Orden | Namespace | Claves |
|---|---|---|
| 1 | `conversation` | 367 |
| 2 | `trajectory` | 192 |
| 3 | `chat` | 186 |
| 4 | `schedule.catalog` | 133 |
| 5 | `workspace` | 112 |
| 6 | `deliverables` | 60 |
| 7 | `cordis` | 51 |
| 8 | `subagent` | 39 |
| 9 | `settings`, `sidebarRight` | 34 + 34 |
| 10 | `question`, `command`, `model`, `feedback`, … | resto hasta 57 |

Las cifras por namespace son las del pack base y se recalculan desde el catálogo
extraído antes de repartir el trabajo.

Cada lote: traducir → comprobar marcadores (`--check`) → auditar claves (`audit-es.cjs`)
→ registrar el delta en la hoja de revisión. Los namespaces independientes pueden
repartirse entre subagentes; una pasada final revisa coherencia de terminología entre
lotes (que el mismo término inglés no se traduzca de dos formas).

Condición de parada: `--check` en `OK` con 2.603/2.603 y `verify-pack` sin problemas.

## 7. Puertas de verificación

Se ejecutan todas antes de instalar; ninguna se sustituye por inspección visual:

1. `node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl . --check` → cobertura
   y marcadores (salida 0).
2. `node tools/audit-es.cjs i18n/catalog.json i18n/es-cl` → claves ausentes, repetidas
   o desalineadas.
3. `node tools/check-portable.cjs i18n` → sin rutas de la máquina ni secretos.
4. `node tools/check-plugin-meta.cjs .` → lo que DSH exige para listar la tarjeta.
5. `node tools/verify-pack.cjs lib/client.js` → el bundle carga en un cargador simulado
   con el protocolo `window.__ModuleLoader__.load` y expone idioma y diccionarios.
6. Comprobación de paridad contra el `app.asar` real: 57 namespaces, mismo número de
   claves por namespace que el catálogo, `es-CL` en cada diccionario emitido.

## 8. Entrega y revisión

- `docs/revision-es-cl.md`: informe legible con cobertura, decisiones de terminología y
  las cadenas cambiadas agrupadas por namespace.
- `docs/revision-es-cl.csv`: `namespace, clave, inglés, es_referencia, es_cl` con **solo** las
  cadenas cuyo texto difiere de la base. La columna de la base castellana se llama
  `es_referencia` (y la chilena, `es_cl`), que es lo que emite `tools/delta-report.cjs`; el
  fichero lleva BOM UTF-8 para que Excel para Windows no destroce las tildes al abrirlo.
- Revisión acordada: **por muestreo**. El pack se construye e instala, y las correcciones
  que el usuario marque sobre la hoja se aplican como lote de ajuste y se reconstruye.

## 9. Instalación y mantenimiento

```powershell
# desde una terminal, no desde dentro de una sesión de DSH (ver §10)
& "<instalación>\resources\runtime\cli\bin\dsh.cmd" `
    plugin --profile desktop add <ruta-del-pack>
```

Después: recargar la GUI (Ctrl+R) y elegir *Ajustes → General → Idioma → Español (Chile)*.
La preferencia queda guardada en el documento de ajustes y sobrevive reinicios.

**Actualizaciones de DSH:** al subir de versión se re-ejecuta la extracción del catálogo
(`extract-app.cjs` + `extract-locale.cjs`) y `--check` lista lo nuevo por traducir.
Mientras no se traduzca, esas claves se ven en inglés. El pack nunca se rompe.

## 10. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Deriva de sentido al reescribir 2.603 cadenas | La base `es` y el inglés quedan lado a lado en la hoja de revisión; los marcadores y la paridad de claves son puertas automáticas. |
| Inconsistencia de terminología entre lotes | `i18n/terminology.json` como fuente única + pasada final de coherencia. |
| Instalar desde dentro de una sesión de DSH dispone esa sesión y abre una conversación nueva (historial intacto) | El comando se ejecuta desde una terminal aparte; el usuario decide si lo lanzo yo asumiendo el corte. |
| El pack base upstream cambia o desaparece | El pack es autónomo: el catálogo y la traducción quedan dentro del repo. Se conserva `upstream` como remoto para sincronizar correcciones. |
| Atribución de la obra derivada | `LICENSE` y `NOTICE.md` de la base se conservan; el README y el NOTICE nombran a Oskarosan como origen de la traducción castellana y a DeepSeek como dueño de los diccionarios originales `en`/`zh`. |
| `addLanguage` con un id regional no reconocido por una versión futura | El id cumple el patrón del registro; si una versión futura lo rechazara, el plugin falla visiblemente en consola sin corromper nada y se degrada a `es`. |

## 11. Decisiones aprobadas por el usuario

1. **Variante:** neutro latinoamericano con sabor chileno (sin voseo, tuteo, tecnicismos
   en inglés).
2. **Empaquetado:** pack autónomo `es-CL` = traducción base + delta chileno, un solo
   plugin.
3. **Alcance:** chilenizar **y** reescribir el estilo de toda la interfaz.
4. **Revisión:** por muestreo, con hoja de cambios; se instala antes de la revisión fina.
