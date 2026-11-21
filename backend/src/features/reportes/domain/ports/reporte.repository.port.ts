import type { EstadoZona, TipoDesastre } from '../../../zonas/domain/entities/zona.entity.js';
import type { CrearReporteInput, ReporteEntity } from '../entities/reporte.entity.js';

export const REPORTE_REPOSITORY = Symbol('REPORTE_REPOSITORY');

export interface ZonaAbiertaCercana {
  id: string;
  titulo: string;
  tipo: TipoDesastre;
  latitud: number;
  longitud: number;
  estado: EstadoZona;
  severidad: number;
  totalReportes: number;
}

export interface ActualizarZonaClusteringInput {
  zonaId: string;
  nuevoEstado: EstadoZona;
  nuevaSeveridad: number;
}

/**
 * Puerto de persistencia para reportes ciudadanos y agrupación geográfica por zona.
 */
export interface ReporteRepositoryPort {
  listarRecientes(limite?: number): Promise<ReporteEntity[]>;
  buscarZonasAbiertasPorTipo(tipo: TipoDesastre): Promise<ZonaAbiertaCercana[]>;
  crearEnZonaExistente(
    input: CrearReporteInput,
    actualizacionZona: ActualizarZonaClusteringInput,
  ): Promise<ReporteEntity>;
  crearConNuevaZona(
    input: CrearReporteInput,
    tituloZona: string,
  ): Promise<{ reporte: ReporteEntity; zonaId: string }>;
}
