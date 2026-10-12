# Pack `es-CL` (español de Chile) — resumen de la implementación

Fecha: 2026-10-12 · Rama: `es-cl` · Repo: este directorio

## Qué se entregó

Un **plugin de cliente autónomo** que pone la interfaz web de DeepSeek Harness en español
de Chile, sin tocar `app.asar`, `node_modules` ni el código de DeepSeek. Registra su propio
idioma `es-CL` («Español (Chile)») con respaldo a inglés a través del API público de
localización de la app.

| Dato | Valor |
|---|---|
| Namespaces | 57 |
| Claves en el catálogo | 2.603 |
| Cadenas adaptadas al español de Chile | **285** (las demás ya eran español neutro válido y se dejaron) |
| Términos en inglés conservados | 11 de los 15 declarados (los 4 restantes —`commit`, `push`, `pull request`, `deploy`— no tienen ninguna clave en la app 0.2.0-rc.2) |
| Puertas que pasan | cobertura 2.603/2.603 · marcadores 0 · mayúsculas indebidas 0 · términos protegidos perdidos 0 |
| Artefacto | `lib/client.js` reconstruido y verificado faithful a los diccionarios |

## Instalación y uso

```powershell
& "<instalación>\resources\runtime\cli\bin\dsh.cmd" `
    plugin --profile desktop add <ruta-del-pack>
```

Después: recargar la GUI (Ctrl+R) y elegir **Español (Chile)** en *Ajustes → General → Idioma*.
La preferencia se guarda y sobrevive reinicios. Un navegador en `es-CL` (o en `es`) lo activa solo.

## Dónde revisar la traducción

- `docs/revision-es-cl.md` — hoja legible, agrupada por namespace, con inglés / referencia / `es-CL`.
- `docs/revision-es-cl.csv` — la misma hoja en CSV (con BOM UTF-8, para Excel).

## Mantenimiento

Cuando DSH agregue cadenas nuevas se ven en inglés hasta traducirlas. El ciclo es:

```powershell
node tools/extract-app.cjs "C:\...\resources\app.asar" _referencia-dsh
node tools/extract-locale.cjs _referencia-dsh/dsh/node_modules/@deepseek-ai i18n/catalog.json
node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl . --check   # lista lo que falta
# traducir lo que falte en i18n/es-cl/<namespace>.json
node tools/build-locale-pack.cjs i18n/catalog.json i18n/es-cl .           # reconstruir lib/
```

## Decisiones que tomé durante la implementación

Cada una con lo que costaría si me equivoqué. Las que más conviene revisar están marcadas.

1. **Rama `es-cl` en el propio repo, sin worktree aparte** — la ruta de instalación debía ser estable. Coste: un merge extra.
2. **Sin selección de modelo en los subagentes** — este harness no la expone; compensé con briefs ajustados y revisión por tarea. Coste: más tiempo, no calidad.
3. **Scripts `terms`/`delta` declarados antes que sus herramientas** — son declarativos. Coste: fallaban hasta que llegó la tarea 3.
4. **El catálogo manda sobre las cifras de la prosa** — `conversation` tiene 369 claves, no 367. Coste: un número obsoleto en un documento.
5. **`0 < cambiadas <= sustituciones aplicadas`** en vez de igualdad — una clave tocada por dos reglas cuenta una vez en el delta. Coste: una cifra mal enunciada.
6. **El README reescrito se queda en la tarea 2** y la 12 pasa a revisión de delta. Coste: reedición innecesaria.
7. **Un hallazgo del revisor era falso positivo** (citaba una sección que sí existía en mi dispatch). Sin acción.
8. **El `upper()` del plan estaba invertido** (dejó 73 cadenas en minúscula): se corrigió y se rehizo el barrido. Coste: repetir un barrido.
9. **Se eliminó la regla `fallo`→`falla`** — un cambio de género sin contexto no es seguro. Coste: unas cadenas conservan «fallo» hasta su lote.
10. **Se añadió `e introduce`→`y escribe`** para no romper la elisión. Coste: una cadena con `e` incorrecta.
11. **Tres *minors* de la tarea 3 fuera del bucle**, uno resuelto en el lote de `pluginManager`. Coste: inconsistencia temporal.
12. ⚠️ **«El lote cubre todas las claves» = se revisan todas, se cambian solo las que lo necesitan.** Por eso la tarea 4 cambió 15 de 369 valores y no 369. **Si esperabas una reescritura palabra por palabra de todo el texto, esto se aparta de lo que pediste.**
13. ⚠️ **La lista de términos que se quedan en inglés es vinculante**, incluidos `diff` y `tool call`. Si prefieres «diferencias» y «llamada a herramienta» en español, hay que revertirlo en varios namespaces a la vez.
14. **La regla del enclítico estaba mal formulada**: el enclítico es correcto y se conserva; lo que se cambia es el verbo peninsular. Coste: dejar enclíticos válidos o borrarlos por seguir una regla mal escrita.
15. **La política de términos se cierra como puerta final** y no por lote (los namespaces sin adaptar la habrían hecho fallar).
16. **El gate de términos protegidos pasó a ser por clave** (columna por namespace, salida inalterada) porque la comprobación por frases no cazaba «Diferencias» a secas.
17. **Matcher con límites de palabra y plural opcional** — «Tool calls» cuenta, «Subtool calls» no.
18. ⚠️ **`log` cuenta como sustantivo y se exige conservarlo** (los compuestos se renderizan «log de sesión»); solo se excluye el verbo «log in/out». Si prefieres «registro de sesión», hay que sacar `log` de la lista.
19. **Matcher del perfecto compuesto con flag `i` e irregulares cortos** («ha ido mal» → «salió mal»). Coste: recuento bajo.
20. **Una frontera de lote no excusa un fallo visible**: el `time.locale` = `"en"` (meses en inglés en la interfaz) se corrigió en los dos ficheros donde estaba.
21. ⚠️ **La regla 1 no se aplica a estados**: se conserva el perfecto ante un estado resultante con consecuencia en presente («Tu borrador ha cambiado. La transcripción se conserva…»). Coste: dos perfectos legítimos que un barrido ciego podría «corregir» mal.
22. **`renombrar` no es peninsular**: se revirtió «Cambiar el nombre» a «Renombrar» (una etiqueta de menú no debe crecer sin ganancia).
23. **El gate de coherencia no se reconstruyó como detector general** de dos traducciones: se corrigió el par real y se ajustó la documentación a lo que el gate comprueba de verdad. Coste: dos formas distintas del mismo término podrían pasar sin que una puerta las vea.
24. **La instalación se gateó contigo** por ser un efecto fuera del repo; elegiste que la ejecutara yo desde la sesión.
25. **Se conserva el espacio de trabajo de auditoría** (`.superpowers/sdd/…`, ignorado por git) en lugar de borrarlo: contiene el ledger con el veredicto de cada tarea y las 106 observaciones de los revisores, y es el respaldo de todo lo afirmado aquí.
26. **No se fusionó a `main`** — no me lo pediste y es un merge. Cuando quieras: `git checkout main && git merge es-cl`.

## Créditos y licencia

Traducción castellana de base: [Oskarosan/dsh-locale-es](https://github.com/Oskarosan/dsh-locale-es) (MIT).
Diccionarios originales `en`/`zh`: DeepSeek. Los términos «DeepSeek» y «DeepSeek Harness» son
marcas de sus titulares; este pack es no oficial. Detalles en `NOTICE.md`.
