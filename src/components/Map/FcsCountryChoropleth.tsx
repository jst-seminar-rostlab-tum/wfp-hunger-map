import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import L, { PathOptions } from 'leaflet';
import React, { useEffect, useRef } from 'react';
import { GeoJSON } from 'react-leaflet';

import { useCountryDataQuery } from '@/domain/hooks/countryHooks';
import { cardsWrapperClass } from '@/utils/primitives';

import CustomAccordion from '../Accordions/Accordion';
import CustomCard from '../Cards/Card';

interface FscCountryChoroplethProps {
  data: FeatureCollection<Geometry, GeoJsonProperties>;
  style: PathOptions;
  hoverStyle: PathOptions;
  selectedCountryId: number;
}

function FscCountryChoropleth({ data, style, hoverStyle, selectedCountryId }: FscCountryChoroplethProps) {
  const geoJsonRef = useRef<L.GeoJSON | null>(null);

  const { data: countryData, isPending } = useCountryDataQuery(selectedCountryId);

  const onEachFeature = (feature: Feature<Geometry, GeoJsonProperties>, layer: L.Layer) => {
    const pathLayer = layer as L.Path;

    pathLayer.on({
      mouseover: () => {
        pathLayer.setStyle(hoverStyle);
      },
      mouseout: () => {
        pathLayer.setStyle(style);
      },
      click: () => {},
    });
  };

  useEffect(() => {
    if (geoJsonRef.current) {
      geoJsonRef.current.clearLayers();
      geoJsonRef.current.addData(data);
    }
  }, [data]);

  useEffect(() => {
    if (countryData && !isPending) {
      console.log('Country data:', countryData);
    }
  }, [countryData, isPending]);

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
      <div className="absolute w-[350px] left-[108px] top-4 z-9999">
        <CustomAccordion
          loading={isPending}
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
    </div>
  );
}

export default FscCountryChoropleth;
