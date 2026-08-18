import { Badge, Spinner } from '@/components/atoms';
import { EventCard, StateMessage } from '@/components/molecules';
import { useEvents } from '@/hooks';
import shared from '../../shared.module.css';
import styles from '../admin.module.css';

/** Eventos de la red (sólo lectura por ahora). */
export const AdminEventsPage = () => {
  const { data: events, isLoading, error } = useEvents();

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Eventos</h2>
        <Badge tone="outline">{events?.length ?? 0} cargados</Badge>
      </div>

      {isLoading && <Spinner centered label="Cargando eventos…" />}

      {!isLoading && error && (
        <StateMessage tone="error" title="No pudimos cargar los eventos" description={error} />
      )}

      {!isLoading && !error && events && (
        <div className={shared.list}>
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              cityName={event.city?.name}
              attendeesCount={event.attendees.length}
            />
          ))}
        </div>
      )}
    </>
  );
};
