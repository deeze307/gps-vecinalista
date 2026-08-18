import type {
  City,
  ID,
  Organization,
  Representative,
  RepresentativeCreateInput,
  RepresentativeScope,
  RepresentativeUpdateInput,
} from '@/types';
import { matches, slugify } from '@/utils';
import { ApiError } from './api/ApiError';
import { mockResponse, nextId, nowIso } from './api/mockClient';
import { db } from './db/mockDb';
import { sortRepresentativesByScope } from './cities.service';

/** Referente con su ciudad y organización resueltas (lo que consume la UI). */
export interface RepresentativeWithRelations extends Representative {
  city: City;
  organization?: Organization;
}

const withRelations = (rep: Representative): RepresentativeWithRelations => {
  const city = db.cities.find((c) => c.id === rep.cityId);
  if (!city) {
    throw new ApiError(500, `Datos inconsistentes: el referente "${rep.slug}" no tiene ciudad.`);
  }
  const organization = rep.organizationId
    ? db.organizations.find((o) => o.id === rep.organizationId)
    : undefined;

  return { ...rep, city, organization };
};

export interface RepresentativeFilters {
  search?: string;
  cityId?: ID;
  provinceId?: ID;
  scope?: RepresentativeScope;
  /** Por defecto sólo se listan los activos (el sitio público no muestra bajas). */
  includeInactive?: boolean;
}

const fullName = (rep: Representative) => `${rep.firstName} ${rep.lastName}`;

const validate = (input: RepresentativeUpdateInput): void => {
  const errors: Record<string, string> = {};

  if (input.firstName !== undefined && !input.firstName.trim()) {
    errors.firstName = 'El nombre es obligatorio.';
  }
  if (input.lastName !== undefined && !input.lastName.trim()) {
    errors.lastName = 'El apellido es obligatorio.';
  }
  if (input.cityId !== undefined && !db.cities.some((c) => c.id === input.cityId)) {
    errors.cityId = 'Seleccioná una ciudad válida.';
  }
  if (input.organizationId && !db.organizations.some((o) => o.id === input.organizationId)) {
    errors.organizationId = 'La organización no existe.';
  }
  const email = input.contact?.email;
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'El email no tiene un formato válido.';
  }
  const whatsapp = input.contact?.whatsapp;
  if (whatsapp && whatsapp.replace(/\D/g, '').length < 8) {
    errors.whatsapp = 'El WhatsApp debe incluir código de país y área.';
  }

  if (Object.keys(errors).length > 0) throw ApiError.validation(errors);
};

export const representativesService = {
  /** GET /referentes */
  async getAll(filters: RepresentativeFilters = {}): Promise<RepresentativeWithRelations[]> {
    return mockResponse(() => {
      const { search, cityId, provinceId, scope, includeInactive } = filters;

      const cityOf = (rep: Representative) => db.cities.find((c) => c.id === rep.cityId);

      return db.representatives
        .filter((rep) => {
          if (!includeInactive && !rep.isActive) return false;
          if (cityId && rep.cityId !== cityId) return false;
          if (scope && rep.scope !== scope) return false;
          if (provinceId && cityOf(rep)?.provinceId !== provinceId) return false;
          if (search) {
            const haystack = [fullName(rep), rep.role, cityOf(rep)?.name ?? ''].join(' ');
            if (!matches(haystack, search)) return false;
          }
          return true;
        })
        .sort(sortRepresentativesByScope)
        .map(withRelations);
    });
  },

  /** GET /referentes/:slug */
  async getBySlug(slug: string): Promise<RepresentativeWithRelations> {
    return mockResponse(() => {
      const rep = db.representatives.find((r) => r.slug === slug);
      if (!rep) throw ApiError.notFound('el referente', slug);
      return withRelations(rep);
    });
  },

  /** GET /referentes/:id */
  async getById(id: ID): Promise<RepresentativeWithRelations> {
    return mockResponse(() => {
      const rep = db.representatives.find((r) => r.id === id);
      if (!rep) throw ApiError.notFound('el referente', id);
      return withRelations(rep);
    });
  },

  /** GET /ciudades/:id/referentes */
  async getByCity(cityId: ID): Promise<RepresentativeWithRelations[]> {
    return representativesService.getAll({ cityId });
  },

  /** POST /referentes */
  async create(input: RepresentativeCreateInput): Promise<RepresentativeWithRelations> {
    return mockResponse(() => {
      validate(input);

      const baseSlug = slugify(`${input.firstName} ${input.lastName}`);
      if (db.representatives.some((r) => r.slug === baseSlug)) {
        throw ApiError.conflict(`Ya existe un referente con el identificador "${baseSlug}".`, {
          slug: 'Ya existe un referente con ese nombre y apellido.',
        });
      }

      const timestamp = nowIso();
      const created: Representative = {
        ...input,
        id: nextId('re', db.representatives.map((r) => r.id)),
        slug: baseSlug,
        lastVerifiedAt: input.lastVerifiedAt ?? timestamp,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      db.representatives.push(created);
      return withRelations(created);
    });
  },

  /** PATCH /referentes/:id */
  async update(id: ID, input: RepresentativeUpdateInput): Promise<RepresentativeWithRelations> {
    return mockResponse(() => {
      const index = db.representatives.findIndex((r) => r.id === id);
      const current = db.representatives[index];
      if (!current) throw ApiError.notFound('el referente', id);

      validate(input);

      const updated: Representative = {
        ...current,
        ...input,
        contact: { ...current.contact, ...input.contact },
        updatedAt: nowIso(),
      };

      if (input.firstName || input.lastName) {
        updated.slug = slugify(`${updated.firstName} ${updated.lastName}`);
      }

      db.representatives[index] = updated;
      return withRelations(updated);
    });
  },

  /**
   * POST /referentes/:id/verificar
   * "Confirmo que mis datos siguen vigentes" — resetea el semáforo de frescura.
   */
  async touchVerification(id: ID): Promise<RepresentativeWithRelations> {
    return representativesService.update(id, { lastVerifiedAt: nowIso() });
  },

  /** DELETE /referentes/:id — baja lógica, no se pierde el histórico. */
  async deactivate(id: ID): Promise<RepresentativeWithRelations> {
    return representativesService.update(id, { isActive: false });
  },

  /** POST /referentes/:id/reactivar */
  async activate(id: ID): Promise<RepresentativeWithRelations> {
    return representativesService.update(id, { isActive: true });
  },

  /** DELETE definitivo. Sólo lo usa el panel admin. */
  async remove(id: ID): Promise<void> {
    return mockResponse(() => {
      const index = db.representatives.findIndex((r) => r.id === id);
      if (index === -1) throw ApiError.notFound('el referente', id);
      db.representatives.splice(index, 1);
    });
  },
};
