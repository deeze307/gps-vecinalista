import type { LatLng } from '@/types';

const EARTH_RADIUS_KM = 6371;

const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

/** Distancia en km entre dos puntos (fórmula de Haversine). */
export const distanceInKm = (a: LatLng, b: LatLng): number => {
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
};

/** "A 2 km", "A 850 m", "A 1.240 km" */
export const formatDistance = (km: number): string => {
  if (km < 1) return `A ${Math.round(km * 1000)} m`;
  if (km < 10) return `A ${km.toFixed(1).replace('.', ',')} km`;
  return `A ${Math.round(km).toLocaleString('es-AR')} km`;
};
