---
name: context-sync
description: Protocolo de contexto de AutoQR. Usar siempre antes de implementar (buscar y leer el contexto de la funcionalidad) y después (actualizar o crear el documento de contexto y el índice).
---

# context-sync

## Antes de implementar
1. Abre `docs/index.md` del repo.
2. Busca la funcionalidad que encaja con la petición (por nombre, requisito `RF-*` o resumen).
3. Lee su documento de contexto y los enlazados (contratos, datos, seguridad).
4. Si no encaja con ninguna, trátala como funcionalidad nueva y planifica su documento.

## Después de implementar
1. Actualiza el documento de contexto: comportamiento y reglas, ubicación en el código, contratos, datos, seguridad, pruebas, historial.
2. Si es nueva: copia `docs/_template.md` → `docs/<area>/<nombre>.md`, complétalo y añade su fila a `docs/index.md`.
3. Revisa que ningún enlace del índice esté roto.
4. Si el cambio afecta a otros repos o a producto, anótalo en el PR y actualiza `valeQR-docs`.
