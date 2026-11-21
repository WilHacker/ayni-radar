import { describe, expect, it } from 'vitest';
import { calcularDistanciaHaversineKm } from './geo.utils.js';

describe('calcularDistanciaHaversineKm', () => {
  it('devuelve 0 cuando ambas coordenadas son idénticas', () => {
    // Preparar · Actuar · Verificar
    expect(calcularDistanciaHaversineKm(-17.7833, -63.1821, -17.7833, -63.1821)).toBe(0);
  });

  it('calcula la distancia aproximada entre Santa Cruz y Cochabamba', () => {
    // Preparar · Actuar
    const distancia = calcularDistanciaHaversineKm(-17.7833, -63.1821, -17.3935, -66.157);
    // Verificar
    expect(distancia).toBeGreaterThan(310);
    expect(distancia).toBeLessThan(330);
  });

  it('detecta puntos cercanos dentro del umbral de 1.5 km para agrupación', () => {
    // Preparar · Actuar
    const distancia = calcularDistanciaHaversineKm(-17.7833, -63.1821, -17.789, -63.185);
    // Verificar
    expect(distancia).toBeLessThan(1.5);
  });

  it('mantiene simetría sin importar el orden de las coordenadas', () => {
    // Preparar · Actuar
    const d1 = calcularDistanciaHaversineKm(-17.7833, -63.1821, -17.9647, -67.106);
    const d2 = calcularDistanciaHaversineKm(-17.9647, -67.106, -17.7833, -63.1821);
    // Verificar
    expect(d1).toBeCloseTo(d2, 6);
  });
});
