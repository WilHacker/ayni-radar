# AGENTS.md — AyniRadar (ABSTRACTHON 2026)

Guía compartida para agentes IA y desarrolladores del equipo de **AyniRadar**.

## 1. Proyecto y Objetivo

- **Nombre:** AyniRadar (ABSTRACTHON 2026 — Bolivia · Track 04: Ayuda Tecnológica, cruce Comunicación + Finanzas).
- **Propósito:** Mapa de calor WebGL de zonas de desastre por agrupación geográfica de puntos (*clustering Haversine `< 1.5 km`*, validación automática `≥ 3` reportes → `ACTIVA`) conectado a un sistema de donaciones directas no custodiales (dinero vía QR directo + ropa/insumos con trazabilidad pública y foto de entrega).
- **Documentación del MVP:** ver `docs/Analisis-AyniRadar.md`.

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
  - `features/{map,reports,donations}/{api,components,hooks,store,types|schemas}/`
  - `pages/`

## 3. Reglas de Calidad y Commits

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

Todos los compañeros cuentan con las mismas skills y agentes versionados en el repo:

### Diseño y UI/UX (raíz `.agents/`)
- `.agents/skills/frontend-design/SKILL.md` — Dirección estética intencional, tipografía y anti-AI-slop.
- `.agents/skills/ui-ux-pro-max/SKILL.md` — Reglas UX/UI prioridades 1–10 (WCAG, touch, responsive, tokens) + base de datos de diseño.
- `.agents/skills/impeccable/SKILL.md` — Playbooks de auditoría, crítica y pulido a producción (`reference/`).
- `.agents/agents/design-system-evaluator.md` — Agente especialista que audita la UI en 3 lentes (`frontend-design` + `ui-ux-pro-max` + `impeccable`) con scorecard `/10` y hallazgos `P0/P1/P2`.

### Backend NestJS (`backend/.agents/skills/` y `backend/AGENTS.md`)
- `nestjs` · `nestjs-feature` · `nestjs-data` · `nestjs-auth` · `nestjs-testing` · `nestjs-production`
