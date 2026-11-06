# 18 — Glosario

| Término | Definición |
|---|---|
| Plataforma | El sistema AutoQR completo, operado por el desarrollador |
| Administrador de plataforma (`platform_admin`) | El desarrollador; control total auditado |
| Organización (`organization`) | Negocio cliente de la plataforma (p. ej. una autoescuela). Unidad de tenancy |
| Membership | Relación usuario–organización con un rol |
| `org_admin` | Administrador/jefe de una organización |
| Empleado (`employee`) | Miembro que escanea y canjea tickets (profesor) |
| Cliente (`client`) | Miembro que recibe y usa tickets (alumno) |
| Ticket / vale | Unidad canjeable emitida a un cliente (una clase práctica) |
| Emitir | Crear tickets a nombre de un cliente |
| Canjear / redención | Consumir un ticket activo mediante el escaneo de su QR por un empleado |
| Reversión | Registro creado por el administrador de plataforma que deshace un canje sin borrarlo |
| Anular (`void`) | Invalidar un ticket **no canjeado** (org_admin) |
| QR firmado | Token HMAC de corta vida que se muestra como código QR |
| Libro / ledger | Conjunto de tablas append-only (`redemptions`, `redemption_reversals`, `ticket_events`, `audit_log`) |
| Invitación | Enlace de un solo uso que permite registrarse o unirse a una organización |
| RLS | Row Level Security de PostgreSQL |
| RPO / RTO | Pérdida máxima de datos tolerada / tiempo máximo de recuperación |
| ADR | Architecture Decision Record |
| Documento de contexto | Documento que describe en profundidad una funcionalidad, consumido por humanos y agentes |
| SSE | Server-Sent Events |
| RAT | Registro de Actividades de Tratamiento (RGPD) |
