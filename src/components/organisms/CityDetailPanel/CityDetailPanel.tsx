import { Button, Icon } from '@/components/atoms';
import { RepresentativeCard, StateMessage } from '@/components/molecules';
import { ROUTES } from '@/config/routes';
import type { CityWithRelations } from '@/types';
import styles from './CityDetailPanel.module.css';

export interface CityDetailPanelProps {
  city: CityWithRelations;
  onClose: () => void;
}

/**
 * Detalle de la ciudad seleccionada: quién es el referente y cómo contactarlo.
 * En desktop vive en la columna derecha; en mobile, en el panel inferior.
 */
export const CityDetailPanel = ({ city, onClose }: CityDetailPanelProps) => (
  <section className={styles.panel} aria-label={`Referentes de ${city.name}`}>
    <header className={styles.header}>
      <div>
        <span className={styles.location}>
          <Icon name="pin" size={16} />
          {city.name}
        </span>
        <h2 className={styles.cityName}>{city.name}</h2>
        <p className={styles.province}>{city.province.name}</p>
      </div>
      <button type="button" className={styles.close} onClick={onClose} aria-label="Cerrar panel">
        <Icon name="close" size={22} />
      </button>
    </header>

    {city.representatives.length === 0 ? (
      <StateMessage
        icon="users"
        title="Todavía no hay referente acá"
        description={`${city.name} está en el mapa pero nadie tiene asignada la referencia. Escribinos si conocés a alguien de la red en la zona.`}
      />
    ) : (
      <div className={styles.list}>
        {city.representatives.map((representative) => (
          <RepresentativeCard
            key={representative.id}
            representative={representative}
            cityName={city.name}
            provinceName={city.province.name}
          />
        ))}
      </div>
    )}

    <div className={styles.footer}>
      <Button
        as="link"
        to={ROUTES.city(city.slug)}
        variant="outline"
        size="sm"
        fullWidth
        iconRight="chevronRight"
      >
        Ver la ficha completa de {city.name}
      </Button>
    </div>
  </section>
);
