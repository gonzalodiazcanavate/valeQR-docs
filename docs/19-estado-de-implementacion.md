# 19 — Estado de implementación

Foto del avance tras la primera pasada de la Fase 1 ([roadmap](15-roadmap.md)). Actualizar al fusionar cambios relevantes en cualquier repo.

## Repositorios

| Repo | Estado | Qué hay | Verificado |
|---|---|---|---|
| `valeQR-docs` | Completo (fase 0) | Documentación, legal (borradores), plantillas, marca | — |
| `valeQR-contract` | v0.2.0 | Roles, estados de ticket, formato de QR, códigos de error, esquemas Zod, catálogo de planes. `dist/` versionado | 19 tests, lint, tipos, build |
| `valeQR-api` | Esqueleto | Fastify con problem+json, login/logout/`me` (sesiones opacas, argon2id, CSRF), helmet, rate limit, versión mínima de app, health; migración `0001_init` (15 tablas, RLS forzada, libro append-only); `withTenant`; canje atómico e idempotente (repositorio); Dockerfile | 35 tests con PostgreSQL 17 real (aislamiento RLS, append-only, 10 canjes simultáneos → 1), imagen construida y arrancada |
| `valeQR-app` | Esqueleto | Vite + React 19 + Tailwind 4, marca, cliente de API, navegación por rol, interfaz de escáner | 13 tests, lint, tipos, build |
| `valeQR-infra` | Base | Compose dev/prod, roles de BD, Caddy, deploy/rollback, web atómica, backup cifrado (age) y prueba de restauración, workflows, runbooks | Compose y Caddy validados, shellcheck, roles de BD y restauración probados en local. **Nada ejecutado en un VPS** |

## Pendiente por área (siguiente trabajo)

| Área | Pendiente |
|---|---|
| API | Auth (MFA, invitaciones, recuperación, sesiones remotas, términos), módulos orgs/miembros/sedes/tipos de ticket, emisión, firma y verificación de QR, endpoints de canje (preview/confirmar), PDF imprimible, estadísticas, mensajería, notificaciones + SSE, panel de plataforma, reversión, CORS, worker pg-boss, UUID v7 |
| App | Router, auth (MFA, recuperación, móvil), pantallas por rol, escáner nativo (Capacitor), push, deep links, PWA, i18n completa, Playwright |
| Infra | Staging, worker, WAL continuo (pgBackRest), monitorización, despliegue automático de la web |
| Legal | Completar marcadores `[TITULAR]`, `[NIF]`... y revisión por asesor |

## Pasos manuales para el responsable (una sola vez)

1. **Deploy key de lectura del contrato**: generar un par SSH, añadir la pública como *deploy key* (solo lectura) en `valeQR-contract` y guardar la privada como secreto `CONTRACT_DEPLOY_KEY` en `valeQR-api` y `valeQR-app`. Sin ello la CI de esos repos no puede instalar dependencias.
2. En `valeQR-api`: permitir que Actions publique paquetes en GHCR (la imagen se publica en `main`).
3. En `valeQR-infra`: crear el *environment* `production` con reviewers obligatorios y los secretos `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY`, `DEPLOY_KNOWN_HOSTS`.
4. Activar protección de rama `main` (PR obligatorio, CI verde) en los cinco repos.
5. Decidir proveedor de VPS/email/almacenamiento y registrar `autoqr.com` (preguntas N2 y N3 de [17](17-riesgos-y-preguntas-abiertas.md)).
6. Completar los datos del titular en [legal/](../legal/) (N1).
7. Generar el par de claves age de backups y guardar la privada fuera del VPS.

## Hallazgos de la implementación (ya reflejados en los documentos)

- `FORCE ROW LEVEL SECURITY` impide que el propietario haga `pg_dump`: las copias se hacen como superusuario del contenedor ([backups](../../valeQR-infra/docs/backups.md)).
- El contrato se consume como dependencia git: `dist/` va versionado y `zod` es peerDependency para tener una sola copia con el consumidor ([10](10-repositorios.md)).
- `typescript-eslint` aún no soporta TypeScript 7: se fija TypeScript 5.9 en los repos ([07](07-stack-tecnologico.md)).
- El RPO de 15 min **no se cumple todavía**: solo hay copia lógica diaria (RPO ≤ 24 h) hasta añadir pgBackRest.
