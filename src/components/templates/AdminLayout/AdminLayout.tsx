import { Outlet } from 'react-router-dom';
import { AdminSidebar, SiteFooter, SiteHeader } from '@/components/organisms';
import styles from './AdminLayout.module.css';

/**
 * Marco del panel privado.
 * Está separado del sitio público a propósito: el día que haya login, la
 * protección de rutas se agrega acá y no toca nada del lado público.
 */
export const AdminLayout = () => (
  <>
    <SiteHeader />
    <main className={`container ${styles.page}`}>
      <header className={styles.header}>
        <h1 className={styles.title}>Panel de administración</h1>
        <p className={styles.subtitle}>
          Gestión de referentes, ciudades, organizaciones y eventos de la red.
        </p>
      </header>
      <div className={styles.grid}>
        <AdminSidebar />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </main>
    <SiteFooter />
  </>
);
