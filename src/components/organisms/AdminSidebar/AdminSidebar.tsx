import { NavLink } from 'react-router-dom';
import { Icon, type IconName } from '@/components/atoms';
import { ROUTES } from '@/config/routes';
import styles from './AdminSidebar.module.css';

const ITEMS: Array<{ to: string; label: string; icon: IconName; end?: boolean }> = [
  { to: ROUTES.admin.root, label: 'Dashboard', icon: 'dashboard', end: true },
  { to: ROUTES.admin.representatives, label: 'Referentes', icon: 'users' },
  { to: ROUTES.admin.cities, label: 'Ciudades', icon: 'pin' },
  { to: ROUTES.admin.organizations, label: 'Organizaciones', icon: 'building' },
  { to: ROUTES.admin.events, label: 'Eventos', icon: 'calendar' },
];

export const AdminSidebar = () => (
  <aside className={styles.sidebar}>
    <h2 className={styles.title}>Administración</h2>
    <nav className={styles.nav} aria-label="Secciones del panel">
      {ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            [styles.link, isActive ? styles.active : null].filter(Boolean).join(' ')
          }
        >
          <Icon name={item.icon} size={18} />
          {item.label}
        </NavLink>
      ))}
    </nav>
    <p className={styles.note}>
      Panel de demostración: los cambios viven en memoria y se pierden al recargar la página.
    </p>
  </aside>
);
