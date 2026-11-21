import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListarZonasQueryDto } from '../../application/dto/listar-zonas.query.dto.js';
import {
  ListarZonasUseCase,
  type RespuestaListarZonas,
} from '../../application/use-cases/listar-zonas.use-case.js';
import { ObtenerEstadisticasUseCase } from '../../application/use-cases/obtener-estadisticas.use-case.js';
import { ObtenerZonaDetalleUseCase } from '../../application/use-cases/obtener-zona-detalle.use-case.js';
import type { EstadisticasGlobales, ZonaDetalle } from '../../domain/entities/zona.entity.js';

@ApiTags('Zonas')
@Controller('zones')
export class ZonasController {
  constructor(
    private readonly listarZonasUseCase: ListarZonasUseCase,
    private readonly obtenerZonaDetalleUseCase: ObtenerZonaDetalleUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar zonas de desastre y puntos GeoJSON para mapa WebGL' })
  @ApiResponse({ status: 200, description: 'Lista de zonas y FeatureCollection GeoJSON.' })
  async listar(@Query() query: ListarZonasQueryDto): Promise<RespuestaListarZonas> {
    return this.listarZonasUseCase.ejecutar(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de una zona con reportes y donaciones' })
  @ApiResponse({ status: 200, description: 'Detalle completo de la zona.' })
  @ApiResponse({ status: 404, description: 'Zona no encontrada.' })
  async obtenerPorId(@Param('id') id: string): Promise<ZonaDetalle> {
    return this.obtenerZonaDetalleUseCase.ejecutar(id);
  }
}

@ApiTags('Estadísticas')
@Controller('stats')
export class EstadisticasController {
  constructor(private readonly obtenerEstadisticasUseCase: ObtenerEstadisticasUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Obtener métricas globales de impacto del radar' })
  @ApiResponse({ status: 200, description: 'Totales globales de zonas, reportes y recaudación.' })
  async obtener(): Promise<EstadisticasGlobales> {
    return this.obtenerEstadisticasUseCase.ejecutar();
  }
}
