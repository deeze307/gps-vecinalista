import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import styles from './SiteFooter.module.css';

export const SiteFooter = () => (
  <footer className={styles.footer}>
    <div className="container">
      <div className={styles.grid}>
        <div>
          <h2 className={styles.title}>GPS Vecinalista</h2>
          <p>
            La red de contactos de la comunidad vecinalista de Argentina. Encontrá al referente
            de cada ciudad y contactalo en segundos, estés donde estés.
          </p>
        </div>

        <div>
          <h3 className={styles.title}>Explorar</h3>
          <div className={styles.links}>
            <Link to={ROUTES.home}>Mapa</Link>
            <Link to={ROUTES.cities}>Ciudades</Link>
            <Link to={ROUTES.representatives}>Referentes</Link>
            <Link to={ROUTES.events}>Eventos</Link>
          </div>
        </div>

        <div>
          <h3 className={styles.title}>La red</h3>
          <div className={styles.links}>
            <Link to={ROUTES.congress}>Congreso Nacional</Link>
            <Link to={ROUTES.about}>Sobre la red</Link>
            <Link to={ROUTES.admin.root}>Panel de administración</Link>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Red Vecinalista Argentina</span>
        <span>Datos de demostración · versión de desarrollo</span>
      </div>
    </div>
  </footer>
);
