import 'mapbox-gl/dist/mapbox-gl.css';

import { LeafletContextInterface, useLeafletContext } from '@react-leaflet/core';
import mapboxgl from 'mapbox-gl';
import { useTheme } from 'next-themes';
import React, { RefObject, useEffect, useRef } from 'react';

import { useSelectedCountry } from '@/domain/contexts/SelectedCountryContext';
import { useSelectedMap } from '@/domain/contexts/SelectedMapContext';
import { MapProps } from '@/domain/props/MapProps';
import { MapOperations } from '@/operations/map/MapOperations';

export default function VectorTileLayer({ countries, disputedAreas }: MapProps) {
  const { theme } = useTheme();
  const context: LeafletContextInterface = useLeafletContext();
  const mapContainer: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const { selectedMapType } = useSelectedMap();
  const { selectedCountry, setSelectedCountry } = useSelectedCountry();
  const mapRef = useRef<mapboxgl.Map | null>(null);

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

  useEffect(() => {
    const baseMap: mapboxgl.Map = MapOperations.createMapboxMap(
      theme === 'dark',
      { countries, disputedAreas },
      mapContainer
    );
    mapRef.current = baseMap;

    MapOperations.setMapInteractionFunctionality(baseMap, setSelectedCountry);
    MapOperations.synchronizeLeafletMapbox(baseMap, mapContainer, context);

    return () => {
      baseMap.remove();
      context.map.off('move');
    };
  }, [context, theme, selectedMapType]);

  useEffect(() => {
    if (selectedCountry && mapRef.current) {
      MapOperations.zoomToCountry(mapRef.current, selectedCountry);
    }
  }, [selectedCountry]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%', zIndex: 2 }} />;
}
