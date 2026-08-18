import { useMemo, useState } from 'react';
import { Badge, Spinner } from '@/components/atoms';
import { SearchField, StateMessage } from '@/components/molecules';
import { useCities, useDebouncedValue } from '@/hooks';
import { formatNumber } from '@/utils';
import styles from '../admin.module.css';

/**
 * Ciudades cargadas en el sistema.
 * Por ahora es sólo lectura: el ABM de ciudades llega con el backend, porque
 * implica geocodificar coordenadas.
 */
export const AdminCitiesPage = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search);
  const filters = useMemo(() => ({ search: debouncedSearch }), [debouncedSearch]);
  const { data: cities, isLoading, error } = useCities(filters);

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Ciudades</h2>
        <Badge tone="outline">{cities?.length ?? 0} cargadas</Badge>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.search}>
          <SearchField value={search} onChange={setSearch} placeholder="Buscar ciudad…" />
        </div>
      </div>

      {isLoading && <Spinner centered label="Cargando ciudades…" />}

      {!isLoading && error && (
        <StateMessage tone="error" title="No pudimos cargar las ciudades" description={error} />
      )}

      {!isLoading && !error && cities && (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Ciudad</th>
                <th scope="col">Provincia</th>
                <th scope="col">Referentes</th>
                <th scope="col">Población</th>
                <th scope="col">Coordenadas</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city) => (
                <tr key={city.id}>
                  <td>{city.name}</td>
                  <td>{city.province.name}</td>
                  <td>
                    <Badge tone={city.representatives.length > 0 ? 'success' : 'warning'}>
                      {city.representatives.length}
                    </Badge>
                  </td>
                  <td>{city.population ? formatNumber(city.population) : '—'}</td>
                  <td>
                    {city.coordinates.lat.toFixed(4)}, {city.coordinates.lng.toFixed(4)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
