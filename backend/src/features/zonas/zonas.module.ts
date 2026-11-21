import { Module } from '@nestjs/common';
import { ListarZonasUseCase } from './application/use-cases/listar-zonas.use-case.js';
import { ObtenerEstadisticasUseCase } from './application/use-cases/obtener-estadisticas.use-case.js';
import { ObtenerZonaDetalleUseCase } from './application/use-cases/obtener-zona-detalle.use-case.js';
import { ZONA_REPOSITORY, type ZonaRepositoryPort } from './domain/ports/zona.repository.port.js';
import { EstadisticasController, ZonasController } from './infrastructure/http/zonas.controller.js';
import { PrismaZonaRepository } from './infrastructure/persistence/prisma-zona.repository.js';

@Module({
  controllers: [ZonasController, EstadisticasController],
  providers: [
    {
      provide: ZONA_REPOSITORY,
      useClass: PrismaZonaRepository,
    },
    {
      provide: ListarZonasUseCase,
      useFactory: (repo: ZonaRepositoryPort) => new ListarZonasUseCase(repo),
      inject: [ZONA_REPOSITORY],
    },
    {
      provide: ObtenerZonaDetalleUseCase,
      useFactory: (repo: ZonaRepositoryPort) => new ObtenerZonaDetalleUseCase(repo),
      inject: [ZONA_REPOSITORY],
    },
    {
      provide: ObtenerEstadisticasUseCase,
      useFactory: (repo: ZonaRepositoryPort) => new ObtenerEstadisticasUseCase(repo),
      inject: [ZONA_REPOSITORY],
    },
  ],
  exports: [ZONA_REPOSITORY],
})
export class ZonasModule {}
