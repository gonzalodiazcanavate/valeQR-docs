# 07 — Stack tecnológico

Criterios: ligero, eficiente, sencillo, escalable, un único lenguaje (TypeScript) para facilitar el trabajo de los agentes y compartir contratos, y operable por una sola persona.

## Resumen

| Capa | Elección | Alternativa descartada y motivo |
|---|---|---|
| Lenguaje | TypeScript (strict) en todo | Go/Kotlin/Swift: más rendimiento bruto o nativo, pero tres bases de código y sin tipos compartidos |
| Runtime backend | Node.js LTS | Bun/Deno: menos madurez en operación |
| Framework API | **Fastify** + `fastify-type-provider-zod` | Express (más lento, menos tipado); NestJS (más pesado, más ceremonia) |
| Validación/contratos | **Zod** → tipos + OpenAPI | — |
| ORM / SQL | **Drizzle ORM** + migraciones SQL | Prisma (más pesado, RLS y SQL fino más incómodos) |
| Base de datos | **PostgreSQL** (última LTS soportada) | MySQL/SQLite: sin RLS/WAL-archive equivalentes; Mongo: modelo muy relacional |
| Colas / jobs | **pg-boss** (sobre PostgreSQL) | Redis+BullMQ: servicio extra innecesario hoy |
| Auth | Sesiones opacas en BD + argon2id + TOTP (`otplib`) + WebAuthn (`@simplewebauthn`) en fase S | JWT: difícil de revocar; Auth0/Clerk: coste y dependencia |
| Frontend | **React + Vite + TypeScript** | Next.js: SSR innecesario para una app autenticada |
| Routing / datos | TanStack Router + TanStack Query | — |
| UI | **Tailwind CSS** + componentes **shadcn/ui** (Radix) | Material UI (pesado) |
| Gráficas | **Recharts** (o uPlot si hay series grandes) | — |
| Formularios | React Hook Form + Zod | — |
| i18n | `i18next` o Lingui (decidir en ADR al empezar) | — |
| Móvil | **Capacitor** (Android + iOS) + plugins: `@capacitor-mlkit/barcode-scanning`, `@capacitor/push-notifications`, `@capacitor/app` (deep links), almacenamiento seguro | React Native/Expo y Flutter: segundo cliente o reescritura de UI; Capacitor reutiliza el 100 % de la SPA |
| Email | SMTP/API de proveedor UE transaccional (p. ej. Brevo, Postmark UE, Scaleway TEM) vía abstracción `Mailer` | Servidor SMTP propio: mala entregabilidad |
| Push | FCM (Android + iOS vía APNs) | — |
| QR y PDF | `qrcode` (generación de QR) + `pdf-lib` o `pdfkit` (PDF imprimible bajo demanda, sin almacenar) | Servicios externos de PDF: envían datos a terceros |
| Reverse proxy | **Caddy** (TLS automático, HTTP/3) | Nginx+certbot: más configuración |
| Contenedores | Docker + Docker Compose | Kubernetes: sobredimensionado |
| Backups | **pgBackRest** (o WAL-G) a Object Storage UE + `pg_dump` lógico cifrado con restic | — |
| CI/CD | GitHub Actions (+ runners macOS para iOS) | — |
| Registro de imágenes | GHCR | — |
| Errores | Sentry SaaS región UE (plan gratuito) | GlitchTip autoalojado: consume recursos que el presupuesto inicial no cubre |
| Uptime | Uptime Kuma (externo al VPS o VPS mínimo aparte) | — |
| Tests | Vitest, Testcontainers (PostgreSQL real), Playwright, Maestro (E2E móvil, opcional) | — |
| Calidad | ESLint, Prettier (o Biome), `tsc --noEmit`, Renovate, Trivy/`npm audit`, gitleaks | — |
| Gestor de paquetes | pnpm | — |

## Decisiones destacables

### Un cliente para todo
Capacitor permite una sola UI (web, Android, iOS) con acceso a cámara nativa para el escáner. Coste: rendimiento ligeramente inferior a nativo puro, irrelevante para esta app. Riesgo: revisión de tiendas y dependencia de plugins; mitigado con la elección de plugins mantenidos oficialmente.

### Sesiones opacas en lugar de JWT
Revocación inmediata (baja de usuario, robo de dispositivo), sin gestión de rotación de claves JWT. Coste: una lectura de BD por petición, trivial a esta escala (índice por `token_hash`).

### PostgreSQL para todo
Datos, colas (pg-boss), idempotencia, rate limit ligero y RLS. Menos piezas operativas.

### Drizzle + SQL explícito
Control sobre transacciones y consultas de estadísticas; migraciones en SQL revisables por agentes.

## Versiones

Usar las últimas versiones LTS/estables en el momento de crear cada repo y **fijarlas** (`.nvmrc`/`engines`, lockfile, imágenes Docker con tag explícito). Renovate propone actualizaciones.

## Convenciones de código

- TypeScript `strict`, sin `any` implícito; ESM.
- Funciones pequeñas, dominio puro separado de IO.
- Errores de dominio tipados; mapeo único a `problem+json`.
- Sin lógica de permisos en el cliente más allá de ocultar UI.
- Cada migración es SQL versionado, reversible cuando sea posible, y se prueba en CI contra una BD real.
