import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Icon } from '@/components/atoms';
import { ROUTES } from '@/config/routes';
import styles from './SiteHeader.module.css';

const NAV_ITEMS = [
  { to: ROUTES.home, label: 'Mapa', end: true },
  { to: ROUTES.cities, label: 'Ciudades', end: false },
  { to: ROUTES.representatives, label: 'Referentes', end: false },
  { to: ROUTES.congress, label: 'Congreso', end: false },
  { to: ROUTES.events, label: 'Eventos', end: false },
  { to: ROUTES.about, label: 'La red', end: false },
  { to: ROUTES.admin.root, label: 'Panel', end: false },
];

export const SiteHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  // Navegar cierra el menú mobile: si no, queda tapando la pantalla nueva.
  useEffect(() => setIsOpen(false), [pathname]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [styles.link, isActive ? styles.active : null].filter(Boolean).join(' ');

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <NavLink to={ROUTES.home} className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true">
            <Icon name="pin" size={20} />
          </span>
          <span className={styles.brandText}>
            GPS Vecinalista
            <small>Red de contactos de la comunidad</small>
          </span>
        </NavLink>

        <nav className={styles.nav} aria-label="Navegación principal">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className={styles.toggle}
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <Icon name={isOpen ? 'close' : 'menu'} size={24} />
        </button>
      </div>

      {isOpen && (
        <nav className={`container ${styles.mobileNav}`} aria-label="Navegación principal">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
};
