import { calcularDistanciaHaversineKm } from '../../../../shared/domain/geo.utils.js';
import type { EstadoZona, TipoDesastre } from '../../../zonas/domain/entities/zona.entity.js';
import type {
  CrearReporteInput,
  ResultadoCrearReporte,
} from '../../domain/entities/reporte.entity.js';
import type {
  ReporteRepositoryPort,
  ZonaAbiertaCercana,
} from '../../domain/ports/reporte.repository.port.js';

export const RADIO_CLUSTERING_KM = 1.5;
export const MIN_REPORTES_ACTIVACION = 3;

const ETIQUETAS_TIPO: Record<TipoDesastre, string> = {
  INCENDIO: 'Incendio',
  INUNDACION: 'Inundación',
  DESLIZAMIENTO: 'Deslizamiento',
  HELADA: 'Helada',
  SEQUIA: 'Sequía',
  OTRO: 'Emergencia',
};

/**
 * Registra un reporte ciudadano, aplica clustering Haversine (< 1.5 km)
 * y activa automáticamente la zona al alcanzar >= 3 reportes independientes.
 */
export class CrearReporteUseCase {
  constructor(private readonly reporteRepository: ReporteRepositoryPort) {}

  async ejecutar(input: CrearReporteInput): Promise<ResultadoCrearReporte> {
    const zonasAbiertas = await this.reporteRepository.buscarZonasAbiertasPorTipo(input.tipo);
    const zonaCercana = this.encontrarZonaMasCercana(zonasAbiertas, input.latitud, input.longitud);

    if (!zonaCercana) {
      const departamento = input.departamento ?? 'Bolivia';
      const tituloZona = `${ETIQUETAS_TIPO[input.tipo]} reportado — ${departamento}`;
      const { reporte, zonaId } = await this.reporteRepository.crearConNuevaZona(input, tituloZona);

      return {
        reporte,
        zonaId,
        estadoZona: 'POR_VERIFICAR',
        esNuevaZona: true,
        zonaActivada: false,
        totalReportesZona: 1,
      };
    }

    const totalReportesZona = zonaCercana.totalReportes + 1;
    const debeActivar = totalReportesZona >= MIN_REPORTES_ACTIVACION;
    const nuevoEstado: EstadoZona = debeActivar ? 'ACTIVA' : zonaCercana.estado;
    const nuevaSeveridad = Math.min(
      5,
      Math.max(zonaCercana.severidad, Math.ceil(totalReportesZona / 2) + 1),
    );

    const reporte = await this.reporteRepository.crearEnZonaExistente(input, {
      zonaId: zonaCercana.id,
      nuevoEstado,
      nuevaSeveridad,
    });

    return {
      reporte,
      zonaId: zonaCercana.id,
      estadoZona: nuevoEstado,
      esNuevaZona: false,
      zonaActivada: zonaCercana.estado !== 'ACTIVA' && nuevoEstado === 'ACTIVA',
      totalReportesZona,
    };
  }

  private encontrarZonaMasCercana(
    zonas: ZonaAbiertaCercana[],
    latitud: number,
    longitud: number,
  ): ZonaAbiertaCercana | null {
    let mejorZona: ZonaAbiertaCercana | null = null;
    let mejorDistancia = RADIO_CLUSTERING_KM;

    for (const zona of zonas) {
      const distancia = calcularDistanciaHaversineKm(
        latitud,
        longitud,
        zona.latitud,
        zona.longitud,
      );
      if (distancia < mejorDistancia) {
        mejorDistancia = distancia;
        mejorZona = zona;
      }
    }

    return mejorZona;
  }
}
