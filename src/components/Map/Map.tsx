import 'leaflet/dist/leaflet.css';

import { Feature, FeatureCollection } from 'geojson';
import { LeafletMouseEvent } from 'leaflet';
import { GeoJSON, MapContainer, ZoomControl } from 'react-leaflet';

import { CountryMapData } from '@/domain/entities/country/CountryMapData.ts';
import { MapProps } from '@/domain/props/MapProps';

import VectorTileLayer from './VectorTileLayer';

export default function Map({ countries }: MapProps) {
  const countryStyle: L.PathOptions = {
    fillColor: 'var(--color-active-countries)',
    weight: 0.5,
    color: 'var(--color-background)',
    fillOpacity: 0.4,
  };

  const highlightCountry = (event: LeafletMouseEvent) => {
    const layer = event.target;
    const countryData: CountryMapData = layer.feature as CountryMapData;
    if (countryData.properties.interactive) {
      layer.setStyle({
        fillColor: 'var(--color-hover)',
        fillOpacity: 0.8,
      });
    } else {
      layer.getElement().style.cursor = 'grab';
    }
  };

  const resetHighlight = (event: LeafletMouseEvent) => {
    const layer = event.target;
    const countryData: CountryMapData = layer.feature as CountryMapData;
    if (countryData.properties.interactive) {
      layer.setStyle(countryStyle);
    }
  };

  const onCountryClick = (event: LeafletMouseEvent) => {
    const countryData: CountryMapData = event.target.feature as CountryMapData;
    if (countryData.properties.interactive) {
      alert(`You clicked on ${countryData.properties.adm0_name}`);
    }
  };

  const onEachCountry = (country: Feature, layer: L.Layer) => {
    if ((layer as L.GeoJSON).feature) {
      const leafletLayer = layer as L.Path;
      leafletLayer.setStyle(countryStyle);
      if (!(country as CountryMapData).properties.interactive) {
        leafletLayer.setStyle({ fillColor: 'var(--color-inactive-countries)', fillOpacity: 0.85 });
      }
      leafletLayer.on({
        mouseover: highlightCountry,
        mouseout: resetHighlight,
        click: onCountryClick,
        mousedown: () => {
          const element = leafletLayer.getElement() as HTMLElement | null;
          if (element) element.style.cursor = 'grabbing';
        },
        mouseup: () => {
          const element = leafletLayer.getElement() as HTMLElement | null;
          if (element) element.style.cursor = 'grab';
        },
      });
    }
  };

  return (
    <MapContainer
      center={[21.505, -0.09]}
      zoom={3}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
      minZoom={3}
      maxZoom={8}
      maxBoundsViscosity={1.0}
      zoomControl={false}
      style={{ height: '100%', width: '100%', zIndex: 40 }}
    >
      <VectorTileLayer />
      {countries && <GeoJSON data={countries as FeatureCollection} onEachFeature={onEachCountry} />}
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}
