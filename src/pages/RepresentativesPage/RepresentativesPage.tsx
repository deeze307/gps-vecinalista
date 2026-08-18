import { useMemo, useState } from 'react';
import { Spinner } from '@/components/atoms';
import { RepresentativeCard, SearchField, StateMessage } from '@/components/molecules';
import { ContentTemplate } from '@/components/templates';
import { useDebouncedValue, useRepresentatives } from '@/hooks';
import { REPRESENTATIVE_SCOPES, SCOPE_LABELS, type RepresentativeScope } from '@/types';
import shared from '../shared.module.css';

/** Listado nacional de referentes, con búsqueda por nombre, rol o ciudad. */
export const RepresentativesPage = () => {
  const [search, setSearch] = useState('');
  const [scope, setScope] = useState<RepresentativeScope | undefined>();

  const debouncedSearch = useDebouncedValue(search);
  const filters = useMemo(() => ({ search: debouncedSearch, scope }), [debouncedSearch, scope]);
  const { data: representatives, isLoading, error } = useRepresentatives(filters);

  return (
    <ContentTemplate
      eyebrow="Directorio"
      title="Referentes de la red"
      description="Quién es quién en cada ciudad y provincia. Podés escribirle por WhatsApp directamente desde acá."
    >
      <div className={shared.toolbar}>
        <div className={shared.toolbarSearch}>
          <SearchField
            value={search}
            onChange={setSearch}
            placeholder="Buscar por nombre, rol o ciudad…"
          />
        </div>
        <div className={shared.filters} role="group" aria-label="Filtrar por alcance">
          <button
            type="button"
            className={[shared.chip, scope ? null : shared.chipActive].filter(Boolean).join(' ')}
            onClick={() => setScope(undefined)}
          >
            Todos
          </button>
          {REPRESENTATIVE_SCOPES.map((value) => (
            <button
              key={value}
              type="button"
              className={[shared.chip, scope === value ? shared.chipActive : null]
                .filter(Boolean)
                .join(' ')}
              onClick={() => setScope(value)}
            >
              {SCOPE_LABELS[value]}
            </button>
          ))}
        </div>
      </div>

      {isLoading && <Spinner centered label="Cargando referentes…" />}

      {!isLoading && error && (
        <StateMessage tone="error" title="No pudimos cargar los referentes" description={error} />
      )}

      {!isLoading && !error && representatives?.length === 0 && (
        <StateMessage
          icon="users"
          title="Sin resultados"
          description="Probá con otro nombre o quitá el filtro de alcance."
        />
      )}

      {!isLoading && !error && representatives && representatives.length > 0 && (
        <div className={shared.cardsGrid}>
          {representatives.map((representative) => (
            <RepresentativeCard
              key={representative.id}
              representative={representative}
              cityName={representative.city.name}
              organization={representative.organization}
            />
          ))}
        </div>
      )}
    </ContentTemplate>
  );
};
