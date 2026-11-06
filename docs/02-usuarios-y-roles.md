# 02 — Usuarios, roles y permisos

## Perfiles de usuario

| Perfil | Descripción | Dispositivo principal | Necesidad clave |
|---|---|---|---|
| Administrador de plataforma | El desarrollador. Operación y soporte | Web escritorio | Control total, trazabilidad de sus propias acciones |
| Administrador de organización (`org_admin`) | Dueño/jefe de la autoescuela | Web escritorio + móvil | Gestionar personas, emitir tickets, ver estadísticas |
| Empleado (`employee`) | Profesor de autoescuela | Móvil | Escanear y canjear en segundos, con una mano |
| Cliente (`client`) | Alumno | Móvil | Ver saldo, enseñar el QR, reclamar. Mínima fricción |

## Modelo de roles

- **Rol de plataforma**: booleano `users.is_platform_admin`. Solo el desarrollador. Exige MFA.
- **Rol por organización**: tabla `memberships` (`user_id`, `organization_id`, `role`). Un usuario puede tener 0..N memberships, con un rol distinto en cada una.
- **Jerarquía incremental**: `client` < `employee` < `org_admin`. Cada rol hereda los permisos del anterior. Se implementa como un rango numérico (1, 2, 3) y políticas explícitas por acción.
- El rol **siempre** se evalúa en el contexto de la organización de la petición (`/v1/orgs/{orgId}/...`), nunca de forma global.

## Matriz de permisos

`✔` permitido · `—` no permitido · `propio` solo sobre sus propios datos

| Acción | client | employee | org_admin | platform_admin |
|---|---|---|---|---|
| Ver y editar su perfil | ✔ | ✔ | ✔ | ✔ |
| Ver sus tickets (activos/canjeados) y su QR | ✔ | ✔ | ✔ | ✔ |
| Ver estadísticas propias de tickets | ✔ | ✔ | ✔ | ✔ |
| Enviar mensajes/reclamaciones a la organización | ✔ | ✔ | ✔ | ✔ |
| Escanear y canjear tickets de clientes | — | ✔ | ✔ | ✔ |
| Ver historial y estadísticas de canjes propios (serie temporal, por cliente) | — | propio | ✔ | ✔ |
| Canjear un ticket propio (auto-canje) | — | — | — | — |
| Ver clientes de la organización (nombre, email, teléfono opcional) | — | ✔ | ✔ | ✔ |
| Ver listado completo de miembros (incl. empleados y roles) | — | — | ✔ | ✔ |
| Invitar / dar de alta / dar de baja clientes y empleados | — | — | ✔ | ✔ |
| Cambiar rol cliente⇄empleado (y a `org_admin`) | — | — | ✔ | ✔ |
| Emitir tickets (individual/lote) | — | — | ✔ | ✔ |
| Anular un ticket **no canjeado** | — | — | ✔ | ✔ |
| Estadísticas globales de la organización | — | — | ✔ | ✔ |
| Responder mensajes de clientes | — | — | ✔ | ✔ |
| Ajustes de la organización y gestión de sedes | — | — | ✔ | ✔ |
| **Revertir/modificar un canje realizado** | — | — | — | ✔ |
| Alta/baja/suspensión de organizaciones | — | — | — | ✔ |
| Gestionar cualquier usuario de cualquier organización | — | — | — | ✔ |
| Ver auditoría global | — | — | — | ✔ |

## Reglas especiales

1. **Canjes inmutables**: ni siquiera `org_admin` puede editar o borrar un canje. Solo `platform_admin`, mediante una *reversión* registrada (no se borra el canje original). Ver [modelo](05-modelo-de-dominio.md).
2. **Sin auto-canje**: un usuario nunca puede canjear un ticket cuyo titular es él mismo, aunque sea empleado o `org_admin` en esa organización.
3. **Último `org_admin`**: no se puede degradar ni dar de baja al último `org_admin` activo de una organización.
4. **Baja de miembro**: la membership pasa a `removed` (borrado lógico). Sus tickets y canjes históricos se conservan; los tickets activos quedan inutilizables mientras no esté activo.
5. **Multi-organización**: un usuario autenticado elige su organización activa; la UI cambia según su rol en ella. El token de sesión no fija organización: se valida por petición.
6. **Suplantación (impersonation)** por `platform_admin`: solo de lectura por defecto, con motivo obligatorio, límite temporal y registro en auditoría. Se evita el "control total" invisible.
7. **MFA**: obligatorio para `platform_admin`; recomendado y activable por organización para `org_admin`.
8. **Varios `org_admin`** por organización permitidos; un `org_admin` también puede canjear (hereda permisos de empleado), salvo sus propios tickets.
9. **Sedes**: son un atributo de la organización, no un límite de permisos. Los roles siguen siendo por organización; el empleado está asignado a una o varias sedes y el canje registra la sede.
10. **Datos de contacto**: empleados y `org_admin` ven nombre, email y teléfono (opcional) de los clientes de su organización. El `org_admin` es quien decide sobre las reclamaciones.
