import { Button, Card, Spinner } from '@/components/atoms';
import { EventCard, RepresentativeCard } from '@/components/molecules';
import { ROUTES } from '@/config/routes';
import { useEvents, useNetworkStats, useRepresentatives } from '@/hooks';
import { daysSince } from '@/utils';
import shared from '../../shared.module.css';
import styles from '../admin.module.css';

/** Resumen del estado de la red y accesos directos a las tareas más comunes. */
export const AdminDashboardPage = () => {
  const { data: stats, isLoading } = useNetworkStats();
  const { data: representatives } = useRepresentatives({ includeInactive: true });
  const { data: events } = useEvents({ upcomingOnly: true });

  // Lo que de verdad importa mirar todos los meses: contactos sin confirmar.
  const stale = (representatives ?? [])
    .filter((rep) => rep.isActive && daysSince(rep.lastVerifiedAt) > 180)
    .slice(0, 4);

  const nextEvent = events?.[0];

  if (isLoading) return <Spinner centered label="Cargando panel…" />;

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Resumen</h2>
        <Button as="link" to={ROUTES.admin.representativeNew} variant="primary" iconLeft="plus">
          Nuevo referente
        </Button>
      </div>

      <div className={styles.statsGrid}>
        <Card padding="lg" className={styles.statCard}>
          <span className={styles.statValue}>{stats?.representatives ?? 0}</span>
          <span className={styles.statLabel}>Referentes activos</span>
        </Card>
        <Card padding="lg" className={styles.statCard}>
          <span className={styles.statValue}>{stats?.cities ?? 0}</span>
          <span className={styles.statLabel}>Ciudades con referente</span>
        </Card>
        <Card padding="lg" className={styles.statCard}>
          <span className={styles.statValue}>{stats?.provinces ?? 0}</span>
          <span className={styles.statLabel}>Provincias</span>
        </Card>
        <Card padding="lg" className={styles.statCard}>
          <span className={styles.statValue}>{stale.length}</span>
          <span className={styles.statLabel}>Perfiles sin actualizar</span>
        </Card>
      </div>

      {nextEvent && (
        <section className={shared.section}>
          <h2 className={shared.sectionTitle}>Próximo evento</h2>
          <EventCard
            event={nextEvent}
            cityName={nextEvent.city?.name}
            attendeesCount={nextEvent.attendees.length}
          />
        </section>
      )}

      <section className={shared.section}>
        <h2 className={shared.sectionTitle}>Perfiles que conviene revisar</h2>
        {stale.length === 0 ? (
          <p className={shared.muted}>
            Todos los referentes activos confirmaron sus datos en los últimos seis meses.
          </p>
        ) : (
          <div className={shared.cardsGrid}>
            {stale.map((representative) => (
              <RepresentativeCard
                key={representative.id}
                representative={representative}
                cityName={representative.city.name}
                variant="compact"
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};
