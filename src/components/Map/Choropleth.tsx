import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import L, { PathOptions } from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';

import container from '@/container';
import { CountryData } from '@/domain/entities/country/CountryData';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data';
import CountryRepository from '@/domain/repositories/CountryRepository';

import FcsAccordion from './FcsAccordion';

interface ChoroplethProps {
  data: FeatureCollection<Geometry, GeoJsonProperties>;
  style: PathOptions;
  hoverStyle: PathOptions;
}

// FscChoropleth
function Choropleth({ data, style, hoverStyle }: ChoroplethProps) {
  const geoJsonRef = useRef<L.GeoJSON | null>(null);
  const map = useMap();
  const [selectedCountryId, setSelectedCountryId] = useState<number | undefined>();
  const [countryData, setCountryData] = useState<CountryData | undefined>();
  const [countryIso3Data, setCountryIso3Data] = useState<CountryIso3Data | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleCountryClick = async (feature: Feature<Geometry, GeoJsonProperties>, bounds: L.LatLngBounds) => {
    map.fitBounds(bounds);
    setSelectedCountryId(feature.properties?.adm0_id);
    setLoading(true);
    if (feature.properties?.adm0_id) {
      try {
        const newCountryData = await container
          .resolve<CountryRepository>('CountryRepository')
          .getCountryData(feature.properties.adm0_id);
        setCountryData(newCountryData);
        const newCountryIso3Data = await container
          .resolve<CountryRepository>('CountryRepository')
          .getCountryIso3Data(feature.properties.iso3);
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
      mouseover: () => {
        pathLayer.setStyle(hoverStyle);
      },
      mouseout: () => {
        pathLayer.setStyle(style);
      },
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
      {/* {selectedCountryId && (
                <FscCountryChoropleth
                    data={data}
                    style={style}
                    hoverStyle={hoverStyle}
                    selectedCountryId={selectedCountryId}
                />
            )} */}
      {selectedCountryId && (
        <FcsAccordion countryData={countryData} countryIso3Data={countryIso3Data} loading={loading} />
      )}
    </div>
  );
}

export default Choropleth;
