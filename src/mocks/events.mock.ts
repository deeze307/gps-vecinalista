import type { NetworkEvent } from '@/types';
import { withAudit, type Raw } from './_audit';

/** Datos ficticios de demostración. */
const raw: Raw<NetworkEvent>[] = [
  {
    id: 'ev-01',
    slug: 'xx-congreso-nacional-2026',
    title: 'XX Congreso Nacional de la Red Vecinalista',
    type: 'congreso',
    startDate: '2026-11-12T09:00:00.000Z',
    endDate: '2026-11-14T19:00:00.000Z',
    cityId: 'ci-01',
    venue: 'Centro Cultural Vecinal — Av. de Mayo 1234, CABA',
    description:
      'Encuentro anual de toda la red: referentes de las 24 provincias, comisiones de trabajo, votación de la mesa nacional y espacios de networking entre vecinales.',
    isFeatured: true,
    attendeeRepresentativeIds: [
      're-01', 're-02', 're-03', 're-04', 're-07', 're-08', 're-11', 're-12',
      're-14', 're-17', 're-19', 're-22', 're-24', 're-25', 're-28', 're-30',
      're-32', 're-33', 're-36', 're-38', 're-40',
    ],
    agenda: [
      { id: 'ag-01', day: '2026-11-12', startTime: '09:00', endTime: '10:30', title: 'Acreditación y apertura', speaker: 'Silvia Arroyo', place: 'Salón principal' },
      { id: 'ag-02', day: '2026-11-12', startTime: '11:00', endTime: '13:00', title: 'Panel: financiamiento de obras barriales', speaker: 'Paula Giordano', place: 'Sala A' },
      { id: 'ag-03', day: '2026-11-12', startTime: '15:00', endTime: '18:00', title: 'Comisiones regionales (NOA · NEA · Cuyo · Centro · Patagonia)', place: 'Salas 1 a 5' },
      { id: 'ag-04', day: '2026-11-13', startTime: '09:30', endTime: '12:00', title: 'Taller: digitalización de las vecinales', speaker: 'Jorge Fernández', place: 'Sala B' },
      { id: 'ag-05', day: '2026-11-13', startTime: '14:00', endTime: '17:30', title: 'Ronda de networking entre referentes', place: 'Hall central' },
      { id: 'ag-06', day: '2026-11-14', startTime: '10:00', endTime: '13:00', title: 'Asamblea y elección de la mesa nacional', place: 'Salón principal' },
      { id: 'ag-07', day: '2026-11-14', startTime: '15:00', endTime: '17:00', title: 'Cierre y documento final', speaker: 'Elena Ferrari', place: 'Salón principal' },
    ],
  },
  {
    id: 'ev-02',
    slug: 'encuentro-patagonico-2026',
    title: 'Encuentro Patagónico de Vecinales',
    type: 'encuentro-regional',
    startDate: '2026-09-19T10:00:00.000Z',
    endDate: '2026-09-20T18:00:00.000Z',
    cityId: 'ci-29',
    venue: 'Centro Comunitario Patagónico — Roca 560, Neuquén',
    description: 'Encuentro del nodo Patagonia: servicios públicos, transporte y vivienda.',
    attendeeRepresentativeIds: ['re-32', 're-33', 're-34', 're-35', 're-36', 're-37', 're-38', 're-39'],
  },
  {
    id: 'ev-03',
    slug: 'capacitacion-personeria-juridica-2026',
    title: 'Capacitación: personería jurídica y rendición de cuentas',
    type: 'capacitacion',
    startDate: '2026-08-28T18:00:00.000Z',
    endDate: '2026-08-28T21:00:00.000Z',
    cityId: 'ci-06',
    venue: 'Asociación Vecinal Centro — San Jerónimo 450, Córdoba',
    description: 'Abierta a todas las vecinales del nodo Centro. Cupo limitado.',
    attendeeRepresentativeIds: ['re-07', 're-08', 're-09', 're-10', 're-11', 're-12'],
  },
  {
    id: 'ev-04',
    slug: 'encuentro-noa-2026',
    title: 'Encuentro Regional NOA',
    type: 'encuentro-regional',
    startDate: '2026-10-03T09:00:00.000Z',
    endDate: '2026-10-04T17:00:00.000Z',
    cityId: 'ci-21',
    venue: 'Red Vecinal del Norte — Caseros 1100, Salta',
    attendeeRepresentativeIds: ['re-22', 're-23', 're-24', 're-25', 're-26', 're-27'],
  },
];

export const EVENTS_MOCK: NetworkEvent[] = withAudit<NetworkEvent>(raw);
