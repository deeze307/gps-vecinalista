import {
  CITIES_MOCK,
  EVENTS_MOCK,
  ORGANIZATIONS_MOCK,
  PROVINCES_MOCK,
  REPRESENTATIVES_MOCK,
} from '@/mocks';
import type { City, NetworkEvent, Organization, Province, Representative } from '@/types';
import { clone } from '../api/mockClient';

/**
 * "Base de datos" en memoria.
 *
 * Se siembra con los archivos de `src/mocks` y es MUTABLE a propósito: así el
 * panel admin puede crear/editar/borrar durante la sesión y se ve el efecto en
 * el mapa. Al recargar la página vuelve al estado inicial.
 *
 * Cuando exista el backend real, este archivo y `services/api/mockClient.ts`
 * son los únicos que se borran.
 */
interface MockDb {
  provinces: Province[];
  cities: City[];
  representatives: Representative[];
  organizations: Organization[];
  events: NetworkEvent[];
}

const seed = (): MockDb => ({
  provinces: clone(PROVINCES_MOCK),
  cities: clone(CITIES_MOCK),
  representatives: clone(REPRESENTATIVES_MOCK),
  organizations: clone(ORGANIZATIONS_MOCK),
  events: clone(EVENTS_MOCK),
});

export const db: MockDb = seed();

/** Vuelve al estado inicial. Útil para tests y para un botón "restaurar demo". */
export const resetDb = (): void => {
  const fresh = seed();
  db.provinces = fresh.provinces;
  db.cities = fresh.cities;
  db.representatives = fresh.representatives;
  db.organizations = fresh.organizations;
  db.events = fresh.events;
};
