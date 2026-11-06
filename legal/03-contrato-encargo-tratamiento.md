# Contrato de encargo del tratamiento (art. 28 RGPD)

**BORRADOR — versión `[VERSION]` — `[FECHA]`**

**Responsable del tratamiento**: `[ORGANIZACIÓN]`, NIF `[NIF_ORG]`, domicilio `[DOMICILIO_ORG]` (la "Organización").
**Encargado del tratamiento**: `[TITULAR]`, NIF `[NIF]`, domicilio `[DOMICILIO]` (el "Encargado"), titular de la plataforma AutoQR.

## 1. Objeto
El Encargado trata datos personales por cuenta de la Organización para prestarle el servicio AutoQR (emisión, canje y estadística de tickets con QR y mensajería con sus clientes).

## 2. Descripción del tratamiento
| Elemento | Detalle |
|---|---|
| Naturaleza y finalidad | Alojamiento, almacenamiento, consulta, envío de notificaciones y emisión de informes sobre la actividad de tickets |
| Tipos de datos | Identificativos y de contacto (nombre, email, teléfono opcional), actividad de tickets y canjes, mensajes, datos técnicos de acceso |
| Categorías de interesados | Clientes (mayores de 14 años), empleados y administradores de la Organización |
| Categorías especiales | No se tratan |
| Duración | La del servicio, más el plazo de devolución/supresión |

## 3. Obligaciones del Encargado
1. Tratar los datos solo siguiendo las instrucciones documentadas de la Organización, incluidas las transferencias internacionales; informar si una instrucción infringe la normativa.
2. Garantizar la confidencialidad de las personas autorizadas.
3. Aplicar las medidas de seguridad del Anexo I.
4. No recurrir a otros encargados sin autorización; la Organización autoriza con carácter general los subencargados del Anexo II y será informada de altas o cambios con antelación para poder oponerse. Los subencargados asumen las mismas obligaciones.
5. Asistir a la Organización en el ejercicio de derechos de los interesados (acceso, rectificación, supresión, etc.), ofreciendo funciones en la aplicación y respondiendo en plazo razonable.
6. Asistir en la seguridad, notificación de brechas y evaluaciones de impacto. **Notificará las brechas a la Organización sin dilación indebida y, en todo caso, en menos de 48 horas desde que tenga constancia**.
7. Al terminar el servicio, devolver (exportación) y suprimir los datos, incluidas las copias, en un máximo de `[30]` días, salvo obligación legal de conservación.
8. Poner a disposición la información necesaria para demostrar el cumplimiento y permitir auditorías razonables, con preaviso.
9. Llevar un registro de las actividades de tratamiento realizadas por cuenta de la Organización.

## 4. Obligaciones de la Organización
1. Contar con base legal para tratar los datos de sus clientes y empleados e informarles (la política de privacidad de AutoQR ayuda, pero no sustituye sus obligaciones).
2. No dar de alta a menores de 14 años.
3. Gestionar correctamente los roles y accesos de su personal y mantener seguras las credenciales.
4. Atender los derechos de los interesados en su condición de responsable.

## 5. Responsabilidad y duración
El contrato dura lo que el servicio. Cada parte responde conforme a la normativa de protección de datos y a las condiciones de la relación comercial entre ambas.

## 6. Ley aplicable
Ley española y RGPD. Jurisdicción: `[JURISDICCIÓN]`.

---

## Anexo I — Medidas de seguridad
- Cifrado en tránsito (TLS 1.2+) y en reposo (disco y copias de seguridad).
- Contraseñas con argon2id; sesiones revocables; segundo factor obligatorio para el administrador de la plataforma y opcional para administradores de Organización.
- Aislamiento entre Organizaciones (Row Level Security y pruebas automáticas de aislamiento).
- Registros de canjes y de auditoría inalterables; reversiones solo por el administrador de la plataforma con motivo registrado.
- Copias de seguridad continuas y cifradas, con pruebas periódicas de restauración (RPO ≤ 15 min, RTO ≤ 4 h).
- Control de acceso mínimo, registro de acciones de administración y actualizaciones de seguridad.
- Procedimiento de respuesta a incidentes.

## Anexo II — Subencargados autorizados
Ver tabla de la [política de privacidad](02-politica-de-privacidad.md#4-quién-los-ve) (alojamiento, copias, email, notificaciones push, registro de errores). Se mantendrá actualizada.
