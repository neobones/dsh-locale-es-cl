## Qué cambia

<!-- Una o dos frases: qué textos tocas y por qué. Si es una cuestión de criterio y no una
     errata, explica el motivo. -->

## Comprobaciones

- [ ] Los marcadores `{count}`, `{label}`, `{toolName}`… siguen intactos (los mismos que en
      inglés, ni uno más ni uno menos; se pueden mover de sitio dentro de la frase).
- [ ] He reconstruido el bundle: `node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl .`
- [ ] `node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl . --check` sale con código 0.
- [ ] `node tools/verify-pack.cjs lib/client.js` dice `RESULTADO: OK`.
- [ ] El commit incluye `lib/client.js` regenerado (la integración continua lo exige).

<!-- No hace falta marcar nada más: la integración continua repite estas comprobaciones y
     falla si el bundle versionado no coincide con las traducciones. -->
