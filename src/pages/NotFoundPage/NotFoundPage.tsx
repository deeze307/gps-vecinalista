import { Button } from '@/components/atoms';
import { StateMessage } from '@/components/molecules';
import { ContentTemplate } from '@/components/templates';
import { ROUTES } from '@/config/routes';

export const NotFoundPage = () => (
  <ContentTemplate title="Página no encontrada">
    <StateMessage
      icon="map"
      title="Esta página no existe"
      description="Puede que el enlace esté viejo o que la dirección tenga un error."
      action={
        <Button as="link" to={ROUTES.home} variant="primary" iconLeft="map">
          Volver al mapa
        </Button>
      }
    />
  </ContentTemplate>
);
