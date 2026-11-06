# 15 — Roadmap

Por fases y con criterios de salida (sin estimaciones temporales).

## Fase 0 — Documentación y fundamentos (completada)

- Documentación completa, plantillas de agentes y skills, marca, borradores legales.
- Preguntas abiertas de [17](17-riesgos-y-preguntas-abiertas.md) respondidas por el responsable.
- Salida: documentación aprobada por el responsable.

## Fase 1 — Cimientos técnicos (en curso; ver [19](19-estado-de-implementacion.md))

- Crear repos con `AGENTS.md`, `docs/index.md`, CI, linting y plantillas de PR (**hecho**: repos `valeQR-*` inicializados).
- `valeQR-contract`: roles, estados, errores, esquemas base.
- `valeQR-infra`: Compose local/staging, Caddy, backups con prueba de restauración, monitorización mínima.
- `valeQR-api`: esqueleto, config, logging, healthchecks, migraciones, RLS base, request-context, auditoría.
- Auth completa (RF-AUTH-01..06, 08, 10), invitaciones, sesiones, MFA.
- Salida: despliegue automático a staging; tests de aislamiento funcionando sobre un endpoint de ejemplo.

## Fase 2 — Núcleo del producto (web)

- Organizaciones, sedes y memberships (RF-PLAT-01..05, RF-ORG-01..04, 06, 07, 09, 10).
- Tickets, tipos y emisión (RF-TKT-01..08, 13).
- QR dinámico y estático, PDF imprimible (RF-TKT-06, 10..12).
- Canje con atomicidad e idempotencia (RF-RDM-01..06, 09..11) — escaneo probado con cliente web de prueba.
- Libro inmutable y reversión (RF-PLAT-06, RF-AUD-01).
- Estadísticas básicas por rol (RF-STAT-01..06).
- Salida: criterios 1–5 del [BRD](01-brd.md) cumplidos en staging.

## Fase 3 — Móvil y comunicación

- Capacitor Android/iOS, escáner nativo, deep links, almacenamiento seguro.
- Push (FCM/APNs), SSE, notificaciones in-app y email (RF-NTF-01..03).
- Mensajería cliente ⇄ organización (RF-MSG-01..05).
- Perfil y borrado de cuenta (RF-PRF, RF-AUTH-09), versión mínima de app (RF-PLT-04).
- Salida: TestFlight y pruebas internas de Google Play con flujo completo en dispositivos reales.

## Fase 4 — Endurecimiento y piloto

- Revisión de seguridad completa, pruebas de carga, accesibilidad, restauración de backup.
- Documentos legales: borradores en [legal/](../legal/) (redactados por el agente); revisión por asesor legal antes de operar con datos reales.
- Piloto con la autoescuela: migración de vales existentes, formación, soporte.
- Publicación en tiendas (revisión de Apple/Google).
- Salida: objetivos OB-01..OB-04 medidos durante el piloto.

## Fase 5 — Evolución (backlog priorizable)

| Elemento | Requisito |
|---|---|
| Caducidades avanzadas (reglas, renovaciones) | RF-TKT-13 |
| Importación CSV, exportaciones | RF-ORG-05, 08; RF-STAT-07 |
| Passkeys | RF-AUTH-07 |
| Suplantación auditada, panel de plataforma | RF-PLAT-08, 09 |
| Canje manual por código | RF-RDM-07 |
| Preferencias de notificación, descarga de datos | RF-NTF-04, RF-PRF-03 |
| Canje offline | RF-RDM-08 |
| Adjuntos y asignación en mensajería | RF-MSG-06, 07 |
| Informes periódicos por email | RF-STAT-08 |
| Wallets (Apple/Google) | — |
| Más idiomas y verticales | RNF-I18N-01 |
| Posible migración a monorepo | ADR-009 |
