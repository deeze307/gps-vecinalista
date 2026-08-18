# Funcionalidades habilitadas — GPS Vecinalista v0.1

Inventario técnico de lo que quedó implementado y funcionando, con su ubicación en el código.
Complementa la [Guía de Usuario](./Guia-de-Usuario-GPS-Vecinalista.docx), que cuenta lo mismo
desde la perspectiva de quien lo usa.

**Leyenda:** ✅ implementado y verificado · 🟡 parcial · 🔒 pendiente

---

## 1. Mapa interactivo

| # | Funcionalidad | Estado | Dónde |
| --- | --- | --- | --- |
| 1.1 | Mapa de Argentina con tiles neutros (CARTO Positron), sin API key ni cuenta | ✅ | `organisms/ArgentinaMap` |
| 1.2 | Un pin naranja por ciudad con referentes activos (36 ciudades cargadas) | ✅ | `ArgentinaMap.tsx` |
| 1.3 | Pin agrandado con contador cuando la ciudad tiene más de un referente | ✅ | `ArgentinaMap/pinIcon.ts` |
| 1.4 | Pin de la ciudad seleccionada resaltado en azul y escalado | ✅ | `pinIcon.ts` |
| 1.5 | Tooltip al hover con nombre de ciudad y cantidad de referentes | ✅ | `ArgentinaMap.tsx` |
| 1.6 | Click en pin → selecciona la ciudad y abre el panel de detalle | ✅ | `ArgentinaMap.tsx` |
| 1.7 | Vuelo animado (`flyTo`) al seleccionar una ciudad desde el mapa o el buscador | ✅ | `ArgentinaMap.tsx` |
| 1.8 | Controles propios de zoom + / − con targets de 44px | ✅ | `molecules/MapZoomControls` |
| 1.9 | Botón "ver todo el país" que resetea la vista | ✅ | `MapZoomControls` |
| 1.10 | Límites geográficos: el mapa no se puede arrastrar fuera de Argentina | ✅ | `config/map.config.ts` |
| 1.11 | Pins dibujados con `divIcon` + CSS tokens (sin imágenes, se re-tematiza solo) | ✅ | `pinIcon.ts` |
| 1.12 | Agrupamiento de pins cercanos (clustering) | 🔒 | — |

## 2. Búsqueda de ciudades

| # | Funcionalidad | Estado | Dónde |
| --- | --- | --- | --- |
| 2.1 | Buscador "¿A dónde vas?" con filtrado en vivo | ✅ | `molecules/SearchField` |
| 2.2 | Debounce de 250ms para no disparar una búsqueda por tecla | ✅ | `hooks/useDebouncedValue` |
| 2.3 | Búsqueda por nombre de ciudad **y** por nombre de provincia | ✅ | `services/cities.service.ts` |
| 2.4 | Insensible a tildes y mayúsculas ("cordoba" → "Córdoba") | ✅ | `utils/string.ts` |
| 2.5 | Contador de resultados en vivo | ✅ | `organisms/CityFinder` |
| 2.6 | Cada resultado muestra ciudad, provincia y referente (o cantidad) | ✅ | `molecules/CityListItem` |
| 2.7 | Botón de limpiar búsqueda | ✅ | `SearchField` |
| 2.8 | Estado vacío con explicación y salida ("ver todas las ciudades") | ✅ | `molecules/StateMessage` |
| 2.9 | Descarte de respuestas obsoletas al tipear rápido (race conditions) | ✅ | `hooks/useAsync.ts` |

## 3. Geolocalización — "Referentes cerca mío"

| # | Funcionalidad | Estado | Dónde |
| --- | --- | --- | --- |
| 3.1 | Permiso de ubicación pedido **sólo** al tocar el botón, nunca al entrar | ✅ | `hooks/useGeolocation.ts` |
| 3.2 | Cálculo de distancia real por fórmula de Haversine | ✅ | `utils/geo.ts` |
| 3.3 | Listado reordenado por cercanía con distancia visible ("A 119 km") | ✅ | `CityFinder` + `CityListItem` |
| 3.4 | Marcador de posición del usuario en el mapa | ✅ | `pinIcon.ts` |
| 3.5 | Encuadre automático del mapa en la zona del usuario | ✅ | `ArgentinaMap.tsx` |
| 3.6 | Radio máximo de búsqueda de 600 km, tope de resultados configurable | ✅ | `cities.service.ts` |
| 3.7 | Mensajes diferenciados: permiso denegado / falla / timeout / sin resultados | ✅ | `useGeolocation.ts` |
| 3.8 | Salir del modo cercanía manualmente o al empezar a buscar | ✅ | `pages/HomePage` |

## 4. Contacto con el referente

| # | Funcionalidad | Estado | Dónde |
| --- | --- | --- | --- |
| 4.1 | Botón grande de WhatsApp como CTA principal (`wa.me`) | ✅ | `molecules/ContactActions` |
| 4.2 | Mensaje prellenado y contextualizado con nombre y ciudad | ✅ | `utils/contact.ts` |
| 4.3 | Normalización del número (quita símbolos y espacios) | ✅ | `utils/contact.ts` |
| 4.4 | Llamada telefónica (`tel:`) | ✅ | `ContactActions` |
| 4.5 | Email con asunto prellenado (`mailto:`) | ✅ | `ContactActions` |
| 4.6 | Enlaces a Facebook, Instagram y sitio web | ✅ | `ContactActions` |
| 4.7 | Manejo del caso "sin datos de contacto cargados" | ✅ | `ContactActions` |
| 4.8 | Dos variantes de layout: `hero` (ficha) y `compact` (listado) | ✅ | `ContactActions` |

## 5. Frescura de los datos

| # | Funcionalidad | Estado | Dónde |
| --- | --- | --- | --- |
| 5.1 | Campo `lastVerifiedAt` en el modelo de referente | ✅ | `types/representative.ts` |
| 5.2 | Semáforo verde ≤3 meses / ámbar ≤6 / rojo >6 | ✅ | `utils/format.ts` |
| 5.3 | Texto en lenguaje natural ("hace 12 días", "hace 8 meses") | ✅ | `utils/format.ts` |
| 5.4 | Badge visible en todas las tarjetas, fichas y en la tabla del panel | ✅ | `molecules/FreshnessBadge` |
| 5.5 | Contador de perfiles vencidos + listado accionable en el dashboard | ✅ | `AdminDashboardPage` |
| 5.6 | Endpoint de re-verificación (`touchVerification`) | ✅ | `representatives.service.ts` |

## 6. Fichas y directorios

| # | Funcionalidad | Estado | Dónde |
| --- | --- | --- | --- |
| 6.1 | Ficha de ciudad con URL propia (`/ciudades/cordoba`) | ✅ | `pages/CityPage` |
| 6.2 | Ficha de ciudad: referentes, provincia, región, población, coordenadas | ✅ | `CityPage` |
| 6.3 | Ficha de ciudad: organizaciones y asociaciones de la zona | ✅ | `CityPage` |
| 6.4 | Ficha individual de referente (`/referentes/:slug`) | ✅ | `pages/RepresentativePage` |
| 6.5 | Directorio de ciudades con buscador | ✅ | `pages/CitiesPage` |
| 6.6 | Filtro por provincia (24 jurisdicciones) | ✅ | `CitiesPage` |
| 6.7 | Directorio de referentes con buscador por nombre, rol o ciudad | ✅ | `pages/RepresentativesPage` |
| 6.8 | Filtro por alcance (nacional / provincial / local) | ✅ | `RepresentativesPage` |
| 6.9 | Orden jerárquico automático: nacional → provincial → local | ✅ | `cities.service.ts` |

## 7. Eventos y modo congreso

| # | Funcionalidad | Estado | Dónde |
| --- | --- | --- | --- |
| 7.1 | Sección Congreso Nacional con hero, fechas y sede | ✅ | `pages/CongressPage` |
| 7.2 | Agenda completa agrupada por día, con horario, expositor y sala | ✅ | `CongressPage` |
| 7.3 | Listado de referentes confirmados con contacto directo | ✅ | `CongressPage` |
| 7.4 | Agenda general de eventos ordenada por fecha | ✅ | `pages/EventsPage` |
| 7.5 | Cuatro tipos de evento: congreso, encuentro regional, capacitación, asamblea | ✅ | `types/event.ts` |
| 7.6 | Filtro de eventos próximos (`upcomingOnly`) | ✅ | `events.service.ts` |
| 7.7 | Marcar "quiero reunirme con…" (matchmaking entre referentes) | 🔒 | — |

## 8. Panel de administración

| # | Funcionalidad | Estado | Dónde |
| --- | --- | --- | --- |
| 8.1 | Layout privado separado del sitio público (punto de anclaje del futuro guard) | ✅ | `templates/AdminLayout` |
| 8.2 | Dashboard con métricas de la red | ✅ | `AdminDashboardPage` |
| 8.3 | Tabla de referentes incluyendo dados de baja | ✅ | `organisms/RepresentativeTable` |
| 8.4 | **Alta** de referente | ✅ | `representatives.service.ts` |
| 8.5 | **Edición** de referente | ✅ | `AdminRepresentativeFormPage` |
| 8.6 | **Baja lógica** y reactivación (no se pierde el histórico) | ✅ | `representatives.service.ts` |
| 8.7 | **Borrado definitivo** con confirmación previa | ✅ | `AdminRepresentativesPage` |
| 8.8 | Validación por campo con mensajes específicos (422) | ✅ | `representatives.service.ts` |
| 8.9 | Control de duplicados por nombre + apellido (409) | ✅ | `representatives.service.ts` |
| 8.10 | Buscador dentro del panel | ✅ | `AdminRepresentativesPage` |
| 8.11 | Consulta de ciudades, organizaciones y eventos | 🟡 sólo lectura | `pages/admin/*` |
| 8.12 | Login, roles y cuenta propia por referente | 🔒 | — |

## 9. Capa de datos (services sobre mocks)

| # | Funcionalidad | Estado | Dónde |
| --- | --- | --- | --- |
| 9.1 | Services asíncronos con la misma firma que tendrán contra HTTP | ✅ | `services/*.service.ts` |
| 9.2 | Latencia de red simulada y configurable | ✅ | `services/api/mockClient.ts` |
| 9.3 | Copias profundas: nadie puede mutar los datos por referencia | ✅ | `mockClient.ts` |
| 9.4 | `ApiError` tipado con status 404 / 409 / 422 | ✅ | `services/api/ApiError.ts` |
| 9.5 | Resolución de relaciones (el `join` que hará el backend) | ✅ | `cities.service.ts` |
| 9.6 | "Base de datos" mutable en memoria para el ABM del panel | ✅ | `services/db/mockDb.ts` |
| 9.7 | Endpoint equivalente documentado en cada método | ✅ | todos los services |
| 9.8 | Filtros compuestos: búsqueda + provincia + alcance + activos | ✅ | `cities` / `representatives` |
| 9.9 | Estadísticas agregadas de la red | ✅ | `cities.service.ts` |
| 9.10 | Implementación HTTP contra backend real | 🔒 | — |

**Datos cargados:** 24 provincias · 36 ciudades (coordenadas reales) · 41 referentes · 12 organizaciones · 4 eventos.

## 10. Arquitectura y calidad

| # | Funcionalidad | Estado | Dónde |
| --- | --- | --- | --- |
| 10.1 | Atomic Design con las 5 capas y dependencias en un solo sentido | ✅ | `components/` |
| 10.2 | Fetch aislado en el nivel de páginas; el resto es presentacional | ✅ | `pages/` |
| 10.3 | Hook `useAsync` con loading, error y cancelación de pedidos viejos | ✅ | `hooks/useAsync.ts` |
| 10.4 | Un hook por recurso, encapsulando cada service | ✅ | `hooks/` |
| 10.5 | Design tokens: ningún color escrito a mano en un componente | ✅ | `styles/tokens.css` |
| 10.6 | CSS Modules: sin colisiones de nombres de clase | ✅ | `*.module.css` |
| 10.7 | Alias `@/` para imports absolutos | ✅ | `vite.config.ts` |
| 10.8 | TypeScript estricto (`strict`, `noUncheckedIndexedAccess`) sin errores | ✅ | `tsconfig.app.json` |
| 10.9 | ESLint sin warnings tolerados (`--max-warnings 0`) | ✅ | `.eslintrc.cjs` |
| 10.10 | Rutas centralizadas en un único archivo | ✅ | `config/routes.ts` |
| 10.11 | Tests automatizados (Vitest) | 🔒 | — |

## 11. Interfaz y accesibilidad

| # | Funcionalidad | Estado | Dónde |
| --- | --- | --- | --- |
| 11.1 | Mobile first: breakpoint de desktop en 900px como excepción | ✅ | todos los módulos CSS |
| 11.2 | Panel adaptativo: hoja inferior en celular, columna lateral en desktop | ✅ | `MapExplorerTemplate` |
| 11.3 | Paleta del concepto aplicada como tokens | ✅ | `tokens.css` |
| 11.4 | Menú de navegación con versión mobile desplegable | ✅ | `organisms/SiteHeader` |
| 11.5 | Targets táctiles de 44px mínimo | ✅ | `Button`, `MapZoomControls` |
| 11.6 | Foco de teclado siempre visible | ✅ | `styles/reset.css` |
| 11.7 | Etiquetas ARIA en controles de mapa, íconos y campos | ✅ | atoms y molecules |
| 11.8 | Respeta `prefers-reduced-motion` | ✅ | `reset.css` |
| 11.9 | Estados de carga, error y vacío unificados en toda la app | ✅ | `Spinner`, `StateMessage` |
| 11.10 | Scroll al tope en cada navegación | ✅ | `router/ScrollToTop.tsx` |
| 11.11 | Avatar con iniciales cuando no hay foto | ✅ | `atoms/Avatar` |
| 11.12 | Página 404 con salida al mapa | ✅ | `pages/NotFoundPage` |

---

## Resumen

| Bloque | Habilitadas | Parciales | Pendientes |
| --- | --- | --- | --- |
| Mapa | 11 | — | 1 |
| Búsqueda | 9 | — | — |
| Geolocalización | 8 | — | — |
| Contacto | 8 | — | — |
| Frescura de datos | 6 | — | — |
| Fichas y directorios | 9 | — | — |
| Eventos y congreso | 6 | — | 1 |
| Panel admin | 10 | 1 | 1 |
| Capa de datos | 9 | — | 1 |
| Arquitectura | 10 | — | 1 |
| Interfaz | 12 | — | — |
| **Total** | **98** | **1** | **6** |

## Bloqueantes antes de producción

1. **Autenticación del panel `/admin`** — hoy está abierto a cualquiera con el enlace.
2. **Consentimiento de cada referente** para publicar su teléfono y email (datos personales en un sitio público).
3. **Backend y base de datos** — sin esto, los cambios del panel se pierden al recargar.
