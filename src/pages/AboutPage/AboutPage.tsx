import { Card } from '@/components/atoms';
import { StatList } from '@/components/molecules';
import { ContentTemplate } from '@/components/templates';
import { useNetworkStats } from '@/hooks';
import shared from '../shared.module.css';

/** Qué es la red y cómo se mantiene actualizada la información. */
export const AboutPage = () => {
  const { data: stats } = useNetworkStats();

  return (
    <ContentTemplate
      eyebrow="La red"
      title="La red de contactos de la comunidad vecinalista"
      description="GPS Vecinalista existe para resolver una pregunta concreta: si viajás a otra ciudad, quién es el referente de la red ahí y cómo lo contactás."
    >
      {stats && (
        <StatList
          onLight
          stats={[
            { value: stats.cities, label: 'ciudades' },
            { value: stats.representatives, label: 'referentes' },
            { value: stats.provinces, label: 'provincias' },
          ]}
        />
      )}

      <div className={`${shared.cardsGrid} ${shared.section}`}>
        <Card padding="lg">
          <h2 className={shared.sectionTitle}>Mapa y buscador</h2>
          <p className={shared.muted}>
            El mapa es la puerta de entrada, pero no la única: podés buscar por ciudad o
            provincia, o pedirle al sitio que te muestre los referentes más cercanos a donde
            estás.
          </p>
        </Card>

        <Card padding="lg">
          <h2 className={shared.sectionTitle}>Contacto directo</h2>
          <p className={shared.muted}>
            Cada ficha tiene un botón grande de WhatsApp con un mensaje ya escrito. La idea es
            resolver el contacto en diez segundos desde el celular, sin llenar formularios.
          </p>
        </Card>

        <Card padding="lg">
          <h2 className={shared.sectionTitle}>Datos que no envejecen</h2>
          <p className={shared.muted}>
            Cada referente mantiene su propio perfil y el sitio muestra cuándo fue la última
            actualización. Si un contacto lleva más de seis meses sin confirmarse, queda marcado
            en rojo.
          </p>
        </Card>
      </div>
    </ContentTemplate>
  );
};
