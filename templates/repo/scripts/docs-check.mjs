// Comprueba que docs/ y docs/index.md están sincronizados (sin dependencias).
import { readdirSync, existsSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve, dirname } from 'node:path';

const DOCS = 'docs';
const INDEX = join(DOCS, 'index.md');
const IGNORED = new Set(['index.md', '_template.md']);
const errors = [];

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

if (!existsSync(INDEX)) {
  console.error(`Falta ${INDEX}`);
  process.exit(1);
}

const index = readFileSync(INDEX, 'utf8');
const links = [...index.matchAll(/\]\(([^)#\s]+)(?:#[^)]*)?\)/g)]
  .map((m) => m[1])
  .filter((l) => !/^[a-z]+:/i.test(l));

for (const l of links) {
  if (!existsSync(resolve(dirname(INDEX), l))) errors.push(`Enlace roto en ${INDEX}: ${l}`);
}

const linked = new Set(links.map((l) => resolve(dirname(INDEX), l)));
for (const f of walk(DOCS).filter((p) => p.endsWith('.md'))) {
  if (IGNORED.has(f.slice(DOCS.length + 1))) continue;
  if (!linked.has(resolve(f))) errors.push(`Documento no listado en el índice: ${relative('.', f)}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('docs-check OK');
