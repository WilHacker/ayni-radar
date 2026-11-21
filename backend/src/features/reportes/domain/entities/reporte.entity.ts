import type { EstadoZona, TipoDesastre } from '../../../zonas/domain/entities/zona.entity.js';

export interface ReporteEntity {
  id: string;
  zonaId: string | null;
  usuarioId: string | null;
  tipo: TipoDesastre;
  descripcion: string;
  latitud: number;
  longitud: number;
  fotoUrl: string | null;
  reportanteTag: string | null;
  creadoEn: Date;
}

export interface CrearReporteInput {
  tipo: TipoDesastre;
  descripcion: string;
  latitud: number;
  longitud: number;
  fotoUrl?: string;
  reportanteTag?: string;
  departamento?: string;
  usuarioId?: string;
}

export interface ResultadoCrearReporte {
  reporte: ReporteEntity;
  zonaId: string;
  estadoZona: EstadoZona;
  esNuevaZona: boolean;
  zonaActivada: boolean;
  totalReportesZona: number;
}
