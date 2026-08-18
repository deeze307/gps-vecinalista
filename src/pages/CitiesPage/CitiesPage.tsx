import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/atoms';
import { CityListItem, SearchField, StateMessage } from '@/components/molecules';
import { ContentTemplate } from '@/components/templates';
import { ROUTES } from '@/config/routes';
import { useCities, useDebouncedValue, useProvinces } from '@/hooks';
import shared from '../shared.module.css';

/** Listado completo de ciudades, con filtro por provincia. */
export const CitiesPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [provinceId, setProvinceId] = useState<string | undefined>();

  const debouncedSearch = useDebouncedValue(search);
  const filters = useMemo(
    () => ({ search: debouncedSearch, provinceId }),
    [debouncedSearch, provinceId],
  );

  const { data: cities, isLoading, error } = useCities(filters);
  const { data: provinces } = useProvinces();

  return (
    <ContentTemplate
      eyebrow="Directorio"
      title="Ciudades de la red"
      description="Todas las ciudades donde la red tiene presencia. Entrá a una ficha para ver sus referentes, organizaciones y datos de contacto."
    >
      <div className={shared.toolbar}>
        <div className={shared.toolbarSearch}>
          <SearchField
            value={search}
            onChange={setSearch}
            placeholder="Buscar ciudad o provincia…"
          />
        </div>
      </div>

      <div className={`${shared.filters} ${shared.section}`} role="group" aria-label="Filtrar por provincia">
        <button
          type="button"
          className={[shared.chip, provinceId ? null : shared.chipActive].filter(Boolean).join(' ')}
          onClick={() => setProvinceId(undefined)}
        >
          Todas
        </button>
        {(provinces ?? []).map((province) => (
          <button
            key={province.id}
            type="button"
            className={[shared.chip, provinceId === province.id ? shared.chipActive : null]
              .filter(Boolean)
              .join(' ')}
            onClick={() => setProvinceId(province.id)}
          >
            {province.name}
          </button>
        ))}
      </div>

      <div className={shared.section}>
        {isLoading && <Spinner centered label="Cargando ciudades…" />}

        {!isLoading && error && (
          <StateMessage tone="error" title="No pudimos cargar las ciudades" description={error} />
        )}

        {!isLoading && !error && cities?.length === 0 && (
          <StateMessage
            title="Sin resultados"
            description="Probá con otro nombre o sacá el filtro de provincia."
          />
        )}

        {!isLoading && !error && cities && cities.length > 0 && (
          <ul className={shared.list}>
            {cities.map((city) => (
              <li key={city.id}>
                <CityListItem
                  city={city}
                  onSelect={() => navigate(ROUTES.city(city.slug))}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </ContentTemplate>
  );
};
