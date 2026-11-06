# 00 — Visión y alcance

## Visión

Software ligero, eficiente y escalable para que cualquier negocio que trabaje con vales/tickets pueda **emitirlos** a sus clientes, **canjearlos** mediante QR con sus empleados y **medir** todo lo que ocurre (por cliente, por empleado, en el tiempo).

El primer cliente/vertical es una **autoescuela**: el alumno recibe tickets a cambio de clases prácticas de conducir y el profesor/empleado los escanea al impartir cada clase.

## Decisión de diseño clave: producto genérico, vertical inicial

El código y el modelo de datos son **genéricos** (`organization`, `client`, `employee`, `ticket`). La terminología "autoescuela / alumno / clase práctica" vive en la capa de textos (i18n) y en la configuración de la organización (`vertical`). Así otros negocios (peluquerías, gimnasios, lavaderos...) se incorporan sin cambios de esquema.

## Problema que resuelve

- Los vales en papel se pierden, se falsifican y no se pueden contar ni auditar.
- El negocio no sabe cuántos vales tiene "vivos" cada cliente ni qué empleado canjea cuántos.
- El cliente no tiene visibilidad de su saldo ni un canal formal para reclamaciones.

## Alcance

### Dentro (MVP)

- Alta/baja de organizaciones por el administrador de plataforma (manual o por invitación de un solo uso).
- Alta/baja de clientes y empleados por la organización (manual o por invitación), cambio de rol cliente⇄empleado.
- Emisión de tickets (individual y en lote) a clientes, con tipos y metadatos definidos por la organización y caducidad opcional.
- QR dinámico en la app y QR estático imprimible (PDF) por ticket.
- Varias sedes por organización.
- QR de ticket por parte del cliente; escaneo y canje por el empleado (móvil) con confirmación.
- Libro de canjes **inmutable**; solo el administrador de plataforma puede revertir un canje.
- Estadísticas por rol: series temporales, por cliente, por empleado.
- Mensajería cliente → organización (reclamaciones/consultas).
- Notificaciones (in-app, push, email).
- Perfil de usuario y gestión de cuenta (incluido borrado de cuenta).
- Web (dashboard) + apps Android e iOS (mismo código) con escáner nativo.

### Fuera del MVP (ver [roadmap](15-roadmap.md))

- Cobros y facturación: la aplicación **no** gestiona ningún tipo de cobro; el responsable los gestiona por otra vía.
- Canje offline.
- Passkeys, wallets (Apple/Google Wallet).
- Catálogo avanzado de tipos de ticket y caducidades complejas.
- Integraciones con terceros (calendarios, ERPs).
- Chat en tiempo real con adjuntos.

## Principios

1. **Simple primero**: un único backend, una única base de datos, un único cliente.
2. **Ligero y eficiente**: pocos servicios, bajo consumo, un VPS pequeño debe bastar mucho tiempo.
3. **Escalable por diseño, no por infraestructura**: API sin estado, multi-tenancy en datos, rutas claras de crecimiento (ver [arquitectura](06-arquitectura.md)).
4. **Seguridad y privacidad por defecto** (RGPD).
5. **Documentación como código**: la documentación manda y el agente la mantiene (ver [desarrollo agéntico](13-desarrollo-agentico.md)).
