# AGENTS.md — repositorio `valeQR-docs`

Fuente de verdad de la documentación de **AutoQR**: plataforma multi-negocio de gestión de vales/tickets con QR. Este repositorio no contiene código de la aplicación.

## Cómo trabajar aquí

1. Lee [index.md](index.md). Busca si lo pedido encaja con un documento existente.
2. Si encaja: lee ese documento y los enlazados antes de cambiar nada.
3. Si no encaja: crea un documento nuevo en `docs/` (plantilla en `templates/repo/context-doc.md`) y añádelo al índice.
4. Tras cualquier cambio, actualiza los documentos afectados **en el mismo commit** (requisitos, modelo, API, seguridad, ADR...). Nada de documentos desfasados.
5. Si un cambio altera una decisión de arquitectura, añade o actualiza un ADR en [docs/16-decisiones-adr.md](docs/16-decisiones-adr.md).

## Reglas

- Idioma de la documentación: español. Identificadores técnicos (tablas, endpoints, roles, código): inglés.
- Los requisitos llevan ID estable (`RF-XXX-NN`, `RNF-XXX-NN`). Nunca reutilices un ID; si un requisito se elimina, márcalo como `[RETIRADO]`.
- Una decisión pendiente se registra en [docs/17-riesgos-y-preguntas-abiertas.md](docs/17-riesgos-y-preguntas-abiertas.md), no se deja implícita.
- Las plantillas de `templates/` se copian tal cual a cada repositorio de código; si cambias una, indica en el commit que hay que propagarla.
- No incluyas secretos, credenciales ni datos personales reales en ningún documento.
- Mantén los documentos concisos: tablas y listas antes que prosa.
