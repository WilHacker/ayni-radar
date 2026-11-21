import { Module } from '@nestjs/common';
import { CrearReporteUseCase } from './application/use-cases/crear-reporte.use-case.js';
import { ListarReportesUseCase } from './application/use-cases/listar-reportes.use-case.js';
import {
  REPORTE_REPOSITORY,
  type ReporteRepositoryPort,
} from './domain/ports/reporte.repository.port.js';
import { ReportesController } from './infrastructure/http/reportes.controller.js';
import { PrismaReporteRepository } from './infrastructure/persistence/prisma-reporte.repository.js';

@Module({
  controllers: [ReportesController],
  providers: [
    {
      provide: REPORTE_REPOSITORY,
      useClass: PrismaReporteRepository,
    },
    {
      provide: CrearReporteUseCase,
      useFactory: (repo: ReporteRepositoryPort) => new CrearReporteUseCase(repo),
      inject: [REPORTE_REPOSITORY],
    },
    {
      provide: ListarReportesUseCase,
      useFactory: (repo: ReporteRepositoryPort) => new ListarReportesUseCase(repo),
      inject: [REPORTE_REPOSITORY],
    },
  ],
})
export class ReportesModule {}
