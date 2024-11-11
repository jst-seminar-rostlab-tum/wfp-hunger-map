import 'mapbox-gl/dist/mapbox-gl.css';

import { LeafletContextInterface, useLeafletContext } from '@react-leaflet/core';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useTheme } from 'next-themes';
import React, { RefObject, useEffect, useRef } from 'react';

import { MapProps } from '@/domain/props/MapProps';
import { createMapboxMap } from '@/operations/map/createMapboxMap.ts';
import { setMapInteractionFunctionality } from '@/operations/map/setMapInteractionFunctionality.ts';
import { synchronizeLeafletMapbox } from '@/operations/map/synchronizeLeafletMapbox.ts';

export default function VectorTileLayer({ countries, disputedAreas }: MapProps) {
  const context: LeafletContextInterface = useLeafletContext();
  const mapContainer: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const isDark: boolean = useTheme().theme === 'dark';

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

  useEffect(() => {
    const baseMap: mapboxgl.Map = createMapboxMap(isDark, { countries, disputedAreas }, mapContainer);
    setMapInteractionFunctionality(baseMap);
    synchronizeLeafletMapbox(baseMap, mapContainer, context);

    return () => {
      baseMap.remove();
      context.map.off('move');
    };
  }, [context, isDark]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%', zIndex: 2 }} />;
}
