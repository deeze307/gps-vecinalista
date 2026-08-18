import type { City } from '@/types';
import { withAudit, type Raw } from './_audit';

/**
 * Coordenadas tomadas de fuentes geográficas públicas (GeoNames / SimpleMaps).
 * Los datos de la red (referentes, contactos) son ficticios.
 */
const raw: Raw<City>[] = [
  // Buenos Aires / CABA
  { id: 'ci-01', slug: 'caba', name: 'Ciudad de Buenos Aires', provinceId: 'pr-02', coordinates: { lat: -34.6037, lng: -58.3816 }, population: 3120612, isCapital: true },
  { id: 'ci-02', slug: 'la-plata', name: 'La Plata', provinceId: 'pr-01', coordinates: { lat: -34.9215, lng: -57.9545 }, population: 654324, isCapital: true },
  { id: 'ci-03', slug: 'mar-del-plata', name: 'Mar del Plata', provinceId: 'pr-01', coordinates: { lat: -38.0055, lng: -57.5426 }, population: 618989 },
  { id: 'ci-04', slug: 'bahia-blanca', name: 'Bahía Blanca', provinceId: 'pr-01', coordinates: { lat: -38.7183, lng: -62.2663 }, population: 301572 },
  { id: 'ci-05', slug: 'tandil', name: 'Tandil', provinceId: 'pr-01', coordinates: { lat: -37.3217, lng: -59.1332 }, population: 123871 },

  // Centro
  { id: 'ci-06', slug: 'cordoba', name: 'Córdoba', provinceId: 'pr-06', coordinates: { lat: -31.4201, lng: -64.1888 }, population: 1391000, isCapital: true },
  { id: 'ci-07', slug: 'rio-cuarto', name: 'Río Cuarto', provinceId: 'pr-06', coordinates: { lat: -33.1301, lng: -64.3499 }, population: 157010 },
  { id: 'ci-08', slug: 'villa-carlos-paz', name: 'Villa Carlos Paz', provinceId: 'pr-06', coordinates: { lat: -31.4241, lng: -64.4978 }, population: 62423 },
  { id: 'ci-09', slug: 'rosario', name: 'Rosario', provinceId: 'pr-21', coordinates: { lat: -32.9442, lng: -60.6505 }, population: 948312 },
  { id: 'ci-10', slug: 'santa-fe', name: 'Santa Fe', provinceId: 'pr-21', coordinates: { lat: -31.6333, lng: -60.7 }, population: 391164, isCapital: true },
  { id: 'ci-11', slug: 'rafaela', name: 'Rafaela', provinceId: 'pr-21', coordinates: { lat: -31.2503, lng: -61.4867 }, population: 103000 },
  { id: 'ci-12', slug: 'parana', name: 'Paraná', provinceId: 'pr-08', coordinates: { lat: -31.7413, lng: -60.5115 }, population: 247863, isCapital: true },
  { id: 'ci-13', slug: 'concordia', name: 'Concordia', provinceId: 'pr-08', coordinates: { lat: -31.393, lng: -58.0209 }, population: 149450 },
  { id: 'ci-14', slug: 'santa-rosa', name: 'Santa Rosa', provinceId: 'pr-11', coordinates: { lat: -36.6167, lng: -64.2833 }, population: 124093, isCapital: true },

  // Cuyo
  { id: 'ci-15', slug: 'mendoza', name: 'Mendoza', provinceId: 'pr-13', coordinates: { lat: -32.8895, lng: -68.8458 }, population: 115041, isCapital: true },
  { id: 'ci-16', slug: 'san-rafael', name: 'San Rafael', provinceId: 'pr-13', coordinates: { lat: -34.6177, lng: -68.3301 }, population: 118009 },
  { id: 'ci-17', slug: 'san-juan', name: 'San Juan', provinceId: 'pr-18', coordinates: { lat: -31.5375, lng: -68.5364 }, population: 109123, isCapital: true },
  { id: 'ci-18', slug: 'san-luis', name: 'San Luis', provinceId: 'pr-19', coordinates: { lat: -33.295, lng: -66.3356 }, population: 169947, isCapital: true },
  { id: 'ci-19', slug: 'la-rioja', name: 'La Rioja', provinceId: 'pr-12', coordinates: { lat: -29.4131, lng: -66.8558 }, population: 180995, isCapital: true },

  // NOA
  { id: 'ci-20', slug: 'san-miguel-de-tucuman', name: 'San Miguel de Tucumán', provinceId: 'pr-24', coordinates: { lat: -26.8083, lng: -65.2176 }, population: 548866, isCapital: true },
  { id: 'ci-21', slug: 'salta', name: 'Salta', provinceId: 'pr-17', coordinates: { lat: -24.7821, lng: -65.4232 }, population: 618375, isCapital: true },
  { id: 'ci-22', slug: 'san-salvador-de-jujuy', name: 'San Salvador de Jujuy', provinceId: 'pr-10', coordinates: { lat: -24.1858, lng: -65.2995 }, population: 257970, isCapital: true },
  { id: 'ci-23', slug: 'santiago-del-estero', name: 'Santiago del Estero', provinceId: 'pr-22', coordinates: { lat: -27.7951, lng: -64.2615 }, population: 252192, isCapital: true },
  { id: 'ci-24', slug: 'catamarca', name: 'San Fernando del Valle de Catamarca', provinceId: 'pr-03', coordinates: { lat: -28.4696, lng: -65.7852 }, population: 159139, isCapital: true },

  // NEA
  { id: 'ci-25', slug: 'resistencia', name: 'Resistencia', provinceId: 'pr-04', coordinates: { lat: -27.4514, lng: -58.9867 }, population: 291720, isCapital: true },
  { id: 'ci-26', slug: 'corrientes', name: 'Corrientes', provinceId: 'pr-07', coordinates: { lat: -27.4692, lng: -58.8306 }, population: 346334, isCapital: true },
  { id: 'ci-27', slug: 'posadas', name: 'Posadas', provinceId: 'pr-14', coordinates: { lat: -27.3671, lng: -55.8961 }, population: 324756, isCapital: true },
  { id: 'ci-28', slug: 'formosa', name: 'Formosa', provinceId: 'pr-09', coordinates: { lat: -26.1775, lng: -58.1781 }, population: 234000, isCapital: true },

  // Patagonia
  { id: 'ci-29', slug: 'neuquen', name: 'Neuquén', provinceId: 'pr-15', coordinates: { lat: -38.9516, lng: -68.0591 }, population: 231780, isCapital: true },
  { id: 'ci-30', slug: 'san-carlos-de-bariloche', name: 'San Carlos de Bariloche', provinceId: 'pr-16', coordinates: { lat: -41.1335, lng: -71.3103 }, population: 112887 },
  { id: 'ci-31', slug: 'viedma', name: 'Viedma', provinceId: 'pr-16', coordinates: { lat: -40.8135, lng: -62.9967 }, population: 57862, isCapital: true },
  { id: 'ci-32', slug: 'trelew', name: 'Trelew', provinceId: 'pr-05', coordinates: { lat: -43.2489, lng: -65.3051 }, population: 99201 },
  { id: 'ci-33', slug: 'comodoro-rivadavia', name: 'Comodoro Rivadavia', provinceId: 'pr-05', coordinates: { lat: -45.8641, lng: -67.4966 }, population: 182631 },
  { id: 'ci-34', slug: 'rio-gallegos', name: 'Río Gallegos', provinceId: 'pr-20', coordinates: { lat: -51.623, lng: -69.2168 }, population: 95796, isCapital: true },
  { id: 'ci-35', slug: 'ushuaia', name: 'Ushuaia', provinceId: 'pr-23', coordinates: { lat: -54.8019, lng: -68.303 }, population: 82615, isCapital: true },
  { id: 'ci-36', slug: 'rio-grande', name: 'Río Grande', provinceId: 'pr-23', coordinates: { lat: -53.7877, lng: -67.7093 }, population: 92024 },
];

export const CITIES_MOCK: City[] = withAudit<City>(raw);
