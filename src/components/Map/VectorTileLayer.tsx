import 'mapbox-gl/dist/mapbox-gl.css';

import { LeafletContextInterface, useLeafletContext } from '@react-leaflet/core';
import mapboxgl, { Popup } from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useTheme } from 'next-themes';
import React, { RefObject, useEffect, useRef, useState } from 'react';

import { useSelectedMap } from '@/domain/contexts/SelectedMapContext';
import { useSelectedMapVisibility } from '@/domain/contexts/SelectedMapVisibilityContext';
import { MapProps } from '@/domain/props/MapProps';
import { MapOperations } from '@/operations/map/MapOperations';

export default function VectorTileLayer({ countries, disputedAreas, ipcData, nutritionData }: MapProps) {
  const { theme } = useTheme();
  const context: LeafletContextInterface = useLeafletContext();
  const mapContainer: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const { selectedMapType } = useSelectedMap();
  const [map, setMap] = useState<mapboxgl.Map>();
  const [popup, setPopup] = useState<Popup>();
  const { selectedMapVisibility } = useSelectedMapVisibility();

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

  useEffect(() => {
    const baseMap: mapboxgl.Map = MapOperations.createMapboxMap(
      theme === 'dark',
      { countries, disputedAreas, ipcData, selectedMapType, nutritionData },
      mapContainer
    );
    const popover = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });
    baseMap.on('load', () => {
      setMap(baseMap);
      setPopup(popover);
    });
    MapOperations.setMapInteractionFunctionality(baseMap, popover);
    MapOperations.synchronizeLeafletMapbox(baseMap, mapContainer, context);
    MapOperations.initDisputedLayer(baseMap);
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
    if (map && popup && selectedMapVisibility) {
      MapOperations.removeActiveMapLayer(map, theme === 'dark');
      MapOperations.addMapAsLayer(map, theme === 'dark', { countries, ipcData, selectedMapType, nutritionData }, popup);
    } else if (map && popup) {
      MapOperations.removeActiveMapLayer(map, theme === 'dark');
    }
  }, [map, selectedMapType, selectedMapVisibility]);

  useEffect(() => {
    if (map) {
      MapOperations.changeMapTheme(map, theme === 'dark');
    }
  }, [theme]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%', zIndex: 2 }} />;
}
