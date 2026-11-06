# Registro de actividades de tratamiento (RAT)

**BORRADOR — uso interno — `[FECHA]`** · Responsable/encargado: `[TITULAR]`, NIF `[NIF]`, contacto `[EMAIL_PRIVACIDAD]`.

## A. Como responsable del tratamiento (datos de cuentas)

| Campo | Contenido |
|---|---|
| Actividad | Gestión de cuentas de usuario, autenticación y seguridad de AutoQR |
| Finalidad | Permitir el acceso, proteger cuentas, prevenir abusos, acreditar la aceptación de términos |
| Interesados | Usuarios de la plataforma |
| Datos | Nombre, email, hash de contraseña, secreto MFA cifrado, sesiones, IP, aceptaciones de términos, registros de auditoría |
| Base legal | Ejecución del contrato; interés legítimo (seguridad); obligación legal |
| Destinatarios | Subencargados técnicos (ver política de privacidad) |
| Transferencias internacionales | Notificaciones push (FCM/APNs) con garantías contractuales |
| Plazos de supresión | Cuenta mientras exista; sesiones 30 días; auditoría `[24 meses]`; copias 30 días |
| Medidas de seguridad | Ver anexo I del contrato de encargo y [seguridad](../docs/09-seguridad-y-privacidad.md) |

## B. Como encargado del tratamiento (por cuenta de cada Organización)

| Campo | Contenido |
|---|---|
| Responsables | Lista de Organizaciones (se mantiene en una hoja interna sin datos personales de clientes) |
| Categorías de tratamiento | Alojamiento y procesamiento de datos de tickets, canjes, mensajes y estadísticas; envío de notificaciones |
| Transferencias internacionales | Las mismas que arriba |
| Medidas de seguridad | Anexo I del contrato de encargo |
| Contrato | Contrato de encargo firmado con cada Organización (`03-contrato-encargo-tratamiento.md`) |

## C. Otros registros de cumplimiento
| Elemento | Dónde |
|---|---|
| Contratos con subencargados | `[carpeta privada]` |
| Procedimiento de brechas (aviso a la AEPD en 72 h cuando proceda; a la Organización en < 48 h) | [09](../docs/09-seguridad-y-privacidad.md#5-respuesta-a-incidentes-resumen) |
| Atención de derechos de los interesados | Plazo de 1 mes; funciones en la app (perfil, descarga, borrado) |
| Versiones aceptadas de términos y privacidad | Tabla `terms_acceptances` |
