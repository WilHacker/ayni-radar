import type { EstadisticasGlobales } from '../../domain/entities/zona.entity.js';
import type { ZonaRepositoryPort } from '../../domain/ports/zona.repository.port.js';

/**
 * Calcula las métricas globales de impacto del radar para la cabecera pública.
 */
export class ObtenerEstadisticasUseCase {
  constructor(private readonly zonaRepository: ZonaRepositoryPort) {}

  async ejecutar(): Promise<EstadisticasGlobales> {
    return this.zonaRepository.obtenerEstadisticas();
  }
}
