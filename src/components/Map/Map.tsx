import 'leaflet/dist/leaflet.css';

import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import { MapContainer, ZoomControl } from 'react-leaflet';

import { useSidebar } from '@/domain/contexts/SidebarContext';
import { CountryMapData } from '@/domain/entities/country/CountryMapData';
import { GlobalInsight } from '@/domain/enums/GlobalInsight';
import { MapProps } from '@/domain/props/MapProps';

import { AlertContainer } from './Alerts/AlertContainer';
import Choropleth from './Choropleth';
import VectorTileLayer from './VectorTileLayer';

export default function Map({ countries, disputedAreas }: MapProps) {
  const { selectedMapType } = useSidebar();

  const onCountryClick = (countryMapData: CountryMapData) => {
    console.log('Country clicked:', countryMapData);
  };

  const countryStyle: L.PathOptions = {
    color: undefined,
    // weight: 1,
    // opacity: 1,
    // fillOpacity: 0.2,
    // fillColor: '#3388ff'
  };

  const countryHoverStyle: L.PathOptions = {
    color: undefined,
    // weight: 2,
    // opacity: 1,
    // fillOpacity: 0.4,
    // fillColor: '#0056b3'
  };

  return (
    <MapContainer
      center={[21.505, -0.09]}
      zoom={3}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
      minZoom={2}
      maxZoom={18}
      maxBoundsViscosity={1.0}
      zoomControl={false}
      style={{ height: '100%', width: '100%', zIndex: 1 }}
    >
      <AlertContainer />
      {countries && (
        <VectorTileLayer countries={countries} disputedAreas={disputedAreas} onCountryClick={onCountryClick} />
      )}
      {selectedMapType === GlobalInsight.FOOD &&
        countries.features
          .filter((countryData) => countryData.properties.interactive)
          .map((countryData) => (
            <Choropleth
              key={countryData.properties.adm0_id}
              data={{ type: 'FeatureCollection', features: [countryData as Feature<Geometry, GeoJsonProperties>] }}
              style={countryStyle}
              hoverStyle={countryHoverStyle}
            />
          ))}
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}
