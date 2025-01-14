import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import React, { useEffect } from 'react';
import { GeoJSON } from 'react-leaflet';

import AccordionModalSkeleton from '@/components/Accordions/AccordionModalSkeleton';
import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { useRegionIpcDataQuery } from '@/domain/hooks/countryHooks';
import IpcCountryChoroplethProps from '@/domain/props/IpcCountryChoroplethProps';
import { IpcChoroplethOperations } from '@/operations/map/IpcChoroplethOperations';

import CountryLoadingLayer from '../CountryLoading';

function IpcCountryChoropleth({ countryMapData, onDataUnavailable }: IpcCountryChoroplethProps) {
  const { selectedCountryId } = useSelectedCountryId();
  const { data: regionIpcData, isLoading } = useRegionIpcDataQuery(selectedCountryId!);

  useEffect(() => {
    if (regionIpcData && !regionIpcData.features.some((feature) => feature.properties?.ipcPhase !== undefined)) {
      onDataUnavailable();
    }
  }, [regionIpcData]);

  /**
   * Handle feature events for country polygons.
   * This will highlight the country and show the IPC phase information.
   * @param feature GeoJSON feature object
   * @param layer Leaflet layer object
   */
  const handleCountryFeature = (feature: Feature<Geometry, GeoJsonProperties>, layer: L.Layer) => {
    IpcChoroplethOperations.attachEventsRegion(feature, layer);
  };

  return isLoading || !regionIpcData ? (
    <>
      <CountryLoadingLayer
        countryMapData={
          {
            type: 'FeatureCollection',
            features: countryMapData.features.filter((feature) => feature?.properties?.adm0_id === selectedCountryId),
          } as FeatureCollection<Geometry, GeoJsonProperties>
        }
        color="hsl(var(--nextui-ipcAnimation))"
      />
      <AccordionModalSkeleton />
    </>
  ) : (
    <GeoJSON
      style={IpcChoroplethOperations.ipcCountryStyle}
      data={regionIpcData as FeatureCollection}
      onEachFeature={handleCountryFeature}
    />
  );
}

export default IpcCountryChoropleth;
