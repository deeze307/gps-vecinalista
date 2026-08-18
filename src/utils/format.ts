const DAY_MS = 86_400_000;

/** "12 de noviembre de 2026" */
export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

/** "12–14 noviembre 2026" (colapsa el rango cuando comparte mes/año). */
export const formatDateRange = (startIso: string, endIso: string): string => {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const month = end.toLocaleDateString('es-AR', { month: 'long' });
  const year = end.getFullYear();

  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    if (start.getDate() === end.getDate()) return `${start.getDate()} ${month} ${year}`;
    return `${start.getDate()}–${end.getDate()} ${month} ${year}`;
  }
  return `${formatDate(startIso)} — ${formatDate(endIso)}`;
};

/** Días completos transcurridos desde `iso` hasta ahora. */
export const daysSince = (iso: string, now: Date = new Date()): number =>
  Math.max(0, Math.floor((now.getTime() - new Date(iso).getTime()) / DAY_MS));

/** "hoy" · "hace 12 días" · "hace 5 meses" */
export const relativeTimeFrom = (iso: string, now: Date = new Date()): string => {
  const days = daysSince(iso, now);
  if (days === 0) return 'hoy';
  if (days === 1) return 'ayer';
  if (days < 31) return `hace ${days} días`;
  const months = Math.floor(days / 30);
  if (months < 12) return `hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
  const years = Math.floor(months / 12);
  return `hace ${years} ${years === 1 ? 'año' : 'años'}`;
};

/**
 * Frescura del perfil, para el semáforo "Perfil actualizado hace X".
 * Es la respuesta del PDF al problema de los contactos que quedan viejos.
 */
export type Freshness = 'fresh' | 'aging' | 'stale';

export const freshnessOf = (iso: string, now: Date = new Date()): Freshness => {
  const days = daysSince(iso, now);
  if (days <= 90) return 'fresh';
  if (days <= 180) return 'aging';
  return 'stale';
};

/** 1.391.000 */
export const formatNumber = (value: number): string => value.toLocaleString('es-AR');
