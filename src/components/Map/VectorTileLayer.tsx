import 'mapbox-gl/dist/mapbox-gl.css';

import { LeafletContextInterface, useLeafletContext } from '@react-leaflet/core';
import mapboxgl from 'mapbox-gl';
import { useTheme } from 'next-themes';
import React, { RefObject, useEffect, useRef, useState } from 'react';

import { useSelectedMap } from '@/domain/contexts/SelectedMapContext';
import { useSelectedMapVisibility } from '@/domain/contexts/SelectedMapVisibilityContext';
import { VectorTileLayerProps } from '@/domain/props/VectorTileLayerProps';
import { MapboxMapOperations } from '@/operations/map/MapboxMapOperations';

export default function VectorTileLayer({ countries, disputedAreas }: VectorTileLayerProps) {
  const { theme } = useTheme();
  const context: LeafletContextInterface = useLeafletContext();
  const mapContainer: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const { selectedMapType } = useSelectedMap();
  const [map, setMap] = useState<mapboxgl.Map>();
  const { selectedMapVisibility } = useSelectedMapVisibility();

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

  useEffect(() => {
    const baseMap: mapboxgl.Map = MapboxMapOperations.createMapboxMap(
      theme === 'dark',
      { countries, disputedAreas },
      mapContainer
    );
    baseMap.on('load', () => {
      setMap(baseMap);
    });

    MapboxMapOperations.synchronizeLeafletMapbox(baseMap, mapContainer, context);
    MapboxMapOperations.initDisputedLayer(baseMap);
    // The following layers currently don't work due to CORS issues.
    MapboxMapOperations.initRainfallLayer(baseMap);
    MapboxMapOperations.initVegetationLayer(baseMap);
    MapboxMapOperations.initFCSLayer(baseMap);

    return () => {
      baseMap.remove();
      context.map.off('move');
      setMap(undefined);
    };
  }, [context]);

  useEffect(() => {
    if (map && selectedMapVisibility) {
      MapboxMapOperations.removeActiveMapLayer(map, theme === 'dark');
      MapboxMapOperations.addMapAsLayer(map, selectedMapType);
    } else if (map) {
      MapboxMapOperations.removeActiveMapLayer(map, theme === 'dark');
    }
  }, [map, selectedMapType, selectedMapVisibility]);

  useEffect(() => {
    if (map) {
      MapboxMapOperations.changeMapTheme(map, theme === 'dark');
    }
  }, [theme]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%', zIndex: 2 }} />;
}
