# AGENTS.md — `<nombre-del-repo>`

<!-- Plantilla. Sustituir marcadores <...>. Mantener corto. -->

## Qué es este repositorio

<Una o dos frases: qué contiene y su papel en AutoQR (plataforma de gestión de vales con QR). Ejemplo: "API REST y worker de AutoQR (Fastify + PostgreSQL)">.

Documentación de producto completa: repositorio `valeQR-docs` (ver su `index.md`).

## Protocolo obligatorio antes de tocar nada

1. Lee [docs/index.md](docs/index.md): lista las funcionalidades de este repo y su documento de contexto.
2. Comprueba si lo que te piden encaja con alguna funcionalidad del índice.
   - **Sí** → lee su documento de contexto y los que enlace, para saber dónde mirar y qué respetar.
   - **No** → es una funcionalidad nueva: crea un documento de contexto con [docs/_template.md](docs/_template.md) y añádelo al índice **como parte del cambio**.
3. Implementa.
4. Actualiza el documento de contexto afectado (comportamiento, reglas, endpoints, modelo, decisiones) y el índice.
5. Si el cambio afecta a otro repo (contrato, datos, infra) o a producto, indícalo en el PR y actualiza `valeQR-docs`.

## Prácticas

- <Stack y comandos: instalar, lint, tipos, test, build, ejecutar>.
- TypeScript estricto; funciones pequeñas; dominio puro separado de IO.
- Tests con cada cambio. Reglas críticas (canje, permisos, tenancy) con tests obligatorios.
- Los permisos se verifican **en servidor**, por organización y rol (`client` < `employee` < `org_admin`; `platform_admin` aparte).
- Toda tabla de negocio lleva `organization_id` y RLS.
- Nunca modifiques ni borres filas de `redemptions`, `redemption_reversals`, `ticket_events` ni `audit_log`.
- No añadas dependencias sin justificarlo en el PR. No hagas refactors ajenos a la tarea.
- Sin secretos ni datos personales reales en código, tests, logs ni docs.
- Commits convencionales; ramas cortas; PR obligatorio.
- Si falta contexto, pregunta o registra la duda; no inventes requisitos.

## Definición de hecho

Código + tests en verde + lint/tipos + documentación y `docs/index.md` actualizados + PR con la plantilla completada.
