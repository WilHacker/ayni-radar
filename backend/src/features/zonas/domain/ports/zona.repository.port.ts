import type {
  EstadisticasGlobales,
  FiltroZonas,
  ZonaDetalle,
  ZonaResumen,
} from '../entities/zona.entity.js';

export const ZONA_REPOSITORY = Symbol('ZONA_REPOSITORY');

/**
 * Puerto de persistencia para consultar zonas de desastre y estadísticas globales.
 */
export interface ZonaRepositoryPort {
  listar(filtro?: FiltroZonas): Promise<ZonaResumen[]>;
  obtenerPorId(id: string): Promise<ZonaDetalle | null>;
  obtenerEstadisticas(): Promise<EstadisticasGlobales>;
}
