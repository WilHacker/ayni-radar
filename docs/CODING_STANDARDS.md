# Estándares de Codificación y Buenas Prácticas — AyniRadar

Estándar oficial del equipo basado en **Google TypeScript + Clean Code + Convenciones Oficiales NestJS/React** y las prácticas de calidad (errores de dominio, tests AAA, fronteras por feature y control manual de Git).

## 1. Git y Commits (Obligatorio)

- **Control manual:** los agentes IA nunca ejecutan `git commit` ni `git push`. Cada desarrollador revisa y sube sus cambios manualmente.
- **Conventional Commits** (validado por Husky + Commitlint):
  `tipo(alcance): descripción corta en español en minúscula` (máx. 100 caracteres, sin punto final).
- Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- Ramas: `main` (demo estable) · `develop` (integración) · `feat/<modulo>` · `fix/<bug>`.

## 2. Idioma y Nomenclatura (Estándar Híbrido Obligatorio)

**Regla obligatoria en BD, carpetas, archivos, código y API:**
- **Dominio de negocio en ESPAÑOL:** `zonas`, `reportes`, `donaciones`, `mapa`, `Zona`, `Reporte`, `Donacion`, `calcularDistanciaHaversineKm`, `useMapaUiStore`, rutas `/api/zonas`, `/api/reportes`, `/api/zonas/:id/donaciones`.
- **Estructura técnica en INGLÉS:** `app`, `shared`, `pages`, `features`, `domain`, `application`, `infrastructure`, `entities`, `ports`, `dto`, `use-cases`, `persistence`, `http`, `api`, `components`, `hooks`, `schemas`, `store`, `utils`, `tests`, `health`, `prisma`, `docs`.
- **Base de datos (Prisma 7 + PostgreSQL):** modelos en `PascalCase` español con `@@map("zonas")` / `@@map("reportes")` / `@@map("donaciones")` y columnas `snake_case` en español con `@map("meta_bs")`, `@map("creado_en")`, `@map("actualizado_en")`.
- **UI, errores de dominio, tests y commits:** siempre en **español**.
- **Archivos:**
  - Backend (NestJS): `kebab-case.<rol>.ts` (`crear-reporte.use-case.ts`, `zona.repository.port.ts`, `prisma-zona.repository.ts`, `zonas.controller.ts`).
  - Frontend (React): `PascalCase.tsx` para componentes/páginas; `camelCase.ts` para hooks, stores, API y utils (`useMapaUiStore.ts`, `desastre.types.ts`).
- **Símbolos:** `camelCase` variables/funciones (booleanos con `es`/`tiene`/`puede`/`debe`) · `PascalCase` clases/tipos/componentes · `UPPER_SNAKE_CASE` constantes.

## 3. Calidad y Clean Code

- **TypeScript 6 estricto** (`strict`, `noUncheckedIndexedAccess`, `noImplicitReturns`).
- **Cero `any`** (usar `unknown` + narrowing) y **cero `console.log`**.
- **ESLint (`strictTypeChecked`)** sin warnings + **Prettier** (`singleQuote`, `semi`, `100` cols, `2` espacios, `LF`).
- Archivos `< 800` líneas, funciones `< 50` líneas, máx. 3–4 niveles de anidación (*early returns*), inmutabilidad.
- **Comentarios:** solo el **por qué** (reglas no obvias, *workarounds*, límites), nunca el **qué**. TSDoc en español en puertos, casos de uso y funciones puras exportadas.

## 4. Fronteras de Arquitectura

- **Backend (Hexagonal por Features):** `infrastructure → application → domain`. `domain/` nunca importa NestJS ni Prisma. Imports relativos con extensión `.js` (ESM `nodenext`).
- **Errores de dominio:** clases propias en español (`<Entidad><Problema>Error`) traducidas a HTTP (`404`, `409`, `422`, `400`) por un filtro global; nunca `catch {}` vacío ni exposición de datos sensibles.
- **Frontend (Feature-Based):** `pages → features → shared`. Una feature no importa de otra feature; `shared/` no importa de `features/`. Validar respuestas HTTP con **Zod**, consultar vía **TanStack Query** y manejar estado UI en **Zustand**.

## 5. Tests (Vitest)

- Descripciones **en español**, estructura **AAA** (Preparar · Actuar · Verificar), un comportamiento por test (`*.spec.ts` en backend, `*.test.ts(x)` en frontend).
- Mínimo **80 %** de cobertura en lógica de dominio y casos de uso; sin dependencia de `.env` ni BD real en unitarios.

## 6. Seguridad

- Nunca subir `.env` ni secretos (solo `.env.example`).
- Las variables `VITE_*` son públicas.
- Toda entrada externa se valida en el borde (`class-validator` en backend, `zod` en frontend).
