import { useCallback, useEffect, useMemo, useRef } from 'react';
import type { Map as LeafletMap } from 'leaflet';
import { MapContainer, Marker, TileLayer, Tooltip, useMap } from 'react-leaflet';
import { MapZoomControls } from '@/components/molecules';
import { ARGENTINA_BOUNDS, ARGENTINA_CENTER, MAP_ZOOM, TILE_LAYER } from '@/config/map.config';
import type { CityWithRelations, LatLng } from '@/types';
import { cityPinIcon, userLocationIcon } from './pinIcon';
import styles from './ArgentinaMap.module.css';

/** Expone la instancia de Leaflet al componente padre sin sacarla del árbol React. */
const MapBridge = ({ onReady }: { onReady: (map: LeafletMap) => void }) => {
  const map = useMap();
  useEffect(() => {
    onReady(map);
  }, [map, onReady]);
  return null;
};

export interface ArgentinaMapProps {
  cities: CityWithRelations[];
  selectedCityId?: string | null;
  onSelectCity: (city: CityWithRelations) => void;
  /** Posición del usuario, si dio permiso de geolocalización. */
  userPosition?: LatLng | null;
  onRequestLocation?: () => void;
  isLocating?: boolean;
}

/**
 * El mapa: protagonista de la home, pero no el único camino.
 * Argentina en tono neutro y los pins en naranja, como define el concepto.
 */
export const ArgentinaMap = ({
  cities,
  selectedCityId,
  onSelectCity,
  userPosition,
  onRequestLocation,
  isLocating,
}: ArgentinaMapProps) => {
  const mapRef = useRef<LeafletMap | null>(null);

  const handleReady = useCallback((map: LeafletMap) => {
    mapRef.current = map;
  }, []);

  const selectedCity = useMemo(
    () => cities.find((city) => city.id === selectedCityId),
    [cities, selectedCityId],
  );

  // Al elegir una ciudad (desde el mapa o desde el buscador) volamos hacia ella.
  useEffect(() => {
    if (!selectedCity || !mapRef.current) return;
    mapRef.current.flyTo(
      [selectedCity.coordinates.lat, selectedCity.coordinates.lng],
      Math.max(mapRef.current.getZoom(), MAP_ZOOM.city),
      { duration: 0.8 },
    );
  }, [selectedCity]);

  // Cuando llega la ubicación del usuario, encuadramos su zona.
  useEffect(() => {
    if (!userPosition || !mapRef.current) return;
    mapRef.current.flyTo([userPosition.lat, userPosition.lng], 7, { duration: 0.8 });
  }, [userPosition]);

  const zoomBy = (delta: number) => {
    const map = mapRef.current;
    if (!map) return;
    map.setZoom(map.getZoom() + delta);
  };

  const resetView = () => {
    mapRef.current?.flyTo(ARGENTINA_CENTER, MAP_ZOOM.initial, { duration: 0.8 });
  };

  return (
    <div className={styles.wrapper}>
      <MapContainer
        className={styles.map}
        center={ARGENTINA_CENTER}
        zoom={MAP_ZOOM.initial}
        minZoom={MAP_ZOOM.min}
        maxZoom={MAP_ZOOM.max}
        maxBounds={ARGENTINA_BOUNDS}
        maxBoundsViscosity={0.7}
        zoomControl={false}
        attributionControl
        scrollWheelZoom
      >
        <MapBridge onReady={handleReady} />
        <TileLayer
          url={TILE_LAYER.url}
          attribution={TILE_LAYER.attribution}
          tms={TILE_LAYER.tms}
        />

        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.coordinates.lat, city.coordinates.lng]}
            icon={cityPinIcon(city.representatives.length, city.id === selectedCityId)}
            eventHandlers={{ click: () => onSelectCity(city) }}
            keyboard
            alt={`${city.name}, ${city.province.name}`}
          >
            <Tooltip direction="top" offset={[0, -4]}>
              {city.name} · {city.representatives.length}{' '}
              {city.representatives.length === 1 ? 'referente' : 'referentes'}
            </Tooltip>
          </Marker>
        ))}

        {userPosition && (
          <Marker
            position={[userPosition.lat, userPosition.lng]}
            icon={userLocationIcon()}
            interactive={false}
            alt="Tu ubicación aproximada"
          />
        )}
      </MapContainer>

      <MapZoomControls
        onZoomIn={() => zoomBy(1)}
        onZoomOut={() => zoomBy(-1)}
        onReset={resetView}
        onLocate={onRequestLocation}
        isLocating={isLocating}
      />
    </div>
  );
};
