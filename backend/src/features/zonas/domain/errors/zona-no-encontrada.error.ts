/**
 * Error de dominio lanzado cuando una zona solicitada no existe en el sistema.
 */
export class ZonaNoEncontradaError extends Error {
  constructor(zonaId: string) {
    super(`La zona con identificador "${zonaId}" no fue encontrada.`);
    this.name = 'ZonaNoEncontradaError';
  }
}
