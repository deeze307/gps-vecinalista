import type { ReactNode } from 'react';
import { Badge, Card, Icon } from '@/components/atoms';
import type { NetworkEvent } from '@/types';
import { EVENT_TYPE_LABELS } from '@/types';
import { formatDateRange } from '@/utils';
import styles from './EventCard.module.css';

export interface EventCardProps {
  event: NetworkEvent;
  cityName?: string;
  attendeesCount?: number;
  action?: ReactNode;
}

export const EventCard = ({ event, cityName, attendeesCount, action }: EventCardProps) => (
  <Card padding="lg" className={styles.card}>
    <div className={styles.top}>
      <Badge tone={event.type === 'congreso' ? 'accent' : 'neutral'}>
        {EVENT_TYPE_LABELS[event.type]}
      </Badge>
      {event.isFeatured && <Badge tone="success">Destacado</Badge>}
    </div>

    <h3 className={styles.title}>{event.title}</h3>

    <div className={styles.meta}>
      <span className={styles.metaItem}>
        <Icon name="calendar" size={16} />
        {formatDateRange(event.startDate, event.endDate)}
      </span>
      {cityName && (
        <span className={styles.metaItem}>
          <Icon name="pin" size={16} />
          {cityName}
        </span>
      )}
      {attendeesCount !== undefined && (
        <span className={styles.metaItem}>
          <Icon name="users" size={16} />
          {attendeesCount} referentes confirmados
        </span>
      )}
    </div>

    {event.description && <p className={styles.description}>{event.description}</p>}

    {(event.venue || action) && (
      <div className={styles.footer}>
        {event.venue && (
          <span className={styles.metaItem}>
            <Icon name="building" size={16} />
            {event.venue}
          </span>
        )}
        {action}
      </div>
    )}
  </Card>
);
