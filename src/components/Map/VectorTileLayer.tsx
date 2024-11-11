import 'mapbox-gl/dist/mapbox-gl.css';

import { LeafletContextInterface, useLeafletContext } from '@react-leaflet/core';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useTheme } from 'next-themes';
import React, { RefObject, useEffect, useRef } from 'react';

import { createMapboxMap } from '@/components/Map/createMapboxMap.ts';
import { setGeneralMapBehavior } from '@/components/Map/setGeneralMapBehavior.ts';
import { setMapInteractionFunctionality } from '@/components/Map/setMapInteractionFunctionality.ts';
import { MapProps } from '@/domain/props/MapProps';

export default function VectorTileLayer({ countries, disputedAreas }: MapProps) {
  const context: LeafletContextInterface = useLeafletContext();
  const mapContainer: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const isDark: boolean = useTheme().theme === 'dark';

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

  useEffect(() => {
    const baseMap: mapboxgl.Map = createMapboxMap(isDark, { countries, disputedAreas }, mapContainer);
    setMapInteractionFunctionality(baseMap);
    setGeneralMapBehavior(baseMap, mapContainer, context);

    return () => {
      baseMap.remove();
      context.map.off('move');
    };
  }, [context, isDark]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%', zIndex: 2 }} />;
}
