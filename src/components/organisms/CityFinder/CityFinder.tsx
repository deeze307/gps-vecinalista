import { Button, Icon, Spinner } from '@/components/atoms';
import { CityListItem, SearchField, StateMessage } from '@/components/molecules';
import type { CityWithDistance, CityWithRelations } from '@/types';
import styles from './CityFinder.module.css';

export interface CityFinderProps {
  search: string;
  onSearchChange: (value: string) => void;
  cities: CityWithRelations[];
  isLoading: boolean;
  error: string | null;
  selectedCityId?: string | null;
  onSelectCity: (city: CityWithRelations) => void;

  /** Bloque "Referentes cerca mío". */
  nearby: CityWithDistance[] | null;
  isLocating: boolean;
  locationError: string | null;
  onRequestLocation: () => void;
  onClearNearby: () => void;
}

/**
 * Panel de búsqueda: el otro camino de entrada además del mapa.
 * Muestra o bien los resultados de la búsqueda, o bien las ciudades más
 * cercanas cuando el usuario compartió su ubicación.
 */
export const CityFinder = ({
  search,
  onSearchChange,
  cities,
  isLoading,
  error,
  selectedCityId,
  onSelectCity,
  nearby,
  isLocating,
  locationError,
  onRequestLocation,
  onClearNearby,
}: CityFinderProps) => {
  const showingNearby = nearby !== null && search.trim() === '';
  const visibleCities: CityWithRelations[] = showingNearby ? nearby : cities;

  const distanceOf = (cityId: string): number | undefined =>
    showingNearby ? nearby?.find((city) => city.id === cityId)?.distanceKm : undefined;

  return (
    <section className={styles.finder} aria-label="Buscar ciudad">
      <div className={styles.intro}>
        <h2 className={styles.title}>¿A dónde vas?</h2>
        <SearchField value={search} onChange={onSearchChange} />
        <p className={styles.subtitle}>
          Buscá por ciudad o por provincia, o tocá un pin del mapa.
        </p>
        {showingNearby ? (
          <Button variant="ghost" size="sm" iconLeft="close" onClick={onClearNearby}>
            Dejar de ordenar por cercanía
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            iconLeft="target"
            onClick={onRequestLocation}
            disabled={isLocating}
          >
            {isLocating ? 'Buscando tu ubicación…' : 'Encontrar referentes cerca mío'}
          </Button>
        )}
      </div>

      {locationError && (
        <p className={styles.nearbyNotice}>
          <Icon name="alert" size={18} />
          {locationError}
        </p>
      )}

      <div className={styles.resultsHeader}>
        <span>
          <span className={styles.count}>{visibleCities.length}</span>{' '}
          {visibleCities.length === 1 ? 'ciudad' : 'ciudades'}
          {showingNearby ? ' cerca tuyo' : search ? ' encontradas' : ' con referentes'}
        </span>
      </div>

      {isLoading && <Spinner centered label="Buscando ciudades…" />}

      {!isLoading && error && (
        <StateMessage tone="error" title="No pudimos cargar las ciudades" description={error} />
      )}

      {!isLoading && !error && visibleCities.length === 0 && (
        <StateMessage
          title="No encontramos esa ciudad"
          description={
            showingNearby
              ? 'No hay referentes cargados cerca de tu ubicación. Probá buscando por nombre.'
              : `Todavía no hay referentes cargados para "${search}". Probá con otra ciudad o con el nombre de la provincia.`
          }
          action={
            <Button variant="outline" size="sm" onClick={() => onSearchChange('')}>
              Ver todas las ciudades
            </Button>
          }
        />
      )}

      {!isLoading && !error && visibleCities.length > 0 && (
        <ul className={styles.list}>
          {visibleCities.map((city) => (
            <li key={city.id}>
              <CityListItem
                city={city}
                onSelect={onSelectCity}
                selected={city.id === selectedCityId}
                distanceKm={distanceOf(city.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
