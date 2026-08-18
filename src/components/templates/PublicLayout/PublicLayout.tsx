import { Outlet } from 'react-router-dom';
import { SiteFooter, SiteHeader } from '@/components/organisms';
import styles from './PublicLayout.module.css';

/** Marco del sitio público: header + contenido + footer. */
export const PublicLayout = () => (
  <div className={styles.layout}>
    <SiteHeader />
    <main className={styles.main}>
      <Outlet />
    </main>
    <SiteFooter />
  </div>
);
