import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import styles from './TextField.module.css';

interface FieldShellProps {
  id: string;
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

const FieldShell = ({ id, label, hint, error, required, children }: FieldShellProps) => (
  <div className={styles.field}>
    {label && (
      <label className={styles.label} htmlFor={id}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
    )}
    {children}
    {hint && !error && (
      <span className={styles.hint} id={`${id}-hint`}>
        {hint}
      </span>
    )}
    {error && (
      <span className={styles.error} id={`${id}-error`} role="alert">
        {error}
      </span>
    )}
  </div>
);

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label?: string;
  hint?: string;
  error?: string;
}

export const TextField = ({ label, hint, error, className, ...rest }: TextFieldProps) => {
  const id = useId();
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={rest.required}>
      <input
        id={id}
        className={[styles.control, error ? styles.invalid : null, className]
          .filter(Boolean)
          .join(' ')}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        {...rest}
      />
    </FieldShell>
  );
};

export interface TextAreaFieldProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  label?: string;
  hint?: string;
  error?: string;
}

export const TextAreaField = ({
  label,
  hint,
  error,
  className,
  ...rest
}: TextAreaFieldProps) => {
  const id = useId();
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={rest.required}>
      <textarea
        id={id}
        className={[styles.control, styles.textarea, error ? styles.invalid : null, className]
          .filter(Boolean)
          .join(' ')}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
    </FieldShell>
  );
};

export interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  label?: string;
  hint?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

export const SelectField = ({
  label,
  hint,
  error,
  options,
  placeholder,
  className,
  ...rest
}: SelectFieldProps) => {
  const id = useId();
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={rest.required}>
      <select
        id={id}
        className={[styles.control, error ? styles.invalid : null, className]
          .filter(Boolean)
          .join(' ')}
        aria-invalid={error ? true : undefined}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
};
