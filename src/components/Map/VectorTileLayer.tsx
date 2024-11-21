import 'mapbox-gl/dist/mapbox-gl.css';

import { LeafletContextInterface, useLeafletContext } from '@react-leaflet/core';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useTheme } from 'next-themes';
import React, { RefObject, useEffect, useRef } from 'react';

import { useSelectedMap } from '@/domain/contexts/SelectedMapContext';
import { useSelectedMapVisibility } from '@/domain/contexts/SelectedMapVisibilityContext';
import { MapProps } from '@/domain/props/MapProps';
import { MapOperations } from '@/operations/map/MapOperations.ts';

export default function VectorTileLayer({ countries, disputedAreas }: MapProps) {
  const { theme } = useTheme();
  const context: LeafletContextInterface = useLeafletContext();
  const mapContainer: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const { selectedMapType } = useSelectedMap();
  const { selectedMapVisibility } = useSelectedMapVisibility();

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

  useEffect(() => {
    const baseMap: mapboxgl.Map = MapOperations.createMapboxMap(
      theme === 'dark',
      { countries, disputedAreas },
      mapContainer
    );
    MapOperations.setMapInteractionFunctionality(baseMap);
    MapOperations.synchronizeLeafletMapbox(baseMap, mapContainer, context);
    // The following layers currently don't work due to CORS issues.
    MapOperations.addRainfallLayer(baseMap, selectedMapType, selectedMapVisibility);
    MapOperations.addVegetationLayer(baseMap, selectedMapType, selectedMapVisibility);
    MapOperations.addFCSLayer(baseMap, selectedMapType, selectedMapVisibility);

    return () => {
      baseMap.remove();
      context.map.off('move');
    };
  }, [context, theme, selectedMapType, selectedMapVisibility]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%', zIndex: 2 }} />;
}
