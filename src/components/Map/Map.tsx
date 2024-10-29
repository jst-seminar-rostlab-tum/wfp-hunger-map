'use client';

import 'leaflet/dist/leaflet.css';

import { FeatureCollection, GeoJsonObject } from 'geojson';
import { LeafletMouseEvent } from 'leaflet';
import { useState } from 'react';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';

import countries from '../../config/custom.geo.json';

export default function Map() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const countryStyle: L.PathOptions = {
    fillColor: '#157DBC',
    weight: 1,
    color: 'white',
    fillOpacity: 0.3,
  };
  const highlightCountry = (event: LeafletMouseEvent) => {
    const layer = event.target;
    layer.setStyle({
      fillColor: '#157DBC',
      fillOpacity: 0.8,
    });
    setHoveredCountry(layer.feature.properties.name);
    console.log(hoveredCountry);
  };
  const resetHighlight = (event: LeafletMouseEvent) => {
    const layer = event.target;
    layer.setStyle(countryStyle);
    setHoveredCountry(null);
  };
  const onCountryClick = (event: LeafletMouseEvent) => {
    const country = event.target.feature.properties.name;
    alert(`You clicked on ${country}`);
  };
  const onEachCountry = (country: GeoJsonObject, layer: L.Layer) => {
    if ((layer as L.GeoJSON).feature) {
      const leafletLayer = layer as L.Path;
      leafletLayer.setStyle(countryStyle);
      leafletLayer.on({
        mouseover: highlightCountry,
        mouseout: resetHighlight,
        click: onCountryClick,
      });
    }
  };

  return (
    <MapContainer center={[21.505, -0.09]} zoom={4} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {countries && <GeoJSON data={countries as FeatureCollection} onEachFeature={onEachCountry} />}
    </MapContainer>
  );
}
