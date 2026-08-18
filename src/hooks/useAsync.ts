import { useCallback, useEffect, useRef, useState } from 'react';
import { isApiError } from '@/services';

export interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

const messageOf = (error: unknown): string => {
  if (isApiError(error)) return error.message;
  if (error instanceof Error) return error.message;
  return 'Ocurrió un error inesperado.';
};

/**
 * Hook base para consumir los services.
 * Encapsula loading/error y descarta respuestas de pedidos ya superados,
 * que es el bug clásico cuando el usuario tipea rápido en el buscador.
 *
 * Si el proyecto crece, este hook es el punto natural para reemplazar por
 * TanStack Query sin tocar los componentes.
 */
export function useAsync<T>(
  fetcher: () => Promise<T>,
  deps: React.DependencyList,
  options: { skip?: boolean } = {},
): AsyncState<T> & { refetch: () => void } {
  const { skip = false } = options;
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    isLoading: !skip,
    error: null,
  });
  const [nonce, setNonce] = useState(0);
  const requestId = useRef(0);

  const refetch = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    if (skip) {
      setState({ data: null, isLoading: false, error: null });
      return;
    }

    const currentRequest = ++requestId.current;
    let cancelled = false;

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    fetcher()
      .then((data) => {
        if (cancelled || currentRequest !== requestId.current) return;
        setState({ data, isLoading: false, error: null });
      })
      .catch((error: unknown) => {
        if (cancelled || currentRequest !== requestId.current) return;
        setState({ data: null, isLoading: false, error: messageOf(error) });
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, skip, nonce]);

  return { ...state, refetch };
}
