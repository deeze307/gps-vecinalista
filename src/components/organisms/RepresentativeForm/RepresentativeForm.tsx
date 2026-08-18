import { useState, type FormEvent } from 'react';
import { Button, SelectField, TextAreaField, TextField } from '@/components/atoms';
import type {
  City,
  Organization,
  Representative,
  RepresentativeCreateInput,
  RepresentativeScope,
} from '@/types';
import { REPRESENTATIVE_SCOPES, SCOPE_LABELS } from '@/types';
import styles from './RepresentativeForm.module.css';

export interface RepresentativeFormProps {
  /** Si viene, el formulario está en modo edición. */
  representative?: Representative;
  cities: City[];
  organizations: Organization[];
  isSubmitting?: boolean;
  /** Errores por campo devueltos por el service (422). */
  fieldErrors?: Record<string, string>;
  formError?: string | null;
  onSubmit: (values: RepresentativeCreateInput) => void;
  onCancel: () => void;
}

const emptyValues = (cityId: string): RepresentativeCreateInput => ({
  firstName: '',
  lastName: '',
  role: '',
  scope: 'local',
  cityId,
  isActive: true,
  contact: {},
});

const toFormValues = (representative: Representative): RepresentativeCreateInput => ({
  firstName: representative.firstName,
  lastName: representative.lastName,
  role: representative.role,
  scope: representative.scope,
  cityId: representative.cityId,
  organizationId: representative.organizationId,
  photoUrl: representative.photoUrl,
  bio: representative.bio,
  contact: representative.contact,
  isActive: representative.isActive,
  lastVerifiedAt: representative.lastVerifiedAt,
});

/**
 * Alta/edición de referente.
 * Es la misma pantalla que después usará cada referente para mantener sus
 * propios datos, que es lo que evita que el contacto quede viejo.
 */
export const RepresentativeForm = ({
  representative,
  cities,
  organizations,
  isSubmitting,
  fieldErrors = {},
  formError,
  onSubmit,
  onCancel,
}: RepresentativeFormProps) => {
  const [values, setValues] = useState<RepresentativeCreateInput>(() =>
    representative ? toFormValues(representative) : emptyValues(cities[0]?.id ?? ''),
  );

  const setField = <K extends keyof RepresentativeCreateInput>(
    key: K,
    value: RepresentativeCreateInput[K],
  ) => setValues((prev) => ({ ...prev, [key]: value }));

  const setContactField = (key: 'whatsapp' | 'phone' | 'email', value: string) =>
    setValues((prev) => ({ ...prev, contact: { ...prev.contact, [key]: value || undefined } }));

  const setSocialField = (key: 'facebook' | 'instagram' | 'website', value: string) =>
    setValues((prev) => ({
      ...prev,
      contact: { ...prev.contact, social: { ...prev.contact.social, [key]: value || undefined } },
    }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {formError && <p className={styles.formError}>{formError}</p>}

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Identidad</legend>
        <div className={styles.grid}>
          <TextField
            label="Nombre"
            required
            value={values.firstName}
            error={fieldErrors.firstName}
            onChange={(event) => setField('firstName', event.target.value)}
          />
          <TextField
            label="Apellido"
            required
            value={values.lastName}
            error={fieldErrors.lastName}
            onChange={(event) => setField('lastName', event.target.value)}
          />
          <TextField
            label="Cargo / rol"
            placeholder="Presidenta de la Asociación Vecinal Centro"
            className={styles.full}
            value={values.role}
            onChange={(event) => setField('role', event.target.value)}
          />
          <SelectField
            label="Alcance"
            value={values.scope}
            options={REPRESENTATIVE_SCOPES.map((scope) => ({
              value: scope,
              label: SCOPE_LABELS[scope],
            }))}
            onChange={(event) => setField('scope', event.target.value as RepresentativeScope)}
          />
          <SelectField
            label="Ciudad"
            required
            value={values.cityId}
            error={fieldErrors.cityId}
            options={cities.map((city) => ({ value: city.id, label: city.name }))}
            onChange={(event) => setField('cityId', event.target.value)}
          />
          <SelectField
            label="Organización"
            placeholder="Sin organización"
            value={values.organizationId ?? ''}
            error={fieldErrors.organizationId}
            options={organizations.map((org) => ({ value: org.id, label: org.name }))}
            onChange={(event) => setField('organizationId', event.target.value || undefined)}
          />
          <TextAreaField
            label="Descripción"
            className={styles.full}
            hint="Una o dos líneas sobre su trabajo en la red."
            value={values.bio ?? ''}
            onChange={(event) => setField('bio', event.target.value || undefined)}
          />
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Contacto</legend>
        <div className={styles.grid}>
          <TextField
            label="WhatsApp"
            placeholder="5493511234567"
            hint="Con código de país y área, sin espacios ni símbolos."
            inputMode="tel"
            value={values.contact.whatsapp ?? ''}
            error={fieldErrors.whatsapp}
            onChange={(event) => setContactField('whatsapp', event.target.value)}
          />
          <TextField
            label="Teléfono"
            placeholder="+54 351 555-0107"
            inputMode="tel"
            value={values.contact.phone ?? ''}
            onChange={(event) => setContactField('phone', event.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            inputMode="email"
            value={values.contact.email ?? ''}
            error={fieldErrors.email}
            onChange={(event) => setContactField('email', event.target.value)}
          />
          <TextField
            label="Facebook"
            placeholder="https://facebook.com/…"
            value={values.contact.social?.facebook ?? ''}
            onChange={(event) => setSocialField('facebook', event.target.value)}
          />
          <TextField
            label="Instagram"
            placeholder="https://instagram.com/…"
            value={values.contact.social?.instagram ?? ''}
            onChange={(event) => setSocialField('instagram', event.target.value)}
          />
          <TextField
            label="Sitio web"
            placeholder="https://…"
            value={values.contact.social?.website ?? ''}
            onChange={(event) => setSocialField('website', event.target.value)}
          />
        </div>
      </fieldset>

      <div className={styles.actions}>
        <Button variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" iconLeft="check" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando…' : representative ? 'Guardar cambios' : 'Crear referente'}
        </Button>
      </div>
    </form>
  );
};
