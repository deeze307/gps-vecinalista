# GPS Vecinalista

Red de contactos de la comunidad vecinalista de Argentina.

El caso de uso que resuelve, en diez segundos y desde el celular:

> "El mes que viene voy a Rosario. ¿Quién es el referente de Rosario y cómo lo contacto?"

Mapa interactivo de Argentina con un pin por ciudad, buscador, ficha de cada referente
y un botón grande de WhatsApp como acción principal. Incluye panel de administración
para mantener los datos.

---

## Stack

| Pieza | Elección | Por qué |
| --- | --- | --- |
| Build | Vite 5 | Arranque instantáneo, build chico |
| UI | React 18 + TypeScript | Tipado de extremo a extremo sobre el modelo de datos |
| Ruteo | React Router 6 | Rutas anidadas, layouts públicos y privados separados |
| Mapa | Leaflet + react-leaflet | Sin API key ni cuenta; tiles neutros de CARTO |
| Estilos | CSS Modules + design tokens | Sin dependencia de framework CSS, temas por variables |
| Datos | Archivos mock + capa de services | Migrable a backend sin tocar la UI |

Sin librería de estado global: el estado es local a cada pantalla y los datos
vienen de los services vía hooks.

---

## Arranque

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Typecheck + build de producción en `dist/` |
| `npm run preview` | Sirve el build |
| `npm run lint` | ESLint sin warnings tolerados |
| `npm run typecheck` | Sólo TypeScript |

Variables de entorno opcionales en `.env` (ver `.env.example`).

---

## Estructura

```
src/
├── components/          Atomic Design
│   ├── atoms/           Icon · Button · Badge · Avatar · Spinner · Card · TextField
│   ├── molecules/       SearchField · ContactActions · RepresentativeCard · CityListItem ·
│   │                    FreshnessBadge · StateMessage · StatList · MapZoomControls · EventCard
│   ├── organisms/       ArgentinaMap · CityFinder · CityDetailPanel · SiteHeader · SiteFooter ·
│   │                    RepresentativeTable · RepresentativeForm · AdminSidebar
│   └── templates/       PublicLayout · MapExplorerTemplate · ContentTemplate · AdminLayout
├── pages/               Una carpeta por ruta (+ pages/admin para el panel)
├── services/            Capa de datos — único punto que conoce el origen de los datos
│   ├── api/             ApiError + mockClient (latencia, clone, ids)
│   ├── db/mockDb.ts     "Base de datos" en memoria, sembrada desde src/mocks
│   └── *.service.ts     provinces · cities · representatives · organizations · events
├── mocks/               Los datos: provincias, ciudades, referentes, organizaciones, eventos
├── hooks/               useAsync + un hook por recurso + useGeolocation, useDebouncedValue…
├── types/               Modelo de dominio
├── utils/               geo (haversine) · string (slug, búsqueda) · format (fechas) · contact (wa.me)
├── config/              env · map.config · routes
├── styles/              tokens.css · reset.css · global.css
└── router/              AppRouter + ScrollToTop
```

### Atomic Design, en concreto

- **Atoms**: no conocen el dominio. `Button` no sabe qué es un referente.
- **Molecules**: combinan atoms y ya hablan el idioma del dominio (`RepresentativeCard`).
- **Organisms**: secciones autónomas con lógica de presentación (`ArgentinaMap`, `CityFinder`).
- **Templates**: sólo layout, reciben el contenido por props o por `<Outlet />`.
- **Pages**: conectan hooks/services con los templates. Es el único nivel que hace fetch.

Cada componente vive en su carpeta con `Component.tsx`, `Component.module.css` e `index.ts`.

---

## La capa de services

Toda la app consume datos así, y **nunca** importa `src/mocks` directamente:

```ts
import { citiesService } from '@/services';

const cities = await citiesService.getAll({ search: 'rosario' });
const city   = await citiesService.getBySlug('cordoba');
const nearby = await citiesService.getNearby({ lat: -54.8, lng: -68.3 }, 5);
```

Los services ya se comportan como una API real:

- son `async` y simulan latencia (`VITE_MOCK_LATENCY`),
- devuelven copias profundas — nadie puede mutar los datos por referencia,
- lanzan `ApiError` con `status` 404 / 409 / 422, igual que hará el backend,
- resuelven relaciones (`city.province`, `city.representatives`, `representative.organization`),
  que es el `include`/`join` que después hará el servidor,
- exponen escritura: `create`, `update`, `deactivate`, `remove`, `touchVerification`.

Los comentarios de cada método indican el endpoint equivalente (`GET /ciudades/:slug`, etc.).

### Migrar a backend real

1. Crear `src/services/http/httpClient.ts` con `fetch` y `VITE_API_URL`.
2. Crear `cities.http.service.ts` (etc.) implementando la **misma interfaz** que el service mock.
3. En `src/services/index.ts`, exportar una u otra implementación según `env.dataSource`.
4. Borrar `services/db/mockDb.ts`, `services/api/mockClient.ts` y `src/mocks/`.

Ni los hooks ni los componentes cambian.

---

## Datos y modelo

```
Province
└── City
    └── Representative
        ├── Contact (whatsapp, teléfono, email, redes)
        ├── Organization
        └── lastVerifiedAt  ← frescura del perfil
```

Más `NetworkEvent` (congresos, encuentros, capacitaciones) con agenda y referentes confirmados.

**Todos los datos de personas son ficticios.** Los teléfonos usan el rango reservado
`555-01xx` y los emails un dominio `.example.ar`. Las coordenadas de las ciudades sí son
reales (GeoNames / SimpleMaps). Antes de cargar datos reales hace falta el consentimiento
de cada referente para publicar su contacto.

### Frescura del perfil

El problema clásico de estos directorios es que los contactos quedan viejos. Cada referente
tiene `lastVerifiedAt` y la UI lo muestra con semáforo: verde hasta 3 meses, ámbar hasta 6,
rojo después. El dashboard del panel lista los perfiles que conviene revisar.

---

## Funcionalidad implementada

**Sitio público**

- Mapa de Argentina con pins por ciudad (el pin muestra la cantidad de referentes).
- Buscador por ciudad o provincia, con debounce.
- "Encontrar referentes cerca mío" con geolocalización del navegador y distancia en km
  (Haversine). El permiso se pide sólo al tocar el botón.
- Panel de detalle: en desktop columna derecha, en celular hoja inferior.
- Ficha de ciudad `/ciudades/:slug` con referentes, datos y organizaciones.
- Ficha de referente `/referentes/:slug`.
- Listados de ciudades y referentes con filtros.
- Modo congreso `/congreso`: agenda por día y referentes confirmados.
- Eventos y página institucional.

**Panel privado** (`/admin`, todavía sin login)

- Dashboard con métricas y perfiles a revisar.
- ABM de referentes: alta, edición, baja lógica, reactivación y borrado, con validación
  de campos servida por el service.
- Listados de ciudades, organizaciones y eventos.

Los cambios del panel viven en memoria: al recargar, los datos vuelven al estado de `src/mocks`.

---

## Diseño

Paleta del concepto, definida como tokens en `src/styles/tokens.css`:

| Token | Color | Uso |
| --- | --- | --- |
| `--color-primary` | `#173B57` | Azul principal |
| `--color-secondary` | `#245B78` | Azul secundario |
| `--color-accent` | `#E58B3A` | Pins, acciones y destacados |
| `--color-bg` | `#F7F4EE` | Fondo cálido |
| `--color-surface` | `#FFFFFF` | Cards y contenido |

Mobile first: el breakpoint de desktop es 900px y es la excepción, no la regla.
Los targets táctiles son de 44px mínimo y el foco de teclado siempre es visible.

---

## Pendientes conocidos

- Autenticación y roles (admin / referente con su propio perfil).
- ABM de ciudades, organizaciones y eventos desde el panel (hoy sólo lectura).
- Tests: la capa de `services` y `utils` es pura y está lista para testear con Vitest.
- Agrupar pins cuando hay muchas ciudades juntas (clustering).
- SEO / metadatos por ficha si el sitio se indexa.
