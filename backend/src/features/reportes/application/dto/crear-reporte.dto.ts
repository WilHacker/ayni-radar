import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import type { TipoDesastre } from '../../../zonas/domain/entities/zona.entity.js';

const TIPOS_DESASTRE: TipoDesastre[] = [
  'INCENDIO',
  'INUNDACION',
  'DESLIZAMIENTO',
  'HELADA',
  'SEQUIA',
  'OTRO',
];

export class CrearReporteDto {
  @ApiProperty({ enum: TIPOS_DESASTRE, example: 'INCENDIO' })
  @IsIn(TIPOS_DESASTRE, { message: 'El tipo de desastre no es válido.' })
  tipo!: TipoDesastre;

  @ApiProperty({
    example: 'Foco de incendio activo cerca de la comunidad San Lorenzo, humo denso.',
    minLength: 10,
    maxLength: 500,
  })
  @IsString()
  @MinLength(10, { message: 'La descripción debe tener al menos 10 caracteres.' })
  @MaxLength(500, { message: 'La descripción no debe superar los 500 caracteres.' })
  descripcion!: string;

  @ApiProperty({ example: -18.3347 })
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitud!: number;

  @ApiProperty({ example: -59.7614 })
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitud!: number;

  @ApiPropertyOptional({ example: 'https://ejemplo.bo/foto.jpg' })
  @IsOptional()
  @IsUrl({}, { message: 'La URL de la foto no es válida.' })
  fotoUrl?: string;

  @ApiPropertyOptional({ example: 'ayni_carlos', maxLength: 40 })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  reportanteTag?: string;

  @ApiPropertyOptional({ example: 'Santa Cruz', maxLength: 40 })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  departamento?: string;
}
