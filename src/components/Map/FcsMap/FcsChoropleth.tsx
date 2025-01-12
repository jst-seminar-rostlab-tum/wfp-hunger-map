import { Feature } from 'geojson';
import L from 'leaflet';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef } from 'react';
import { GeoJSON } from 'react-leaflet';

import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { CountryMapData } from '@/domain/entities/country/CountryMapData.ts';
import { LayerWithFeature } from '@/domain/entities/map/LayerWithFeature.ts';
import FcsChoroplethProps from '@/domain/props/FcsChoroplethProps';
import { AccessibilityOperations } from '@/operations/map/AccessibilityOperations';
import FcsChoroplethOperations from '@/operations/map/FcsChoroplethOperations';
import { MapOperations } from '@/operations/map/MapOperations';

import AccordionModalSkeleton from '../../Accordions/AccordionModalSkeleton';
import CountryLoadingLayer from '../CountryLoading';
import FcsAccordion from './FcsAccordion';
import FscCountryChoropleth from './FcsCountryChoropleth';

/** FcsChoropleth function returns a component that displays the fcs map for global view
 * @param {FcsChoroplethProps} props - The props of the component.
 * @param {FeatureCollection<Geometry, GeoJsonProperties>} props.data - The GeoJSON data of the country.
 * @param {string} props.countryId - The ID of the country.
 * @param {boolean} props.isLoadingCountry - The loading state of the country.
 * @param {FeatureCollection<Geometry, GeoJsonProperties>} props.regionData - The GeoJSON region data of the country.
 * @param {CountryData} props.countryData - The data of the country.
 * @param {CountryIso3Data} props.countryIso3Data - The ISO3 data of the country.
 * @param {string} props.selectedCountryName - The name of the selected country.
 * @param {Record<string, CountryFcsData>} props.fcsData - The FCS data of the country.
 * @param {FeatureCollection<Geometry, GeoJsonProperties>} props.regionLabelData - The GeoJSON region data used to label the region.
 * @param {(tooltips: (prevRegionLabelData: L.Tooltip[]) => L.Tooltip[]) => void} props.setRegionLabelTooltips - The function to set the region label tooltips.
 * @returns {JSX.Element} - The rendered FcsChoropleth component.
 */

export default function FcsChoropleth({
  data,
  countryId,
  isLoadingCountry,
  regionData,
  countryData,
  countryIso3Data,
  selectedCountryName,
  fcsData,
  regionLabelData,
  setRegionLabelTooltips,
}: FcsChoroplethProps): JSX.Element {
  const geoJsonRef = useRef<L.GeoJSON | null>(null);
  const { selectedCountryId, setSelectedCountryId } = useSelectedCountryId();
  const { theme } = useTheme();

  const handleBackClick = () => {
    setSelectedCountryId(null);
  };

  // adding the country name as a tooltip to each layer (on hover); the tooltip is not shown if the country is selected
  useEffect(() => {
    if (!geoJsonRef.current) return;
    geoJsonRef.current.eachLayer((layer: LayerWithFeature) => {
      if (!layer) return;
      const feature = layer.feature as Feature;
      if (FcsChoroplethOperations.checkIfActive(feature as CountryMapData, fcsData)) {
        const tooltipContainer = MapOperations.createCountryNameTooltipElement(feature?.properties?.adm0_name);
        layer.bindTooltip(tooltipContainer, { className: 'leaflet-tooltip', sticky: true });
      } else {
        layer.unbindTooltip();
      }
    });
  }, [selectedCountryId]);

  useEffect(() => {
    const geoJsonLayer = geoJsonRef.current;

    if (geoJsonLayer) {
      geoJsonLayer.eachLayer((layer) => {
        layer.on('add', AccessibilityOperations.addAriaLabelsAndStyles);
      });

      geoJsonLayer.on('layeradd', AccessibilityOperations.addAriaLabelsAndStyles);
      geoJsonLayer.on('moveend', AccessibilityOperations.addAriaLabelsAndStyles);
    }
  }, [geoJsonRef]);

  return (
    <div>
      {countryId !== selectedCountryId && (
        <GeoJSON
          ref={(instance) => {
            geoJsonRef.current = instance;
          }}
          data={data}
          style={FcsChoroplethOperations.countryStyle(data.features[0], theme === 'dark', fcsData)}
          onEachFeature={(feature, layer) =>
            FcsChoroplethOperations.onEachFeature(feature, layer, setSelectedCountryId, fcsData)
          }
        />
      )}
      {/* Animated GeoJSON layer for the selected country */}
      {selectedCountryId && (!regionData || !regionLabelData) && (
        <>
          <CountryLoadingLayer
            data={data}
            selectedCountryId={selectedCountryId}
            color="hsl(var(--nextui-fcsAnimation))"
          />
          <AccordionModalSkeleton />
        </>
      )}
      {countryId === selectedCountryId && (
        <FcsAccordion
          countryData={countryData}
          countryIso3Data={countryIso3Data}
          loading={isLoadingCountry}
          countryName={selectedCountryName}
        />
      )}
      {regionData && countryId === selectedCountryId && regionLabelData && (
        <FscCountryChoropleth
          regionData={regionData}
          handleBackButtonClick={handleBackClick}
          regionLabelData={regionLabelData}
          countryMapData={data.features[0] as CountryMapData}
          setRegionLabelTooltips={setRegionLabelTooltips}
        />
      )}
    </div>
  );
}
