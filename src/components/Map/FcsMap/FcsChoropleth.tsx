import L from 'leaflet';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';

import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import FcsChoroplethProps from '@/domain/props/FcsChoroplethProps';
import { AccessibilityOperations } from '@/operations/map/AccessibilityOperations';
import FcsChoroplethOperations from '@/operations/map/FcsChoroplethOperations';
import { MapOperations } from '@/operations/map/MapOperations';

import FscCountryChoropleth from './FcsCountryChoropleth';

/** FcsChoropleth function returns a component that displays the fcs map for global view
 * @param {FcsChoroplethProps} props - The props of the component.
 * @param {FeatureCollection<Geometry, GeoJsonProperties>} props.data - The GeoJSON data of the country.
 * @param {string} props.countryId - The ID of the country.
 * @param {Record<string, CountryFcsData>} props.fcsData - The FCS data of the country.
 * @param {() => void} [props.onDataUnavailable] - A callback to signal to the parent component that there's no regional FCS data for this country
 * @returns {JSX.Element} - The rendered FcsChoropleth component.
 */

export default function FcsChoropleth({
  data,
  countryId,
  fcsData,
  onDataUnavailable,
}: FcsChoroplethProps): JSX.Element {
  const geoJsonRef = useRef<L.GeoJSON | null>(null);
  const { selectedCountryId, setSelectedCountryId } = useSelectedCountryId();
  const { theme } = useTheme();
  const map = useMap();

  // adding the country name as a tooltip to each layer (on hover); the tooltip is not shown if the country is selected
  useEffect(() => {
    if (!geoJsonRef.current || !map) return () => {};
    return MapOperations.handleCountryTooltip(geoJsonRef, map, fcsData);
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
    <>
      {/* hover or disabled layer */}
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

      {/* regions or loading layer */}
      {countryId === selectedCountryId && (
        <FscCountryChoropleth countryMapData={data} onDataUnavailable={onDataUnavailable} />
      )}
    </>
  );
}
