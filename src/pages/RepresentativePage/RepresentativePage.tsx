import { useParams } from 'react-router-dom';
import { Avatar, Badge, Button, Card, Icon, Spinner } from '@/components/atoms';
import { ContactActions, FreshnessBadge, StateMessage } from '@/components/molecules';
import { ContentTemplate } from '@/components/templates';
import { ROUTES } from '@/config/routes';
import { useRepresentative } from '@/hooks';
import { SCOPE_LABELS } from '@/types';
import shared from '../shared.module.css';

/** Ficha individual del referente: `/referentes/:slug`. */
export const RepresentativePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: representative, isLoading, error } = useRepresentative(slug);

  if (isLoading) {
    return (
      <ContentTemplate title="Cargando referente…" backTo={ROUTES.representatives}>
        <Spinner centered />
      </ContentTemplate>
    );
  }

  if (error || !representative) {
    return (
      <ContentTemplate
        title="Referente no encontrado"
        backTo={ROUTES.representatives}
        backLabel="Referentes"
      >
        <StateMessage
          tone="error"
          title="No encontramos a esa persona"
          description={error ?? 'Puede que el enlace esté desactualizado.'}
        />
      </ContentTemplate>
    );
  }

  const fullName = `${representative.firstName} ${representative.lastName}`;

  return (
    <ContentTemplate
      backTo={ROUTES.representatives}
      backLabel="Referentes"
      eyebrow={
        <>
          <Icon name="pin" size={16} /> {representative.city.name}
        </>
      }
      title={fullName}
      description={representative.role}
    >
      <div className={shared.split}>
        <Card padding="lg">
          <div className={shared.list}>
            <Avatar
              firstName={representative.firstName}
              lastName={representative.lastName}
              photoUrl={representative.photoUrl}
              size="lg"
            />
            <div className={shared.filters}>
              <Badge tone="accent">{SCOPE_LABELS[representative.scope]}</Badge>
              {representative.organization && (
                <Badge tone="neutral">{representative.organization.name}</Badge>
              )}
              <FreshnessBadge lastVerifiedAt={representative.lastVerifiedAt} />
            </div>
            {representative.bio && <p>{representative.bio}</p>}
            <Button
              as="link"
              to={ROUTES.city(representative.city.slug)}
              variant="outline"
              size="sm"
              iconRight="chevronRight"
            >
              Ver la ficha de {representative.city.name}
            </Button>
          </div>
        </Card>

        <Card padding="lg">
          <h2 className={shared.sectionTitle}>Contacto</h2>
          <ContactActions
            contact={representative.contact}
            representativeName={representative.firstName}
            cityName={representative.city.name}
            layout="hero"
          />
        </Card>
      </div>
    </ContentTemplate>
  );
};
