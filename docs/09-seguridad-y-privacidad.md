# 09 — Seguridad y privacidad

## 1. Incongruencias y mejoras detectadas respecto a la descripción original

| # | Observación | Decisión tomada |
|---|---|---|
| 1 | "Control total" del administrador sin límites es un riesgo (cuenta única con poder sobre todos los datos) | MFA obligatorio, auditoría inmutable de sus acciones, suplantación con motivo y caducidad, acceso solo desde panel dedicado |
| 2 | Un QR con identificador permite copia/reenvío y canje por terceros; además se quieren **tickets impresos** (QR fijo) | QR dinámico firmado de 90 s para pantalla; QR estático firmado e imprimible con `static_qr_version` revocable; ambos de un solo uso y con estado validado en BD. El riesgo residual del impreso es el mismo que el de un vale en papel |
| 3 | "Lo único que no se puede modificar es lo canjeado" no define cómo corregir errores | Libro append-only; el admin de plataforma **revierte** mediante un registro nuevo, nunca borra |
| 4 | Un empleado podría canjear sus propios tickets (es también cliente de otra org o lo es en la misma) | Auto-canje prohibido por regla de dominio y por constraint |
| 5 | Roles por organización: riesgo de fuga entre organizaciones | `organization_id` en toda tabla + RLS + tests de aislamiento obligatorios |
| 6 | Enlaces de registro por correo | Token aleatorio de 256 bit, hash en BD, un solo uso, caducidad (7 días por defecto), revocable, sin revelar existencia de cuentas |
| 7 | Posible menores como clientes | Se descartan menores de 14 años (términos de uso); no se recoge fecha de nacimiento |
| 8 | El "derecho al olvido" choca con un libro inmutable | Anonimización del usuario conservando el libro (base legal: interés legítimo/obligación de auditoría) |
| 9 | No se menciona alta de cuenta para stores | Apple exige poder borrar la cuenta desde la app; se incluye (RF-AUTH-09) |
| 10 | No se especifica facturación (sólo planes con límites) | Fuera de la aplicación por decisión del responsable |
| 11 | Baja de un cliente con tickets activos | Los tickets se conservan; quedan bloqueados mientras no haya membership activa; reactivables |
| 12 | Falta canal de soporte/contacto con el desarrollador | Se añade email de soporte y política de incidencias (ver preguntas abiertas) |

## 2. Modelo de amenazas (STRIDE resumido)

| Amenaza | Ejemplo | Control |
|---|---|---|
| Suplantación | Robo de credenciales | argon2id, rate limit, bloqueo progresivo, MFA, sesiones revocables, alertas de login nuevo |
| Manipulación | Alterar un canje | Tablas append-only, permisos mínimos de BD, auditoría |
| Repudio | "Yo no canjé eso" | Registro con actor, dispositivo, IP y hora; auditoría |
| Revelación de información | Un cliente ve datos de otra org | RLS + policies + tests de aislamiento; IDs UUID v7 no enumerables (no es control de acceso, solo reduce ruido) |
| Denegación de servicio | Floods al canje o login | Rate limiting por IP/usuario en Caddy y API, límites de cuerpo, timeouts |
| Elevación de privilegios | Cliente que se cambia de rol | El rol solo se modifica en endpoints de `org_admin`; nunca se acepta del cliente; tests de autorización por rol/endpoint |
| Fraude de canje | QR compartido, fotocopia del impreso, doble canje | QR dinámico corto, un solo uso, `UPDATE ... WHERE status='active'`, regeneración del QR estático, `qr_kind` auditado, opción por organización de desactivar el QR estático |
| Fraude interno | Empleado canjea sin clase | Registro por empleado, estadísticas y detección de anomalías (picos), reversión posible por admin |

## 3. Controles técnicos

### Autenticación y sesiones
- Contraseñas con **argon2id**; longitud mínima 10; comprobación contra contraseñas filtradas (k-anonymity HIBP) opcional.
- Sesión opaca de 256 bit; en BD solo su hash. Caducidad deslizante (14 días móvil, 12 h inactividad web) y absoluta (90 días).
- Rotación del token al elevar privilegios (MFA, cambio de contraseña); cierre de todas las sesiones al cambiar contraseña.
- TOTP con códigos de recuperación de un solo uso (hash). Passkeys en fase S.
- Bloqueo progresivo por cuenta e IP; respuestas indistinguibles.

### Autorización
- Una única capa de `policies` por acción, probada de forma exhaustiva (tabla rol × endpoint).
- Denegado por defecto. Verificación de membership y estado de la organización por petición.
- RLS como segunda barrera.

### Datos
- TLS en todo el tránsito; HSTS. Cifrado de disco del VPS y de los backups.
- Secretos fuera del repo (variables de entorno en el servidor, `sops`/`age` para ficheros cifrados en el repo de infra).
- `mfa_secret` cifrado a nivel de columna (AES-GCM con clave de aplicación).
- Logs sin contraseñas, tokens ni cuerpos de mensajes; email enmascarado.

### Aplicación web
- CSP estricta, sin `eval`; `HttpOnly`/`Secure`/`SameSite` en cookie; protección CSRF; sanitización y escape de mensajes (texto plano, sin HTML).
- Dependencias fijadas y vigiladas (Renovate, `pnpm audit`, Trivy sobre imágenes); `gitleaks` en CI.

### Móvil
- Token en Keychain/Keystore; sin datos sensibles en logs ni en caché del WebView.
- Certificados TLS estándar (sin pinning en MVP; evaluar luego por el riesgo de bloqueo).
- Bloqueo opcional de la app con biometría.
- Deshabilitar captura de pantalla en pantallas sensibles **no** se aplica a la pantalla de QR (la mitigación es el QR de corta vida).

### Infraestructura
- VPS: acceso SSH solo con clave, sin root, `fail2ban`/`sshguard`, firewall (80/443/22 limitado), actualizaciones automáticas de seguridad.
- PostgreSQL no expuesto a internet; red interna de Docker.
- Contenedores con usuario no root, sistema de ficheros de solo lectura donde sea posible.
- Backups cifrados con claves separadas de las del VPS.

## 4. Privacidad (RGPD / LOPDGDD)

| Aspecto | Decisión |
|---|---|
| Roles RGPD | La **organización** es responsable del tratamiento de los datos de sus clientes y empleados; el **desarrollador** es **encargado del tratamiento** → contrato de encargo (art. 28) con cada organización. Para los datos de cuentas del propio administrador, es responsable |
| Base legal | Ejecución del contrato/relación entre organización y cliente; interés legítimo para auditoría |
| Datos tratados | Nombre, email, teléfono (opcional), actividad de tickets, mensajes, sede de cada canje. Sin categorías especiales ni geolocalización. Empleados y `org_admin` ven nombre, email y teléfono de los clientes de su organización |
| Menores | Los términos exigen tener al menos 14 años (edad del consentimiento propio en España); no se contemplan menores de esa edad y no se recoge fecha de nacimiento |
| Derechos | Acceso/portabilidad (RF-PRF-03), rectificación (perfil), supresión (anonimización, RF-AUTH-09), limitación (bloqueo). Proceso documentado de atención en 1 mes |
| Registro de actividades | Se mantiene un RAT con la plantilla en el repo de documentación operativa |
| Subencargados | Hosting VPS (UE), proveedor de email, FCM/APNs (Google/Apple, transferencia internacional con cláusulas contractuales), Object Storage. Lista pública y actualizada |
| Brechas | Procedimiento de notificación a la AEPD en 72 h y a organizaciones sin demora |
| Retención | Ver [modelo](05-modelo-de-dominio.md#borrado-y-retención-rgpd) |
| Cookies | Solo cookies técnicas estrictamente necesarias; sin analítica de terceros ni seguimiento. Sin banner de consentimiento necesario; sí aviso informativo |
| Documentos legales | Borradores en [legal/](../legal/) redactados por el agente; revisión posterior por asesor legal antes de operar con datos reales. Aceptación versionada en el primer acceso (RF-AUTH-10) |

## 5. Respuesta a incidentes (resumen)

1. Detectar (alertas/logs) → 2. Contener (revocar sesiones/claves, suspender organización) → 3. Erradicar → 4. Recuperar (backups) → 5. Notificar (AEPD/organizaciones) → 6. Post-mortem y actualización de documentación.

## 6. Checklist de seguridad por release

- [ ] Tests de aislamiento entre organizaciones en verde.
- [ ] Tests de autorización rol × endpoint en verde.
- [ ] `pnpm audit`/Trivy sin vulnerabilidades altas/críticas abiertas.
- [ ] `gitleaks` limpio.
- [ ] Migraciones revisadas (RLS en tablas nuevas, permisos del rol de aplicación).
- [ ] Revisión del agente de seguridad (ver [desarrollo agéntico](13-desarrollo-agentico.md)).
