import 'leaflet/dist/leaflet.css';

import { Feature, FeatureCollection } from 'geojson';
import { LeafletMouseEvent } from 'leaflet';
import React, { useState } from 'react';
import { GeoJSON, MapContainer, TileLayer, ZoomControl } from 'react-leaflet';

import nutrition from '@/app/Nutrition/nutrition.json';
import NutritionChoropleth from '@/app/Nutrition/NutritionLayer';
import { CountryMapData } from '@/domain/entities/country/CountryMapData.ts';
import { MapProps } from '@/domain/props/MapProps';

import { Sidebar } from '../Sidebar/Sidebar';

export default function Map({ countries }: MapProps) {
  const [selectedMapType, setSelectedMapType] = useState<string | null>(null);
  const handleMapTypeChange = (mapType: string) => {
    setSelectedMapType(mapType);
  };
  const nutritionIso3cODES = new Set(nutrition.nutrition.map((item) => item.iso3));
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
    <>
      <Sidebar onMapTypeChange={handleMapTypeChange} />
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
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {countries && <GeoJSON data={countries as FeatureCollection} onEachFeature={onEachCountry} />}
        {selectedMapType === 'nutrition' &&
          countries.features
            .filter((c) => c.properties.interactive)
            .map((c) =>
              nutritionIso3cODES.has(c.properties.iso3) ? (
                <NutritionChoropleth
                  key={c.properties.adm0_id}
                  data={c}
                  selectedNutritionView="nutritionOverview"
                  view="nutritionOverview"
                  style={() => ({
                    color: '#fff',
                    weight: 1,
                    fillOpacity: 0.5,
                    fillColor: '#f5a524',
                  })}
                  handleClick={() => {}}
                  onEachFeature={(feature, layer) => {
                    layer.bindTooltip(feature.properties.adm0_name, { sticky: true });
                  }}
                  onFeatureMouseOver={() => {}}
                />
              ) : null
            )}
        <ZoomControl position="bottomright" />
      </MapContainer>
    </>
  );
}
