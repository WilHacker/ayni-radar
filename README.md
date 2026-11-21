# AyniRadar

> **Mapa de calor de zonas de desastre por agrupación de puntos + Sistema de donaciones directas (dinero, ropa e insumos) sin intermediarios burocráticos.**
>
> Proyecto para **ABSTRACTHON 2026 — Bolivia** (Track 04: Ayuda Tecnológica · Cruce Comunicación + Finanzas).

## Problema que resolvemos

Ante emergencias en Bolivia (incendios, inundaciones y deslizamientos), la información sobre zonas afectadas llega fragmentada y tardía, mientras las donaciones de dinero, ropa e insumos se frenan por desconfianza en intermediarios o se concentran mal (sobrando ropa en un punto mientras falta agua o medicinas en otro).

## Solución

- **Mapa de calor WebGL y clustering por puntos:** agrupa reportes ciudadanos cercanos (`< 1.5 km`) y valida automáticamente zonas críticas al alcanzar densidad suficiente (`≥ 3` reportes independientes), reduciendo reportes falsos.
- **Inventario vivo de necesidades:** muestra cobertura por insumo (agua, ropa, alimentos, medicina) y meta en Bs por zona.
- **Donaciones directas no custodiales:** dinero vía QR directo a brigadas/beneficiarios verificados + compromiso de insumos físicos con trazabilidad pública y foto de entrega final.

## Arquitectura del Monorepo

```text
ayni-radar/
├── frontend/                  # React + Vite + Tailwind CSS + TS estricto (Feature-Based)
│   └── src/
│       ├── app/               # providers/ · router/
│       ├── shared/            # api/ · components/ui/ · types/ · utils/
│       ├── features/          # map/ · reports/ · donations/ (api, components, hooks, types/schemas)
│       └── pages/             # Páginas de nivel superior
├── backend/                   # NestJS + TS estricto + Prisma 7 + Supabase (Hexagonal por Features)
│   └── src/
│       ├── shared/            # domain/ (geo.utils) · infrastructure/prisma/
│       └── features/          # health/ · zones/ · reports/ · donations/
│           └── <feature>/     # domain/(entities,ports) · application/(dto,use-cases) · infrastructure/(persistence,http)
└── .github/workflows/         # CI/CD (format:check, lint, typecheck, build)
```

## Requisitos previos

- Node.js `>= 20` (probado en `v24`)
- npm `>= 10`
- Base de datos PostgreSQL (Supabase)

## Configuración rápida

### 1. Backend

```bash
cd backend
cp .env.example .env
# Completa DATABASE_URL y DIRECT_URL en backend/.env
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

Swagger disponible en `http://localhost:3000/docs` y healthcheck en `http://localhost:3000/api/health`.

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend disponible en `http://localhost:5173`.

## Calidad de código y Conventional Commits

Ambos proyectos corren en **TypeScript estricto**, **ESLint** y **Prettier**, verificados automáticamente por GitHub Actions en cada `push` y `pull_request`:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run build
```

Usar **Conventional Commits** para todos los commits:
- `feat(map): ...` — nueva funcionalidad
- `fix(zones): ...` — corrección de error
- `refactor(donations): ...` — refactor sin cambio de comportamiento
- `chore(deps): ...` — tareas de configuración/dependencias
- `docs: ...` — documentación
- `ci: ...` — pipelines CI/CD
