/**
 * Único punto donde la app lee configuración de entorno.
 * Hoy la fuente de datos es `mock`; el día que exista el backend se agrega
 * `VITE_API_URL` y el factory de `services/` devuelve la implementación HTTP.
 */
export const env = {
  /** 'mock' | 'http' — sólo 'mock' está implementado por ahora. */
  dataSource: (import.meta.env.VITE_DATA_SOURCE ?? 'mock') as 'mock' | 'http',
  apiUrl: import.meta.env.VITE_API_URL ?? '',
  /** Latencia simulada de los mocks, en ms. Poner 0 para desactivarla. */
  mockLatency: Number(import.meta.env.VITE_MOCK_LATENCY ?? 320),
  isDev: import.meta.env.DEV,
} as const;
