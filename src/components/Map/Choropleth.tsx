import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import L, { PathOptions } from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';

import container from '@/container';
import { CountryData } from '@/domain/entities/country/CountryData';
import CountryRepository from '@/domain/repositories/CountryRepository';
import { cardsWrapperClass } from '@/utils/primitives';

import CustomAccordion from '../Accordions/Accordion';
import CustomCard from '../Cards/Card';

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

  const handleCountryClick = async (feature: Feature<Geometry, GeoJsonProperties>, bounds: L.LatLngBounds) => {
    map.fitBounds(bounds);
    setSelectedCountryId(feature.properties?.adm0_id);
    // added
    if (feature.properties?.adm0_id) {
      try {
        const newCountryData = await container
          .resolve<CountryRepository>('CountryRepository')
          .getCountryData(feature.properties.adm0_id);
        setCountryData(newCountryData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onEachFeature = (feature: Feature<Geometry, GeoJsonProperties>, layer: L.Layer) => {
    const pathLayer = layer as L.Path; // Explicitly cast `layer` to `L.Path`

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
      {selectedCountryId && countryData && (
        <div className="absolute w-[350px] left-[108px] top-4 z-9999">
          <CustomAccordion
            items={[
              {
                title: 'Food Security',
                iconSrc: '/Images/InfoIcon.svg',
                content: (
                  <div className={cardsWrapperClass}>
                    <CustomCard
                      title="Population"
                      content={[
                        {
                          imageSrc: '/Images/Population.svg',
                          text: countryData?.population ? `${countryData.population.toFixed(2)} M` : 'N/A',
                          altText: 'Population Icon',
                        },
                      ]}
                    />
                    <CustomCard
                      title="People with insufficient food consumption"
                      content={[
                        {
                          imageSrc: '/Images/FoodConsumption.svg',
                          text: countryData?.fcs ? `${countryData.fcs.toFixed(2)} M` : 'N/A',
                          altText: 'Population Icon',
                        },
                        {
                          imageSrc: '/Images/ArrowRed.svg',
                          // TODO plus minus depending on the value
                          text: countryData?.fcsMinus1 ? `- ${countryData.fcsMinus1.toFixed(2)} M` : 'N/A',
                          timeText: '1 Months ago',
                          altText: 'Icon',
                        },
                        {
                          imageSrc: '/Images/ArrowGreen.svg',
                          text: countryData?.fcsMinus3 ? `- ${countryData.fcsMinus3.toFixed(2)} M` : 'N/A',
                          timeText: '3 Month ago',
                          altText: 'Other Icon',
                        },
                      ]}
                    />
                  </div>
                ),
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}

export default Choropleth;
