# 14 — Testing y calidad

## Pirámide

| Nivel | Herramienta | Alcance | Obligatorio en |
|---|---|---|---|
| Unitarios | Vitest | Dominio puro: reglas de ticket, firma/verificación de QR, políticas de permisos | api, app, contract |
| Integración | Vitest + Testcontainers (PostgreSQL real) | Repositorios, transacciones, RLS, migraciones, jobs | api |
| Contrato | Zod/OpenAPI; test que valida que la API cumple el contrato | Respuestas vs esquemas | api, contract |
| E2E web | Playwright | Flujos por rol (login, emitir, canjear con QR simulado, estadísticas) | app (+ api levantada) |
| E2E móvil | Maestro (opcional) / pruebas manuales guiadas en dispositivos reales | Escáner, push, deep links | app |
| Seguridad | Tests de aislamiento y autorización, `gitleaks`, `pnpm audit`, Trivy | Ver abajo | api, app, infra |
| Carga | k6 | Canje concurrente, login, estadísticas | api (antes del piloto y cuando cambie el rendimiento) |

## Pruebas críticas (obligatorias)

### Aislamiento entre organizaciones
Para **cada** endpoint con `orgId`: un usuario de la org A con cualquier rol no puede leer ni escribir datos de la org B (ni vía ID directo ni listados). Se generan automáticamente a partir de las rutas registradas.

### Matriz de autorización
Tabla rol × endpoint (de [roles](02-usuarios-y-roles.md)) ejecutada como test: sin sesión, `client`, `employee`, `org_admin`, `platform_admin`, miembro `removed`/`suspended`, org suspendida.

### Canje
- Dos canjes concurrentes del mismo ticket (N hilos): exactamente 1 éxito.
- Reintento con la misma `Idempotency-Key`: misma respuesta, sin segundo canje.
- QR caducado, manipulado, de otra organización, ticket anulado/caducado, auto-canje: rechazos con el `code` esperado.
- QR estático: válido hasta el canje; tras regenerar, el QR estático anterior se rechaza (`QR_STATIC_REVOKED`); un QR dinámico y uno estático del mismo ticket no pueden canjearse ambos.
- Sedes: canje sin sede en organización multi-sede, con sede ajena o no asignada al empleado.
- `UPDATE`/`DELETE` sobre tablas append-only con el rol de la aplicación: fallan.
- Reversión: restaura el ticket a `active`, deja ambos registros y la auditoría.
- Test de propiedades (fast-check) sobre la máquina de estados del ticket.

### Invitaciones y cuentas
Token de un solo uso, caducado, revocado, reutilizado; enumeración de emails; fuerza bruta (rate limit).

### Estadísticas
Datos conocidos con resultados esperados; zonas horarias y cambios de hora (DST); rangos vacíos.

## Datos de prueba

- Fábricas (`factories`) y una semilla (`seed`) determinista con 2 organizaciones, usuarios en distintos roles (incluido uno multi-org), tickets en todos los estados.
- Nunca datos reales; emails con dominio `example.test`.

## Calidad del código

- `tsc --noEmit` y ESLint con reglas estrictas; formateo automático.
- Cobertura: ≥ 90 % en dominio crítico (canje, permisos, tenancy, auth); el resto sin umbral rígido pero con seguimiento.
- Revisión obligatoria de PR (humano + agentes de seguridad/QA para áreas sensibles).
- Renovate semanal; actualizaciones de seguridad inmediatas.

## Pruebas de accesibilidad y rendimiento (web)

- `axe` en Playwright para pantallas clave.
- Lighthouse CI con presupuestos (LCP, tamaño de JS).

## Pruebas manuales antes de cada release móvil

Instalación limpia, login por invitación (deep link), QR cliente → escaneo empleado (2 dispositivos reales, Android e iOS), push, rotación de pantalla, permisos de cámara denegados, mala conexión, actualización forzada (426).
