# 01 — Business Requirements Document (BRD)

## 1. Resumen ejecutivo

AutoQR es una plataforma SaaS multi-organización de gestión de vales con QR. El desarrollador opera la plataforma; cada negocio (organización) la usa para emitir, canjear y analizar vales. Primer cliente: una autoescuela.

## 2. Stakeholders

| Stakeholder | Interés | Influencia |
|---|---|---|
| Administrador de plataforma (desarrollador) | Operar, dar de alta organizaciones, soporte, control total, sostenibilidad económica | Alta |
| Organización (autoescuela) | Control de vales, estadísticas, menos fraude, menos trabajo administrativo | Alta |
| Empleados (profesores) | Canjear rápido y sin errores, ver su actividad | Media |
| Clientes (alumnos) | Saber su saldo, usar su vale fácilmente, reclamar | Media |
| Autoridad de protección de datos / RGPD | Cumplimiento | Normativa |
| Tiendas de apps (Google, Apple) | Cumplimiento de políticas | Normativa |

## 3. Objetivos de negocio

| ID | Objetivo | Métrica de éxito |
|---|---|---|
| OB-01 | Eliminar vales en papel en la autoescuela piloto | 100 % de clases prácticas canjeadas vía app a los 2 meses del lanzamiento |
| OB-02 | Visibilidad total del saldo y actividad | La organización consulta estadísticas al menos semanalmente |
| OB-03 | Canje rápido | Escaneo → confirmación en menos de 5 s percibidos |
| OB-04 | Cero canjes duplicados o fraudulentos | 0 dobles canjes; 100 % de canjes auditables |
| OB-05 | Producto replicable a otros negocios | Segunda organización incorporada sin cambios de código |
| OB-06 | Coste operativo bajo | Un VPS pequeño (~10 €/mes en total) soporta la carga hasta ~10 organizaciones |

## 4. Modelo de ingresos (supuesto)

La aplicación **no gestiona cobros ni facturación**: el responsable cobra a las organizaciones por otra vía, fuera del producto. No hay campos de plan ni pasarela de pago. Los estados de organización (`active`, `suspended`, `closed`) permiten suspender el servicio si procede.

## 5. Supuestos

- Los tickets son **digitales y también imprimibles** (PDF con QR estático). Un ticket equivale a **una unidad canjeable** (una clase práctica en la autoescuela); la organización define su nombre, utilidad y metadatos.
- El canje requiere **conexión a internet** del móvil del empleado.
- Los clientes son mayores de 14 años; no se contemplan menores de esa edad.
- Un mismo usuario (email) puede pertenecer a varias organizaciones con roles distintos.
- Mercado inicial: España (RGPD/LOPDGDD, idioma `es`).

## 6. Restricciones

- Un solo desarrollador/operador; el desarrollo es asistido por agentes.
- Despliegue en un VPS propio con dominio propio.
- Cuentas de desarrollador necesarias para publicar: Google Play (pago único) y Apple Developer Program (cuota anual).
- Compilar iOS requiere macOS (se resuelve con CI en runners macOS).

## 7. Riesgos de negocio principales

Ver detalle en [17-riesgos-y-preguntas-abiertas.md](17-riesgos-y-preguntas-abiertas.md). Resumen: revisión de Apple para apps con cuentas solo por invitación, QR impreso copiable, dependencia de un único operador.

## 8. Criterios de aceptación del MVP

1. Una organización puede ser dada de alta, invitar a su primer admin y este a empleados y clientes.
2. Se emiten tickets a un cliente; este ve su QR; un empleado lo escanea y confirma; el ticket queda canjeado y no puede canjearse de nuevo.
3. El canje es atómico y auditable, y solo el administrador de plataforma puede revertirlo.
4. Cada rol ve únicamente lo que le corresponde y nada de otras organizaciones (verificado por tests de aislamiento).
5. Estadísticas básicas visibles para los tres roles.
6. Apps publicadas en pruebas internas de Android e iOS (TestFlight) con escáner funcional.
7. Copias de seguridad restauradas con éxito al menos una vez en un entorno de prueba.
