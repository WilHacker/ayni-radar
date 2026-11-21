import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CrearReporteDto } from '../../application/dto/crear-reporte.dto.js';
import { CrearReporteUseCase } from '../../application/use-cases/crear-reporte.use-case.js';
import { ListarReportesUseCase } from '../../application/use-cases/listar-reportes.use-case.js';
import type { ReporteEntity, ResultadoCrearReporte } from '../../domain/entities/reporte.entity.js';

@ApiTags('Reportes')
@Controller('reports')
export class ReportesController {
  constructor(
    private readonly crearReporteUseCase: CrearReporteUseCase,
    private readonly listarReportesUseCase: ListarReportesUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar reportes ciudadanos recientes' })
  @ApiResponse({ status: 200, description: 'Lista de reportes recientes.' })
  async listar(): Promise<ReporteEntity[]> {
    return this.listarReportesUseCase.ejecutar();
  }

  @Post()
  @ApiOperation({ summary: 'Registrar reporte ciudadano y agrupar por clustering Haversine' })
  @ApiResponse({ status: 201, description: 'Reporte registrado y agrupado/activado.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async crear(@Body() dto: CrearReporteDto): Promise<ResultadoCrearReporte> {
    return this.crearReporteUseCase.ejecutar(dto);
  }
}
