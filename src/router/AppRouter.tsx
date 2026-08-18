import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout, PublicLayout } from '@/components/templates';
import { ROUTES } from '@/config/routes';
import {
  AboutPage,
  AdminCitiesPage,
  AdminDashboardPage,
  AdminEventsPage,
  AdminOrganizationsPage,
  AdminRepresentativeFormPage,
  AdminRepresentativesPage,
  CitiesPage,
  CityPage,
  CongressPage,
  EventsPage,
  HomePage,
  NotFoundPage,
  RepresentativePage,
  RepresentativesPage,
} from '@/pages';
import { ScrollToTop } from './ScrollToTop';

/**
 * Mapa de rutas de la app.
 * El sitio público y el panel privado son dos ramas separadas: cuando exista
 * login, el guard se coloca sobre `AdminLayout` y nada más cambia.
 */
export const AppRouter = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.cities} element={<CitiesPage />} />
        <Route path={ROUTES.city()} element={<CityPage />} />
        <Route path={ROUTES.representatives} element={<RepresentativesPage />} />
        <Route path={ROUTES.representative()} element={<RepresentativePage />} />
        <Route path={ROUTES.congress} element={<CongressPage />} />
        <Route path={ROUTES.events} element={<EventsPage />} />
        <Route path={ROUTES.about} element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path={ROUTES.admin.root} element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="referentes" element={<AdminRepresentativesPage />} />
        <Route path="referentes/nuevo" element={<AdminRepresentativeFormPage />} />
        <Route path="referentes/:id" element={<AdminRepresentativeFormPage />} />
        <Route path="ciudades" element={<AdminCitiesPage />} />
        <Route path="organizaciones" element={<AdminOrganizationsPage />} />
        <Route path="eventos" element={<AdminEventsPage />} />
        <Route path="*" element={<Navigate to={ROUTES.admin.root} replace />} />
      </Route>
    </Routes>
  </>
);
