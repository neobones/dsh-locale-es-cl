# Aviso de origen y marcas

## Obra derivada

- **Adaptación al español de Chile** (`i18n/es-cl/*.json`): **obra derivada** de la traducción
  castellana [Oskarosan/dsh-locale-es](https://github.com/Oskarosan/dsh-locale-es) (MIT). 2.318
  de sus 2.603 cadenas siguen siendo idénticas a esa base y las 285 restantes son reescrituras
  chilenas; el delta completo, cadena por cadena y con su inglés de origen, está en
  `docs/revision-es-cl.md` y `docs/revision-es-cl.csv`, generados contra
  `i18n/reference/es.json`.
- **Tabla de terminología** (`i18n/terminology.json`): trabajo propio de este repositorio, MIT.
- **Herramientas** (`tools/*.cjs`): la cadena de herramientas viene del pack base (MIT) y este
  repositorio la amplía con `apply-terminology.cjs`, `delta-report.cjs` y `check-coherence.cjs`.
  Sin dependencias externas, MIT.
- **Traducción castellana de referencia** (`i18n/reference/es.json`): de
  [Oskarosan/dsh-locale-es](https://github.com/Oskarosan/dsh-locale-es) (MIT), conservada sin
  cambios para poder auditar el delta.
- El **catálogo inglés** (`i18n/catalog.json`) sigue siendo de sus autores originales y se
  incluye solo para verificar cobertura, paridad y marcadores.

## Qué contiene este repositorio

- **Traducciones al español de Chile** (`i18n/es-cl/*.json`): adaptación derivada del pack
  castellano, bajo licencia MIT (ver arriba).
- **Tabla de terminología** (`i18n/terminology.json`) y **herramientas** (`tools/*.cjs`): las
  herramientas vienen del pack base y se amplían aquí; sin dependencias externas, bajo licencia
  MIT.
- **Bundle generado** (`lib/client.js`, `lib/index.js`, `cordis.patch.yml`): salida
  reproducible de las herramientas anteriores a partir de los puntos de arriba.
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

Los diccionarios `en` y `zh` que forman ese catálogo son de DeepSeek Harness: es la propia
aplicación la que los registra en tiempo de ejecución.

El repositorio **no redistribuye código de DeepSeek Harness**, ni ficheros de la aplicación,
ni su `app.asar`: el pack se limita a registrarse como plugin en el Loader, y solo contiene
las cadenas de texto necesarias para traducir la interfaz.

## Marcas

«DeepSeek», «DeepSeek Harness» y los logotipos asociados son marcas de sus titulares. Este
proyecto es **no oficial** y no está afiliado ni respaldado por DeepSeek. El nombre del
paquete describe únicamente su compatibilidad con esa aplicación.

## Si eres titular de derechos

Este fork **no tiene remoto público ni tracker propio**: no hay una URL de incidencias a la que
dirigir reclamaciones, y no corresponde usar la del repositorio del que deriva esta obra. Si
necesitas una corrección, una atribución distinta o la retirada de algún contenido, plantéalo a
quien te haya entregado esta copia o por el canal en que la obtuviste.
