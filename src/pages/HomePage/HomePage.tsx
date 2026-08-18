import { useMemo, useState } from 'react';
import { ArgentinaMap, CityDetailPanel, CityFinder } from '@/components/organisms';
import { MapExplorerTemplate } from '@/components/templates';
import { useCities, useDebouncedValue, useGeolocation, useNearbyCities } from '@/hooks';
import type { CityWithRelations } from '@/types';

/**
 * Home: el caso de uso completo en una pantalla.
 * "Estoy viajando a X → quién es el referente → cómo lo contacto", sin pasos
 * intermedios y resolviéndose igual desde el mapa o desde el buscador.
 */
export const HomePage = () => {
  const [search, setSearch] = useState('');
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);

  const debouncedSearch = useDebouncedValue(search);

  const filters = useMemo(
    () => ({ search: debouncedSearch, onlyWithRepresentatives: true }),
    [debouncedSearch],
  );
  const { data: cities, isLoading, error } = useCities(filters);

  const geolocation = useGeolocation();
  const { data: nearby } = useNearbyCities(geolocation.position, 6);

  // El mapa siempre muestra todas las ciudades filtradas; el panel puede
  // mostrar además el orden por cercanía.
  const visibleCities = cities ?? [];

  const selectedCity =
    visibleCities.find((city) => city.id === selectedCityId) ??
    nearby?.find((city) => city.id === selectedCityId) ??
    null;

  const handleSelectCity = (city: CityWithRelations) => setSelectedCityId(city.id);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (value) {
      geolocation.clear();
      setSelectedCityId(null);
    }
  };

  return (
    <MapExplorerTemplate
      map={
        <ArgentinaMap
          cities={visibleCities}
          selectedCityId={selectedCityId}
          onSelectCity={handleSelectCity}
          userPosition={geolocation.position}
          onRequestLocation={geolocation.request}
          isLocating={geolocation.isLocating}
        />
      }
      panel={
        selectedCity ? (
          <CityDetailPanel city={selectedCity} onClose={() => setSelectedCityId(null)} />
        ) : (
          <CityFinder
            search={search}
            onSearchChange={handleSearchChange}
            cities={visibleCities}
            isLoading={isLoading}
            error={error}
            selectedCityId={selectedCityId}
            onSelectCity={handleSelectCity}
            nearby={nearby}
            isLocating={geolocation.isLocating}
            locationError={geolocation.error}
            onRequestLocation={geolocation.request}
            onClearNearby={geolocation.clear}
          />
        )
      }
    />
  );
};
