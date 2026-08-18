import type { Province } from '@/types';
import { withAudit, type Raw } from './_audit';

const raw: Raw<Province>[] = [
  { id: 'pr-01', slug: 'buenos-aires', name: 'Buenos Aires', isoCode: 'AR-B', region: 'Buenos Aires' },
  { id: 'pr-02', slug: 'caba', name: 'Ciudad Autónoma de Buenos Aires', isoCode: 'AR-C', region: 'Buenos Aires' },
  { id: 'pr-03', slug: 'catamarca', name: 'Catamarca', isoCode: 'AR-K', region: 'NOA' },
  { id: 'pr-04', slug: 'chaco', name: 'Chaco', isoCode: 'AR-H', region: 'NEA' },
  { id: 'pr-05', slug: 'chubut', name: 'Chubut', isoCode: 'AR-U', region: 'Patagonia' },
  { id: 'pr-06', slug: 'cordoba', name: 'Córdoba', isoCode: 'AR-X', region: 'Centro' },
  { id: 'pr-07', slug: 'corrientes', name: 'Corrientes', isoCode: 'AR-W', region: 'NEA' },
  { id: 'pr-08', slug: 'entre-rios', name: 'Entre Ríos', isoCode: 'AR-E', region: 'Centro' },
  { id: 'pr-09', slug: 'formosa', name: 'Formosa', isoCode: 'AR-P', region: 'NEA' },
  { id: 'pr-10', slug: 'jujuy', name: 'Jujuy', isoCode: 'AR-Y', region: 'NOA' },
  { id: 'pr-11', slug: 'la-pampa', name: 'La Pampa', isoCode: 'AR-L', region: 'Centro' },
  { id: 'pr-12', slug: 'la-rioja', name: 'La Rioja', isoCode: 'AR-F', region: 'Cuyo' },
  { id: 'pr-13', slug: 'mendoza', name: 'Mendoza', isoCode: 'AR-M', region: 'Cuyo' },
  { id: 'pr-14', slug: 'misiones', name: 'Misiones', isoCode: 'AR-N', region: 'NEA' },
  { id: 'pr-15', slug: 'neuquen', name: 'Neuquén', isoCode: 'AR-Q', region: 'Patagonia' },
  { id: 'pr-16', slug: 'rio-negro', name: 'Río Negro', isoCode: 'AR-R', region: 'Patagonia' },
  { id: 'pr-17', slug: 'salta', name: 'Salta', isoCode: 'AR-A', region: 'NOA' },
  { id: 'pr-18', slug: 'san-juan', name: 'San Juan', isoCode: 'AR-J', region: 'Cuyo' },
  { id: 'pr-19', slug: 'san-luis', name: 'San Luis', isoCode: 'AR-D', region: 'Cuyo' },
  { id: 'pr-20', slug: 'santa-cruz', name: 'Santa Cruz', isoCode: 'AR-Z', region: 'Patagonia' },
  { id: 'pr-21', slug: 'santa-fe', name: 'Santa Fe', isoCode: 'AR-S', region: 'Centro' },
  { id: 'pr-22', slug: 'santiago-del-estero', name: 'Santiago del Estero', isoCode: 'AR-G', region: 'NOA' },
  { id: 'pr-23', slug: 'tierra-del-fuego', name: 'Tierra del Fuego', isoCode: 'AR-V', region: 'Patagonia' },
  { id: 'pr-24', slug: 'tucuman', name: 'Tucumán', isoCode: 'AR-T', region: 'NOA' },
];

export const PROVINCES_MOCK: Province[] = withAudit<Province>(raw);
