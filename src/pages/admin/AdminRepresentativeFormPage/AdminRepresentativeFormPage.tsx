import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '@/components/atoms';
import { StateMessage } from '@/components/molecules';
import { RepresentativeForm } from '@/components/organisms';
import { ROUTES } from '@/config/routes';
import { useCities, useOrganizations, useRepresentativeById } from '@/hooks';
import { isApiError, representativesService } from '@/services';
import type { RepresentativeCreateInput } from '@/types';
import styles from '../admin.module.css';

/** Alta y edición de referentes. La misma pantalla sirve para los dos casos. */
export const AdminRepresentativeFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isEditing = Boolean(id);
  const { data: representative, isLoading: isLoadingRepresentative } = useRepresentativeById(id);
  const { data: cities, isLoading: isLoadingCities } = useCities();
  const { data: organizations } = useOrganizations();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (values: RepresentativeCreateInput) => {
    setIsSubmitting(true);
    setFieldErrors({});
    setFormError(null);

    try {
      if (isEditing && id) {
        await representativesService.update(id, values);
      } else {
        await representativesService.create(values);
      }
      navigate(ROUTES.admin.representatives);
    } catch (error) {
      if (isApiError(error)) {
        setFieldErrors(error.details ?? {});
        setFormError(error.message);
      } else {
        setFormError('No pudimos guardar los cambios. Probá de nuevo.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingCities || (isEditing && isLoadingRepresentative)) {
    return <Spinner centered label="Cargando formulario…" />;
  }

  if (isEditing && !representative) {
    return (
      <StateMessage
        tone="error"
        title="No encontramos ese referente"
        description="Puede que lo hayan eliminado desde otra pestaña."
      />
    );
  }

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {isEditing
            ? `Editar a ${representative?.firstName} ${representative?.lastName}`
            : 'Nuevo referente'}
        </h2>
      </div>

      <RepresentativeForm
        representative={representative ?? undefined}
        cities={cities ?? []}
        organizations={organizations ?? []}
        isSubmitting={isSubmitting}
        fieldErrors={fieldErrors}
        formError={formError}
        onSubmit={handleSubmit}
        onCancel={() => navigate(ROUTES.admin.representatives)}
      />
    </>
  );
};
