import { Icon } from '@/components/atoms';
import type { CityWithRelations } from '@/types';
import { formatDistance } from '@/utils';
import styles from './CityListItem.module.css';

export interface CityListItemProps {
  city: CityWithRelations;
  onSelect: (city: CityWithRelations) => void;
  selected?: boolean;
  /** Si viene, se muestra "A 18 km" (resultados de "cerca mío"). */
  distanceKm?: number;
}

/** Fila de ciudad en los listados y resultados de búsqueda. */
export const CityListItem = ({ city, onSelect, selected, distanceKm }: CityListItemProps) => {
  const count = city.representatives.length;
  const first = city.representatives[0];

  const subtitle =
    count === 0
      ? 'Sin referente asignado'
      : count === 1 && first
        ? `${first.firstName} ${first.lastName}`
        : `${count} referentes`;

  return (
    <button
      type="button"
      className={[styles.item, selected ? styles.selected : null].filter(Boolean).join(' ')}
      onClick={() => onSelect(city)}
      aria-current={selected ? 'true' : undefined}
    >
      <span className={styles.marker} aria-hidden="true">
        <Icon name="pin" size={18} />
      </span>

      <span className={styles.body}>
        <span className={styles.name}>{city.name}</span>
        <span className={styles.subtitle}>
          {city.province.name} · {subtitle}
        </span>
      </span>

      <span className={styles.side}>
        {distanceKm !== undefined && (
          <span className={styles.distance}>{formatDistance(distanceKm)}</span>
        )}
        <Icon name="chevronRight" size={18} />
      </span>
    </button>
  );
};
