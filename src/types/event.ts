import type { Auditable, ID, ISODate } from './common';

export const EVENT_TYPES = ['congreso', 'encuentro-regional', 'capacitacion', 'asamblea'] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  congreso: 'Congreso',
  'encuentro-regional': 'Encuentro regional',
  capacitacion: 'Capacitación',
  asamblea: 'Asamblea',
};

export interface AgendaItem {
  id: ID;
  day: ISODate;
  startTime: string;
  endTime: string;
  title: string;
  speaker?: string;
  place?: string;
}

export interface NetworkEvent extends Auditable {
  id: ID;
  slug: string;
  title: string;
  type: EventType;
  startDate: ISODate;
  endDate: ISODate;
  cityId: ID;
  venue?: string;
  description?: string;
  /** Referentes confirmados. Habilita el "modo congreso" del PDF. */
  attendeeRepresentativeIds: ID[];
  agenda?: AgendaItem[];
  isFeatured?: boolean;
}
