# Cómo contribuir

Gracias por querer mejorar el pack de español de Chile de DeepSeek Harness. Todo lo que hace
falta cabe en esta página.

## Corregir o mejorar una traducción

1. Localiza el namespace en `i18n/es-cl/`. Cada fichero se llama como el namespace que
   contiene: `chat.json`, `settings.plugins.json`, `approval.json`…
2. Compara con el texto de origen en `i18n/catalog.json`
   (`namespaces.<namespace>.locales.en.<clave>`). Si el cambio es de criterio y no una
   errata, explica el motivo en la descripción del *pull request*.
3. **No toques nunca los marcadores.** `{count}`, `{label}`, `{toolName}`, `{value}`… deben
   aparecer exactamente las mismas veces que en inglés, ni uno más ni uno menos. Se pueden
   mover de sitio dentro de la frase, porque en español de Chile el orden cambia.
4. Mantén el tono y el registro del resto del pack:
   - Trato de «tú» en los avisos al usuario («Escribe un mensaje…»).
   - Imperativo para botones y acciones («Guardar», «Reintentar», «Copiar ruta»).
   - Sin puntos suspensivos tipográficos sueltos ni espacios antes de `:`, `?` ni `!`.
   - Se traduce el texto, **no** los identificadores, las claves del catálogo ni los nombres
     de fichero: eso va siempre en inglés.
5. Comprueba antes de enviar:

```powershell
node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl . --check
node tools/audit-es.cjs i18n/catalog.json i18n/es-cl
node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl .
node tools/verify-pack.cjs lib/client.js
```

El tercer comando **regenera `lib/client.js`**: ese fichero se versiona, así que el envío
debe incluir el bundle reconstruido. La integración continua comprueba justamente eso
(`git diff --exit-code`); si te olvidas, el *pull request* fallará con un mensaje claro.

## Añadir claves nuevas

Cuando DSH añade textos, el procedimiento del README los deja como «sin traducir» y la
interfaz los muestra en inglés. Al traducirlos, añádelos al fichero del namespace que
corresponda respetando el nombre exacto de la clave del catálogo.

## Añadir otro idioma

No hace falta tocar este repositorio: haz un *fork*, cambia `PKG_NAME`, `LANG_ID` y
`LANG_LABEL` en `tools/build-locale-pack.cjs` (y el `- id:` de la fila de `cordis.patch.yml`
que genera), y traduce `i18n/es-cl/` a la carpeta del idioma nuevo. La cadena de herramientas
completa se reutiliza sin cambios.

## Estilo de los envíos

- Un *pull request* por tema (una tanda de traducciones, una herramienta, una corrección).
- Mensajes de confirmación en imperativo y en español: `Corrige el plural de chat.message`.
- Nada de ficheros generados a mano: `lib/` siempre sale de `tools/build-locale-pack.cjs`.

## Código

Las herramientas son Node sin dependencias (`node tools/<script>.cjs <args>`), comentadas en
español y con los identificadores en inglés. Si añades una, inclúyela también en la tabla
de estructura del README.
