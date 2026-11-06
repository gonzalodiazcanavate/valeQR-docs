# 08 — Diseño de la API

REST sobre HTTPS, JSON, prefijo `/v1`. Contrato definido con Zod en `valeQR-contract` y publicado como OpenAPI (`/v1/openapi.json`, solo en entornos no productivos o protegido).

## Convenciones

- **Recursos con organización en la ruta**: `/v1/orgs/{orgId}/...`. El servidor verifica la membership y el rol en **cada** petición.
- **Autenticación**: web → cookie de sesión `HttpOnly; Secure; SameSite=Lax` + cabecera `X-CSRF-Token` (doble envío) en métodos no seguros. Móvil → `Authorization: Bearer <token opaco>`.
- **Errores**: `application/problem+json` (RFC 9457): `type`, `title`, `status`, `detail`, `code` (estable, p. ej. `TICKET_ALREADY_REDEEMED`), `request_id`.
- **Paginación**: por cursor (`?limit=50&cursor=...`), respuesta `{ items, next_cursor }`.
- **Idempotencia**: cabecera `Idempotency-Key` obligatoria en operaciones críticas (canje, emisión de lote).
- **Fechas**: ISO 8601 UTC. **IDs**: UUID v7.
- **Versión de cliente**: cabecera `X-App-Version`; si es inferior a la mínima, `426 Upgrade Required` (RF-PLT-04).
- **Rate limiting**: por IP y por usuario, más estricto en `auth/*`, `redemptions` y mensajes.
- **Idioma**: `Accept-Language` para mensajes de error legibles; los `code` no cambian.

## Endpoints (MVP)

### Auth

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/v1/auth/login` | Email + contraseña (+ MFA si aplica) |
| POST | `/v1/auth/logout` | Cierra la sesión actual |
| POST | `/v1/auth/mfa/verify` | Segundo factor |
| POST | `/v1/auth/mfa/enroll` / `.../confirm` | Alta TOTP |
| POST | `/v1/auth/password/forgot` · `/reset` | Recuperación |
| POST | `/v1/auth/email/verify` | Verificación |
| GET | `/v1/auth/invitations/{token}` | Datos de la invitación (rol, organización) |
| POST | `/v1/auth/invitations/{token}/accept` | Crea cuenta o añade membership |
| GET | `/v1/me` · PATCH `/v1/me` | Perfil |
| GET | `/v1/me/sessions` · DELETE `/v1/me/sessions/{id}` | Dispositivos |
| DELETE | `/v1/me` | Borrado de cuenta (anonimización) |
| GET | `/v1/me/memberships` | Mis organizaciones y roles |
| GET | `/v1/legal/terms` | Versión vigente de términos y privacidad |
| POST | `/v1/me/terms-acceptances` | Registra la aceptación (RF-AUTH-10) |

### Organización

| Método | Ruta | Rol mín. |
|---|---|---|
| GET/PATCH | `/v1/orgs/{orgId}` | C lectura / A edición |
| GET | `/v1/orgs/{orgId}/plan` (plan, límites y uso) | A |
| GET/POST | `/v1/orgs/{orgId}/locations` | C lectura / A creación |
| PATCH | `/v1/orgs/{orgId}/locations/{id}` | A |
| PUT | `/v1/orgs/{orgId}/members/{userId}/locations` | A (asignar sedes) |
| GET | `/v1/orgs/{orgId}/members?role=&q=` | E (solo `role=client`) · A (todos) |
| POST | `/v1/orgs/{orgId}/members` | A (alta manual) |
| PATCH | `/v1/orgs/{orgId}/members/{userId}` | A (rol, estado) |
| DELETE | `/v1/orgs/{orgId}/members/{userId}` | A (baja lógica) |
| GET/POST | `/v1/orgs/{orgId}/invitations` | A |
| DELETE | `/v1/orgs/{orgId}/invitations/{id}` | A (revocar) |
| POST | `/v1/orgs/{orgId}/invitations/{id}/resend` | A |

### Tickets y canje

| Método | Ruta | Rol mín. |
|---|---|---|
| POST | `/v1/orgs/{orgId}/tickets` | A (emitir; `client_ids[]`, `ticket_type_id`, `quantity`, `expires_at?`, `note`) |
| GET/POST | `/v1/orgs/{orgId}/ticket-types` | C lectura / A creación |
| PATCH | `/v1/orgs/{orgId}/ticket-types/{id}` | A |
| GET | `/v1/orgs/{orgId}/tickets?client_id=&status=` | A todos; C/E solo propios |
| GET | `/v1/orgs/{orgId}/tickets/{id}` | titular o A |
| POST | `/v1/orgs/{orgId}/tickets/{id}/void` | A (motivo) |
| POST | `/v1/orgs/{orgId}/tickets/{id}/qr` | titular (QR dinámico, 90 s) |
| GET | `/v1/orgs/{orgId}/tickets/{id}/pdf` | titular o A (PDF imprimible con QR estático) |
| POST | `/v1/orgs/{orgId}/tickets/{id}/static-qr/regenerate` | titular o A (invalida los impresos anteriores) |
| POST | `/v1/orgs/{orgId}/redemptions/preview` | E (acepta QR dinámico o estático) |
| POST | `/v1/orgs/{orgId}/redemptions` | E (`Idempotency-Key`, `location_id`) |
| GET | `/v1/orgs/{orgId}/redemptions?employee_id=&client_id=&from=&to=` | A todos; E propios; C propios |

### Estadísticas

| Método | Ruta | Rol mín. |
|---|---|---|
| GET | `/v1/orgs/{orgId}/stats/me` | C (propias) |
| GET | `/v1/orgs/{orgId}/stats/employee` | E (propias) · A con `?employee_id=` |
| GET | `/v1/orgs/{orgId}/stats/overview?from=&to=&granularity=&location_id=` | A |
| GET | `/v1/orgs/{orgId}/stats/clients` · `/stats/employees` | A |

### Mensajería y notificaciones

| Método | Ruta | Rol mín. |
|---|---|---|
| GET/POST | `/v1/orgs/{orgId}/conversations` | C (propias) · A (todas) |
| GET | `/v1/orgs/{orgId}/conversations/{id}/messages` | participante o A |
| POST | `/v1/orgs/{orgId}/conversations/{id}/messages` | participante o A |
| PATCH | `/v1/orgs/{orgId}/conversations/{id}` | cerrar/reabrir |
| GET | `/v1/notifications` · POST `/v1/notifications/{id}/read` | usuario |
| POST/DELETE | `/v1/me/push-devices` | usuario |
| GET | `/v1/events` | usuario (SSE) |

### Plataforma (solo `platform_admin`, MFA reciente)

| Método | Ruta |
|---|---|
| GET/POST | `/v1/platform/orgs` · `/v1/platform/org-invitations` |
| PATCH | `/v1/platform/orgs/{id}` (suspender, reactivar, cerrar) |
| PATCH | `/v1/platform/orgs/{id}/plan` (cambiar plan; 409 `PLAN_LIMIT_REACHED` si el uso no cabe) |
| GET/PATCH | `/v1/platform/users` · `/v1/platform/users/{id}` |
| POST | `/v1/platform/redemptions/{id}/reverse` (motivo) |
| GET | `/v1/platform/audit` |
| POST | `/v1/platform/impersonate` (fase S) |

### Sistema

| Método | Ruta |
|---|---|
| GET | `/healthz` (liveness) · `/readyz` (BD) |
| GET | `/v1/app-config` (versión mínima, flags) |

## Códigos de error de dominio (selección)

| `code` | HTTP | Significado |
|---|---|---|
| `AUTH_INVALID_CREDENTIALS` | 401 | Credenciales incorrectas (mensaje genérico) |
| `AUTH_MFA_REQUIRED` | 401 | Falta segundo factor |
| `FORBIDDEN_ROLE` | 403 | Rol insuficiente en la organización |
| `ORG_SUSPENDED` | 403 | Organización suspendida |
| `QR_INVALID` / `QR_EXPIRED` | 422 | Firma incorrecta / token dinámico caducado |
| `QR_STATIC_REVOKED` | 422 | QR impreso invalidado por regeneración |
| `LOCATION_REQUIRED` | 422 | Falta `location_id` o el empleado no está asignado a esa sede |
| `TERMS_NOT_ACCEPTED` | 403 | Hay que aceptar la versión vigente de términos |
| `TICKET_NOT_ACTIVE` | 409 | Anulado, caducado o no activo |
| `TICKET_ALREADY_REDEEMED` | 409 | Ya canjeado |
| `TICKET_WRONG_ORG` | 422 | Ticket de otra organización |
| `SELF_REDEMPTION_FORBIDDEN` | 403 | Auto-canje |
| `LAST_ADMIN` | 409 | Operación dejaría la organización sin admin |
| `PLAN_LIMIT_REACHED` | 409 | Se alcanzó el límite de sedes, empleados o clientes del plan |
| `INVITATION_INVALID` | 410 | Caducada, usada o revocada |
| `RATE_LIMITED` | 429 | Demasiadas peticiones |
| `APP_UPGRADE_REQUIRED` | 426 | Versión de app no soportada |

## Seguridad específica de la API

- Respuestas de `login`/`forgot`/`invitation` no revelan si un email existe.
- CORS restringido a los orígenes propios (web y `capacitor://`/`https://localhost` de la app).
- Cabeceras: HSTS, `X-Content-Type-Options`, CSP estricta en la web, `Referrer-Policy`.
- Tamaño máximo de cuerpo ajustado por ruta; validación Zod en todas las entradas.
- Todas las consultas parametrizadas (Drizzle); prohibido SQL por concatenación.
