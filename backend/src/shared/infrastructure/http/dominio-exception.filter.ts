import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { ZonaNoEncontradaError } from '../../../features/zonas/domain/errors/zona-no-encontrada.error.js';

/**
 * Traduce errores puros del dominio a respuestas HTTP estandarizadas en español.
 */
@Catch(ZonaNoEncontradaError)
export class DominioExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof ZonaNoEncontradaError) {
      response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'No encontrado',
        message: exception.message,
      });
      return;
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Error interno',
      message: 'Ocurrió un error inesperado en el servidor.',
    });
  }
}
