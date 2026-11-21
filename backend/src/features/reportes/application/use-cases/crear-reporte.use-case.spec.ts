import { describe, expect, it, vi } from 'vitest';
import type { ReporteEntity } from '../../domain/entities/reporte.entity.js';
import type {
  ReporteRepositoryPort,
  ZonaAbiertaCercana,
} from '../../domain/ports/reporte.repository.port.js';
import { CrearReporteUseCase } from './crear-reporte.use-case.js';

const reporteBase: ReporteEntity = {
  id: 'rep-1',
  zonaId: 'zona-1',
  usuarioId: null,
  tipo: 'INCENDIO',
  descripcion: 'Foco de incendio activo en pastizal cercano.',
  latitud: -18.3347,
  longitud: -59.7614,
  fotoUrl: null,
  reportanteTag: 'ayni_carlos',
  creadoEn: new Date('2026-11-21T12:00:00Z'),
};

describe('CrearReporteUseCase (Clustering Haversine)', () => {
  it('debe crear una nueva zona en estado POR_VERIFICAR cuando no hay zonas cercanas', async () => {
    // Preparar
    const crearConNuevaZona = vi
      .fn()
      .mockResolvedValue({ reporte: reporteBase, zonaId: 'zona-nueva' });
    const repo: ReporteRepositoryPort = {
      listarRecientes: vi.fn().mockResolvedValue([]),
      buscarZonasAbiertasPorTipo: vi.fn().mockResolvedValue([]),
      crearEnZonaExistente: vi.fn().mockResolvedValue(reporteBase),
      crearConNuevaZona,
    };
    const useCase = new CrearReporteUseCase(repo);

    // Actuar
    const resultado = await useCase.ejecutar({
      tipo: 'INCENDIO',
      descripcion: 'Humo denso visible desde la carretera.',
      latitud: -18.3347,
      longitud: -59.7614,
      departamento: 'Santa Cruz',
    });

    // Verificar
    expect(resultado.esNuevaZona).toBe(true);
    expect(resultado.estadoZona).toBe('POR_VERIFICAR');
    expect(resultado.zonaActivada).toBe(false);
    expect(resultado.totalReportesZona).toBe(1);
    expect(crearConNuevaZona).toHaveBeenCalledOnce();
  });

  it('debe agrupar en zona existente (< 1.5 km) y mantener POR_VERIFICAR en el 2.º reporte', async () => {
    // Preparar
    const zonaCercana: ZonaAbiertaCercana = {
      id: 'zona-1',
      titulo: 'Incendio Roboré',
      tipo: 'INCENDIO',
      latitud: -18.3347,
      longitud: -59.7614,
      estado: 'POR_VERIFICAR',
      severidad: 1,
      totalReportes: 1,
    };
    const repo: ReporteRepositoryPort = {
      listarRecientes: vi.fn().mockResolvedValue([]),
      buscarZonasAbiertasPorTipo: vi.fn().mockResolvedValue([zonaCercana]),
      crearEnZonaExistente: vi.fn().mockResolvedValue(reporteBase),
      crearConNuevaZona: vi.fn(),
    };
    const useCase = new CrearReporteUseCase(repo);

    // Actuar (~400 m de distancia)
    const resultado = await useCase.ejecutar({
      tipo: 'INCENDIO',
      descripcion: 'Segundo reporte ciudadano en el mismo sector.',
      latitud: -18.338,
      longitud: -59.7614,
    });

    // Verificar
    expect(resultado.esNuevaZona).toBe(false);
    expect(resultado.zonaId).toBe('zona-1');
    expect(resultado.estadoZona).toBe('POR_VERIFICAR');
    expect(resultado.zonaActivada).toBe(false);
    expect(resultado.totalReportesZona).toBe(2);
  });

  it('debe activar automáticamente la zona a ACTIVA al alcanzar el 3.er reporte cercano', async () => {
    // Preparar
    const zonaConDos: ZonaAbiertaCercana = {
      id: 'zona-1',
      titulo: 'Incendio Roboré',
      tipo: 'INCENDIO',
      latitud: -18.3347,
      longitud: -59.7614,
      estado: 'POR_VERIFICAR',
      severidad: 2,
      totalReportes: 2,
    };
    const crearEnZonaExistente = vi.fn().mockResolvedValue(reporteBase);
    const repo: ReporteRepositoryPort = {
      listarRecientes: vi.fn().mockResolvedValue([]),
      buscarZonasAbiertasPorTipo: vi.fn().mockResolvedValue([zonaConDos]),
      crearEnZonaExistente,
      crearConNuevaZona: vi.fn(),
    };
    const useCase = new CrearReporteUseCase(repo);

    // Actuar
    const resultado = await useCase.ejecutar({
      tipo: 'INCENDIO',
      descripcion: 'Tercer reporte independiente confirmando emergencia.',
      latitud: -18.335,
      longitud: -59.762,
    });

    // Verificar
    expect(resultado.esNuevaZona).toBe(false);
    expect(resultado.estadoZona).toBe('ACTIVA');
    expect(resultado.zonaActivada).toBe(true);
    expect(resultado.totalReportesZona).toBe(3);
    expect(crearEnZonaExistente).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({ zonaId: 'zona-1', nuevoEstado: 'ACTIVA' }),
    );
  });

  it('no debe agrupar si la zona existente está a >= 1.5 km de distancia', async () => {
    // Preparar (~11 km al norte)
    const zonaLejana: ZonaAbiertaCercana = {
      id: 'zona-lejana',
      titulo: 'Incendio lejano',
      tipo: 'INCENDIO',
      latitud: -18.2347,
      longitud: -59.7614,
      estado: 'ACTIVA',
      severidad: 3,
      totalReportes: 4,
    };
    const repo: ReporteRepositoryPort = {
      listarRecientes: vi.fn().mockResolvedValue([]),
      buscarZonasAbiertasPorTipo: vi.fn().mockResolvedValue([zonaLejana]),
      crearEnZonaExistente: vi.fn(),
      crearConNuevaZona: vi.fn().mockResolvedValue({ reporte: reporteBase, zonaId: 'zona-nueva' }),
    };
    const useCase = new CrearReporteUseCase(repo);

    // Actuar
    const resultado = await useCase.ejecutar({
      tipo: 'INCENDIO',
      descripcion: 'Nuevo foco en otra comunidad a más de 10 km.',
      latitud: -18.3347,
      longitud: -59.7614,
    });

    // Verificar
    expect(resultado.esNuevaZona).toBe(true);
    expect(resultado.zonaId).toBe('zona-nueva');
  });
});
