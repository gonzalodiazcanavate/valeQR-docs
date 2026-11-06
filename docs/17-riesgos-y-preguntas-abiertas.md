# 17 — Riesgos y preguntas abiertas

## Decisiones del responsable (preguntas resueltas)

| # | Pregunta | Respuesta del responsable | Impacto en la documentación |
|---|---|---|---|
| Q1 | Nombre y dominio | Producto **AutoQR**; dominio previsto `autoqr.com` (por confirmar) | Renombrado en todos los documentos, logo y dominios ([12](12-diseno-y-marca.md), [11](11-despliegue-e-infraestructura.md)) |
| Q2 | ¿Tickets impresos? | Sí: se pueden imprimir y escanear el QR desde el impreso | QR estático revocable, PDF imprimible: RF-TKT-10..12, RF-RDM-10, ADR-007 |
| Q3 | ¿Tipos de ticket? | Un ticket = una clase; la organización define nombre, utilidad y metadatos | Tipos y metadatos pasan a MVP: RF-TKT-07, `ticket_types.metadata` |
| Q4 | Caducidad | Solo si la organización fija una fecha | RF-TKT-13; `expires_at` nullable |
| Q5 | Cobro | La aplicación no cobra nada; lo gestiona el responsable por otra vía | RF-PLAT-10 [RETIRADO]; planes con límites sin cobro en la app (RF-PLAT-11, ADR-015) |
| Q6 | Menores de 14 años | No | Términos exigen ≥ 14 años; riesgo R7 reducido |
| Q7 | `org_admin` que canjea; varios admins | Sí a ambos | Regla 8 de [02](02-usuarios-y-roles.md) |
| Q8 | Reclamaciones sobre un canje | El cliente reclama al `org_admin`, que decide | RF-MSG-04; la reversión sigue siendo solo del admin de plataforma |
| Q9 | Soporte | `soporte@autoqr.com` (puede cambiar) | [11](11-despliegue-e-infraestructura.md) |
| Q10 | Escala esperada | 1 organización piloto; hasta ~10 a medio plazo | RNF-CAP-01, RNF-COST-01, escalado nivel 0 |
| Q11 | Proveedores y presupuesto | UE (a ser posible España), bajo coste, ~10 €/mes en total | VPS 2 vCPU/4 GB; Sentry SaaS en lugar de GlitchTip; staging ligero |
| Q12 | Multi-repo o monorepo | Indiferente; criterio del agente | Multi-repo (ya creado) con contrato por tag de git; ADR-009 aceptada |
| Q13 | Datos de clientes visibles para empleados | Nombre, email y teléfono (opcional) | Matriz de permisos [02](02-usuarios-y-roles.md) |
| Q14 | Geolocalización | No | Sin cambios |
| Q15 | Términos al registrarse | Sí, aceptar términos y condiciones | RF-AUTH-10, `terms_acceptances` |
| Q16 | Multi-sede | Sí | `locations`, RF-ORG-09/10, RF-RDM-11 |
| Q17 | Documentos legales | Los redacta el agente; después los revisa un asesor | Borradores en [legal/](../legal/) |

## Preguntas abiertas

| # | Pregunta | Decisión por defecto | Bloqueante |
|---|---|---|---|
| N1 | Datos del titular para los documentos legales (nombre o razón social, NIF/CIF, domicilio, email de contacto) | Marcadores `[TITULAR]`, `[NIF]`, `[DOMICILIO]` en los borradores | **Sí, antes del piloto** |
| N2 | Registrar `autoqr.com` y confirmar `soporte@autoqr.com` | Se asumen esos valores | Antes de publicar |
| N3 | Proveedor concreto de VPS, email transaccional y almacenamiento de backups | Se evaluarán opciones UE de bajo coste al empezar el despliegue | Antes de staging |
| N4 | ¿Cuenta de desarrollador de Apple/Google a nombre de persona física o de empresa? Afecta al nombre que ve el usuario y a la revisión | Se decide al abrir las cuentas | Antes de Fase 3 |
| N5 | ¿QR estático permitido por defecto en todas las organizaciones? | Sí, con opción de desactivarlo por organización | No |
| N6 | ¿Los empleados pueden regenerar el QR estático de un cliente? | No: solo el titular y el `org_admin` | No |

## Registro de riesgos

| ID | Riesgo | Prob. | Impacto | Mitigación |
|---|---|---|---|---|
| R1 | Apple rechaza la app por requerir cuenta sin registro propio | Media | Alto | Cuenta demo, descripción B2B, funcionalidad nativa real (cámara, push), borrado de cuenta in-app; alternativa: distribución como app personalizada/B2B |
| R2 | Fuga de datos entre organizaciones | Baja | Crítico | RLS + tests automáticos de aislamiento + revisión de seguridad |
| R3 | Fraude con QR copiado (captura o fotocopia del impreso) | Media | Medio | QR dinámico de 90 s, un solo uso, regeneración del estático, auditoría de `qr_kind`, estadísticas por empleado, opción de desactivar el estático |
| R4 | Pérdida de datos por fallo del VPS | Baja | Crítico | WAL continuo, backups cifrados fuera del VPS, pruebas de restauración |
| R5 | Indisponibilidad con un único VPS | Media | Medio | Monitorización, runbooks, RTO ≤ 4 h; ruta de escalado documentada |
| R6 | Bus factor 1 (un único operador) | Alta | Alto | Documentación exhaustiva, runbooks, infra como código, custodia de claves/credenciales documentada fuera del equipo |
| R7 | Menores de 14 años con cuenta pese a los términos | Baja | Medio | Términos explícitos, responsabilidad de la organización al dar el alta |
| R8 | Deriva entre documentación y código | Alta | Medio | Protocolo de contexto, agente Docs Keeper, `docs-check` en CI |
| R9 | Entregabilidad del email (invitaciones en spam) | Media | Medio | SPF/DKIM/DMARC, proveedor reputado, enlaces compartibles manualmente por el admin |
| R10 | Cuenta de admin de plataforma comprometida | Baja | Crítico | MFA obligatorio, passkeys (fase S), auditoría y alertas, acceso mínimo |
| R11 | Dependencias de plugins Capacitor sin mantenimiento | Media | Medio | Usar plugins oficiales/activos, aislar tras `platform/`, revisión en Renovate |
| R12 | Coste de cuentas de tienda y compilación iOS dentro de un presupuesto de ~10 €/mes | Cierta | Bajo | Las cuentas de tienda son costes aparte del VPS; CI con macOS gratuito mientras sea viable |
| R13 | Sobre-ingeniería por parte de agentes | Media | Medio | Reglas en `AGENTS.md`, revisión humana, alcance por fases |
| R14 | Cambio de contratos rompe apps ya publicadas | Media | Alto | Compatibilidad hacia atrás, versión mínima soportada, `/v1` estable |
| R15 | Documentos legales redactados sin revisión profesional | Media | Alto | Marcados como borrador; revisión por asesor antes de tratar datos reales |
| R16 | Recursos justos en un VPS de 4 GB (API + worker + PostgreSQL + staging) | Media | Medio | Límites de memoria por contenedor, staging bajo demanda, monitorización de RAM, subir de plan es barato |
