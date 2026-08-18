import { useMemo } from 'react';
import { Badge, Card, Icon, Spinner } from '@/components/atoms';
import { RepresentativeCard, StateMessage } from '@/components/molecules';
import { ContentTemplate } from '@/components/templates';
import { useFeaturedCongress } from '@/hooks';
import type { AgendaItem } from '@/types';
import { formatDate, formatDateRange } from '@/utils';
import shared from '../shared.module.css';
import styles from './CongressPage.module.css';

/** Agrupa la agenda por día, que es como la lee la gente. */
const groupByDay = (agenda: AgendaItem[]): Array<[string, AgendaItem[]]> => {
  const map = new Map<string, AgendaItem[]>();
  for (const item of agenda) {
    const bucket = map.get(item.day) ?? [];
    bucket.push(item);
    map.set(item.day, bucket);
  }
  return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
};

/**
 * "Modo congreso": el evento del año con su agenda y quiénes van a estar.
 * Convierte el mapa en una herramienta de networking, no sólo un directorio.
 */
export const CongressPage = () => {
  const { data: congress, isLoading, error } = useFeaturedCongress();
  const agendaByDay = useMemo(() => groupByDay(congress?.agenda ?? []), [congress]);

  if (isLoading) {
    return (
      <ContentTemplate title="Congreso Nacional">
        <Spinner centered />
      </ContentTemplate>
    );
  }

  if (error || !congress) {
    return (
      <ContentTemplate title="Congreso Nacional">
        <StateMessage
          icon="calendar"
          title="Todavía no hay un congreso publicado"
          description={error ?? 'Cuando se confirme la próxima edición, va a aparecer acá.'}
        />
      </ContentTemplate>
    );
  }

  return (
    <ContentTemplate title="Congreso Nacional" eyebrow={<>Encuentro anual de la red</>}>
      <section className={styles.hero}>
        <Badge tone="accent">{formatDateRange(congress.startDate, congress.endDate)}</Badge>
        <h2 className={styles.heroTitle}>{congress.title}</h2>
        <div className={styles.heroMeta}>
          {congress.city && (
            <span className={styles.heroMetaItem}>
              <Icon name="pin" size={18} />
              {congress.city.name}
            </span>
          )}
          {congress.venue && (
            <span className={styles.heroMetaItem}>
              <Icon name="building" size={18} />
              {congress.venue}
            </span>
          )}
          <span className={styles.heroMetaItem}>
            <Icon name="users" size={18} />
            {congress.attendees.length} referentes confirmados
          </span>
        </div>
        {congress.description && <p>{congress.description}</p>}
      </section>

      <div className={shared.split}>
        <section>
          <h2 className={shared.sectionTitle}>Agenda</h2>
          {agendaByDay.length === 0 ? (
            <p className={shared.muted}>La agenda todavía no está publicada.</p>
          ) : (
            <Card padding="lg">
              {agendaByDay.map(([day, items]) => (
                <div key={day} className={styles.agendaDay}>
                  <h3 className={styles.agendaDayTitle}>{formatDate(day)}</h3>
                  {items.map((item) => (
                    <div key={item.id} className={styles.agendaItem}>
                      <span className={styles.agendaTime}>
                        {item.startTime}–{item.endTime}
                      </span>
                      <div>
                        <p className={styles.agendaTitle}>{item.title}</p>
                        <p className={styles.agendaMeta}>
                          {[item.speaker, item.place].filter(Boolean).join(' · ')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </Card>
          )}
        </section>

        <section>
          <h2 className={shared.sectionTitle}>¿Con quién querés reunirte?</h2>
          <p className={shared.muted}>
            Estos son los referentes confirmados. Coordiná el encuentro antes de viajar.
          </p>
          <div className={`${shared.list} ${shared.section}`}>
            {congress.attendees.map((attendee) => (
              <RepresentativeCard
                key={attendee.id}
                representative={attendee}
                cityName={congress.city?.name ?? ''}
                variant="compact"
              />
            ))}
          </div>
        </section>
      </div>
    </ContentTemplate>
  );
};
