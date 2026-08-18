import { Avatar, Badge, Button } from '@/components/atoms';
import { FreshnessBadge } from '@/components/molecules';
import type { RepresentativeWithRelations } from '@/services';
import { SCOPE_LABELS } from '@/types';
import styles from './RepresentativeTable.module.css';

export interface RepresentativeTableProps {
  representatives: RepresentativeWithRelations[];
  onEdit: (representative: RepresentativeWithRelations) => void;
  onToggleActive: (representative: RepresentativeWithRelations) => void;
  onDelete: (representative: RepresentativeWithRelations) => void;
  busyId?: string | null;
}

/** Tabla del panel admin: alta, baja y edición de referentes. */
export const RepresentativeTable = ({
  representatives,
  onEdit,
  onToggleActive,
  onDelete,
  busyId,
}: RepresentativeTableProps) => (
  <div className={styles.wrapper}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col">Referente</th>
          <th scope="col">Ciudad</th>
          <th scope="col">Alcance</th>
          <th scope="col">Perfil</th>
          <th scope="col">Estado</th>
          <th scope="col">
            <span className="visually-hidden">Acciones</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {representatives.map((representative) => (
          <tr
            key={representative.id}
            className={representative.isActive ? undefined : styles.inactive}
          >
            <td>
              <div className={styles.person}>
                <Avatar
                  firstName={representative.firstName}
                  lastName={representative.lastName}
                  photoUrl={representative.photoUrl}
                  size="sm"
                />
                <div>
                  <div className={styles.name}>
                    {representative.firstName} {representative.lastName}
                  </div>
                  <div className={styles.role}>{representative.role}</div>
                </div>
              </div>
            </td>
            <td>{representative.city.name}</td>
            <td>
              <Badge tone={representative.scope === 'local' ? 'neutral' : 'accent'}>
                {SCOPE_LABELS[representative.scope]}
              </Badge>
            </td>
            <td>
              <FreshnessBadge lastVerifiedAt={representative.lastVerifiedAt} />
            </td>
            <td>
              <Badge tone={representative.isActive ? 'success' : 'danger'} withDot>
                {representative.isActive ? 'Activo' : 'Inactivo'}
              </Badge>
            </td>
            <td>
              <div className={styles.actions}>
                <Button
                  variant="ghost"
                  size="sm"
                  iconLeft="edit"
                  onClick={() => onEdit(representative)}
                >
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onToggleActive(representative)}
                  disabled={busyId === representative.id}
                >
                  {representative.isActive ? 'Dar de baja' : 'Reactivar'}
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  iconLeft="trash"
                  onClick={() => onDelete(representative)}
                  disabled={busyId === representative.id}
                >
                  <span className="visually-hidden">Eliminar</span>
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
