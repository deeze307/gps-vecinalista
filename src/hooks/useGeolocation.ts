import { useCallback, useState } from 'react';
import type { LatLng } from '@/types';

type GeolocationStatus = 'idle' | 'prompting' | 'granted' | 'denied' | 'unavailable';

interface GeolocationState {
  position: LatLng | null;
  status: GeolocationStatus;
  error: string | null;
}

const ERROR_MESSAGES: Record<number, string> = {
  1: 'Necesitamos tu permiso de ubicación para mostrarte los referentes más cercanos.',
  2: 'No pudimos obtener tu ubicación. Probá de nuevo o buscá tu ciudad a mano.',
  3: 'La búsqueda de ubicación tardó demasiado. Probá de nuevo.',
};

/**
 * Geolocalización del navegador para "Referentes cerca mío".
 * Sólo se pide el permiso cuando el usuario toca el botón, nunca al entrar.
 */
export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    position: null,
    status: 'idle',
    error: null,
  });

  const request = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setState({
        position: null,
        status: 'unavailable',
        error: 'Tu navegador no permite compartir la ubicación.',
      });
      return;
    }

    setState((prev) => ({ ...prev, status: 'prompting', error: null }));

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setState({
          position: { lat: coords.latitude, lng: coords.longitude },
          status: 'granted',
          error: null,
        });
      },
      (error) => {
        setState({
          position: null,
          status: error.code === error.PERMISSION_DENIED ? 'denied' : 'idle',
          error: ERROR_MESSAGES[error.code] ?? 'No pudimos obtener tu ubicación.',
        });
      },
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 300_000 },
    );
  }, []);

  const clear = useCallback(
    () => setState({ position: null, status: 'idle', error: null }),
    [],
  );

  return { ...state, request, clear, isLocating: state.status === 'prompting' };
}
