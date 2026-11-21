import { describe, expect, it } from 'vitest';
import { calculateHaversineKm } from './geo.utils.js';

describe('calculateHaversineKm', () => {
  it('returns 0 for identical coordinates', () => {
    expect(calculateHaversineKm(-17.7833, -63.1821, -17.7833, -63.1821)).toBe(0);
  });

  it('calculates approximate distance between Santa Cruz and Cochabamba', () => {
    const distance = calculateHaversineKm(-17.7833, -63.1821, -17.3935, -66.157);
    expect(distance).toBeGreaterThan(310);
    expect(distance).toBeLessThan(330);
  });

  it('detects nearby points within 1.5 km clustering threshold', () => {
    const distance = calculateHaversineKm(-17.7833, -63.1821, -17.789, -63.185);
    expect(distance).toBeLessThan(1.5);
  });

  it('is symmetric regardless of point order', () => {
    const d1 = calculateHaversineKm(-17.7833, -63.1821, -17.9647, -67.106);
    const d2 = calculateHaversineKm(-17.9647, -67.106, -17.7833, -63.1821);
    expect(d1).toBeCloseTo(d2, 6);
  });
});
