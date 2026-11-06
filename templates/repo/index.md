# Índice de funcionalidades — `<nombre-del-repo>`

<!-- Plantilla. Una fila por funcionalidad. El agente debe consultar este archivo antes de cualquier cambio. -->

| Funcionalidad | Resumen (1 línea) | Requisitos | Documento de contexto |
|---|---|---|---|
| <Autenticación> | <Login, sesiones, MFA, invitaciones> | RF-AUTH-01..06 | [auth.md](auth.md) |
| <...> | <...> | <RF-...> | <enlace> |

## Documentos transversales

| Tema | Documento |
|---|---|
| Arquitectura del repo | <docs/architecture.md> |
| Decisiones locales | <docs/decisions.md> |
| Cómo ejecutar y probar | <docs/dev.md> |

## Reglas del índice

- Todo documento de `docs/` debe estar listado aquí (lo verifica el job `docs-check`).
- Al añadir una funcionalidad nueva, añade su fila en el mismo PR.
- Un documento sin funcionalidad asociada se elimina o se enlaza.
