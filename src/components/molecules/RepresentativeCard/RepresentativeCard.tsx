import { Link } from 'react-router-dom';
import { Avatar, Badge, Card, Icon } from '@/components/atoms';
import { ROUTES } from '@/config/routes';
import type { Organization, Representative } from '@/types';
import { SCOPE_LABELS } from '@/types';
import { ContactActions } from '../ContactActions';
import { FreshnessBadge } from '../FreshnessBadge';
import styles from './RepresentativeCard.module.css';

export interface RepresentativeCardProps {
  representative: Representative;
  cityName: string;
  provinceName?: string;
  organization?: Organization;
  /** `full` incluye bio y acciones de contacto; `compact` es sólo la identidad. */
  variant?: 'full' | 'compact';
  /** El nombre enlaza a la ficha del referente. */
  linkToProfile?: boolean;
}

/**
 * Tarjeta de referente. Es la unidad de información que se repite en el panel
 * del mapa, en la ficha de ciudad y en el listado general.
 */
export const RepresentativeCard = ({
  representative,
  cityName,
  provinceName,
  organization,
  variant = 'full',
  linkToProfile = true,
}: RepresentativeCardProps) => {
  const fullName = `${representative.firstName} ${representative.lastName}`;

  return (
    <Card
      padding="md"
      className={[styles.card, representative.isActive ? null : styles.inactive]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles.header}>
        <Avatar
          firstName={representative.firstName}
          lastName={representative.lastName}
          photoUrl={representative.photoUrl}
          size={variant === 'full' ? 'md' : 'sm'}
        />
        <div className={styles.identity}>
          <h3 className={styles.name}>
            {linkToProfile ? (
              <Link to={ROUTES.representative(representative.slug)}>{fullName}</Link>
            ) : (
              fullName
            )}
          </h3>
          <p className={styles.role}>{representative.role}</p>
        </div>
      </div>

      <div className={styles.meta}>
        <span className={styles.location}>
          <Icon name="pin" size={16} />
          {cityName}
          {provinceName && provinceName !== cityName ? `, ${provinceName}` : ''}
        </span>
        <Badge tone={representative.scope === 'local' ? 'neutral' : 'accent'}>
          {SCOPE_LABELS[representative.scope]}
        </Badge>
        {!representative.isActive && <Badge tone="danger">Inactivo</Badge>}
      </div>

      {variant === 'full' && representative.bio && (
        <p className={styles.bio}>{representative.bio}</p>
      )}

      {variant === 'full' && organization && (
        <span className={styles.organization}>
          <Icon name="building" size={16} />
          {organization.name}
        </span>
      )}

      <FreshnessBadge lastVerifiedAt={representative.lastVerifiedAt} />

      {variant === 'full' && (
        <ContactActions
          contact={representative.contact}
          representativeName={representative.firstName}
          cityName={cityName}
          layout="hero"
        />
      )}
    </Card>
  );
};
