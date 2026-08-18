import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from '@/components/atoms';
import { SearchField, StateMessage } from '@/components/molecules';
import { RepresentativeTable } from '@/components/organisms';
import { ROUTES } from '@/config/routes';
import { useDebouncedValue, useRepresentatives } from '@/hooks';
import { representativesService, type RepresentativeWithRelations } from '@/services';
import shared from '../../shared.module.css';
import styles from '../admin.module.css';

/** Listado administrable de referentes: alta, baja lógica, edición y borrado. */
export const AdminRepresentativesPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const debouncedSearch = useDebouncedValue(search);
  const filters = useMemo(
    () => ({ search: debouncedSearch, includeInactive: true }),
    [debouncedSearch],
  );
  const { data: representatives, isLoading, error, refetch } = useRepresentatives(filters);

  const runAction = async (
    representative: RepresentativeWithRelations,
    action: () => Promise<unknown>,
    message: string,
  ) => {
    setBusyId(representative.id);
    try {
      await action();
      setNotice(message);
      refetch();
    } finally {
      setBusyId(null);
    }
  };

  const handleToggleActive = (representative: RepresentativeWithRelations) =>
    runAction(
      representative,
      () =>
        representative.isActive
          ? representativesService.deactivate(representative.id)
          : representativesService.activate(representative.id),
      `${representative.firstName} ${representative.lastName} quedó ${
        representative.isActive ? 'dado de baja' : 'activo'
      }.`,
    );

  const handleDelete = (representative: RepresentativeWithRelations) => {
    const fullName = `${representative.firstName} ${representative.lastName}`;
    if (!window.confirm(`¿Eliminar definitivamente a ${fullName}? Esta acción no se puede deshacer.`)) {
      return;
    }
    void runAction(
      representative,
      () => representativesService.remove(representative.id),
      `${fullName} fue eliminado.`,
    );
  };

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Referentes</h2>
        <Button as="link" to={ROUTES.admin.representativeNew} variant="primary" iconLeft="plus">
          Nuevo referente
        </Button>
      </div>

      {notice && <p className={styles.alert}>{notice}</p>}

      <div className={styles.toolbar}>
        <div className={styles.search}>
          <SearchField
            value={search}
            onChange={setSearch}
            placeholder="Buscar por nombre, rol o ciudad…"
          />
        </div>
      </div>

      {isLoading && <Spinner centered label="Cargando referentes…" />}

      {!isLoading && error && (
        <StateMessage tone="error" title="No pudimos cargar el listado" description={error} />
      )}

      {!isLoading && !error && representatives?.length === 0 && (
        <StateMessage
          icon="users"
          title="Sin resultados"
          description="No hay referentes que coincidan con esa búsqueda."
        />
      )}

      {!isLoading && !error && representatives && representatives.length > 0 && (
        <div className={shared.section}>
          <RepresentativeTable
            representatives={representatives}
            busyId={busyId}
            onEdit={(representative) =>
              navigate(ROUTES.admin.representativeEdit(representative.id))
            }
            onToggleActive={handleToggleActive}
            onDelete={handleDelete}
          />
        </div>
      )}
    </>
  );
};
