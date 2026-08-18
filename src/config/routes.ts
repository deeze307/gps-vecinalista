/** Fuente única de verdad de las rutas, para no repetir strings en la app. */
export const ROUTES = {
  home: '/',
  cities: '/ciudades',
  city: (slug = ':slug') => `/ciudades/${slug}`,
  representatives: '/referentes',
  representative: (slug = ':slug') => `/referentes/${slug}`,
  congress: '/congreso',
  events: '/eventos',
  about: '/la-red',
  admin: {
    root: '/admin',
    representatives: '/admin/referentes',
    representativeNew: '/admin/referentes/nuevo',
    representativeEdit: (id = ':id') => `/admin/referentes/${id}`,
    cities: '/admin/ciudades',
    organizations: '/admin/organizaciones',
    events: '/admin/eventos',
  },
} as const;
