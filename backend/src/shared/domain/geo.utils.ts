const RADIO_TIERRA_KM = 6371;

const aRadianes = (grados: number): number => (grados * Math.PI) / 180;

/**
 * Calcula la distancia geodésica en kilómetros entre dos coordenadas usando la fórmula de Haversine.
 *
 * Se utiliza para agrupar reportes ciudadanos cercanos (< 1.5 km) dentro de una misma zona de desastre.
 */
export function calcularDistanciaHaversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const dLat = aRadianes(lat2 - lat1);
  const dLng = aRadianes(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(aRadianes(lat1)) * Math.cos(aRadianes(lat2)) * Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return RADIO_TIERRA_KM * c;
}
