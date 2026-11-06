# Política de privacidad de AutoQR

**BORRADOR — versión `[VERSION]` — `[FECHA]`**

## 1. Quién trata tus datos
AutoQR se usa en un contexto con dos figuras:

| Figura | Quién | Para qué datos |
|---|---|---|
| **Responsable** | La **Organización** de la que eres cliente o empleado (p. ej. tu autoescuela) | Datos de su relación contigo: tickets, canjes, mensajes, datos de miembro |
| **Encargado** | `[TITULAR]` (NIF `[NIF]`, `[DOMICILIO]`), que opera AutoQR por cuenta de la Organización | Los mismos datos, solo siguiendo las instrucciones de la Organización |
| **Responsable** | `[TITULAR]` | Datos de tu **cuenta** de usuario (acceso, seguridad, sesiones, aceptación de términos) |

Contacto de privacidad: `[EMAIL_PRIVACIDAD]`.

## 2. Qué datos tratamos
- **Cuenta**: nombre, email, contraseña (almacenada cifrada con un algoritmo de hash, nunca en claro), teléfono (opcional), idioma, foto (opcional).
- **Actividad**: tickets que recibes, canjes (quién, cuándo, en qué sede, qué tipo de QR), mensajes con la Organización.
- **Técnicos**: dirección IP, tipo de dispositivo y aplicación, sesiones, registros de seguridad, token de notificaciones push.
- **No recogemos** datos de ubicación, fecha de nacimiento ni categorías especiales de datos.

## 3. Para qué y con qué base legal
| Finalidad | Base legal (RGPD art. 6) |
|---|---|
| Gestionar tu cuenta y la relación con la Organización (emitir, mostrar y canjear tickets, mensajería) | Ejecución de la relación contractual entre tú y la Organización (b) |
| Seguridad, prevención del fraude y auditoría de canjes | Interés legítimo (f) |
| Enviarte avisos del servicio (invitaciones, tickets recibidos/caducados, respuestas) | Ejecución del contrato (b) |
| Cumplir obligaciones legales | Obligación legal (c) |

No usamos tus datos para publicidad, perfilado comercial ni los vendemos.

## 4. Quién los ve
- **Dentro de la Organización**: los clientes ven sus propios datos; los empleados ven nombre, email y teléfono de los clientes; los administradores de la Organización ven los de todos sus miembros y las estadísticas.
- **El administrador de la plataforma** accede únicamente para soporte, seguridad y correcciones, y sus acciones quedan registradas.
- **Subencargados** (proveedores técnicos), con contrato de tratamiento:

| Proveedor | Servicio | Ubicación |
|---|---|---|
| `[PROVEEDOR_VPS]` | Alojamiento del servidor y la base de datos | `[UE / España]` |
| `[PROVEEDOR_ALMACENAMIENTO]` | Copias de seguridad cifradas | `[UE]` |
| `[PROVEEDOR_EMAIL]` | Envío de correos transaccionales | `[UE]` |
| Google (Firebase Cloud Messaging) y Apple (APNs) | Notificaciones push | Posible transferencia fuera del EEE con garantías adecuadas |
| Sentry | Registro de errores técnicos (sin contenido de mensajes ni credenciales) | UE |

## 5. Cuánto tiempo los conservamos
| Dato | Plazo |
|---|---|
| Cuenta | Mientras la mantengas. Al borrarla se anonimiza |
| Registros de canjes y auditoría | Se conservan anonimizados el tiempo necesario para la auditoría de la Organización (máx. `[24 meses]` para registros de seguridad) |
| Sesiones caducadas | 30 días |
| Copias de seguridad | Hasta 30 días |

## 6. Tus derechos
Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad:
- Directamente en la aplicación (editar perfil, descargar datos, borrar cuenta).
- Escribiendo a `[EMAIL_PRIVACIDAD]` o a tu Organización.
Responderemos en un máximo de un mes. Si consideras vulnerados tus derechos, puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).

## 7. Seguridad
Cifrado en tránsito (TLS), contraseñas con hash robusto, segundo factor opcional, aislamiento estricto entre Organizaciones, registros de auditoría inalterables y copias cifradas. En caso de brecha de seguridad con riesgo para ti, se notificará conforme a la ley.

## 8. Edad mínima
El servicio es para mayores de 14 años.

## 9. Cookies
Solo usamos cookies técnicas estrictamente necesarias (sesión). Ver [aviso legal y cookies](05-aviso-legal-y-cookies.md).

## 10. Cambios
Si cambia esta política, te lo comunicaremos y se te pedirá aceptar la nueva versión cuando proceda.
