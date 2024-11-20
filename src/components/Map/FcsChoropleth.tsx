import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';

import { CountryData } from '@/domain/entities/country/CountryData';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data';
import FcsChoroplethProps from '@/domain/props/FcsChoroplethProps';
import FcsChoroplethOperations from '@/operations/map/FcsChoroplethOperations';

import FscCountryChoropleth from './FcsCountryChoropleth';

export default function FcsChoropleth({
  data,
  style,
  countryId,
  selectedCountryId,
  setSelectedCountryId,
}: FcsChoroplethProps) {
  const geoJsonRef = useRef<L.GeoJSON | null>(null);
  const map = useMap();
  const [countryData, setCountryData] = useState<CountryData | undefined>();
  const [countryIso3Data, setCountryIso3Data] = useState<CountryIso3Data | undefined>();
  const [regionData, setRegionData] = useState<FeatureCollection<Geometry, GeoJsonProperties> | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (geoJsonRef.current) {
      geoJsonRef.current.clearLayers();
      geoJsonRef.current.addData(data);
    }
  }, [data]);

  return (
    <div>
      <GeoJSON
        ref={(instance) => {
          geoJsonRef.current = instance;
        }}
        data={data}
        style={() => style}
        onEachFeature={(feature, layer) =>
          FcsChoroplethOperations.onEachFeature(
            feature,
            layer,
            map,
            setSelectedCountryId,
            setLoading,
            setRegionData,
            setCountryData,
            setCountryIso3Data
          )
        }
      />
      {regionData && countryId === selectedCountryId && (
        <FscCountryChoropleth
          regionData={regionData}
          countryData={countryData}
          countryIso3Data={countryIso3Data}
          loading={loading}
        />
      )}
    </div>
  );
}
