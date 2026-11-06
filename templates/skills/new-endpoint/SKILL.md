---
name: new-endpoint
description: Pasos para añadir un endpoint a valeQR-api con contrato, permisos, auditoría y tests de rol y aislamiento. Usar al crear o modificar rutas de la API.
---

# new-endpoint

1. **Contexto**: aplica `context-sync`; localiza el requisito `RF-*`.
2. **Contrato** (`valeQR-contract`): esquemas Zod de entrada/salida, códigos de error de dominio; publica versión compatible.
3. **Ruta**: bajo `/v1/orgs/{orgId}/...` si es de organización; validación Zod; tamaño máximo de cuerpo; rate limit si es sensible.
4. **Policy**: define el rol mínimo y reglas de propiedad (`propio`); denegado por defecto. Verifica membership activa y organización no suspendida.
5. **Servicio**: lógica de negocio; transacción cuando haya varias escrituras; `Idempotency-Key` si es una operación crítica.
6. **Repositorio**: SQL con Drizzle, parametrizado; sin saltarse RLS.
7. **Auditoría**: registra en `audit_log` si la acción es sensible.
8. **Tests**: matriz de roles (sin sesión, client, employee, org_admin, platform_admin, miembro removido), aislamiento entre organizaciones, casos de error, concurrencia si aplica.
9. **Docs**: actualiza el documento de contexto, `docs/index.md` y, si procede, `valeQR-docs/docs/08-api.md`.
