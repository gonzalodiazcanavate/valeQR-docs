# 04 — Requisitos no funcionales

| ID | Categoría | Requisito | Objetivo medible |
|---|---|---|---|
| RNF-PERF-01 | Rendimiento | Latencia de la API en operaciones normales | p95 < 300 ms; p99 < 800 ms |
| RNF-PERF-02 | Rendimiento | Operación de canje (preview + confirmación) en servidor | p95 < 250 ms por llamada |
| RNF-PERF-03 | Rendimiento | Carga inicial de la web en 4G | LCP < 2,5 s; JS inicial < 200 KB gzip |
| RNF-PERF-04 | Rendimiento | Consultas de estadísticas | p95 < 1 s hasta 1 M de tickets por organización |
| RNF-CAP-01 | Capacidad | Dimensionamiento inicial | 1 organización piloto; hasta ~10 a medio plazo (diseñar con holgura: 10 000 usuarios, 1 M de tickets, 10 req/s sostenidas) |
| RNF-ESC-01 | Escalabilidad | API sin estado, escalable horizontalmente; ruta de crecimiento documentada | Ver [arquitectura](06-arquitectura.md) |
| RNF-DISP-01 | Disponibilidad | Disponibilidad mensual | ≥ 99,5 % (despliegue en un único VPS) |
| RNF-DISP-02 | Disponibilidad | Despliegues sin pérdida de peticiones del cliente | Reinicio < 10 s; el cliente reintenta con idempotencia |
| RNF-DUR-01 | Durabilidad | RPO (pérdida máxima de datos) | ≤ 15 min (archivado WAL continuo) |
| RNF-DUR-02 | Durabilidad | RTO (tiempo de recuperación) | ≤ 4 h |
| RNF-DUR-03 | Durabilidad | Restauración probada | Prueba de restauración completa al menos trimestral |
| RNF-SEC-01 | Seguridad | Cumplimiento OWASP ASVS nivel 2 en lo aplicable; OWASP Top 10 | Checklist en cada release |
| RNF-SEC-02 | Seguridad | Aislamiento entre organizaciones | 0 fugas; tests automáticos de aislamiento obligatorios; RLS en base de datos |
| RNF-SEC-03 | Seguridad | Cifrado | TLS 1.2+ (preferente 1.3) en tránsito; cifrado de disco y de backups en reposo |
| RNF-SEC-04 | Seguridad | Dependencias | Escaneo automático de vulnerabilidades y actualización periódica |
| RNF-PRI-01 | Privacidad | Cumplimiento RGPD/LOPDGDD | Registro de tratamientos, base legal, derechos ARCO+ operativos |
| RNF-PRI-02 | Privacidad | Minimización de datos | Solo nombre, email, teléfono opcional; sin datos sensibles |
| RNF-PRI-03 | Privacidad | Residencia de datos | UE |
| RNF-USA-01 | Usabilidad | Canje con una mano | Flujo escaneo → confirmar ≤ 3 toques |
| RNF-USA-02 | Usabilidad | Accesibilidad | WCAG 2.2 AA en web y app |
| RNF-USA-03 | Usabilidad | Interfaz de cliente muy simple | Usuario nuevo ve su QR en ≤ 2 toques desde abrir la app |
| RNF-MNT-01 | Mantenibilidad | Cobertura de tests en dominio crítico (canje, permisos, tenancy) | ≥ 90 % líneas y tests de propiedades en el canje |
| RNF-MNT-02 | Mantenibilidad | Documentación sincronizada con el código | Verificada en PR (ver [desarrollo agéntico](13-desarrollo-agentico.md)) |
| RNF-OBS-01 | Observabilidad | Logs estructurados, métricas, errores y alertas | Ver [despliegue](11-despliegue-e-infraestructura.md) |
| RNF-PORT-01 | Portabilidad | Sin dependencia de proveedor cloud propietario | Todo corre con Docker en cualquier VPS Linux |
| RNF-COMP-01 | Compatibilidad | Navegadores y SO | Últimas 2 versiones de Chrome/Edge/Firefox/Safari; Android ≥ 8 (API 26); iOS ≥ 15 |
| RNF-I18N-01 | Internacionalización | Todas las cadenas externalizadas, fechas en zona horaria de la organización | `es` en MVP |
| RNF-COST-01 | Coste | Operación hasta ~10 organizaciones en un VPS de ~2 vCPU / 4 GB | Coste infra total ~10 €/mes (VPS + backups) |
