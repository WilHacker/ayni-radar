import { describe, expect, it, vi } from 'vitest';
import type { ZonaDetalle, ZonaResumen } from '../../domain/entities/zona.entity.js';
import { ZonaNoEncontradaError } from '../../domain/errors/zona-no-encontrada.error.js';
import type { ZonaRepositoryPort } from '../../domain/ports/zona.repository.port.js';
import { ListarZonasUseCase } from './listar-zonas.use-case.js';
import { ObtenerZonaDetalleUseCase } from './obtener-zona-detalle.use-case.js';

const zonaEjemplo: ZonaResumen = {
  id: 'zona-1',
  titulo: 'Incendio Roboré',
  departamento: 'Santa Cruz',
  tipo: 'INCENDIO',
  latitud: -18.3347,
  longitud: -59.7614,
  estado: 'ACTIVA',
  severidad: 5,
  metaBs: 15000,
  recaudadoBs: 6400,
  qrImagenUrl: null,
  necesidadesJson: {},
  totalReportes: 3,
  creadoEn: new Date('2026-11-21T10:00:00Z'),
  actualizadoEn: new Date('2026-11-21T10:00:00Z'),
};

function crearRepoMock(parcial?: Partial<ZonaRepositoryPort>): ZonaRepositoryPort {
  return {
    listar: vi.fn().mockResolvedValue([zonaEjemplo]),
    obtenerPorId: vi.fn().mockResolvedValue(null),
    obtenerEstadisticas: vi.fn(),
    ...parcial,
  };
}

describe('ListarZonasUseCase', () => {
  it('debe devolver las zonas y su FeatureCollection GeoJSON con [longitud, latitud]', async () => {
    // Preparar
    const repo = crearRepoMock();
    const useCase = new ListarZonasUseCase(repo);

    // Actuar
    const resultado = await useCase.ejecutar({ tipo: 'INCENDIO' });

    // Verificar
    expect(resultado.zonas).toHaveLength(1);
    expect(resultado.geojson.type).toBe('FeatureCollection');
    expect(resultado.geojson.features[0]?.geometry.coordinates).toEqual([-59.7614, -18.3347]);
    expect(resultado.geojson.features[0]?.properties.totalReportes).toBe(3);
  });
});

describe('ObtenerZonaDetalleUseCase', () => {
  it('debe lanzar ZonaNoEncontradaError cuando la zona no existe', async () => {
    // Preparar
    const repo = crearRepoMock({ obtenerPorId: vi.fn().mockResolvedValue(null) });
    const useCase = new ObtenerZonaDetalleUseCase(repo);

    // Actuar y Verificar
    await expect(useCase.ejecutar('zona-inexistente')).rejects.toThrow(ZonaNoEncontradaError);
  });

  it('debe devolver el detalle de la zona cuando existe', async () => {
    // Preparar
    const detalle: ZonaDetalle = { ...zonaEjemplo, reportes: [], donaciones: [] };
    const repo = crearRepoMock({ obtenerPorId: vi.fn().mockResolvedValue(detalle) });
    const useCase = new ObtenerZonaDetalleUseCase(repo);

    // Actuar
    const resultado = await useCase.ejecutar('zona-1');

    // Verificar
    expect(resultado.id).toBe('zona-1');
    expect(resultado.titulo).toBe('Incendio Roboré');
  });
});
