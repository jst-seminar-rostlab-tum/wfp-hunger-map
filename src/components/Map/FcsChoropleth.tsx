import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';

import container from '@/container';
import { CountryData } from '@/domain/entities/country/CountryData';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data';
import FcsChoroplethProps from '@/domain/props/FcsChoroplethProps';
import CountryRepository from '@/domain/repositories/CountryRepository';

import FscCountryChoropleth from './FcsCountryChoropleth';

function FcsChoropleth({ data, style, countryId, selectedCountryId, setSelectedCountryId }: FcsChoroplethProps) {
  const geoJsonRef = useRef<L.GeoJSON | null>(null);
  const map = useMap();
  const [countryData, setCountryData] = useState<CountryData | undefined>();
  const [countryIso3Data, setCountryIso3Data] = useState<CountryIso3Data | undefined>();
  const [regionData, setRegionData] = useState<FeatureCollection<Geometry, GeoJsonProperties> | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleCountryClick = async (feature: Feature<Geometry, GeoJsonProperties>, bounds: L.LatLngBounds) => {
    map.fitBounds(bounds);
    setSelectedCountryId(feature.properties?.adm0_id);
    setLoading(true);
    if (feature.properties?.adm0_id) {
      const countryRepository = container.resolve<CountryRepository>('CountryRepository');
      try {
        const newRegionData = await countryRepository.getRegionData(feature.properties.adm0_id);
        if (newRegionData && newRegionData.features) {
          setRegionData({
            type: 'FeatureCollection',
            features: newRegionData.features as Feature<Geometry, GeoJsonProperties>[],
          });
        }
        const newCountryData = await countryRepository.getCountryData(feature.properties.adm0_id);
        setCountryData(newCountryData);
        const newCountryIso3Data = await countryRepository.getCountryIso3Data(feature.properties.iso3);
        setCountryIso3Data(newCountryIso3Data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onEachFeature = (feature: Feature<Geometry, GeoJsonProperties>, layer: L.Layer) => {
    const pathLayer = layer as L.Path;

    pathLayer.on({
      click: async () => {
        const bounds = (layer as L.GeoJSON).getBounds();
        handleCountryClick(feature, bounds);
      },
    });
  };

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
        onEachFeature={onEachFeature}
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

export default FcsChoropleth;
