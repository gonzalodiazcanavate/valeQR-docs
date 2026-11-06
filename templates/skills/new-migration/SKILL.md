---
name: new-migration
description: Pasos para crear migraciones de PostgreSQL seguras en valeQR-api (RLS, append-only, expand/contract). Usar al cambiar el esquema de la base de datos.
---

# new-migration

1. **Contexto**: aplica `context-sync`; revisa `valeQR-docs/docs/05-modelo-de-dominio.md`.
2. **SQL versionado** en `src/db/migrations/`; un cambio lógico por migración.
3. **Expand/contract**: añade (nullable/por defecto) → migra datos → cambia código → elimina en un release posterior. Nada destructivo en el mismo release.
4. **Tablas nuevas de negocio**: `organization_id NOT NULL`, índice con `organization_id` al inicio, `ENABLE ROW LEVEL SECURITY` y política con `current_setting('app.org_id')`.
5. **Permisos**: concede al rol de la aplicación solo lo necesario. Tablas append-only: solo `SELECT, INSERT` + trigger que rechaza `UPDATE/DELETE`.
6. **Índices** para las consultas previstas (estadísticas, listados).
7. **Tests**: la migración se aplica sobre BD limpia y sobre un snapshot previo (Testcontainers); test de RLS y de permisos.
8. **Docs**: actualiza `valeQR-docs/docs/05-modelo-de-dominio.md` y el contexto del repo.
