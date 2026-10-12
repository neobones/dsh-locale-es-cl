# Aviso de origen y marcas

## Obra derivada

- **Adaptación al español de Chile** (`i18n/es-cl/*.json`) y la pasada de terminología
  (`i18n/terminology.json`): trabajo original de este repositorio, MIT.
- **Traducción castellana de referencia** (`i18n/reference/es.json`): derivada de
  [Oskarosan/dsh-locale-es](https://github.com/Oskarosan/dsh-locale-es) (MIT), usada como
  referencia de partida y conservada para poder auditar el delta.
- El **catálogo inglés** (`i18n/catalog.json`) sigue siendo de sus autores originales y se
  incluye solo para verificar cobertura, paridad y marcadores.

## Qué contiene este repositorio

- **Traducciones al español de Chile** (`i18n/es-cl/*.json`): trabajo original, bajo licencia MIT.
- **Herramientas** (`tools/*.cjs`): código original, sin dependencias externas, bajo licencia
  MIT.
- **Bundle generado** (`lib/client.js`, `lib/index.js`, `cordis.patch.yml`): salida
  reproducible de las herramientas anteriores a partir de los dos puntos de arriba.
- **Catálogo de referencia** (`i18n/catalog.json`): **no es obra de este repositorio**. Son
  las claves y los textos de origen en inglés que los plugins de interfaz de DeepSeek Harness
  registran en tiempo de ejecución.

## De dónde sale el catálogo

`i18n/catalog.json` se extrae con `tools/extract-locale.cjs` de una **instalación local** de
la aplicación de escritorio: el script ejecuta las fábricas de los plugins de cliente con un
`require` y un `ctx` simulados y anota las llamadas a `ctx.locale.register(...)`. Se incluye
aquí con una única finalidad: que cualquiera pueda **verificar la cobertura, la paridad de
claves y los marcadores** de la traducción sin necesidad de tener la aplicación instalada, y
que la integración continua pueda hacerlo en cada envío.

El repositorio **no redistribuye código de DeepSeek Harness**, ni ficheros de la aplicación,
ni su `app.asar`: el pack se limita a registrarse como plugin en el Loader, y solo contiene
las cadenas de texto necesarias para traducir la interfaz.

## Marcas

«DeepSeek», «DeepSeek Harness» y los logotipos asociados son marcas de sus titulares. Este
proyecto es **no oficial** y no está afiliado ni respaldado por DeepSeek. El nombre del
paquete describe únicamente su compatibilidad con esa aplicación.

## Si eres titular de derechos

Este fork no tiene remoto público propio. Mientras siga así, las correcciones, retiradas o
reclamaciones se atienden a través del repositorio del que deriva esta obra:
<https://github.com/Oskarosan/dsh-locale-es/issues>. Si más adelante se publica un remoto
propio, esta sección se actualizará con su URL de incidencias.
