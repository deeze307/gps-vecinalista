import type { City, ID, NetworkEvent, Representative } from '@/types';
import { ApiError } from './api/ApiError';
import { mockResponse } from './api/mockClient';
import { db } from './db/mockDb';

/** Evento con ciudad y referentes confirmados resueltos. */
export interface EventWithRelations extends NetworkEvent {
  city?: City;
  attendees: Representative[];
}

const withRelations = (event: NetworkEvent): EventWithRelations => ({
  ...event,
  city: db.cities.find((c) => c.id === event.cityId),
  attendees: db.representatives.filter((r) => event.attendeeRepresentativeIds.includes(r.id)),
});

const byStartDate = (a: NetworkEvent, b: NetworkEvent) =>
  new Date(a.startDate).getTime() - new Date(b.startDate).getTime();

export interface EventFilters {
  /** Sólo los que todavía no terminaron. */
  upcomingOnly?: boolean;
  cityId?: ID;
}

export const eventsService = {
  /** GET /eventos */
  async getAll(filters: EventFilters = {}): Promise<EventWithRelations[]> {
    return mockResponse(() => {
      const now = Date.now();
      return db.events
        .filter((event) => {
          if (filters.cityId && event.cityId !== filters.cityId) return false;
          if (filters.upcomingOnly && new Date(event.endDate).getTime() < now) return false;
          return true;
        })
        .sort(byStartDate)
        .map(withRelations);
    });
  },

  /** GET /eventos/:slug */
  async getBySlug(slug: string): Promise<EventWithRelations> {
    return mockResponse(() => {
      const event = db.events.find((e) => e.slug === slug);
      if (!event) throw ApiError.notFound('el evento', slug);
      return withRelations(event);
    });
  },

  /**
   * GET /congreso — el próximo congreso destacado.
   * Es la portada del "modo congreso".
   */
  async getFeaturedCongress(): Promise<EventWithRelations | null> {
    return mockResponse(() => {
      const congress = [...db.events]
        .filter((e) => e.type === 'congreso')
        .sort(byStartDate)
        .find((e) => e.isFeatured || new Date(e.endDate).getTime() >= Date.now());

      return congress ? withRelations(congress) : null;
    });
  },

  /** GET /eventos/:id/participantes */
  async getAttendees(eventId: ID): Promise<Representative[]> {
    return mockResponse(() => {
      const event = db.events.find((e) => e.id === eventId);
      if (!event) throw ApiError.notFound('el evento', eventId);
      return db.representatives.filter((r) => event.attendeeRepresentativeIds.includes(r.id));
    });
  },
};
