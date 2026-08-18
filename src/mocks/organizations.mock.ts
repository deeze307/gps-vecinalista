import type { Organization } from '@/types';
import { withAudit, type Raw } from './_audit';

/** Datos ficticios de demostración. */
const raw: Raw<Organization>[] = [
  { id: 'og-01', slug: 'federacion-nacional-vecinalista', name: 'Federación Nacional Vecinalista', type: 'federacion', cityId: 'ci-01', address: 'Av. de Mayo 1234, CABA', email: 'contacto@fnv.example.ar', phone: '+54 11 5555-0100', foundedYear: 1978 },
  { id: 'og-02', slug: 'asociacion-vecinal-centro-cordoba', name: 'Asociación Vecinal Centro', type: 'asociacion-vecinal', cityId: 'ci-06', address: 'San Jerónimo 450, Córdoba', email: 'centro@vecinalcba.example.ar', foundedYear: 1991 },
  { id: 'og-03', slug: 'red-barrial-norte-rosario', name: 'Red Barrial Norte', type: 'red-barrial', cityId: 'ci-09', address: 'Av. Alberdi 2200, Rosario', email: 'norte@redbarrial.example.ar', foundedYear: 2004 },
  { id: 'og-04', slug: 'union-vecinal-mendoza', name: 'Unión Vecinal de Mendoza', type: 'federacion', cityId: 'ci-15', address: 'Belgrano 880, Mendoza', foundedYear: 1985 },
  { id: 'og-05', slug: 'centro-comunitario-austral', name: 'Centro Comunitario Austral', type: 'centro-comunitario', cityId: 'ci-35', address: 'Maipú 300, Ushuaia', foundedYear: 2011 },
  { id: 'og-06', slug: 'asociacion-vecinal-la-plata', name: 'Asociación Vecinal Platense', type: 'asociacion-vecinal', cityId: 'ci-02', address: 'Calle 50 nº 720, La Plata', foundedYear: 1996 },
  { id: 'og-07', slug: 'red-vecinal-del-norte', name: 'Red Vecinal del Norte', type: 'red-barrial', cityId: 'ci-21', address: 'Caseros 1100, Salta', foundedYear: 2008 },
  { id: 'og-08', slug: 'federacion-litoral', name: 'Federación Vecinal del Litoral', type: 'federacion', cityId: 'ci-10', address: 'San Martín 2400, Santa Fe', foundedYear: 1989 },
  { id: 'og-09', slug: 'asociacion-vecinal-atlantica', name: 'Asociación Vecinal Atlántica', type: 'asociacion-vecinal', cityId: 'ci-03', address: 'San Luis 1800, Mar del Plata', foundedYear: 1999 },
  { id: 'og-10', slug: 'centro-comunitario-patagonico', name: 'Centro Comunitario Patagónico', type: 'centro-comunitario', cityId: 'ci-29', address: 'Roca 560, Neuquén', foundedYear: 2013 },
  { id: 'og-11', slug: 'red-barrial-guarani', name: 'Red Barrial Guaraní', type: 'red-barrial', cityId: 'ci-27', address: 'Bolívar 900, Posadas', foundedYear: 2010 },
  { id: 'og-12', slug: 'asociacion-vecinal-tucumana', name: 'Asociación Vecinal Tucumana', type: 'asociacion-vecinal', cityId: 'ci-20', address: 'Congreso 220, San Miguel de Tucumán', foundedYear: 1994 },
];

export const ORGANIZATIONS_MOCK: Organization[] = withAudit<Organization>(raw);
