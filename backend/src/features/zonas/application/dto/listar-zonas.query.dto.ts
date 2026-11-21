import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import type { EstadoZona, TipoDesastre } from '../../domain/entities/zona.entity.js';

const TIPOS_DESASTRE: TipoDesastre[] = [
  'INCENDIO',
  'INUNDACION',
  'DESLIZAMIENTO',
  'HELADA',
  'SEQUIA',
  'OTRO',
];

const ESTADOS_ZONA: EstadoZona[] = ['POR_VERIFICAR', 'ACTIVA', 'ATENDIDA'];

export class ListarZonasQueryDto {
  @ApiPropertyOptional({ enum: TIPOS_DESASTRE, description: 'Filtrar por tipo de desastre' })
  @IsOptional()
  @IsIn(TIPOS_DESASTRE, { message: 'El tipo de desastre no es válido.' })
  tipo?: TipoDesastre;

  @ApiPropertyOptional({ enum: ESTADOS_ZONA, description: 'Filtrar por estado de zona' })
  @IsOptional()
  @IsIn(ESTADOS_ZONA, { message: 'El estado de zona no es válido.' })
  estado?: EstadoZona;

  @ApiPropertyOptional({ example: 'Santa Cruz', description: 'Filtrar por departamento' })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  departamento?: string;
}
