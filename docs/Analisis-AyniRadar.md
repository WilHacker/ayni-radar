# Análisis Técnico y Funcional — AyniRadar

**AyniRadar** es un **Mapa de Calor de Zonas de Desastre** basado en agrupación geográfica de reportes ciudadanos (*clustering*) conectado a un **Sistema de Donaciones Directas** (dinero vía QR + ropa/insumos) sin intermediarios burocráticos y con trazabilidad pública.

## 1. Alineación con ABSTRACTHON 2026

- **Track oficial:** `04 · Ayuda Tecnológica` — cruce **Comunicación** (radar geográfico colaborativo de emergencias y necesidades vivas) + **Finanzas** (donaciones directas no custodiales con trazabilidad de comprobantes y metas).
- **Rúbrica oficial (100 puntos):**
  - **Innovación (40 pts):** mapa de calor WebGL en tiempo real + validación anti-fraude por densidad (`≥ 3` reportes cercanos independientes activan la zona) + inventario vivo de necesidades por zona (evita saturar de ropa donde falta agua/medicina).
  - **Viabilidad técnica (30 pts):** monorepo TypeScript estricto (React + Vite + Tailwind + MapLibre GL / NestJS + Prisma 7 + PostgreSQL), CI/CD con GitHub Actions, tests unitarios Vitest, Swagger `/docs`, Docker Compose y deploy en Railway.
  - **Impacto (30 pts):** problema crítico y recurrente en Bolivia (incendios, inundaciones, deslizamientos) con arquitectura **no custodial**.

## 2. Flujo del MVP (Demo 4 minutos)

1. **Ver el radar en vivo:** mapa interactivo de Bolivia con heatmap + clústeres (`POR_VERIFICAR`, `ACTIVA`, `ATENDIDA`), filtros por tipo de desastre y estadísticas globales.
2. **Reportar una emergencia:** GPS o clic en mapa + tipo + descripción + foto → clustering Haversine (`< 1.5 km`); al llegar a 3 reportes independientes la zona pasa automáticamente a `ACTIVA`.
3. **Consultar necesidades reales:** panel lateral con fotos, barras de cobertura por insumo (agua, ropa, alimentos, medicina), meta en Bs y ledger público.
4. **Donar sin intermediarios:** dinero vía QR directo de brigada/beneficiario + comprobante verificable, o compromiso de ropa/insumos físicos.
5. **Trazabilidad:** foto de entrega final (`ENTREGADA`) visible en el feed público de transparencia.

## 3. Contratos API REST (`/api`)

| Método | Ruta | Propósito |
|---|---|---|
| `GET` | `/api/health` | Healthcheck de API y PostgreSQL |
| `GET` | `/api/zones` | Lista zonas + reportes para heatmap y clústeres |
| `GET` | `/api/zones/:id` | Detalle de zona, necesidades y ledger de donaciones |
| `POST` | `/api/reports` | Crea reporte, ejecuta clustering Haversine (`< 1.5 km`) y actualiza severidad/estado |
| `POST` | `/api/zones/:id/donations` | Registra donación de dinero o insumos |
| `PATCH` | `/api/donations/:id/deliver` | Adjunta foto de entrega y marca `ENTREGADA` |
| `GET` | `/api/stats` | Métricas globales de impacto |

## 4. Entornos de despliegue

- **Repositorio:** https://github.com/WilHacker/ayni-radar
- **Frontend (Railway):** https://ayni-radar.up.railway.app
- **Backend (Railway):** https://ayni-radar-backend.up.railway.app/api (Swagger: `/docs`)
