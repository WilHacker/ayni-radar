import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma/prisma.service.js';
import type {
  EstadisticasGlobales,
  FiltroZonas,
  ZonaDetalle,
  ZonaResumen,
} from '../../domain/entities/zona.entity.js';
import type { ZonaRepositoryPort } from '../../domain/ports/zona.repository.port.js';

function normalizarNecesidades(json: unknown): Record<string, unknown> {
  if (typeof json === 'object' && json !== null && !Array.isArray(json)) {
    return json as Record<string, unknown>;
  }
  return {};
}

@Injectable()
export class PrismaZonaRepository implements ZonaRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async listar(filtro?: FiltroZonas): Promise<ZonaResumen[]> {
    const zonas = await this.prisma.zona.findMany({
      where: {
        ...(filtro?.tipo ? { tipo: filtro.tipo } : {}),
        ...(filtro?.estado ? { estado: filtro.estado } : {}),
        ...(filtro?.departamento
          ? { departamento: { equals: filtro.departamento, mode: 'insensitive' } }
          : {}),
      },
      include: {
        _count: { select: { reportes: true } },
      },
      orderBy: [{ severidad: 'desc' }, { actualizadoEn: 'desc' }],
    });

    return zonas.map((z) => ({
      id: z.id,
      titulo: z.titulo,
      departamento: z.departamento,
      tipo: z.tipo,
      latitud: z.latitud,
      longitud: z.longitud,
      estado: z.estado,
      severidad: z.severidad,
      metaBs: z.metaBs,
      recaudadoBs: z.recaudadoBs,
      qrImagenUrl: z.qrImagenUrl,
      necesidadesJson: normalizarNecesidades(z.necesidadesJson),
      totalReportes: z._count.reportes,
      creadoEn: z.creadoEn,
      actualizadoEn: z.actualizadoEn,
    }));
  }

  async obtenerPorId(id: string): Promise<ZonaDetalle | null> {
    const z = await this.prisma.zona.findUnique({
      where: { id },
      include: {
        reportes: {
          orderBy: { creadoEn: 'desc' },
          select: {
            id: true,
            tipo: true,
            descripcion: true,
            latitud: true,
            longitud: true,
            fotoUrl: true,
            reportanteTag: true,
            creadoEn: true,
          },
        },
        donaciones: {
          orderBy: { creadoEn: 'desc' },
          select: {
            id: true,
            nombreDonante: true,
            tipo: true,
            montoBs: true,
            cantidad: true,
            detalleInsumo: true,
            comprobanteUrl: true,
            evidenciaEntregaUrl: true,
            estado: true,
            creadoEn: true,
          },
        },
        _count: { select: { reportes: true } },
      },
    });

    if (!z) return null;

    return {
      id: z.id,
      titulo: z.titulo,
      departamento: z.departamento,
      tipo: z.tipo,
      latitud: z.latitud,
      longitud: z.longitud,
      estado: z.estado,
      severidad: z.severidad,
      metaBs: z.metaBs,
      recaudadoBs: z.recaudadoBs,
      qrImagenUrl: z.qrImagenUrl,
      necesidadesJson: normalizarNecesidades(z.necesidadesJson),
      totalReportes: z._count.reportes,
      creadoEn: z.creadoEn,
      actualizadoEn: z.actualizadoEn,
      reportes: z.reportes,
      donaciones: z.donaciones,
    };
  }

  async obtenerEstadisticas(): Promise<EstadisticasGlobales> {
    const [totalZonas, zonasActivas, zonasPorVerificar, totalReportes, sumaRecaudado, entregadas] =
      await Promise.all([
        this.prisma.zona.count(),
        this.prisma.zona.count({ where: { estado: 'ACTIVA' } }),
        this.prisma.zona.count({ where: { estado: 'POR_VERIFICAR' } }),
        this.prisma.reporte.count(),
        this.prisma.zona.aggregate({ _sum: { recaudadoBs: true } }),
        this.prisma.donacion.count({ where: { estado: 'ENTREGADA' } }),
      ]);

    return {
      totalZonas,
      zonasActivas,
      zonasPorVerificar,
      totalReportes,
      totalRecaudadoBs: sumaRecaudado._sum.recaudadoBs ?? 0,
      donacionesEntregadas: entregadas,
    };
  }
}
