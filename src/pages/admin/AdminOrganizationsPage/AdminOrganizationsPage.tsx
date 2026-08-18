import { Badge, Spinner } from '@/components/atoms';
import { StateMessage } from '@/components/molecules';
import { useOrganizations } from '@/hooks';
import { ORGANIZATION_TYPE_LABELS } from '@/types';
import styles from '../admin.module.css';

/** Organizaciones y asociaciones de la red (sólo lectura por ahora). */
export const AdminOrganizationsPage = () => {
  const { data: organizations, isLoading, error } = useOrganizations();

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Organizaciones</h2>
        <Badge tone="outline">{organizations?.length ?? 0} cargadas</Badge>
      </div>

      {isLoading && <Spinner centered label="Cargando organizaciones…" />}

      {!isLoading && error && (
        <StateMessage tone="error" title="No pudimos cargar el listado" description={error} />
      )}

      {!isLoading && !error && organizations && (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Organización</th>
                <th scope="col">Tipo</th>
                <th scope="col">Ciudad</th>
                <th scope="col">Fundación</th>
                <th scope="col">Contacto</th>
              </tr>
            </thead>
            <tbody>
              {organizations.map((organization) => (
                <tr key={organization.id}>
                  <td>{organization.name}</td>
                  <td>
                    <Badge tone="neutral">{ORGANIZATION_TYPE_LABELS[organization.type]}</Badge>
                  </td>
                  <td>{organization.city?.name ?? '—'}</td>
                  <td>{organization.foundedYear ?? '—'}</td>
                  <td>{organization.email ?? organization.phone ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
