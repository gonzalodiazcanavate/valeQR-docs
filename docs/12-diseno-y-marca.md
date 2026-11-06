# 12 — Diseño y marca

> Nombre del producto: **AutoQR** (dominio previsto `autoqr.com`). Cambiarlo solo requiere actualizar este documento, `assets/` y la configuración de la app.

## Principios de diseño

1. **Rapidez sobre decoración**: la tarea principal (mostrar/escanear un QR) debe ser inmediata.
2. **Un rol, una interfaz clara**: cada rol ve una navegación mínima y orientada a su tarea.
3. **Móvil primero** para cliente y empleado; escritorio primero para `org_admin` y `platform_admin` (también responsive).
4. **Accesible** (WCAG 2.2 AA): contraste, tamaños táctiles ≥ 44 px, soporte de lector de pantalla, no depender solo del color.
5. **Estados claros**: cargando, vacío, error, sin conexión.
6. **Confianza**: en el canje, mensajes inequívocos de éxito o rechazo, con motivo.

## Identidad visual

### Logo

- Concepto: un **ticket** con muescas laterales cuyo interior contiene un patrón tipo **QR** simplificado.
- Archivos: [assets/logo.svg](../assets/logo.svg) (horizontal con texto), [assets/logo-mark.svg](../assets/logo-mark.svg) (solo símbolo, para icono de app, favicon y avatar).
- Zona de respeto: ½ de la altura del símbolo alrededor. Tamaño mínimo del símbolo: 24 px.
- No deformar, no cambiar colores fuera de la paleta, no añadir sombras.
- Pendiente de producción: icono de app 1024×1024 (iOS) y adaptativo (Android), favicon, imagen social.

### Paleta

| Token | Hex | Uso |
|---|---|---|
| `brand-600` | `#0F766E` | Primario (botones, enlaces, marca) |
| `brand-700` | `#115E59` | Hover/pressed |
| `brand-50` | `#F0FDFA` | Fondos suaves |
| `accent-500` | `#F59E0B` | Acento (resaltados, avisos de caducidad próxima) |
| `ink-900` | `#0F172A` | Texto principal |
| `ink-600` | `#475569` | Texto secundario |
| `surface` | `#FFFFFF` / `#F8FAFC` | Fondos |
| `success` | `#16A34A` | Canje correcto |
| `danger` | `#DC2626` | Errores y rechazos |
| `info` | `#2563EB` | Informativo |

Modo oscuro: soportado vía tokens CSS (variables), no valores fijos en componentes. Contrastes mínimos 4.5:1 (texto) y 3:1 (componentes).

### Tipografía

- **Inter** (variable, autoalojada; sin CDN de terceros por privacidad y rendimiento). Pesos 400, 500, 600, 700.
- Escala: 12, 14, 16 (base), 20, 24, 32. Interlineado 1.4–1.6.

### Espaciado, forma y movimiento

- Rejilla de 4 px; radios 8 px (controles) y 16 px (tarjetas).
- Iconos: Lucide.
- Animaciones breves (≤ 200 ms), respetando `prefers-reduced-motion`.

## Pantallas clave

| Rol | Pantalla | Notas |
|---|---|---|
| Todos | Login / aceptar invitación / MFA | Mensajes de error genéricos |
| Todos | Selector de organización | Si pertenece a más de una; recuerda la última |
| Cliente | **Inicio**: saldo de tickets activos + botón "Mostrar QR" | Máx. 2 toques al QR |
| Cliente | QR de ticket | Brillo alto, temporizador de renovación, cambia a "Canjeado" en vivo |
| Cliente / Org admin | Imprimir ticket | Vista previa del PDF con QR estático; aviso de que regenerar el QR invalida los impresos anteriores |
| Cliente | Historial y estadísticas | Lista + gráfico simple |
| Cliente | Mensajes | Hilos con la organización |
| Empleado | **Escáner** (pantalla de inicio por defecto) | Cámara a pantalla completa; selector de sede si tiene varias |
| Empleado | Confirmación de canje | Cliente, ticket, saldo restante; botones Confirmar/Cancelar grandes |
| Empleado | Resultado | Pantalla verde (OK) o roja con motivo; vibración/sonido |
| Empleado | Mi actividad | Serie temporal y por cliente |
| Org admin | Dashboard | Emitidos/canjeados/caducados, tendencia, top clientes/empleados |
| Org admin | Personas | Tabla filtrable, invitar, cambiar rol, baja |
| Org admin | Emitir tickets | Selección de clientes, cantidad, caducidad, nota |
| Org admin | Mensajes | Bandeja con estados |
| Org admin | Ajustes | Datos de la organización, sedes, tipos de ticket, MFA obligatorio, permitir/denegar QR estático |
| Platform admin | Organizaciones, usuarios, auditoría, reversión de canjes | Siempre exige MFA reciente |

## Navegación

- Móvil: barra inferior (máx. 4–5 elementos) según rol. Empleado: Escáner · Actividad · Perfil. Cliente: Inicio · Historial · Mensajes · Perfil.
- Escritorio: barra lateral con las secciones del rol.

## Textos y tono

- Español de España, trato de **tú**, frases cortas y concretas.
- Terminología por vertical en `i18n` (autoescuela: "alumno", "clase práctica", "profesor"); en código siempre `client`, `ticket`, `employee`.
- Mensajes de error con acción: "Este ticket ya se canjeó el 12/03 a las 10:15. Si crees que es un error, contacta con la autoescuela."

## Estados sin conexión

El cliente puede ver su último saldo en caché (marcado "sin conexión"); no puede generar QR nuevo sin red. El empleado no puede canjear sin red (aviso claro).
