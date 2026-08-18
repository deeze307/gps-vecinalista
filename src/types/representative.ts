import type { Auditable, ID } from './common';

/** Alcance del referente dentro de la red. */
export const REPRESENTATIVE_SCOPES = ['nacional', 'provincial', 'local'] as const;
export type RepresentativeScope = (typeof REPRESENTATIVE_SCOPES)[number];

export const SCOPE_LABELS: Record<RepresentativeScope, string> = {
  nacional: 'Referente nacional',
  provincial: 'Referente provincial',
  local: 'Referente local',
};

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  website?: string;
}

export interface ContactInfo {
  /** Número en formato internacional sin símbolos: 5493511234567 */
  whatsapp?: string;
  phone?: string;
  email?: string;
  social?: SocialLinks;
}

export interface Representative extends Auditable {
  id: ID;
  slug: string;
  firstName: string;
  lastName: string;
  /** Cargo textual, ej: "Presidente de la Asociación Vecinal Centro". */
  role: string;
  scope: RepresentativeScope;
  cityId: ID;
  organizationId?: ID;
  photoUrl?: string;
  bio?: string;
  contact: ContactInfo;
  /**
   * Última vez que el propio referente confirmó/actualizó sus datos.
   * Alimenta el indicador "Perfil actualizado hace X días".
   */
  lastVerifiedAt: string;
  isActive: boolean;
}

/** Payload de alta desde el panel admin (sin campos derivados/auditoría). */
export type RepresentativeCreateInput = Omit<
  Representative,
  'id' | 'slug' | 'createdAt' | 'updatedAt' | 'lastVerifiedAt'
> & { lastVerifiedAt?: string };

/** Payload de edición: todo opcional menos el id, que va por parámetro. */
export type RepresentativeUpdateInput = Partial<RepresentativeCreateInput>;
