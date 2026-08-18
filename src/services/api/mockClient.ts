import { env } from '@/config/env';

/**
 * Simula el ida y vuelta de red de una API real.
 * Gracias a esto los componentes ya conviven con estados de loading/error,
 * y migrar a `fetch` no cambia una sola línea de la UI.
 */
export const delay = (ms: number = env.mockLatency): Promise<void> =>
  new Promise((resolve) => {
    if (ms <= 0) {
      resolve();
      return;
    }
    setTimeout(resolve, ms);
  });

/**
 * Devuelve una copia profunda: los mocks son la "base de datos" y nadie
 * de afuera debería poder mutarla por referencia.
 */
export const clone = <T>(value: T): T =>
  typeof structuredClone === 'function'
    ? structuredClone(value)
    : (JSON.parse(JSON.stringify(value)) as T);

/** Envuelve un valor como si viniera de la red. */
export const mockResponse = async <T>(resolver: () => T, ms?: number): Promise<T> => {
  await delay(ms);
  return clone(resolver());
};

/** Id incremental con prefijo, al estilo de los ids de los mocks (`re-42`). */
export const nextId = (prefix: string, existing: string[]): string => {
  const max = existing.reduce((acc, id) => {
    const n = Number(id.split('-')[1]);
    return Number.isFinite(n) && n > acc ? n : acc;
  }, 0);
  return `${prefix}-${String(max + 1).padStart(2, '0')}`;
};

export const nowIso = (): string => new Date().toISOString();
