# AGENTS.md — AyniRadar (ABSTRACTHON 2026)

Guía compartida para agentes IA y desarrolladores del equipo de **AyniRadar**.

## 1. Proyecto y Objetivo

- **Nombre:** AyniRadar (ABSTRACTHON 2026 — Bolivia · Track 04: Ayuda Tecnológica, cruce Comunicación + Finanzas).
- **Propósito:** Mapa de calor WebGL de zonas de desastre por agrupación geográfica de puntos (*clustering Haversine `< 1.5 km`*, validación automática `≥ 3` reportes → `ACTIVA`) conectado a un sistema de donaciones directas no custodiales (dinero vía QR directo + ropa/insumos con trazabilidad pública y foto de entrega).
- **Documentación del MVP:** ver `docs/Analisis-AyniRadar.md`.
- **Estándares de codificación obligatorios:** ver `docs/CODING_STANDARDS.md` (**estándar híbrido obligatorio**: dominio en español en BD/archivos/rutas como `zonas`, `reportes`, `donaciones`, `mapa` + estructura técnica en inglés; errores de dominio en español; tests AAA en español).

## 2. Arquitectura Obligatoria

- **Backend (`backend/src/`):** **Arquitectura Hexagonal por Features** (`NestJS 12 + TypeScript 6 estricto + Prisma 7 + PostgreSQL`).
  - `shared/domain/` (utilidades puras como `geo.utils.ts`) y `shared/infrastructure/prisma/`
  - `features/<feature>/`:
    - `domain/{entities,ports}/` — sin dependencias de NestJS ni Prisma
    - `application/{dto,use-cases}/` — casos de uso y DTOs validados con `class-validator`
    - `infrastructure/{persistence,http}/` — adaptadores Prisma y controladores REST
  - Con `moduleResolution: "nodenext"`, los imports relativos en `backend/src/` usan extensión `.js`.
- **Frontend (`frontend/src/`):** **Arquitectura Feature-Based con subcarpetas** (`React 19 + Vite 8 + Tailwind CSS v4 + TypeScript 6 estricto + React Router + TanStack Query + Axios + Zod + Zustand + MapLibre GL`).
  - `app/{providers,router}/`
  - `shared/{api,components/ui,types,utils}/`
  - `features/{mapa,reportes,donaciones}/{api,components,hooks,store,types|schemas}/`
  - `pages/`

## 3. Reglas de Calidad y Commits

- **CONTROL MANUAL DE GIT (REGLA OBLIGATORIA):** el agente IA **NUNCA** debe ejecutar `git commit` ni `git push` automáticamente. Todos los cambios deben quedar en el working tree local para que el usuario los revise, haga el commit y los suba manualmente (el agente puede sugerir el mensaje en Conventional Commits en español si se lo piden).
- **TypeScript estricto** (`strict: true`, `noUncheckedIndexedAccess: true`, `noImplicitReturns: true`).
- **Nunca subir `.env` ni secretos** (usar `.env.example` con placeholders).
- **Conventional Commits obligatorios** (validado por Husky + Commitlint): `feat(scope): ...`, `fix(scope): ...`, `refactor(scope): ...`, `test(scope): ...`, `docs: ...`, `chore: ...`, `build: ...`, `ci: ...`.
- Antes de hacer `push`, verificar en ambos proyectos:
  ```bash
  npm run format:check
  npm run lint
  npm run typecheck
  npm run test
  npm run build
  ```

## 4. Skills y Agentes incluidos en este repositorio

Todos los compañeros cuentan con **21 skills** y **8 agentes especialistas** versionados directamente en el repo (`.agents/agents/`):

### Agentes Especialistas (`.agents/agents/`)
- `design-system-evaluator.md` — Audita la UI en 3 lentes (`frontend-design` + `ui-ux-pro-max` + `impeccable`) con scorecard `/10` y hallazgos `P0/P1/P2`.
- `architect.md` — Custodia la Arquitectura Hexagonal en NestJS y Feature-Based en React bajo el estándar híbrido obligatorio.
- `database-reviewer.md` — Persistencia en Prisma 7, PostgreSQL/Supabase, clustering Haversine y optimización de índices/seeds.
- `react-reviewer.md` — React 19, ciclo de vida de MapLibre GL, selectores Zustand y rendimiento de capas WebGL.
- `security-reviewer.md` — DTOs con `ValidationPipe`, CORS, higiene de secretos y verificación de flujo no custodial.
- `tdd-guide.md` — Pruebas AAA en español con Vitest y React Testing Library (cobertura ≥ 80%).
- `build-error-resolver.md` — Resolución quirúrgica de errores de build y chequeo de tipos TypeScript/NestJS/Vite.
- `browser-qa-runner.md` — Pruebas visuales/E2E con Playwright y Chrome DevTools para la demo de 4 minutos.

### Diseño y UI/UX (`.agents/skills/`)
- `frontend-design` — Dirección estética intencional, tipografía y anti-AI-slop.
- `ui-ux-pro-max` — Reglas UX/UI prioridades 1–10 (WCAG, touch, responsive, tokens) + base de datos de diseño.
- `impeccable` — Playbooks de auditoría, crítica y pulido a producción (`reference/`).

### Frontend React, QA y Accesibilidad (`.agents/skills/`)
- `react-best-practices` · `react-review` · `react-test` · `react-build`
- `a11y-debugging` · `e2e-testing` · `browser-qa`

### Calidad, Base de Datos (Supabase) e IA (`.agents/skills/`)
- `tdd-workflow` · `verification-loop`
- `supabase` · `supabase-postgres-best-practices`
- `gemini-api-dev`

### Backend NestJS (`backend/.agents/skills/` y `backend/AGENTS.md`)
- `nestjs` · `nestjs-feature` · `nestjs-data` · `nestjs-auth` · `nestjs-testing` · `nestjs-production`

## 5. MCPs recomendados para el proyecto

- **`playwright`:** pruebas visuales/E2E contra `localhost:5173` y Railway, más screenshots para `README.md` y el pitch.
- **`chrome-devtools`:** depuración de red/CORS, consola, rendimiento WebGL del mapa y auditoría `a11y`.
- **`postman` / `apidog`:** colección automática desde Swagger `/docs` para probar `/api/zones`, `/api/reports` y `/api/donations`.
- **`figma`:** extracción de diseños/tokens si el equipo diseña pantallas en Figma.
- **`canva`:** armado y exportación de diapositivas del pitch de 4 minutos.
