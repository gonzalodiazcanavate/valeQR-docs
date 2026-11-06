# 03 — Requisitos funcionales

Prioridad: **M** = MVP · **S** = siguiente fase · **C** = futuro/opcional.
Los IDs son estables. Rol mínimo entre paréntesis: C=client, E=employee, A=org_admin, P=platform_admin.

## AUTH — Cuenta y autenticación

| ID | Requisito | Rol | Prio |
|---|---|---|---|
| RF-AUTH-01 | Registro **solo** por invitación de un solo uso (enlace con token que caduca) o alta manual por un administrador. No hay registro público | — | M |
| RF-AUTH-02 | Inicio de sesión con email + contraseña | — | M |
| RF-AUTH-03 | Verificación de email | — | M |
| RF-AUTH-04 | Recuperación de contraseña por email (enlace de un solo uso) | — | M |
| RF-AUTH-05 | Gestión de sesiones: ver dispositivos, cerrar sesión remota | C | M |
| RF-AUTH-06 | MFA TOTP (obligatorio para P, activable para el resto) | C | M |
| RF-AUTH-07 | Passkeys / WebAuthn | C | S |
| RF-AUTH-08 | Aceptar una invitación con un usuario ya existente (añade membership sin crear cuenta nueva) | C | M |
| RF-AUTH-09 | Borrado de cuenta propia (requisito de Apple/RGPD). Anonimiza, conserva el libro de canjes | C | M |
| RF-AUTH-10 | Aceptación obligatoria de términos y condiciones y política de privacidad en el primer acceso; se registra versión y fecha (`terms_acceptances`) y se vuelve a pedir si cambia la versión | C | M |

## PLAT — Administración de plataforma

| ID | Requisito | Rol | Prio |
|---|---|---|---|
| RF-PLAT-01 | Alta manual de una organización con su primer `org_admin` | P | M |
| RF-PLAT-02 | Alta por invitación: envío de email con enlace de un solo uso para que la organización complete su registro | P | M |
| RF-PLAT-03 | Suspender / reactivar / dar de baja una organización (baja = borrado lógico + exportación + purga programada) | P | M |
| RF-PLAT-04 | Listar y buscar organizaciones y usuarios; ver detalle | P | M |
| RF-PLAT-05 | Gestionar cualquier usuario (bloquear, forzar cambio de contraseña, resetear MFA) | P | M |
| RF-PLAT-06 | Revertir un canje (con motivo obligatorio, genera registro de reversión y auditoría) | P | M |
| RF-PLAT-07 | Consultar auditoría global con filtros | P | M |
| RF-PLAT-08 | Suplantación de usuario con motivo, límite temporal y auditoría | P | S |
| RF-PLAT-09 | Panel de salud/uso de la plataforma (nº orgs, usuarios activos, canjes/día) | P | S |
| RF-PLAT-10 | [RETIRADO] Plan y facturación por organización. La aplicación no gestiona cobros; el responsable los gestiona fuera de ella | P | — |

## ORG — Gestión de organización

| ID | Requisito | Rol | Prio |
|---|---|---|---|
| RF-ORG-01 | Alta manual de clientes y empleados | A | M |
| RF-ORG-02 | Alta por invitación (email con enlace de un solo uso, rol predefinido, caducidad configurable) | A | M |
| RF-ORG-03 | Baja de clientes y empleados (borrado lógico de la membership) | A | M |
| RF-ORG-04 | Cambiar rol de un miembro (cliente⇄empleado⇄org_admin) respetando la regla del último admin | A | M |
| RF-ORG-05 | Importación masiva de clientes desde CSV | A | S |
| RF-ORG-06 | Ajustes de la organización (nombre, logo, zona horaria, MFA obligatorio, permitir/denegar QR estático impreso) | A | M |
| RF-ORG-07 | Reenviar / revocar invitaciones pendientes | A | M |
| RF-ORG-08 | Exportar datos de la organización (CSV/JSON) | A | S |
| RF-ORG-09 | Gestión de **sedes** (varias sucursales por organización): crear, editar, desactivar | A | M |
| RF-ORG-10 | Asignar empleados a una o varias sedes. Los clientes y los tickets pertenecen a la organización y valen en cualquier sede | A | M |

## TKT — Tickets

| ID | Requisito | Rol | Prio |
|---|---|---|---|
| RF-TKT-01 | Emitir N tickets a un cliente (individual y en lote a varios clientes) | A | M |
| RF-TKT-02 | Cada ticket tiene estado: `active`, `redeemed`, `expired`, `voided` | — | M |
| RF-TKT-03 | Caducidad opcional por ticket (por defecto de la organización) | A | M |
| RF-TKT-04 | Anular un ticket no canjeado (motivo obligatorio) | A | M |
| RF-TKT-05 | El cliente ve sus tickets activos, canjeados, caducados y anulados | C | M |
| RF-TKT-06 | El cliente genera el QR de uno de sus tickets activos (QR de corta vida, ver [arquitectura](06-arquitectura.md)) | C | M |
| RF-TKT-07 | Tipos de ticket definidos por la organización: nombre, descripción, utilidad y **metadatos libres** (clave/valor). Un ticket = una unidad canjeable (una clase) | A | M |
| RF-TKT-08 | Nota interna al emitir un ticket (ej. referencia de pago) | A | M |
| RF-TKT-09 | Aviso a cliente cuando recibe tickets y cuando le caducan | C | M |
| RF-TKT-10 | Generar un **PDF imprimible** del ticket (nombre, tipo, organización, titular, caducidad, QR estático, código corto), por el cliente titular o `org_admin` | C | M |
| RF-TKT-11 | Cada ticket tiene un **QR estático** válido hasta que el ticket deje de estar activo (apto para impresión), además del QR dinámico de la app | C | M |
| RF-TKT-12 | Regenerar el QR estático: invalida los impresos anteriores del ticket (p. ej. si se pierde el papel) | C | M |
| RF-TKT-13 | La caducidad es opcional: la fija la organización al emitir (fecha concreta) o por defecto del tipo; sin fecha, no caduca | A | M |

## RDM — Canje

| ID | Requisito | Rol | Prio |
|---|---|---|---|
| RF-RDM-01 | El empleado escanea el QR con la cámara del móvil | E | M |
| RF-RDM-02 | Tras el escaneo se muestra una **previsualización** (cliente con nombre, email y teléfono si lo tiene, tipo de ticket, saldo restante) y el empleado confirma | E | M |
| RF-RDM-03 | El canje es **atómico e idempotente**: un ticket solo puede canjearse una vez, aunque se escanee dos veces a la vez o se reintente por mala red | E | M |
| RF-RDM-04 | Un QR caducado, ya usado, de otra organización o de un ticket no activo se rechaza con un motivo claro | E | M |
| RF-RDM-05 | Se registra quién, cuándo, a quién, qué ticket y desde qué dispositivo | E | M |
| RF-RDM-06 | Tras el canje, el cliente recibe una notificación y su pantalla de QR se actualiza al instante | C | M |
| RF-RDM-07 | Canje manual por código alfanumérico corto como alternativa si la cámara falla | E | S |
| RF-RDM-08 | Canje offline con sincronización posterior | E | C |
| RF-RDM-09 | Prohibido el auto-canje (ver [roles](02-usuarios-y-roles.md)) | — | M |
| RF-RDM-10 | El escáner acepta tanto el QR dinámico (pantalla) como el QR estático (impreso); mismas validaciones y mismo canje de un solo uso | E | M |
| RF-RDM-11 | El canje registra la **sede** en la que se realiza (obligatoria si la organización tiene más de una; el empleado elige entre sus sedes asignadas). Sin geolocalización | E | M |

## STAT — Estadísticas

| ID | Requisito | Rol | Prio |
|---|---|---|---|
| RF-STAT-01 | Cliente: tickets activos/canjeados/caducados, historial y serie temporal propios | C | M |
| RF-STAT-02 | Empleado: canjes propios por día/semana/mes, por cliente, historial | E | M |
| RF-STAT-03 | Organización: emitidos vs canjeados vs caducados en el tiempo | A | M |
| RF-STAT-04 | Organización: ranking y detalle por empleado y por cliente | A | M |
| RF-STAT-05 | Organización: tickets "vivos" por cliente (saldo), clientes sin saldo, clientes inactivos | A | M |
| RF-STAT-06 | Filtros por rango de fechas, empleado, cliente, tipo de ticket y sede | A | M |
| RF-STAT-07 | Exportar estadísticas a CSV | A | S |
| RF-STAT-08 | Informes periódicos por email (semanal/mensual) | A | C |

## MSG — Mensajería

| ID | Requisito | Rol | Prio |
|---|---|---|---|
| RF-MSG-01 | El cliente abre una conversación con su organización (categoría: consulta o reclamación) | C | M |
| RF-MSG-02 | Los `org_admin` ven y responden conversaciones; el cliente recibe notificación | A | M |
| RF-MSG-03 | Estados de conversación: abierta, cerrada; reapertura por el cliente | C | M |
| RF-MSG-04 | Una reclamación puede referenciar un ticket/canje concreto. La decide el `org_admin`; si procede revertir el canje, lo solicita al administrador de plataforma por el canal de soporte | C | M |
| RF-MSG-05 | Límite de frecuencia y de tamaño de mensaje (anti-spam) | — | M |
| RF-MSG-06 | Adjuntos de imagen | C | C |
| RF-MSG-07 | Los empleados pueden ser asignados a una conversación | A | C |

## NTF — Notificaciones

| ID | Requisito | Rol | Prio |
|---|---|---|---|
| RF-NTF-01 | Centro de notificaciones in-app con marcado de leído | C | M |
| RF-NTF-02 | Push móvil (FCM/APNs) y push web opcional | C | M |
| RF-NTF-03 | Emails transaccionales (invitación, verificación, reset, aviso de ticket) | — | M |
| RF-NTF-04 | Preferencias por usuario y tipo de notificación | C | S |

## PRF — Perfil

| ID | Requisito | Rol | Prio |
|---|---|---|---|
| RF-PRF-01 | Editar nombre, teléfono, idioma, avatar | C | M |
| RF-PRF-02 | Cambiar email (con reverificación) y contraseña | C | M |
| RF-PRF-03 | Descargar mis datos (portabilidad RGPD) | C | S |

## PLT — Plataformas

| ID | Requisito | Rol | Prio |
|---|---|---|---|
| RF-PLT-01 | Web responsive con dashboard por rol, notificaciones y estadísticas | — | M |
| RF-PLT-02 | App Android e iOS con las mismas funciones y escáner QR nativo | — | M |
| RF-PLT-03 | Enlaces profundos (universal/app links) para abrir invitaciones en la app | — | M |
| RF-PLT-04 | Comprobación de versión mínima soportada de la app (forzar actualización) | — | M |
| RF-PLT-05 | Interfaz en español; estructura i18n lista para más idiomas | — | M |

## AUD — Auditoría

| ID | Requisito | Rol | Prio |
|---|---|---|---|
| RF-AUD-01 | Toda acción sensible (alta/baja, cambio de rol, emisión/anulación, canje, reversión, login fallido, cambio de MFA) se registra en un log de auditoría append-only | — | M |
| RF-AUD-02 | `org_admin` consulta la auditoría de su organización | A | S |
