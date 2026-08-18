import type { Auditable, ID } from './common';

export const ORGANIZATION_TYPES = [
  'asociacion-vecinal',
  'federacion',
  'red-barrial',
  'centro-comunitario',
] as const;

export type OrganizationType = (typeof ORGANIZATION_TYPES)[number];

export const ORGANIZATION_TYPE_LABELS: Record<OrganizationType, string> = {
  'asociacion-vecinal': 'Asociación vecinal',
  federacion: 'Federación',
  'red-barrial': 'Red barrial',
  'centro-comunitario': 'Centro comunitario',
};

export interface Organization extends Auditable {
  id: ID;
  slug: string;
  name: string;
  type: OrganizationType;
  cityId: ID;
  address?: string;
  email?: string;
  phone?: string;
  foundedYear?: number;
}
