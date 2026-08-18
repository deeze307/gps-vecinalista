import { Badge, type BadgeTone } from '@/components/atoms';
import { freshnessOf, relativeTimeFrom, type Freshness } from '@/utils';

const TONE: Record<Freshness, BadgeTone> = {
  fresh: 'success',
  aging: 'warning',
  stale: 'danger',
};

const PREFIX: Record<Freshness, string> = {
  fresh: 'Perfil actualizado',
  aging: 'Actualizado',
  stale: 'Sin actualizar desde',
};

export interface FreshnessBadgeProps {
  /** ISO de la última verificación del referente. */
  lastVerifiedAt: string;
}

/**
 * Semáforo de frescura del contacto.
 * Ataca el problema clásico de estos directorios: datos viejos que nadie sabe
 * si siguen sirviendo. Verde ≤3 meses, ámbar ≤6, rojo más allá.
 */
export const FreshnessBadge = ({ lastVerifiedAt }: FreshnessBadgeProps) => {
  const freshness = freshnessOf(lastVerifiedAt);

  return (
    <Badge tone={TONE[freshness]} withDot>
      {PREFIX[freshness]} {relativeTimeFrom(lastVerifiedAt)}
    </Badge>
  );
};
