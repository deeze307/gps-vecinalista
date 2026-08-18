import { initials } from '@/utils';
import styles from './Avatar.module.css';

export interface AvatarProps {
  firstName: string;
  lastName: string;
  photoUrl?: string;
  size?: 'sm' | 'md' | 'lg';
}

/** Si no hay foto cargada, muestra las iniciales: nunca queda un hueco gris. */
export const Avatar = ({ firstName, lastName, photoUrl, size = 'md' }: AvatarProps) => {
  const fullName = `${firstName} ${lastName}`;

  return (
    <span className={[styles.avatar, styles[size]].join(' ')} title={fullName}>
      {photoUrl ? (
        <img className={styles.image} src={photoUrl} alt={fullName} loading="lazy" />
      ) : (
        <span aria-hidden="true">{initials(firstName, lastName)}</span>
      )}
    </span>
  );
};
