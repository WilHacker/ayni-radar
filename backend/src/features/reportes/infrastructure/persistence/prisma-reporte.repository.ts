import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma/prisma.service.js';
import type { TipoDesastre } from '../../../zonas/domain/entities/zona.entity.js';
import type { CrearReporteInput, ReporteEntity } from '../../domain/entities/reporte.entity.js';
import type {
  ActualizarZonaClusteringInput,
  ReporteRepositoryPort,
  ZonaAbiertaCercana,
} from '../../domain/ports/reporte.repository.port.js';

@Injectable()
export class PrismaReporteRepository implements ReporteRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async listarRecientes(limite = 50): Promise<ReporteEntity[]> {
    return this.prisma.reporte.findMany({
      take: limite,
      orderBy: { creadoEn: 'desc' },
    });
  }

  async buscarZonasAbiertasPorTipo(tipo: TipoDesastre): Promise<ZonaAbiertaCercana[]> {
    const zonas = await this.prisma.zona.findMany({
      where: {
        tipo,
        estado: { in: ['POR_VERIFICAR', 'ACTIVA'] },
      },
      include: {
        _count: { select: { reportes: true } },
      },
    });

    return zonas.map((z) => ({
      id: z.id,
      titulo: z.titulo,
      tipo: z.tipo,
      latitud: z.latitud,
      longitud: z.longitud,
      estado: z.estado,
      severidad: z.severidad,
      totalReportes: z._count.reportes,
    }));
  }

  async crearEnZonaExistente(
    input: CrearReporteInput,
    actualizacionZona: ActualizarZonaClusteringInput,
  ): Promise<ReporteEntity> {
    return this.prisma.$transaction(async (tx) => {
      const reporte = await tx.reporte.create({
        data: {
          zonaId: actualizacionZona.zonaId,
          usuarioId: input.usuarioId ?? null,
          tipo: input.tipo,
          descripcion: input.descripcion,
          latitud: input.latitud,
          longitud: input.longitud,
          fotoUrl: input.fotoUrl ?? null,
          reportanteTag: input.reportanteTag ?? null,
        },
      });

      await tx.zona.update({
        where: { id: actualizacionZona.zonaId },
        data: {
          estado: actualizacionZona.nuevoEstado,
          severidad: actualizacionZona.nuevaSeveridad,
        },
      });

      return reporte;
    });
  }

  async crearConNuevaZona(
    input: CrearReporteInput,
    tituloZona: string,
  ): Promise<{ reporte: ReporteEntity; zonaId: string }> {
    return this.prisma.$transaction(async (tx) => {
      const nuevaZona = await tx.zona.create({
        data: {
          titulo: tituloZona,
          departamento: input.departamento ?? 'Bolivia',
          tipo: input.tipo,
          latitud: input.latitud,
          longitud: input.longitud,
          estado: 'POR_VERIFICAR',
          severidad: 1,
        },
      });

      const reporte = await tx.reporte.create({
        data: {
          zonaId: nuevaZona.id,
          usuarioId: input.usuarioId ?? null,
          tipo: input.tipo,
          descripcion: input.descripcion,
          latitud: input.latitud,
          longitud: input.longitud,
          fotoUrl: input.fotoUrl ?? null,
          reportanteTag: input.reportanteTag ?? null,
        },
      });

      return { reporte, zonaId: nuevaZona.id };
    });
  }
}
