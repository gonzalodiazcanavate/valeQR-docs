# 16 — Decisiones de arquitectura (ADR)

Formato: contexto → decisión → consecuencias. Estado: `Propuesta` (a validar con el responsable), `Aceptada`, `Sustituida`.
Añade nuevas decisiones al final con ID incremental.

| ID | Decisión | Estado |
|---|---|---|
| ADR-001 | Producto genérico con vertical inicial autoescuela | Propuesta |
| ADR-002 | TypeScript de extremo a extremo | Propuesta |
| ADR-003 | Cliente único con React + Capacitor | Propuesta |
| ADR-004 | Backend monolito modular con Fastify + PostgreSQL | Propuesta |
| ADR-005 | Multi-tenancy por columna + RLS | Propuesta |
| ADR-006 | Sesiones opacas en BD (no JWT) | Propuesta |
| ADR-007 | QR firmado (dinámico de corta vida + estático imprimible revocable) y canje atómico | Propuesta |
| ADR-008 | Libro de canjes append-only con reversión por admin de plataforma | Propuesta |
| ADR-009 | Multi-repo (`valeQR-*`) con contrato consumido por tag de git (posible monorepo futuro) | Aceptada |
| ADR-010 | Cola de trabajos en PostgreSQL (pg-boss) | Propuesta |
| ADR-011 | VPS + Docker Compose + Caddy; sin Kubernetes | Propuesta |
| ADR-012 | SSE para tiempo real | Propuesta |
| ADR-013 | Registro solo por invitación; sin registro público | Propuesta |
| ADR-014 | Canje solo online en el MVP | Propuesta |

---

## ADR-001 — Producto genérico con vertical inicial
**Contexto**: la necesidad nace de una autoescuela, pero el concepto aplica a cualquier negocio con vales.
**Decisión**: entidades genéricas (`organization`, `client`, `employee`, `ticket`); terminología de vertical en i18n y `organizations.vertical`.
**Consecuencias**: coste mínimo extra hoy; permite nuevos clientes sin cambios de esquema. Riesgo: sobre-generalizar; se limita a nombres y textos.

## ADR-002 — TypeScript de extremo a extremo
**Contexto**: un solo operador y agentes de IA; contratos compartidos reducen errores.
**Decisión**: TypeScript en API, cliente y contratos.
**Consecuencias**: menor rendimiento bruto que Go/Rust, irrelevante a esta escala. Una sola cadena de herramientas.

## ADR-003 — Cliente único React + Capacitor
**Contexto**: web, Android e iOS con presupuesto de mantenimiento mínimo; el escáner exige cámara nativa.
**Decisión**: SPA React empaquetada con Capacitor para móviles, con plugins nativos.
**Consecuencias**: una UI y un set de pruebas; dependencia de Capacitor y plugins; revisión de tiendas con WebView (aceptable si aporta funcionalidad nativa real: cámara, push, deep links).

## ADR-004 — Monolito modular Fastify + PostgreSQL
**Contexto**: ligereza, simplicidad, posibilidad de escalar.
**Decisión**: un servicio API + un worker (misma imagen) + PostgreSQL.
**Consecuencias**: operación simple; los módulos tienen fronteras estrictas para poder extraerlos en el futuro.

## ADR-005 — Multi-tenancy por columna + RLS
**Contexto**: roles por organización y riesgo de fuga entre organizaciones.
**Decisión**: esquema compartido, `organization_id` en cada tabla y RLS con rol de aplicación sin `BYPASSRLS`.
**Consecuencias**: defensa en profundidad; ligera complejidad en transacciones (fijar `app.org_id`) y en migraciones. Escala bien a cientos de organizaciones; esquemas por tenant se descartan por coste operativo.

## ADR-006 — Sesiones opacas en BD
**Contexto**: necesidad de revocar accesos de inmediato (bajas, robo de móvil, platform admin).
**Decisión**: token aleatorio, hash en BD, cookie `HttpOnly` en web y bearer en móvil.
**Consecuencias**: lectura de BD por petición (índice); sin complejidad de JWT/refresh.

## ADR-007 — QR firmado (dinámico y estático) y canje atómico
**Contexto**: los QR fijos se pueden copiar y reenviar, pero los tickets también deben poder imprimirse y escanearse desde el papel (decisión del responsable).
**Decisión**: dos tipos de token HMAC con `kid`: dinámico (`exp` 90 s, para pantalla) y estático (sin caducidad propia, con `static_qr_version` regenerable, para impresión). Ambos de un solo uso en BD (`UPDATE ... WHERE status='active'`), con idempotencia.
**Consecuencias**: el QR dinámico exige conexión del cliente; el estático mantiene el riesgo de copia del papel, mitigado por un solo uso, regeneración, auditoría del tipo de QR y desactivación opcional por organización.

## ADR-008 — Libro append-only con reversión
**Contexto**: "los canjes solo los puede modificar el administrador".
**Decisión**: los canjes no se editan; el administrador de plataforma crea una **reversión** con motivo. Permisos de BD y triggers impiden `UPDATE`/`DELETE`.
**Consecuencias**: trazabilidad total; estadísticas deben restar canjes revertidos.

## ADR-009 — Multi-repo con paquete de contratos
**Contexto**: la descripción plantea varios repositorios con su propio `AGENTS.md`; el responsable es indiferente y ha creado ya los repos.
**Decisión**: `valeQR-docs`, `valeQR-contract`, `valeQR-api`, `valeQR-app`, `valeQR-infra`. El contrato se consume como dependencia git fijada por tag.
**Consecuencias**: aislamiento de contexto por agente; fricción al cambiar contratos. **Plan B**: monorepo `api + app + contract` si el coste de sincronización se vuelve alto.

## ADR-010 — Cola en PostgreSQL (pg-boss)
**Decisión**: jobs de email/push/caducidad en la misma BD.
**Consecuencias**: un servicio menos; si el volumen crece mucho, migrar a Redis/BullMQ sin cambiar la interfaz de jobs.

## ADR-011 — VPS + Docker Compose + Caddy
**Decisión**: sin orquestadores. Despliegue por SSH desde CI.
**Consecuencias**: simple y barato; disponibilidad limitada a un host (RNF-DISP-01 de 99,5 %). Ruta de escalado en [arquitectura](06-arquitectura.md).

## ADR-012 — SSE
**Decisión**: SSE para notificaciones y actualización de QR; fallback polling.
**Consecuencias**: más sencillo que WebSocket; unidireccional (suficiente).

## ADR-013 — Registro solo por invitación
**Decisión**: sin registro público; invitaciones de un solo uso o alta manual.
**Consecuencias**: reduce abuso y spam; exige explicar a Apple el modelo B2B.

## ADR-014 — Canje solo online
**Decisión**: el MVP no soporta canje offline.
**Consecuencias**: evita conflictos y fraude; zonas sin cobertura quedan sin servicio. Revisitar en fase 5 (RF-RDM-08).
