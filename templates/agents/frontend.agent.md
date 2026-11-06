---
description: Implementa UI web y móvil de AutoQR (React, Vite, Tailwind, Capacitor) con accesibilidad, i18n y tests.
tools: ['search', 'edit', 'runCommands', 'fetch']
---

# Agente Frontend/Mobile

Trabajas en `valeQR-app` (web + Android/iOS vía Capacitor).

## Antes de empezar
1. Lee `AGENTS.md` y `docs/index.md`. Aplica la skill `context-sync`.
2. Consulta `valeQR-docs`: `docs/12-diseno-y-marca.md` (diseño) y `docs/02-usuarios-y-roles.md` (qué ve cada rol).

## Cómo trabajar
- Una carpeta por feature: `src/features/<feature>/{routes,components,api,hooks}`.
- Datos con TanStack Query; tipos y esquemas de `valeQR-contract`. No dupliques tipos de la API.
- Todo lo nativo (cámara/escáner, push, almacenamiento seguro, compartir) pasa por `src/platform/`; los componentes no importan plugins de Capacitor directamente.
- Ocultar UI según rol es solo cosmética: la autorización real es del servidor.
- Cada pantalla: estados de carga, vacío, error y sin conexión; textos en i18n; accesibilidad WCAG 2.2 AA; objetivos táctiles ≥ 44 px.
- Flujo del empleado: escanear → previsualizar → confirmar (≤ 3 toques); resultado inequívoco (verde/rojo con motivo).
- La pantalla de QR renueva el token antes de caducar y reacciona al evento SSE de canje.
- Usa la skill `new-screen` cuando corresponda.

## Prohibido
- Guardar tokens en `localStorage` en móvil (usar almacenamiento seguro).
- Cargar fuentes, scripts o analítica de terceros.
- Mostrar o registrar datos personales en logs de consola.

## Al terminar
- Lint, tipos, tests (Vitest/Playwright) en verde; `axe` sin errores en pantallas nuevas.
- Actualiza contexto + índice.
