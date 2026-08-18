import { useId } from 'react';
import { Icon } from '@/components/atoms';
import styles from './SearchField.module.css';

export interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Etiqueta accesible; no se muestra si `placeholder` ya la explica. */
  label?: string;
  autoFocus?: boolean;
}

/** Buscador principal: "¿A qué ciudad estás viajando?" */
export const SearchField = ({
  value,
  onChange,
  placeholder = '¿A qué ciudad estás viajando?',
  label = 'Buscar ciudad o referente',
  autoFocus,
}: SearchFieldProps) => {
  const id = useId();

  return (
    <div className={styles.wrapper}>
      <label className="visually-hidden" htmlFor={id}>
        {label}
      </label>
      <Icon name="search" className={styles.icon} />
      <input
        id={id}
        className={styles.input}
        type="search"
        inputMode="search"
        autoComplete="off"
        autoFocus={autoFocus}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      {value && (
        <button
          type="button"
          className={styles.clear}
          onClick={() => onChange('')}
          aria-label="Borrar búsqueda"
        >
          <Icon name="close" size={18} />
        </button>
      )}
    </div>
  );
};
