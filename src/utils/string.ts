/** Marcas diacríticas combinantes que deja la normalización NFD. */
const DIACRITICS = new RegExp('[\\u0300-\\u036f]', 'g');

/** Quita tildes y diacríticos para poder comparar/buscar sin sorpresas. */
export const stripAccents = (value: string): string =>
  value.normalize('NFD').replace(DIACRITICS, '');

/** Normaliza para búsquedas: minúsculas, sin tildes, sin espacios extra. */
export const normalize = (value: string): string =>
  stripAccents(value).toLowerCase().trim();

/** "San Miguel de Tucumán" -> "san-miguel-de-tucuman" */
export const slugify = (value: string): string =>
  normalize(value)
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

/** Coincidencia laxa usada por el buscador de ciudades. */
export const matches = (haystack: string, needle: string): boolean =>
  normalize(haystack).includes(normalize(needle));

/** "Jorge", "Fernández" -> "JF" */
export const initials = (first: string, last: string): string =>
  `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
