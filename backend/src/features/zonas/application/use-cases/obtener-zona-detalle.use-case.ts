import type { ZonaDetalle } from '../../domain/entities/zona.entity.js';
import { ZonaNoEncontradaError } from '../../domain/errors/zona-no-encontrada.error.js';
import type { ZonaRepositoryPort } from '../../domain/ports/zona.repository.port.js';

/**
 * Obtiene el detalle completo de una zona (reportes, necesidades e historial de donaciones).
 */
export class ObtenerZonaDetalleUseCase {
  constructor(private readonly zonaRepository: ZonaRepositoryPort) {}

  async ejecutar(id: string): Promise<ZonaDetalle> {
    const zona = await this.zonaRepository.obtenerPorId(id);
    if (!zona) {
      throw new ZonaNoEncontradaError(id);
    }
    return zona;
  }
}
