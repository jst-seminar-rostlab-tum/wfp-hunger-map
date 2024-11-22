import 'mapbox-gl/dist/mapbox-gl.css';

import { LeafletContextInterface, useLeafletContext } from '@react-leaflet/core';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useTheme } from 'next-themes';
import React, { RefObject, useEffect, useRef, useState } from 'react';

import { useSelectedMap } from '@/domain/contexts/SelectedMapContext';
import { useSelectedMapVisibility } from '@/domain/contexts/SelectedMapVisibilityContext';
import { MapProps } from '@/domain/props/MapProps';
import { MapOperations } from '@/operations/map/MapOperations.ts';

export default function VectorTileLayer({ countries, disputedAreas }: MapProps) {
  const { theme } = useTheme();
  const context: LeafletContextInterface = useLeafletContext();
  const mapContainer: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const { selectedMapType } = useSelectedMap();
  const [map, setMap] = useState<mapboxgl.Map>();
  const { selectedMapVisibility } = useSelectedMapVisibility();

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

  useEffect(() => {
    const baseMap: mapboxgl.Map = MapOperations.createMapboxMap(
      theme === 'dark',
      { countries, disputedAreas },
      mapContainer
    );
    baseMap.on('load', () => setMap(baseMap));
    MapOperations.setMapInteractionFunctionality(baseMap);
    MapOperations.synchronizeLeafletMapbox(baseMap, mapContainer, context);
    // The following layers currently don't work due to CORS issues.
    MapOperations.initRainfallLayer(baseMap);
    MapOperations.initVegetationLayer(baseMap);
    MapOperations.initFCSLayer(baseMap);

    return () => {
      baseMap.remove();
      context.map.off('move');
      setMap(undefined);
    };
  }, [context]);

  useEffect(() => {
    if (map) {
      MapOperations.removeActiveMapLayer(map);
      MapOperations.addMapAsLayer(map, selectedMapType);
    }
  }, [map, selectedMapType]);

  useEffect(() => {
    if (map) {
      MapOperations.changeMapTheme(map, theme === 'dark');
    }
  }, [theme]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%', zIndex: 2 }} />;
}
