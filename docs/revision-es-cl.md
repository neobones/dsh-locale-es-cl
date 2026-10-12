# Revisión de la adaptación al español de Chile

Cadenas cuyo texto difiere de la referencia castellana, agrupadas por namespace.
Marcadores `{...}` verificados contra el inglés. Faltantes: 0. Marcadores rotos: 0.

## chat (15 de 186)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `message.stepProcess.prepare.tools` | Preparing tool calls | Preparando llamadas a herramientas | **Preparando tool calls** |
| `message.trigger.explanation` | This notification triggered this response. | Esta notificación ha desencadenado esta respuesta. | **Esta notificación desencadenó esta respuesta.** |
| `settings.transcript.description` | Choose how much detail to show for tool calls | Elige cuánto detalle mostrar en las llamadas a herramientas | **Elige cuánto detalle mostrar en los tool calls** |
| `message.toolAdded` | Tool added: {name} | Herramienta añadida: {name} | **Herramienta agregada: {name}** |
| `message.toolsAdded` | Added: {names} | Añadidas: {names} | **Agregadas: {names}** |
| `message.toolsAddedCount` | {count} added | {count} añadidas | **{count} agregadas** |
| `message.toolsChanged` | {added} added, {removed} removed | {added} añadidas, {removed} eliminadas | **{added} agregadas, {removed} eliminadas** |
| `message.context.instructions.added` | added | añadidas | **agregadas** |
| `message.turnProcess.toolCalls.one` | {count} tool call | {count} llamada a herramienta | **{count} tool call** |
| `message.turnProcess.toolCalls.other` | {count} tool calls | {count} llamadas a herramientas | **{count} tool calls** |
| `message.retry.failure` | Failure reason:  | Motivo del fallo:  | **Motivo de la falla: ** |
| `message.failure.accountSignedOut` | Stopped because you signed out of DeepSeek. | Detenido porque has cerrado sesión en DeepSeek. | **Detenido porque cerraste sesión en DeepSeek.** |
| `message.turnError` | This turn failed | Este turno ha fallado | **Este turno falló** |
| `message.maxTokens.hint` | The reply was cut off; earlier output is preserved in the conversation. Send "continue" to let the model resume. | La respuesta se ha cortado; la salida anterior se conserva en la conversación. Envía «continue» para que el modelo continúe. | **La respuesta se cortó; la salida anterior se conserva en la conversación. Envía «continue» para que el modelo continúe.** |
| `command.failed` | Command failed | El comando ha fallado | **El comando falló** |

## command (2 de 28)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `section.add` | Add | Añadir | **Agregar** |
| `description.export` | Download this Session log as a ZIP archive | Descargar el registro de esta sesión como archivo ZIP | **Descargar el log de sesión como archivo ZIP** |

## conversation (24 de 369)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `input.commands` | Add files or run commands | Añadir archivos o ejecutar comandos | **Agregar archivos o ejecutar comandos** |
| `attachment.dropTitle` | Drag files or images here to add them | Arrastra archivos o imágenes aquí para añadirlos | **Arrastra archivos o imágenes acá para agregarlos** |
| `attachment.dropBlocked` | Files and images cannot be added right now | No se pueden añadir archivos ni imágenes en este momento | **No puedes agregar archivos ni imágenes en este momento** |
| `attachment.directoryDesktopOnly` | Folders can only be added in the desktop app; add individual files in the browser | Las carpetas solo se pueden añadir en la aplicación de escritorio; añade archivos individuales en el navegador | **Las carpetas solo se pueden agregar en la aplicación de escritorio; agrega archivos individuales en el navegador** |
| `attachment.pathUnsupported` | The path contains characters a reference cannot carry; rename it and try again | La ruta contiene caracteres que una referencia no puede transportar; renómbrala e inténtalo de nuevo | **La ruta tiene caracteres que una referencia no puede transportar; cámbiale el nombre e intenta de nuevo** |
| `image.totalTooLarge` | Images exceed {size} in total; remove some and try again | Las imágenes superan {size} en total; elimina algunas e inténtalo de nuevo | **Las imágenes superan {size} en total; elimina algunas e intenta de nuevo** |
| `image.tooManyPixels` | Image resolution is too high; compress it and try again | La resolución de la imagen es demasiado alta; comprímela e inténtalo de nuevo | **La resolución de la imagen es demasiado alta; redúcela e intenta de nuevo** |
| `image.dimensionTooLarge` | Image sides must be at most {size}px; downscale it and try again | Los lados de la imagen deben ser como máximo de {size}px; redúcela e inténtalo de nuevo | **Los lados de la imagen deben ser como máximo de {size}px; hazla más chica e intenta de nuevo** |
| `image.sendFailed` | Sending images failed ({reason}); re-add them and try again | No se pudieron enviar las imágenes ({reason}); vuelve a añadirlas e inténtalo de nuevo | **No se pudieron enviar las imágenes ({reason}); vuelve a agregarlas e intenta de nuevo** |
| `file.notStaged` | The file has not finished uploading; re-add it and try again | El archivo no ha terminado de subirse; vuelve a añadirlo e inténtalo de nuevo | **El archivo todavía no termina de subirse; vuelve a agregarlo e intenta de nuevo** |
| `todo.diff.added` | {count} added | {count} añadidas | **{count} agregadas** |
| `todo.diff.addedItem` | Added | Añadida | **Agregada** |
| `detail.schedule.weekly` | Weekly on {days} at {time} ({zone}) | Semanalmente los {days} a las {time} ({zone}) | **Todas las semanas los {days} a las {time} ({zone})** |
| `detail.ralph.reportedComplete` | Worker reported completion | El trabajador informó de la finalización | **El trabajador informó que terminó** |
| `detail.ralph.reportedBlocker` | Worker reported a blocker | El trabajador informó de un bloqueo | **El trabajador informó un bloqueo** |
| `row.preparing` | Preparing tool call | Preparando la llamada a herramienta | **Preparando tool call** |
| `tool.title.generic` | Tool call | Llamada a herramienta | **Tool call** |
| `diff.collapseAria` | Collapse diff | Contraer las diferencias | **Contraer el diff** |
| `diff.expandAria` | Expand {count} more diff lines | Expandir {count} líneas de diferencias más | **Expandir {count} líneas de diff más** |
| `queue.edit.unsupported` | Contains non-text content; editing is not supported yet | Contiene contenido que no es texto; la edición aún no es compatible | **Tiene contenido que no es texto; todavía no se puede editar** |
| `error.sessionInUse` | This session is already in use, possibly by another running DSH instance (such as dsh web or the desktop app). Quit other running DSH instances and try again. | Esta sesión ya está en uso, posiblemente por otra instancia de DSH en ejecución (como dsh web o la aplicación de escritorio). Cierra las demás instancias de DSH en ejecución e inténtalo de nuevo. | **Esta sesión ya está en uso, posiblemente por otra instancia de DSH en ejecución (como dsh web o la aplicación de escritorio). Cierra las demás instancias de DSH que estén en ejecución e intenta de nuevo.** |
| `queue.editFailed` | Edit failed: this message may have already started sending. | Error de edición: puede que este mensaje ya haya empezado a enviarse. | **Error de edición: puede que este mensaje ya se esté enviando.** |
| `queue.removeFailed` | Removal failed: this message may have already started sending. | Error al eliminar: puede que este mensaje ya haya empezado a enviarse. | **Error al eliminar: puede que este mensaje ya se esté enviando.** |
| `queue.steerFailed` | Steering failed. Try again. | Error al dirigir. Inténtalo de nuevo. | **Error al dirigir. Intenta de nuevo.** |

## cordis (1 de 51)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `a11y.preparing` | Preparing a Cordis tool call | Preparando una llamada a herramienta de Cordis | **Preparando un tool call de Cordis** |

## deliverables (5 de 60)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `presented.revealError` | Could not show in file manager. Try again. | No se pudo mostrar en el gestor de archivos. Inténtalo de nuevo. | **No se pudo mostrar en el explorador de archivos. Intenta de nuevo.** |
| `presented.directoryError` | Could not open containing folder. Try again. | No se pudo abrir la carpeta contenedora. Inténtalo de nuevo. | **No se pudo abrir la carpeta contenedora. Intenta de nuevo.** |
| `presented.revealed` | Requested display in file manager | Visualización en el gestor de archivos solicitada | **Visualización solicitada en el explorador de archivos** |
| `presented.revealing` | Showing in file manager… | Mostrando en el gestor de archivos… | **Mostrando en el explorador de archivos…** |
| `review.selectFile` | Choose the file to review | Elegir el archivo que revisar | **Elige el archivo que quieres revisar** |

## documentHtml (1 de 4)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `loading` | Rendering document... | Representando el documento... | **Procesando el documento...** |

## feedback (2 de 20)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `dialog.hint` | Add details to help us improve. Your submission will include the current conversation log. | Añade detalles para ayudarnos a mejorar. El envío incluirá el registro de la conversación actual. | **Agrega detalles para ayudarnos a mejorar. El envío incluirá el log de la conversación actual.** |
| `category.resource-cost` | Resource usage and cost | Uso de recursos y coste | **Uso de recursos y costo** |

## goal (1 de 12)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `objective.aria` | Goal objective | Objetivo del objetivo | **Contenido del objetivo** |

## job (3 de 39)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `row.expandAria` | Show live output of {label} | Mostrar la salida en directo de {label} | **Mostrar la salida en vivo de {label}** |
| `row.collapseAria` | Hide live output of {label} | Ocultar la salida en directo de {label} | **Ocultar la salida en vivo de {label}** |
| `output.error` | live output stream interrupted: {error} | flujo de salida en directo interrumpido: {error} | **flujo de salida en vivo interrumpido: {error}** |

## model (1 de 23)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `error.sessionInUse` | This session is already in use, possibly by another running DSH instance (such as dsh web or the desktop app). Quit other running DSH instances and try again. | Esta sesión ya está en uso, posiblemente por otra instancia de DSH en ejecución (como dsh web o la aplicación de escritorio). Cierra las demás instancias de DSH en ejecución e inténtalo de nuevo. | **Esta sesión ya está en uso, posiblemente por otra instancia de DSH en ejecución (como dsh web o la aplicación de escritorio). Cierra las demás instancias de DSH en ejecución e intenta de nuevo.** |

## open-in-app (3 de 45)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `open.tooltip` | Open locally | Abrir en local | **Abrir localmente** |
| `path.openError` | Could not open. Try again. | No se pudo abrir. Inténtalo de nuevo. | **No se pudo abrir. Intenta de nuevo.** |
| `path.revealError` | Could not show the file location. Try again. | No se pudo mostrar la ubicación del archivo. Inténtalo de nuevo. | **No se pudo mostrar la ubicación del archivo. Intenta de nuevo.** |

## permission.access (2 de 17)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `auto.description` | Run without a sandbox after an experimental same-model review of every native tool call and PTC inner call. | Ejecutar sin sandbox tras una revisión experimental del mismo modelo de cada llamada a herramienta nativa y cada llamada interna de PTC. | **Ejecutar sin sandbox tras una revisión experimental del mismo modelo de cada tool call nativo y cada llamada interna de PTC.** |
| `auto.confirm.description` | Auto review runs without a sandbox. Before every native tool call and PTC inner call, the same model as the current agent reviews whether to allow it; you approve or reject each call it denies. This feature is experimental, can falsely allow or deny actions, and uses additional tokens. | La revisión automática se ejecuta sin sandbox. Antes de cada llamada a herramienta nativa y cada llamada interna de PTC, el mismo modelo que el agente actual revisa si debe permitirla; tú apruebas o rechazas cada llamada que deniegue. Esta función es experimental, puede permitir o denegar acciones de forma errónea y consume tokens adicionales. | **La revisión automática se ejecuta sin sandbox. Antes de cada tool call nativo y cada llamada interna de PTC, el mismo modelo que el agente actual revisa si debe permitirlo; tú apruebas o rechazas cada tool call que deniegue. Esta función es experimental, puede permitir o denegar acciones de forma errónea y consume tokens adicionales.** |

## plan (1 de 17)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `chip.on.aria` | Plan mode on, press to turn off | Modo plan activado, pulsa para desactivarlo | **Modo plan activado, presiona para desactivarlo** |

## pluginManager (49 de 189)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `error` | Could not read all plugins, possibly due to a network problem | No se han podido leer todos los plugins, posiblemente por un problema de red | **No se pudieron leer todos los plugins, posiblemente por un problema de red** |
| `refreshError` | Refresh failed. Please try again. | La actualización ha fallado. Inténtalo de nuevo. | **La actualización falló. Intenta de nuevo.** |
| `addPlugin` | Add plugin | Añadir plugin | **Agregar plugin** |
| `overriddenNotice` | {name} was saved, but a higher-priority configuration overrides it, so it is not in effect | {name} se ha guardado, pero una configuración de mayor prioridad lo anula, por lo que no está en vigor | **{name} quedó guardado, pero una configuración de mayor prioridad lo anula, por lo que no está en vigor** |
| `installTitle` | Add plugin | Añadir plugin | **Agregar plugin** |
| `installDescription` | Enter the plugin's package name, GitHub repository address, or local directory path. | Introduce el nombre del paquete del plugin, la dirección del repositorio de GitHub o la ruta de un directorio local. | **Escribe el nombre del paquete del plugin, la dirección del repositorio de GitHub o la ruta de un directorio local.** |
| `installGuideIdTitle` | Enter the plugin's npm package name | Introduce el nombre del paquete npm del plugin | **Escribe el nombre del paquete npm del plugin** |
| `registryCustomHint` | Enter an internal or private npm registry address starting with http:// or https://. If it requires a login, store the credentials in ~/.npmrc on this machine. | Introduce la dirección de un registro npm interno o privado que empiece por http:// o https://. Si requiere inicio de sesión, guarda las credenciales en ~/.npmrc de esta máquina. | **Escribe la dirección de un registro npm interno o privado que empiece por http:// o https://. Si requiere inicio de sesión, guarda las credenciales en ~/.npmrc de esta máquina.** |
| `registryCustomInvalid` | Enter an address starting with http:// or https:// | Introduce una dirección que empiece por http:// o https:// | **Escribe una dirección que empiece por http:// o https://** |
| `installChecking` | Checking… | Comprobando… | **Revisando…** |
| `installProblemNotFound` | No such plugin was found | No se ha encontrado ningún plugin con ese nombre | **No se encontró ningún plugin con ese nombre** |
| `installProblemNetwork` | The plugin registry could not be reached; check the network and try again | No se ha podido contactar con el registro de plugins; comprueba la red e inténtalo de nuevo | **No se pudo contactar con el registro de plugins; revisa la red e intenta de nuevo** |
| `installProblemNetworkAll` | No registry could be reached (tried: {registries}); check the network or proxy settings, or change the registry | No se ha podido contactar con ningún registro (probados: {registries}); comprueba la red o los ajustes de proxy, o cambia de registro | **No se pudo contactar con ningún registro (probados: {registries}); revisa la red o los ajustes de proxy, o cambia de registro** |
| `installProblemUnknown` | The plugin could not be looked up: {reason} | No se ha podido buscar el plugin: {reason} | **No se pudo buscar el plugin: {reason}** |
| `installFailedTitle` | The plugin could not be installed | No se ha podido instalar el plugin | **No se pudo instalar el plugin** |
| `installGithubTimeoutTitle` | GitHub connection timed out | Se ha agotado el tiempo de conexión con GitHub | **Se agotó el tiempo de conexión con GitHub** |
| `installApplyingCancellationError` | Cancellation was not confirmed. Installation is being applied; wait for its result. {reason} | No se ha confirmado la cancelación. La instalación se está aplicando; espera su resultado. {reason} | **No se confirmó la cancelación. La instalación se está aplicando; espera su resultado. {reason}** |
| `installReconcile` | Check installation status | Comprobar el estado de la instalación | **Revisar el estado de la instalación** |
| `installUnknownTitle` | Installation result unavailable | Resultado de la instalación no disponible | **Resultado de instalación no disponible** |
| `installUnknownDescription` | The Host has no active installation with this request id. Check the plugin list before trying again. | El Host no tiene ninguna instalación activa con este id de solicitud. Comprueba la lista de plugins antes de volver a intentarlo. | **El Host no tiene ninguna instalación activa con este id de solicitud. Revisa la lista de plugins antes de volver a intentarlo.** |
| `installResultUnconfirmed` | The installation result was not received. Check installation status. {reason} | No se ha recibido el resultado de la instalación. Comprueba el estado de la instalación. {reason} | **No se recibió el resultado de la instalación. Revisa el estado de la instalación. {reason}** |
| `installBackgroundUnknown` | Installation result unavailable. Check the plugin list. | Resultado de la instalación no disponible. Comprueba la lista de plugins. | **Resultado de instalación no disponible. Revisa la lista de plugins.** |
| `installBackgroundDone` | Installation finished. View installation details. | La instalación ha finalizado. Ver los detalles de la instalación. | **La instalación finalizó. Ver los detalles de la instalación.** |
| `installBackgroundFailed` | Installation failed. View installation details. | La instalación ha fallado. Ver los detalles de la instalación. | **La instalación falló. Ver los detalles de la instalación.** |
| `installCancelUnconfirmed` | Installation has not been confirmed stopped. Retry cancellation or wait for the installation result. {reason} | No se ha confirmado la detención de la instalación. Reintenta la cancelación o espera al resultado de la instalación. {reason} | **No se confirmó la detención de la instalación. Reintenta la cancelación o espera al resultado de la instalación. {reason}** |
| `installAttempt` | {previous} could not serve the package; retrying through {registry} (registry {index} of {total}) | {previous} no ha podido servir el paquete; reintentando mediante {registry} (registro {index} de {total}) | **{previous} no pudo servir el paquete; reintentando mediante {registry} (registro {index} de {total})** |
| `installFailureNetwork` | The network connection failed | La conexión de red ha fallado | **La conexión de red falló** |
| `installFailureNetworkAll` | No registry could be reached (tried: {registries}). Check the network or proxy settings, or change the registry and retry. | No se ha podido contactar con ningún registro (probados: {registries}). Comprueba la red o los ajustes de proxy, o cambia de registro y reinténtalo. | **No se pudo contactar con ningún registro (probados: {registries}). Revisa la red o los ajustes de proxy, o cambia de registro y reinténtalo.** |
| `installFailureNetworkHost` | {host} could not be reached. A GitHub address or a .tgz link is not fetched through the registry: this machine must reach it directly or through a proxy. If the plugin is also published to npm, enter its package name instead. | No se ha podido contactar con {host}. Una dirección de GitHub o un enlace .tgz no se descargan a través del registro: esta máquina debe poder acceder directamente o mediante un proxy. Si el plugin también está publicado en npm, introduce su nombre de paquete en su lugar. | **No se pudo contactar con {host}. Una dirección de GitHub o un enlace .tgz no se descargan a través del registro: esta máquina debe poder acceder directamente o mediante un proxy. Si el plugin también está publicado en npm, escribe su nombre de paquete en su lugar.** |
| `installFailureNotFound` | No such plugin was found | No se ha encontrado ningún plugin con ese nombre | **No se encontró ningún plugin con ese nombre** |
| `installFailureDiskFull` | The disk is full; the install stopped | El disco está lleno; la instalación se ha detenido | **El disco está lleno; la instalación se detuvo** |
| `installFailureBuildBlockedManual` | pnpm blocked install scripts; allow them under allowBuilds in pnpm-workspace.yaml and retry | pnpm ha bloqueado scripts de instalación; permítelos en allowBuilds dentro de pnpm-workspace.yaml y reinténtalo | **pnpm bloqueó scripts de instalación; permítelos en allowBuilds dentro de pnpm-workspace.yaml y reinténtalo** |
| `installFailureIntegrity` | The downloaded package failed its integrity check | El paquete descargado no ha superado la comprobación de integridad | **El paquete descargado no superó la verificación de integridad** |
| `installFailureTimeout` | The install timed out | Se ha agotado el tiempo de la instalación | **Se agotó el tiempo de la instalación** |
| `installFailurePnpmMissing` | pnpm was not found, so nothing can be installed | No se ha encontrado pnpm, por lo que no se puede instalar nada | **No se encontró pnpm, por lo que no se puede instalar nada** |
| `installFailureGeneric` | Something went wrong during the install; the details say what | Algo ha ido mal durante la instalación; los detalles indican qué | **Algo salió mal durante la instalación; los detalles indican qué** |
| `installDoneNothing` | Install finished with no new dependency. | La instalación ha finalizado sin ninguna dependencia nueva. | **La instalación finalizó sin ninguna dependencia nueva.** |
| `installApprovalDescription` | These packages have install scripts that pnpm did not run. | Estos paquetes tienen scripts de instalación que pnpm no ha ejecutado. | **Estos paquetes tienen scripts de instalación que pnpm no ejecutó.** |
| `failedEnable` | Could not enable: {reason} | No se ha podido activar: {reason} | **No se pudo activar: {reason}** |
| `failedDisable` | Could not disable: {reason} | No se ha podido desactivar: {reason} | **No se pudo desactivar: {reason}** |
| `failedUninstall` | Could not uninstall: {reason} | No se ha podido desinstalar: {reason} | **No se pudo desinstalar: {reason}** |
| `failedRowEnable` | Could not enable the component: {reason} | No se ha podido activar el componente: {reason} | **No se pudo activar el componente: {reason}** |
| `failedRowDisable` | Could not disable the component: {reason} | No se ha podido desactivar el componente: {reason} | **No se pudo desactivar el componente: {reason}** |
| `reasonInvalidSpec` | Enter a valid package name or address. | Introduce un nombre de paquete o una dirección válidos. | **Escribe un nombre de paquete o una dirección válidos.** |
| `reasonAmbiguousInstall` | Which package was installed cannot be told from the dependency change. | No se puede saber qué paquete se ha instalado a partir del cambio de dependencias. | **No se puede saber qué paquete se instaló a partir del cambio de dependencias.** |
| `reasonStaleApproval` | The pending script approvals changed; install again to refresh them. | Las aprobaciones de scripts pendientes han cambiado; vuelve a instalar para actualizarlas. | **Las aprobaciones de scripts pendientes cambiaron; vuelve a instalar para actualizarlas.** |
| `reasonIncompatibleVersion` | {plugin} is incompatible with DSH {runtime} (requires {peers}); running it may cause crashes or data loss. | {plugin} es incompatible con DSH {runtime} (requiere {peers}); ejecutarlo puede provocar fallos o pérdida de datos. | **{plugin} es incompatible con DSH {runtime} (requiere {peers}); ejecutarlo puede provocar fallas o pérdida de datos.** |
| `reasonIncompatibleVersionUnnamed` | This plugin is incompatible with the running DSH version; running it may cause crashes or data loss. | Este plugin es incompatible con la versión de DSH en ejecución; ejecutarlo puede provocar fallos o pérdida de datos. | **Este plugin es incompatible con la versión de DSH en ejecución; ejecutarlo puede provocar fallas o pérdida de datos.** |
| `reasonOperationError` | The Host reported an error. | El Host ha informado de un error. | **El Host informó de un error.** |

## question (3 de 31)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `error.unanswered` | Please select an option or enter a custom answer. | Selecciona una opción o introduce una respuesta personalizada. | **Elige una opción o escribe tu propia respuesta.** |
| `error.unavailable` | Cannot submit right now; try again in a moment. | No se puede enviar ahora mismo; inténtalo de nuevo en un momento. | **No se puede enviar ahora mismo; intenta de nuevo en un momento.** |
| `nav.close` | Close the panel — reopen it from the tool call | Cerrar el panel; vuelve a abrirlo desde la llamada a herramienta | **Cerrar el panel; vuelve a abrirlo desde el tool call** |

## schedule.catalog (5 de 70)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `time.locale` | en | en | **es-CL** |
| `frequency.daily` | Daily at {time} ({timeZone}) | Diariamente a las {time} ({timeZone}) | **Cada día a las {time} ({timeZone})** |
| `frequency.dailyLocal` | Daily at {time} | Diariamente a las {time} | **Cada día a las {time}** |
| `frequency.weekly` | Weekly on {weekdays} at {time} ({timeZone}) | Semanalmente los {weekdays} a las {time} ({timeZone}) | **Cada semana los {weekdays} a las {time} ({timeZone})** |
| `frequency.weeklyLocal` | Weekly on {weekdays} at {time} | Semanalmente los {weekdays} a las {time} | **Cada semana los {weekdays} a las {time}** |

## schedule.manager (20 de 187)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `list.error` | Could not load tasks. | No se han podido cargar las tareas. | **No se pudieron cargar las tareas.** |
| `list.empty` | No tasks yet. Tasks created in your sessions appear here. | Todavía no hay tareas. Las tareas creadas en tus sesiones aparecen aquí. | **Todavía no hay tareas. Las tareas creadas en tus sesiones aparecen acá.** |
| `delivery.error` | Could not load delivery records. | No se han podido cargar los registros de entrega. | **No se pudieron cargar los registros de entrega.** |
| `delivery.cursorError` | Records were updated. | Los registros se han actualizado. | **Los registros se actualizaron.** |
| `delivery.pruned` | Earlier delivery records have been cleared | Los registros de entrega anteriores se han vaciado | **Los registros de entrega anteriores se vaciaron** |
| `time.locale` | en | en | **es-CL** |
| `timing.conflict` | This task changed while you were editing. Your draft is retained. Cancel and reopen after refresh to edit the latest rule. | Esta tarea ha cambiado mientras la editabas. Tu borrador se conserva. Cancela y vuelve a abrirla tras actualizar para editar la última regla. | **Esta tarea cambió mientras la editabas. Tu borrador se conserva. Cancela y vuelve a abrirla tras actualizar para editar la última regla.** |
| `timing.invalid` | Enter a valid date and time, or check the timing fields. | Introduce una fecha y una hora válidas, o revisa los campos de programación. | **Escribe una fecha y una hora válidas, o revisa los campos de programación.** |
| `timing.invalidZone` | Enter a valid IANA time zone, for example Asia/Shanghai. | Introduce una zona horaria de IANA válida, por ejemplo Asia/Shanghai. | **Escribe una zona horaria de IANA válida, por ejemplo Asia/Shanghai.** |
| `timing.invalidInterval` | Enter an interval of at least 1 minute. | Introduce un intervalo de al menos 1 minuto. | **Escribe un intervalo de al menos 1 minuto.** |
| `timing.invalidInterval.hour` | Enter an interval of at least 1 hour. | Introduce un intervalo de al menos 1 hora. | **Escribe un intervalo de al menos 1 hora.** |
| `timing.invalidInterval.minute` | Enter an interval of at least 1 minute. | Introduce un intervalo de al menos 1 minuto. | **Escribe un intervalo de al menos 1 minuto.** |
| `timing.invalidInterval.second` | Enter an interval of at least 60 seconds. | Introduce un intervalo de al menos 60 segundos. | **Escribe un intervalo de al menos 60 segundos.** |
| `timing.error` | Could not confirm the timing update. Your draft is retained. Check the task before retrying. | No se ha podido confirmar la actualización de la programación. Tu borrador se conserva. Revisa la tarea antes de reintentar. | **No se pudo confirmar la actualización de la programación. Tu borrador se conserva. Revisa la tarea antes de reintentar.** |
| `rule.invalidTitle` | Enter a task name of at most 120 characters. | Introduce un nombre de tarea de 120 caracteres como máximo. | **Escribe un nombre de tarea de 120 caracteres como máximo.** |
| `rule.invalidPrompt` | Enter a task instruction. | Introduce una instrucción para la tarea. | **Escribe una instrucción para la tarea.** |
| `rule.cronInvalid` | Enter a five-field cron expression, for example 0 9 * * 1-5. | Introduce una expresión cron de cinco campos, por ejemplo 0 9 * * 1-5. | **Escribe una expresión cron de cinco campos, por ejemplo 0 9 * * 1-5.** |
| `rule.error.conflict` | This task changed before the update was saved. The row shows the saved rule; try again. | Esta tarea ha cambiado antes de guardar la actualización. La fila muestra la regla guardada; inténtalo de nuevo. | **Esta tarea cambió antes de guardar la actualización. La fila muestra la regla guardada; intenta de nuevo.** |
| `rule.error.unknown` | Could not confirm the rule update. The row shows the saved rule. | No se ha podido confirmar la actualización de la regla. La fila muestra la regla guardada. | **No se pudo confirmar la actualización de la regla. La fila muestra la regla guardada.** |
| `toast.deleteFailed` | Could not delete the task. | No se ha podido eliminar la tarea. | **No se pudo eliminar la tarea.** |

## session-log-download (1 de 10)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `menu.download` | Download session log | Descargar el registro de la sesión | **Descargar el log de sesión** |

## settings (11 de 34)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `desktop.update.checkFailed` | Could not check for updates. Please try again later. | No se pudieron buscar actualizaciones. Inténtalo de nuevo más tarde. | **No se pudieron buscar actualizaciones. Intenta de nuevo más tarde.** |
| `desktop.update.downloadFailed` | Could not download the update. Please try again. | No se pudo descargar la actualización. Inténtalo de nuevo. | **No se pudo descargar la actualización. Intenta de nuevo.** |
| `desktop.update.installFailed` | Could not install the update. Please try again later. | No se pudo instalar la actualización. Inténtalo de nuevo más tarde. | **No se pudo instalar la actualización. Intenta de nuevo más tarde.** |
| `desktop.update.checkNetworkFailed` | Could not check for updates. Check your connection and try again. | No se pudieron buscar actualizaciones. Comprueba la conexión e inténtalo de nuevo. | **No se pudieron buscar actualizaciones. Revisa la conexión e intenta de nuevo.** |
| `desktop.update.downloadNetworkFailed` | Could not download the update. Check your connection and try again. | No se pudo descargar la actualización. Comprueba la conexión e inténtalo de nuevo. | **No se pudo descargar la actualización. Revisa la conexión e intenta de nuevo.** |
| `desktop.update.installNetworkFailed` | Could not install the update. Check your connection and try again. | No se pudo instalar la actualización. Comprueba la conexión e inténtalo de nuevo. | **No se pudo instalar la actualización. Revisa la conexión e intenta de nuevo.** |
| `desktop.update.stopFailed` | Could not safely stop the tasks. The update has not been installed. Please try again later. | No se pudieron detener las tareas de forma segura. La actualización no se ha instalado. Inténtalo de nuevo más tarde. | **No se pudieron detener las tareas de forma segura. La actualización no se ha instalado. Intenta de nuevo más tarde.** |
| `desktop.update.tasksChanged` | New tasks have started. Confirm again to stop the tasks and update. | Han comenzado nuevas tareas. Confirma de nuevo para detener las tareas y actualizar. | **Comenzaron nuevas tareas. Confirma de nuevo para detener las tareas y actualizar.** |
| `desktop.update.tasksUnavailable` | Task status is unavailable. Try updating again when the workspace is ready. | El estado de las tareas no está disponible. Vuelve a intentar la actualización cuando el espacio de trabajo esté listo. | **El estado de las tareas no está disponible. Intenta actualizar de nuevo cuando el espacio de trabajo esté listo.** |
| `developerTools.error` | Could not save. Please try again. | No se pudo guardar. Inténtalo de nuevo. | **No se pudo guardar. Intenta de nuevo.** |
| `developerTools.description` | Shows trajectory, code diffs, and all Agent presets | Muestra la trayectoria, las diferencias de código y todos los presets de agente | **Muestra la trayectoria, los diffs de código y todos los presets de agente** |

## settings.account (17 de 93)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `modelSignInRequired` | Model unavailable. Please sign in and try again. | Modelo no disponible. Inicia sesión y vuelve a intentarlo. | **Modelo no disponible. Inicia sesión e intenta de nuevo.** |
| `onboardingIntroduction` | DeepSeek Harness works in a local folder and uses tools to read and write files on your computer. It can help you research and organize information, create documents and spreadsheets, write code, troubleshoot issues, and more. | DeepSeek Harness trabaja en una carpeta local y usa herramientas para leer y escribir archivos en tu ordenador. Puede ayudarte a investigar y organizar información, crear documentos y hojas de cálculo, escribir código, solucionar problemas y mucho más. | **DeepSeek Harness trabaja en una carpeta local y usa herramientas para leer y escribir archivos en tu computador. Puede ayudarte a investigar y organizar información, crear documentos y hojas de cálculo, escribir código, solucionar problemas y mucho más.** |
| `onboardingCredit` | Add credits | Añadir créditos | **Agregar créditos** |
| `onboardingCreditDescription` | DeepSeek Harness charges credits based on the tokens used by models and tools. Add credits in advance to keep your tasks running without interruption. Your balance is only used while the agent is working on a task. | DeepSeek Harness cobra créditos según los tokens que consumen los modelos y las herramientas. Añade créditos con antelación para que tus tareas sigan ejecutándose sin interrupciones. El saldo solo se usa mientras el agente trabaja en una tarea. | **DeepSeek Harness cobra créditos según los tokens que consumen los modelos y las herramientas. Agrega créditos con antelación para que tus tareas sigan ejecutándose sin interrupciones. El saldo solo se usa mientras el agente trabaja en una tarea.** |
| `onboardingTopUp` | Add credits | Añadir créditos | **Agregar créditos** |
| `onboardingFundedTopUp` | Add credits | Añadir créditos | **Agregar créditos** |
| `onboardingDevelopmentDescription` | Edit code, debug issues, run commands, manage project files, and more | Editar código, depurar errores, ejecutar comandos, gestionar archivos de proyecto y mucho más | **Editar código, depurar errores, ejecutar comandos, gestionar archivos del proyecto y mucho más** |
| `onboardingNoCreditDescription` | DeepSeek Harness can’t start new tasks without credits. You can add them later in Settings → Account. | DeepSeek Harness no puede iniciar tareas nuevas sin créditos. Puedes añadirlos más tarde en Ajustes → Cuenta. | **DeepSeek Harness no puede iniciar tareas nuevas sin créditos. Puedes agregarlos más tarde en Ajustes → Cuenta.** |
| `onboardingGoTopUp` | Add credits | Añadir créditos | **Agregar créditos** |
| `onboardingSaveFailed` | Could not save settings. Try again. | No se pudieron guardar los ajustes. Inténtalo de nuevo. | **No se pudieron guardar los ajustes. Intenta de nuevo.** |
| `addApiKey` | Add API Key | Añadir clave de API | **Agregar clave de API** |
| `loginDescription` | Sign in to your DeepSeek account or add an API Key to get started. Your projects and files are stored locally. | Inicia sesión en tu cuenta de DeepSeek o añade una clave de API para empezar. Tus proyectos y archivos se almacenan localmente. | **Inicia sesión en tu cuenta de DeepSeek o agrega una clave de API para empezar. Tus proyectos y archivos se almacenan localmente.** |
| `browserPrompt` | Page did not open automatically?  | ¿No se ha abierto la página automáticamente?  | **¿No se abrió la página automáticamente? ** |
| `platformFailed` | Could not complete the operation. Try again. | No se pudo completar la operación. Inténtalo de nuevo. | **No se pudo completar la operación. Intenta de nuevo.** |
| `signOutUnknownDescription` | Could not check running tasks. Signing out may interrupt tasks using this account. Sign out now? | No se pudieron comprobar las tareas en ejecución. Cerrar sesión puede interrumpir las tareas que usan esta cuenta. ¿Cerrar sesión ahora? | **No se pudieron revisar las tareas en ejecución. Cerrar sesión puede interrumpir las tareas que usan esta cuenta. ¿Cerrar sesión ahora?** |
| `expired` | Sign in expired. Try again. | El inicio de sesión ha caducado. Inténtalo de nuevo. | **El inicio de sesión caducó. Intenta de nuevo.** |
| `failed` | Could not complete the operation. Try again. | No se pudo completar la operación. Inténtalo de nuevo. | **No se pudo completar la operación. Intenta de nuevo.** |

## settings.agentLoop (5 de 12)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `description` | Control how the Agent dispatches tool calls. | Controla cómo el agente distribuye las llamadas a herramientas. | **Controla cómo el agente distribuye los tool calls.** |
| `maxParallel` | Parallel tool calls | Llamadas a herramientas en paralelo | **Tool calls en paralelo** |
| `overridden` | Overridden | Anulado | **Sobrescrito** |
| `reset` | Reset to default | Restablecer los valores predeterminados | **Restablecer al valor predeterminado** |
| `invalidNumber` | Enter a number, or leave blank to use the default. | Introduce un número o déjalo en blanco para usar el valor predeterminado. | **Escribe un número o déjalo en blanco para usar el valor predeterminado.** |

## settings.agentPreset (10 de 41)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `guideStandardIntro` | Choose Standard mode when starting a new task. Describe what you want to accomplish, point to the relevant files, and explain how to check the result. | Elige el modo Estándar al iniciar una tarea nueva. Describe lo que quieres conseguir, indica los archivos relevantes y explica cómo comprobar el resultado. | **Elige el modo Estándar al iniciar una tarea nueva. Describe lo que quieres conseguir, indica los archivos relevantes y explica cómo revisar el resultado.** |
| `guideStandardExplanation` | ### How it works  The agent calls tools directly to read and edit files, search, and run terminal commands. It includes Skills, planning, goals, subagents, workflows, and context compaction.  ### When to choose it  Start here for everyday coding, file work, and research. Standard mode can also write scripts and process files in batches. PTC changes how tool calls are organized; it is not required for batch tasks. | ### Cómo funciona  El agente llama a las herramientas directamente para leer y editar archivos, buscar y ejecutar comandos de terminal. Incluye skills, planificación, objetivos, subagentes, flujos de trabajo y compactación de contexto.  ### Cuándo elegirlo  Empieza por aquí para programar en el día a día, trabajar con archivos e investigar. El modo Estándar también puede escribir scripts y procesar archivos por lotes. PTC cambia cómo se organizan las llamadas a herramientas; no es necesario para las tareas por lotes. | **### Cómo funciona  El agente llama a las herramientas directamente para leer y editar archivos, buscar y ejecutar comandos de terminal. Incluye skills, planificación, objetivos, subagentes, flujos de trabajo y compactación de contexto.  ### Cuándo elegirlo  Empieza por aquí para programar en el día a día, trabajar con archivos e investigar. El modo Estándar también puede escribir scripts y procesar archivos por lotes. PTC cambia cómo se organizan los tool calls; no es necesario para las tareas por lotes.** |
| `guideStandardUsage` | ### Fix a bug  > Find out why submitting the search form twice makes the results disappear. Fix it and run the relevant tests. Explain the cause and what changed.  Expected output: a code change, the relevant test results, and an explanation of the cause.  ### Organize project notes  > Read the Markdown notes in this project. Summarize the agreed decisions and open questions, with links to the source files.  Expected output: a summary with references that you can check against the original notes. | ### Corregir un error  > Averigua por qué al enviar dos veces el formulario de búsqueda desaparecen los resultados. Corrígelo y ejecuta las pruebas correspondientes. Explica la causa y lo que ha cambiado.  Resultado esperado: un cambio en el código, los resultados de las pruebas correspondientes y una explicación de la causa.  ### Organizar las notas del proyecto  > Lee las notas en Markdown de este proyecto. Resume las decisiones acordadas y las preguntas abiertas, con enlaces a los archivos de origen.  Resultado esperado: un resumen con referencias que puedas contrastar con las notas originales. | **### Corregir un error  > Averigua por qué al enviar dos veces el formulario de búsqueda desaparecen los resultados. Corrígelo y ejecuta las pruebas correspondientes. Explica la causa y lo que cambió.  Resultado esperado: un cambio en el código, los resultados de las pruebas correspondientes y una explicación de la causa.  ### Organizar las notas del proyecto  > Lee las notas en Markdown de este proyecto. Resume las decisiones acordadas y las preguntas abiertas, con enlaces a los archivos de origen.  Resultado esperado: un resumen con referencias que puedas contrastar con las notas originales.** |
| `guidePtcExplanation` | ### How tools are called  PTC means Programmatic Tool Calling. In this built-in preset, the agent uses run_code to write a TypeScript program that calls tools through a generated SDK. The program can use loops, conditions, error handling, and concurrent calls where appropriate.  ### What reaches the model  Tool results first reach the program, which can filter and combine them. The model receives what the program prints or returns; image results are attached separately. Nested tool calls are still recorded and remain subject to tool permissions.  ### Compared with Standard mode  Both modes can handle coding and batch tasks. Standard mode exposes individual tools directly; PTC organizes tool calls in code. The current PTC preset leaves the workflow tool disabled. Speed and token use depend on the task and how the program handles its results. | ### Cómo se llaman las herramientas  PTC significa Programmatic Tool Calling. En este preset integrado, el agente usa run_code para escribir un programa en TypeScript que llama a las herramientas mediante un SDK generado. El programa puede usar bucles, condiciones, gestión de errores y llamadas concurrentes cuando corresponda.  ### Qué llega al modelo  Los resultados de las herramientas llegan primero al programa, que puede filtrarlos y combinarlos. El modelo recibe lo que el programa imprime o devuelve; los resultados de imagen se adjuntan por separado. Las llamadas a herramientas anidadas se siguen registrando y siguen sujetas a los permisos de herramientas.  ### En comparación con el modo Estándar  Ambos modos pueden abordar tareas de programación y por lotes. El modo Estándar expone las herramientas individuales directamente; PTC organiza las llamadas a herramientas en código. El preset PTC actual deja deshabilitada la herramienta de flujo de trabajo. La velocidad y el uso de tokens dependen de la tarea y de cómo el programa gestione sus resultados. | **### Cómo se llaman las herramientas  PTC significa Programmatic Tool Calling. En este preset integrado, el agente usa run_code para escribir un programa en TypeScript que llama a las herramientas mediante un SDK generado. El programa puede usar bucles, condiciones, gestión de errores y llamadas concurrentes cuando corresponda.  ### Qué llega al modelo  Los resultados de las herramientas llegan primero al programa, que puede filtrarlos y combinarlos. El modelo recibe lo que el programa imprime o devuelve; los resultados de imagen se adjuntan por separado. Los tool calls anidados se siguen registrando y siguen sujetos a los permisos de herramientas.  ### En comparación con el modo Estándar  Ambos modos pueden abordar tareas de programación y por lotes. El modo Estándar expone las herramientas individuales directamente; PTC organiza los tool calls en código. El preset PTC actual deja deshabilitada la herramienta de flujo de trabajo. La velocidad y el uso de tokens dependen de la tarea y de cómo el programa gestione sus resultados.** |
| `guidePtcUsage` | ### Check a set of configuration files  > Check all JSON files in configs/. List missing required fields and invalid values against schema.json. Save a CSV with one row per issue. Include unreadable files in the report and keep checking the rest. Leave the original files unchanged.  Expected output: an issue summary and a CSV report. The program can repeat the same checks, handle individual failures, and collect the results.  ### Summarize error logs  > Analyze the log files in logs/. Group errors by service and error type. Show the ten most frequent groups and one example from each. Save the full counts to a CSV.  Expected output: the top error groups and a complete count table. Intermediate data can be aggregated in the program before the summary reaches the model. | ### Comprobar un conjunto de archivos de configuración  > Comprueba todos los archivos JSON de configs/. Enumera los campos obligatorios que falten y los valores no válidos según schema.json. Guarda un CSV con una fila por problema. Incluye los archivos ilegibles en el informe y sigue comprobando el resto. No modifiques los archivos originales.  Resultado esperado: un resumen de problemas y un informe CSV. El programa puede repetir las mismas comprobaciones, gestionar fallos individuales y recopilar los resultados.  ### Resumir registros de errores  > Analiza los archivos de registro de logs/. Agrupa los errores por servicio y tipo de error. Muestra los diez grupos más frecuentes y un ejemplo de cada uno. Guarda los recuentos completos en un CSV.  Resultado esperado: los principales grupos de errores y una tabla de recuentos completa. Los datos intermedios se pueden agregar en el programa antes de que el resumen llegue al modelo. | **### Revisar un conjunto de archivos de configuración  > Revisa todos los archivos JSON de configs/. Enumera los campos obligatorios que falten y los valores no válidos según schema.json. Guarda un CSV con una fila por problema. Incluye los archivos ilegibles en el informe y sigue revisando el resto. No modifiques los archivos originales.  Resultado esperado: un resumen de problemas y un informe CSV. El programa puede repetir las mismas verificaciones, gestionar fallas individuales y recopilar los resultados.  ### Resumir los logs de errores  > Analiza los archivos de log de logs/. Agrupa los errores por servicio y tipo de error. Muestra los diez grupos más frecuentes y un ejemplo de cada uno. Guarda los recuentos completos en un CSV.  Resultado esperado: los principales grupos de errores y una tabla de recuentos completa. Los datos intermedios se pueden agregar en el programa antes de que el resumen llegue al modelo.** |
| `guideMinimalUsage` | ### Compare performance on a small bug fix  > Run the tests for this project, find the cause of the failure, and make the smallest fix. Run the relevant tests again and report the result.  Run the same task separately in Standard and Minimal modes from the same starting state. Compare task completion, tool calls, and the resulting changes. Minimal mode performs the work through terminal commands. | ### Comparar el rendimiento en la corrección de un error pequeño  > Ejecuta las pruebas de este proyecto, encuentra la causa del fallo y aplica la corrección más pequeña. Vuelve a ejecutar las pruebas correspondientes e informa del resultado.  Ejecuta la misma tarea por separado en los modos Estándar y Mínimo desde el mismo estado inicial. Compara la finalización de la tarea, las llamadas a herramientas y los cambios resultantes. El modo Mínimo realiza el trabajo mediante comandos de terminal. | **### Comparar el rendimiento en la corrección de un error pequeño  > Ejecuta las pruebas de este proyecto, encuentra la causa de la falla y aplica la corrección más pequeña. Vuelve a ejecutar las pruebas correspondientes e informa del resultado.  Ejecuta la misma tarea por separado en los modos Estándar y Mínimo desde el mismo estado inicial. Compara la finalización de la tarea, los tool calls y los cambios resultantes. El modo Mínimo realiza el trabajo mediante comandos de terminal.** |
| `guideCordisExplanation` | ### What you can create  Creator mode includes the standard task tools plus runtime inspection, persistent plugin management, and guidance for authoring Cordis plugins and agent presets. It can create a plugin that adds a capability or UI, or a preset that combines tools and prompts for a particular job.  ### Plugins and modes  A plugin adds capabilities to DSH, such as a tool, a service connection, or a UI entry. A mode is an agent preset that selects tools and defines how the agent works in a task. A plugin can be included in a custom preset.  ### How the result takes effect  Ask the agent to install and verify the result, not just generate source code. A plugin may load immediately or require a restart, depending on what it changes. A newly created preset is selected when starting a new task. | ### Qué puedes crear  El modo Creador incluye las herramientas de tareas estándar, además de inspección en tiempo de ejecución, gestión persistente de plugins y orientación para crear plugins de Cordis y presets de agente. Puede crear un plugin que añada una capacidad o una interfaz, o un preset que combine herramientas y prompts para un trabajo concreto.  ### Plugins y modos  Un plugin añade capacidades a DSH, como una herramienta, una conexión de servicio o una entrada de interfaz. Un modo es un preset de agente que selecciona herramientas y define cómo trabaja el agente en una tarea. Un plugin puede incluirse en un preset personalizado.  ### Cómo surte efecto el resultado  Pide al agente que instale y verifique el resultado, no solo que genere código fuente. Un plugin puede cargarse de inmediato o requerir un reinicio, según lo que cambie. Un preset recién creado se selecciona al iniciar una tarea nueva. | **### Qué puedes crear  El modo Creador incluye las herramientas de tareas estándar, además de inspección en tiempo de ejecución, gestión persistente de plugins y orientación para crear plugins de Cordis y presets de agente. Puede crear un plugin que agregue una capacidad o una interfaz, o un preset que combine herramientas y prompts para un trabajo concreto.  ### Plugins y modos  Un plugin agrega capacidades a DSH, como una herramienta, una conexión de servicio o una entrada de interfaz. Un modo es un preset de agente que selecciona herramientas y define cómo trabaja el agente en una tarea. Un plugin puede incluirse en un preset personalizado.  ### Cómo surte efecto el resultado  Pide al agente que instale y verifique el resultado, no solo que genere código fuente. Un plugin puede cargarse de inmediato o requerir un reinicio, según lo que cambie. Un preset recién creado se selecciona al iniciar una tarea nueva.** |
| `guideCordisUsage` | ### Add a UI  > Create a DSH plugin that adds a project notes entry to the sidebar. Let me browse the Markdown files in this workspace and preview a selected note. Install it and verify that the page opens.  Expected output: an installed plugin with a working entry and preview page, plus any remaining activation steps.  ### Add a tool  > Create a plugin with a tool that reads this project’s test report and summarizes the failed tests. Register it and verify it with a sample report.  Expected output: a plugin with a callable tool and a verified sample call.  ### Create my own mode  > Create a “Code review” mode based on Standard mode. Have it prioritize potential bugs and test gaps, cite file paths and lines, and ask before modifying files. Save it as a selectable preset.  Expected output: a custom preset for new tasks. These review instructions guide the agent; permission settings determine which actions it can execute. | ### Añadir una interfaz  > Crea un plugin de DSH que añada una entrada de notas del proyecto a la barra lateral. Déjame explorar los archivos Markdown de este espacio de trabajo y previsualizar una nota seleccionada. Instálalo y verifica que la página se abre.  Resultado esperado: un plugin instalado con una entrada funcional y una página de vista previa, además de los pasos de activación que queden pendientes.  ### Añadir una herramienta  > Crea un plugin con una herramienta que lea el informe de pruebas de este proyecto y resuma las pruebas fallidas. Regístralo y verifícalo con un informe de ejemplo.  Resultado esperado: un plugin con una herramienta invocable y una llamada de ejemplo verificada.  ### Crear mi propio modo  > Crea un modo «Revisión de código» basado en el modo Estándar. Haz que priorice posibles errores y lagunas en las pruebas, cite rutas de archivo y líneas, y pregunte antes de modificar archivos. Guárdalo como un preset seleccionable.  Resultado esperado: un preset personalizado para tareas nuevas. Estas instrucciones de revisión guían al agente; los ajustes de permisos determinan qué acciones puede ejecutar. | **### Agregar una interfaz  > Crea un plugin de DSH que agregue una entrada de notas del proyecto a la barra lateral. Déjame explorar los archivos Markdown de este espacio de trabajo y previsualizar una nota seleccionada. Instálalo y verifica que la página se abre.  Resultado esperado: un plugin instalado con una entrada funcional y una página de vista previa, además de los pasos de activación que queden pendientes.  ### Agregar una herramienta  > Crea un plugin con una herramienta que lea el informe de pruebas de este proyecto y resuma las pruebas fallidas. Regístralo y verifícalo con un informe de ejemplo.  Resultado esperado: un plugin con una herramienta invocable y una llamada de ejemplo verificada.  ### Crear mi propio modo  > Crea un modo «Revisión de código» basado en el modo Estándar. Haz que priorice posibles errores y lagunas en las pruebas, cite rutas de archivo y líneas, y pregunte antes de modificar archivos. Guárdalo como un preset seleccionable.  Resultado esperado: un preset personalizado para tareas nuevas. Estas instrucciones de revisión guían al agente; los ajustes de permisos determinan qué acciones puede ejecutar.** |
| `sectionIntro` | Choose the agent’s tools and how it works. Use Standard mode for everyday tasks, or Creator mode to add capabilities to DSH. | Elige las herramientas del agente y cómo funciona. Usa el modo Estándar para las tareas del día a día, o el modo Creador para añadir capacidades a DSH. | **Elige las herramientas del agente y cómo funciona. Usa el modo Estándar para las tareas del día a día, o el modo Creador para agregar capacidades a DSH.** |
| `presetCordisDescription` | Customize DSH through conversation. Let the agent write plugins that add features or UI, or combine tools and prompts to create your own mode. | Personaliza DSH mediante la conversación. Deja que el agente escriba plugins que añadan funciones o interfaz, o combina herramientas y prompts para crear tu propio modo. | **Personaliza DSH mediante la conversación. Deja que el agente escriba plugins que agreguen funciones o interfaz, o combina herramientas y prompts para crear tu propio modo.** |

## settings.models (21 de 113)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `intro` | Enter your API keys to use models from the following providers. | Introduce tus claves de API para usar modelos de los siguientes proveedores. | **Escribe tus claves de API para usar modelos de los siguientes proveedores.** |
| `add` | Add model provider | Añadir proveedor de modelos | **Agregar proveedor de modelos** |
| `addMode` | How to add | Cómo añadir | **Cómo agregar** |
| `addCatalogHint` | Pick OpenAI, Anthropic, Kimi, or another provider from the built-in catalog and enter its API key. | Elige OpenAI, Anthropic, Kimi u otro proveedor del catálogo integrado e introduce su clave de API. | **Elige OpenAI, Anthropic, Kimi u otro proveedor del catálogo integrado y escribe su clave de API.** |
| `savedProvider` | Saved {provider}. | Se ha guardado {provider}. | **Se guardó {provider}.** |
| `keyPlaceholder` | Enter your API key | Introduce tu clave de API | **Escribe tu clave de API** |
| `keyPlaceholderNative` | Enter an API key, or leave blank to use environment authentication | Introduce una clave de API o déjalo en blanco para usar la autenticación del entorno | **Escribe una clave de API o déjalo en blanco para usar la autenticación del entorno** |
| `keyStored` | Configured — enter a new value to replace | Configurada — introduce un valor nuevo para reemplazarla | **Configurada — escribe un valor nuevo para reemplazarla** |
| `addModel` | Add model | Añadir modelo | **Agregar modelo** |
| `keyBlank` | Enter the API key, or leave the field empty to keep the stored one. | Introduce la clave de API o deja el campo vacío para conservar la almacenada. | **Escribe la clave de API o deja el campo vacío para conservar la almacenada.** |
| `keyBlankNew` | Enter the API key, or leave the field empty if this provider authenticates another way. | Introduce la clave de API o deja el campo vacío si este proveedor se autentica de otra forma. | **Escribe la clave de API o deja el campo vacío si este proveedor se autentica de otra forma.** |
| `keyIllegalCharacters` | This API key is not in a valid format. Please check it. | Esta clave de API no tiene un formato válido. Compruébala. | **Esta clave de API no tiene un formato válido. Revísala.** |
| `fetchNeedsBaseUrl` | Enter the base URL first, then fetch. | Introduce primero la URL base y luego obtén los modelos. | **Escribe primero la URL base y luego obtén los modelos.** |
| `fetchEmpty` | The provider listed no models. Add them by hand. | El proveedor no ha listado ningún modelo. Añádelos manualmente. | **El proveedor no listó ningún modelo. Agrégalos manualmente.** |
| `fetchTitle` | Choose models to add | Elegir modelos para añadir | **Elegir modelos para agregar** |
| `fetchDescription` | These are the models this provider has available. Choose the ones to add. | Estos son los modelos disponibles en este proveedor. Elige los que quieras añadir. | **Estos son los modelos disponibles en este proveedor. Elige los que quieras agregar.** |
| `fetchAdopt` | Add selected | Añadir seleccionados | **Agregar seleccionados** |
| `customBaseUrlInvalid` | Enter a valid HTTP or HTTPS URL. | Introduce una URL HTTP o HTTPS válida. | **Escribe una URL HTTP o HTTPS válida.** |
| `welcomeError` | The acknowledgement could not be saved. Please try again. | No se pudo guardar la confirmación. Inténtalo de nuevo. | **No se pudo guardar la confirmación. Intenta de nuevo.** |
| `onboardingTitle` | Add an API key to get started | Añade una clave de API para empezar | **Agrega una clave de API para empezar** |
| `keyRequired` | Enter an API key to continue. | Introduce una clave de API para continuar. | **Escribe una clave de API para continuar.** |

## settings.sessionLog (1 de 4)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `title` | Upload Session Log when using the official model API | Subir el registro de la sesión al usar la API oficial del modelo | **Subir el log de sesión al usar la API oficial del modelo** |

## settings.shell (3 de 14)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `overridden` | Overridden | Anulado | **Sobrescrito** |
| `reset` | Reset to default | Restablecer los valores predeterminados | **Restablecer al valor predeterminado** |
| `invalidNumber` | Enter a number, or leave blank to use the default. | Introduce un número o déjalo en blanco para usar el valor predeterminado. | **Escribe un número o déjalo en blanco para usar el valor predeterminado.** |

## settings.subagent (4 de 35)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `overridden` | Overridden | Modificado | **Sobrescrito** |
| `subagentDepthInvalid` | Enter a whole number of 0 or more. | Introduce un número entero igual o mayor que 0. | **Escribe un número entero igual o mayor que 0.** |
| `subagentCapacityInvalid` | Enter a whole number of 1 or more. | Introduce un número entero igual o mayor que 1. | **Escribe un número entero igual o mayor que 1.** |
| `subagentModelSelectionConflict` | Settings changed elsewhere. Discard your draft and try again. | Los ajustes cambiaron en otro lugar. Descarta el borrador e inténtalo de nuevo. | **Los ajustes cambiaron en otro lugar. Descarta el borrador e intenta de nuevo.** |

## settings.webSearch (2 de 18)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `overridden` | Overridden | Modificado | **Sobrescrito** |
| `invalidNumber` | Enter a number, or leave blank to use the default. | Introduce un número o deja el campo vacío para usar el valor predeterminado. | **Escribe un número o deja el campo vacío para usar el valor predeterminado.** |

## shortcuts (9 de 56)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `record` | Press a shortcut | Pulsa un atajo | **Presiona un atajo** |
| `too-many-keys` | Hold at most two non-modifier keys. Release the keys to try again. | Mantén como máximo dos teclas que no sean modificadoras. Suelta las teclas para volver a intentarlo. | **Mantén como máximo dos teclas que no sean modificadoras. Suelta las teclas e intenta de nuevo.** |
| `reset-failed` | Could not restore defaults. Your shortcuts are unchanged. Please retry. | No se pudieron restaurar los valores predeterminados. Los atajos no han cambiado. Vuelve a intentarlo. | **No se pudieron restaurar los valores predeterminados. Los atajos no han cambiado. Intenta de nuevo.** |
| `review` | I have reviewed the latest configuration | He revisado la configuración más reciente | **Revisé la configuración más reciente** |
| `write-failed` | Could not save. Your previous shortcuts and current draft are preserved. Please retry. | No se pudo guardar. Se conservan los atajos anteriores y el borrador actual. Vuelve a intentarlo. | **No se pudo guardar. Se conservan los atajos anteriores y el borrador actual. Intenta de nuevo.** |
| `not-ready` | Shortcuts are not ready. Please try again. | Los atajos aún no están listos. Vuelve a intentarlo. | **Los atajos aún no están listos. Intenta de nuevo.** |
| `read` | Could not read {location}. Check access permissions, then {reload}. | No se pudo leer {location}. Comprueba los permisos de acceso y luego {reload}. | **No se pudo leer {location}. Revisa los permisos de acceso y luego {reload}.** |
| `future` | Shortcut configuration in {location} was created by a newer version. Upgrade Harness and try again. | La configuración de atajos en {location} se creó con una versión más reciente. Actualiza Harness y vuelve a intentarlo. | **La configuración de atajos en {location} se creó con una versión más reciente. Actualiza Harness e intenta de nuevo.** |
| `native-failed` | Could not protect desktop key recording. Exit recording and try again. | No se pudo proteger la grabación de teclas del escritorio. Sal de la grabación y vuelve a intentarlo. | **No se pudo proteger la grabación de teclas del escritorio. Sal de la grabación e intenta de nuevo.** |

## sidebarBrowser (3 de 26)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `address.placeholder` | Enter an HTTP(S) address | Introduce una dirección HTTP(S) | **Escribe una dirección HTTP(S)** |
| `start` | Enter an HTTP(S) address to start browsing | Introduce una dirección HTTP(S) para empezar a navegar | **Escribe una dirección HTTP(S) para empezar a navegar** |
| `error.empty` | Enter an address. | Introduce una dirección. | **Escribe una dirección.** |

## sidebarExcel (3 de 15)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `loading` | Rendering document... | Representando el documento... | **Procesando el documento...** |
| `invalid` | This spreadsheet could not be opened. Check its format, contents, or password protection. | No se pudo abrir esta hoja de cálculo. Comprueba su formato, su contenido o su protección con contraseña. | **No se pudo abrir esta hoja de cálculo. Revisa su formato, su contenido o su protección con contraseña.** |
| `encoding` | This text encoding could not be read. Save the file as UTF-8 or UTF-16 with a BOM and retry. | No se pudo leer esta codificación de texto. Guarda el archivo como UTF-8 o UTF-16 con BOM y vuelve a intentarlo. | **No se pudo leer esta codificación de texto. Guarda el archivo como UTF-8 o UTF-16 con BOM e intenta de nuevo.** |

## sidebarImage (1 de 11)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `loading` | Rendering document... | Representando el documento... | **Procesando el documento...** |

## sidebarOffice (4 de 15)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `loading` | Rendering document... | Representando el documento... | **Procesando el documento...** |
| `failed` | Office conversion did not produce a usable PDF. Check the file and try again. | La conversión de Office no generó un PDF utilizable. Comprueba el archivo e inténtalo de nuevo. | **La conversión de Office no generó un PDF utilizable. Revisa el archivo e intenta de nuevo.** |
| `timeout` | Office conversion timed out. Try again. | Se agotó el tiempo de la conversión de Office. Inténtalo de nuevo. | **Se agotó el tiempo de la conversión de Office. Intenta de nuevo.** |
| `busy` | Office preview is busy. Try again shortly. | La vista previa de Office está ocupada. Inténtalo de nuevo en breve. | **La vista previa de Office está ocupada. Intenta de nuevo en un momento.** |

## sidebarPdf (3 de 15)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `loading` | Rendering document... | Representando el documento... | **Procesando el documento...** |
| `rendering` | Rendering page… | Representando la página… | **Procesando la página…** |
| `workerFailed` | The PDF rendering process could not continue. Please retry. | El proceso de representación del PDF no pudo continuar. Vuelve a intentarlo. | **El proceso de representación del PDF no pudo continuar. Intenta de nuevo.** |

## sidebarRight (4 de 34)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `dock.drop.left` | Add left split | Añadir división a la izquierda | **Agregar división a la izquierda** |
| `dock.drop.right` | Add right split | Añadir división a la derecha | **Agregar división a la derecha** |
| `dock.drop.top` | Add top split | Añadir división arriba | **Agregar división arriba** |
| `dock.drop.bottom` | Add bottom split | Añadir división abajo | **Agregar división abajo** |

## sidebarTerminal (2 de 28)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `inputFull` | The input buffer is full. Reconnect and try again. | El búfer de entrada está lleno. Vuelve a conectar e inténtalo de nuevo. | **El búfer de entrada está lleno. Vuelve a conectar e intenta de nuevo.** |
| `terminalLimit` | The terminal limit has been reached. Close unused terminals and try again. Exited terminals also count toward the limit. | Se ha alcanzado el límite de terminales. Cierra los terminales que no uses e inténtalo de nuevo. Los terminales finalizados también cuentan para el límite. | **Se ha alcanzado el límite de terminales. Cierra los terminales que no uses e intenta de nuevo. Los terminales finalizados también cuentan para el límite.** |

## trajectory (20 de 192)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `tab.diff` | Diff | Diferencias | **Diff** |
| `tab.systemPrompt` | System Prompt | Indicaciones del sistema | **Prompt del sistema** |
| `record.toolCallOnly` | (tool call only) | (solo llamada a herramienta) | **(solo tool call)** |
| `record.systemPromptMissing` | No system prompt in this request | No hay indicaciones del sistema en esta solicitud | **No hay prompt del sistema en esta solicitud** |
| `record.systemPrompt` | System Prompt | Indicaciones del sistema | **Prompt del sistema** |
| `block.openSummary` | Open Block #{index} tool call summary | Abrir el resumen de llamadas a herramientas del bloque n.º {index} | **Abrir el resumen de tool calls del bloque n.º {index}** |
| `block.openSummaryTitle` | Open tool call summary | Abrir el resumen de llamadas a herramientas | **Abrir el resumen de tool calls** |
| `summary.toolCalls.one` | {count} tool call | {count} llamada a herramienta | **{count} tool call** |
| `summary.toolCalls.other` | {count} tool calls | {count} llamadas a herramientas | **{count} tool calls** |
| `details.toolCalls` | Tool calls | Llamadas a herramientas | **Tool calls** |
| `details.failure.auth` | API key is invalid | La clave de la API no es válida | **La clave de API no es válida** |
| `details.toolCall` | Tool Call | Llamada a herramienta | **Tool Call** |
| `layout.toolCallOnly` | Tool call only | Solo llamada a herramienta | **Solo tool call** |
| `layout.initialSystemPrompt` | Initial System Prompt | Indicaciones del sistema iniciales | **Prompt del sistema inicial** |
| `layout.systemPromptUpdated` | System Prompt Updated | Indicaciones del sistema actualizadas | **Prompt del sistema actualizado** |
| `layout.toolAdded` | Tool added: {name} | Herramienta añadida: {name} | **Herramienta agregada: {name}** |
| `layout.toolsAdded` | Added: {names} | Añadidas: {names} | **Agregadas: {names}** |
| `layout.toolsAddedCount` | {count} added | {count} añadidas | **{count} agregadas** |
| `layout.toolsChanged` | {added} added, {removed} removed | {added} añadidas, {removed} eliminadas | **{added} agregadas, {removed} eliminadas** |
| `layout.systemPromptAndToolsUpdated` | System Prompt and Tools Updated | Indicaciones del sistema y herramientas actualizadas | **Prompt del sistema y herramientas actualizados** |

## voice-input (11 de 101)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `step.check` | Check local resources | Comprobar los recursos locales | **Revisar los recursos locales** |
| `downloadAdvice.network` | Check that the machine running DSH can reach the download source and its model download services. Configure a proxy on that machine if needed, then retry. | Comprueba que la máquina que ejecuta DSH pueda acceder a la fuente de descarga y a sus servicios de descarga de modelos. Si es necesario, configura un proxy en esa máquina y vuelve a intentarlo. | **Revisa que la máquina que ejecuta DSH pueda acceder a la fuente de descarga y a sus servicios de descarga de modelos. Si es necesario, configura un proxy en esa máquina e intenta de nuevo.** |
| `downloadAdvice.dns` | Check DNS and proxy settings on the machine running DSH. Confirm that it can resolve the download source domain, then retry. | Comprueba la configuración de DNS y del proxy en la máquina que ejecuta DSH. Confirma que puede resolver el dominio de la fuente de descarga y vuelve a intentarlo. | **Revisa los ajustes de DNS y del proxy en la máquina que ejecuta DSH. Confirma que puede resolver el dominio de la fuente de descarga e intenta de nuevo.** |
| `downloadAdvice.timeout` | Check the network or proxy connection on the machine running DSH, then retry later. Verified downloaded files are retained. | Comprueba la conexión de red o del proxy en la máquina que ejecuta DSH y vuelve a intentarlo más tarde. Los archivos descargados y verificados se conservan. | **Revisa la conexión de red o del proxy en la máquina que ejecuta DSH e intenta de nuevo más tarde. Los archivos descargados y verificados se conservan.** |
| `downloadAdvice.certificate` | Check the system clock, trusted certificates and proxy settings on the machine running DSH, then retry. | Comprueba el reloj del sistema, los certificados de confianza y la configuración del proxy en la máquina que ejecuta DSH y vuelve a intentarlo. | **Revisa el reloj del sistema, los certificados de confianza y los ajustes del proxy en la máquina que ejecuta DSH e intenta de nuevo.** |
| `downloadAdvice.http` | Confirm that the download address is available and the proxy can reach the download service, or retry later. | Confirma que la dirección de descarga esté disponible y que el proxy pueda acceder al servicio de descarga, o vuelve a intentarlo más tarde. | **Confirma que la dirección de descarga esté disponible y que el proxy pueda acceder al servicio de descarga, o intenta de nuevo más tarde.** |
| `downloadAdvice.storage` | Check available disk space and write permission for the model directory on the machine running DSH, then retry. | Comprueba el espacio en disco disponible y el permiso de escritura del directorio de modelos en la máquina que ejecuta DSH y vuelve a intentarlo. | **Revisa el espacio en disco disponible y el permiso de escritura del directorio de modelos en la máquina que ejecuta DSH e intenta de nuevo.** |
| `downloadAdvice.unknown` | Check the network, disk space and model directory permissions on the machine running DSH, then retry. | Comprueba la red, el espacio en disco y los permisos del directorio de modelos en la máquina que ejecuta DSH y vuelve a intentarlo. | **Revisa la red, el espacio en disco y los permisos del directorio de modelos en la máquina que ejecuta DSH e intenta de nuevo.** |
| `preparation.checking` | Checking local resources… | Comprobando los recursos locales… | **Revisando los recursos locales…** |
| `interrupted` | Recording was interrupted. Please try again. | La grabación se interrumpió. Vuelve a intentarlo. | **La grabación se interrumpió. Intenta de nuevo.** |
| `empty` | No speech recognized | No se ha reconocido voz | **No se reconoció voz** |

## workspace (12 de 112)

| clave | inglés | referencia `es` | `es-CL` |
|---|---|---|---|
| `shortcut.directoryBusy` | Selecting or adding a workspace | Seleccionando o añadiendo un espacio de trabajo | **Seleccionando o agregando un espacio de trabajo** |
| `shortcut.forkFailed` | Could not fork the session. Try again. | No se pudo bifurcar la sesión. Inténtalo de nuevo. | **No se pudo bifurcar la sesión. Intenta de nuevo.** |
| `workspace.add` | Add workspace | Añadir espacio de trabajo | **Agregar espacio de trabajo** |
| `menu.addWorkspace` | Add workspace… | Añadir espacio de trabajo… | **Agregar espacio de trabajo…** |
| `delete.desc` | This removes “{name}” from the workspace list. The folder and session logs will be kept. Its sessions will appear under Ungrouped. | Esto quita “{name}” de la lista de espacios de trabajo. La carpeta y los registros de sesión se conservarán. Sus sesiones aparecerán en Sin agrupar. | **Esto quita “{name}” de la lista de espacios de trabajo. La carpeta y los logs de sesión se conservarán. Sus sesiones aparecerán en Sin agrupar.** |
| `toast.pinFailed` | Pin failed. Try again later. | No se pudo fijar. Inténtalo de nuevo más tarde. | **No se pudo fijar. Intenta de nuevo más tarde.** |
| `toast.unpinFailed` | Unpin failed. Try again later. | No se pudo desfijar. Inténtalo de nuevo más tarde. | **No se pudo desfijar. Intenta de nuevo más tarde.** |
| `time.minutes` | {n}min | {n}min | **{n} min** |
| `time.hours` | {n}h | {n}h | **{n} h** |
| `time.days` | {n}d | {n}d | **{n} d** |
| `time.months` | {n}mo | {n}mes | **{n} mes** |
| `time.years` | {n}y | {n}a | **{n} a** |
