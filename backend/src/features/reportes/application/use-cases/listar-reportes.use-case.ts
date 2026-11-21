import type { ReporteEntity } from '../../domain/entities/reporte.entity.js';
import type { ReporteRepositoryPort } from '../../domain/ports/reporte.repository.port.js';

/**
 * Lista los reportes ciudadanos más recientes registrados en el radar.
 */
export class ListarReportesUseCase {
  constructor(private readonly reporteRepository: ReporteRepositoryPort) {}

  async ejecutar(limite = 50): Promise<ReporteEntity[]> {
    return this.reporteRepository.listarRecientes(limite);
  }
}
