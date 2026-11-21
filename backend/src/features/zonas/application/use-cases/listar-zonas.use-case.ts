import type { FiltroZonas, ZonaResumen } from '../../domain/entities/zona.entity.js';
import type { ZonaRepositoryPort } from '../../domain/ports/zona.repository.port.js';

export interface GeoJsonFeatureZona {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  properties: {
    id: string;
    titulo: string;
    departamento: string;
    tipo: string;
    estado: string;
    severidad: number;
    totalReportes: number;
    recaudadoBs: number;
    metaBs: number;
  };
}

export interface RespuestaListarZonas {
  zonas: ZonaResumen[];
  geojson: {
    type: 'FeatureCollection';
    features: GeoJsonFeatureZona[];
  };
}

/**
 * Lista las zonas de desastre filtradas junto con su colección GeoJSON para el mapa WebGL.
 */
export class ListarZonasUseCase {
  constructor(private readonly zonaRepository: ZonaRepositoryPort) {}

  async ejecutar(filtro?: FiltroZonas): Promise<RespuestaListarZonas> {
    const zonas = await this.zonaRepository.listar(filtro);

    const features: GeoJsonFeatureZona[] = zonas.map((zona) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [zona.longitud, zona.latitud],
      },
      properties: {
        id: zona.id,
        titulo: zona.titulo,
        departamento: zona.departamento,
        tipo: zona.tipo,
        estado: zona.estado,
        severidad: zona.severidad,
        totalReportes: zona.totalReportes,
        recaudadoBs: zona.recaudadoBs,
        metaBs: zona.metaBs,
      },
    }));

    return {
      zonas,
      geojson: {
        type: 'FeatureCollection',
        features,
      },
    };
  }
}
