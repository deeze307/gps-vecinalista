import { useParams } from 'react-router-dom';
import { Badge, Card, Icon, Spinner } from '@/components/atoms';
import { RepresentativeCard, StateMessage } from '@/components/molecules';
import { ContentTemplate } from '@/components/templates';
import { ROUTES } from '@/config/routes';
import { useCity, useOrganizationsByCity } from '@/hooks';
import { ORGANIZATION_TYPE_LABELS } from '@/types';
import { formatNumber } from '@/utils';
import shared from '../shared.module.css';
import styles from './CityPage.module.css';

/** Ficha de ciudad: `/ciudades/:slug`, enlazable y compartible por WhatsApp. */
export const CityPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: city, isLoading, error } = useCity(slug);
  const { data: organizations } = useOrganizationsByCity(city?.id);

  if (isLoading) {
    return (
      <ContentTemplate title="Cargando ciudad…" backTo={ROUTES.cities} backLabel="Ciudades">
        <Spinner centered />
      </ContentTemplate>
    );
  }

  if (error || !city) {
    return (
      <ContentTemplate title="Ciudad no encontrada" backTo={ROUTES.cities} backLabel="Ciudades">
        <StateMessage
          tone="error"
          title="No encontramos esa ciudad"
          description={error ?? 'Revisá el enlace o volvé al listado de ciudades.'}
        />
      </ContentTemplate>
    );
  }

  return (
    <ContentTemplate
      backTo={ROUTES.cities}
      backLabel="Ciudades"
      eyebrow={
        <>
          <Icon name="pin" size={16} /> Provincia de {city.province.name}
        </>
      }
      title={city.name}
      description={`${city.representatives.length} ${
        city.representatives.length === 1 ? 'referente' : 'referentes'
      } de la red vecinalista en ${city.name}.`}
    >
      <div className={shared.split}>
        <div>
          <h2 className={shared.sectionTitle}>Referentes</h2>
          {city.representatives.length === 0 ? (
            <StateMessage
              icon="users"
              title="Todavía no hay referente asignado"
              description="Si conocés a alguien de la red en esta ciudad, avisale al equipo de administración."
            />
          ) : (
            <div className={shared.list}>
              {city.representatives.map((representative) => (
                <RepresentativeCard
                  key={representative.id}
                  representative={representative}
                  cityName={city.name}
                  provinceName={city.province.name}
                />
              ))}
            </div>
          )}
        </div>

        <aside className={styles.aside}>
          <Card padding="lg">
            <h2 className={shared.sectionTitle}>Datos de la ciudad</h2>
            <div className={styles.factList}>
              <div className={styles.fact}>
                <span>Provincia</span>
                <span className={styles.factValue}>{city.province.name}</span>
              </div>
              <div className={styles.fact}>
                <span>Región</span>
                <span className={styles.factValue}>{city.province.region}</span>
              </div>
              {city.population && (
                <div className={styles.fact}>
                  <span>Población</span>
                  <span className={styles.factValue}>{formatNumber(city.population)}</span>
                </div>
              )}
              <div className={styles.fact}>
                <span>Coordenadas</span>
                <span className={styles.factValue}>
                  {city.coordinates.lat.toFixed(3)}, {city.coordinates.lng.toFixed(3)}
                </span>
              </div>
            </div>
          </Card>

          <div>
            <h2 className={shared.sectionTitle}>Organizaciones</h2>
            {!organizations || organizations.length === 0 ? (
              <p className={shared.muted}>
                Todavía no hay organizaciones cargadas para esta ciudad.
              </p>
            ) : (
              <div className={shared.list}>
                {organizations.map((organization) => (
                  <Card key={organization.id} padding="md" className={styles.orgCard}>
                    <h3 className={styles.orgName}>{organization.name}</h3>
                    <Badge tone="neutral">{ORGANIZATION_TYPE_LABELS[organization.type]}</Badge>
                    {organization.address && (
                      <span className={styles.orgMeta}>
                        <Icon name="pin" size={16} />
                        {organization.address}
                      </span>
                    )}
                    {organization.email && (
                      <a className={styles.orgMeta} href={`mailto:${organization.email}`}>
                        <Icon name="mail" size={16} />
                        {organization.email}
                      </a>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </ContentTemplate>
  );
};
