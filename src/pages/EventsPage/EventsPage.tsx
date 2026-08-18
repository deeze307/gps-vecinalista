import { Button, Spinner } from '@/components/atoms';
import { EventCard, StateMessage } from '@/components/molecules';
import { ContentTemplate } from '@/components/templates';
import { ROUTES } from '@/config/routes';
import { useEvents } from '@/hooks';
import shared from '../shared.module.css';

/** Agenda de encuentros, capacitaciones y asambleas de la red. */
export const EventsPage = () => {
  const { data: events, isLoading, error } = useEvents();

  return (
    <ContentTemplate
      eyebrow="Agenda"
      title="Eventos de la red"
      description="Congresos, encuentros regionales, capacitaciones y asambleas de la comunidad vecinalista."
      actions={
        <Button as="link" to={ROUTES.congress} variant="accent" size="sm" iconLeft="star">
          Ver el Congreso Nacional
        </Button>
      }
    >
      {isLoading && <Spinner centered label="Cargando eventos…" />}

      {!isLoading && error && (
        <StateMessage tone="error" title="No pudimos cargar los eventos" description={error} />
      )}

      {!isLoading && !error && events?.length === 0 && (
        <StateMessage
          icon="calendar"
          title="Todavía no hay eventos publicados"
          description="Cuando se confirmen nuevas fechas van a aparecer acá."
        />
      )}

      {!isLoading && !error && events && events.length > 0 && (
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
    </ContentTemplate>
  );
};
