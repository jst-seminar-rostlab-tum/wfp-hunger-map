import 'mapbox-gl/dist/mapbox-gl.css';

import { LeafletContextInterface, useLeafletContext } from '@react-leaflet/core';
import mapboxgl, { Popup } from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useTheme } from 'next-themes';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useMap } from 'react-leaflet';

import { useSelectedAlert } from '@/domain/contexts/SelectedAlertContext';
import { useSelectedCountry } from '@/domain/contexts/SelectedCountryContext';
import { useSelectedMap } from '@/domain/contexts/SelectedMapContext';
import { useSelectedMapVisibility } from '@/domain/contexts/SelectedMapVisibilityContext';
import VectorTileLayerProps from '@/domain/props/VectorTileLayerProps.ts';
import { MapOperations } from '@/operations/map/MapOperations';

export default function VectorTileLayer({
  countries,
  disputedAreas,
  ipcData,
  nutritionData,
  setCountryData,
  setCountryIso3Data,
  setRegionData,
  setRegionNutritionData,
  setCountryDataLoading,
}: VectorTileLayerProps) {
  const { theme } = useTheme();
  const context: LeafletContextInterface = useLeafletContext();
  const mapContainer: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const { selectedMapType } = useSelectedMap();
  const { selectedCountry, setSelectedCountry } = useSelectedCountry();
  const { setIsAlertsDisplayDisabled } = useSelectedAlert();
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const leafletMap = useMap();
  const [map, setMap] = useState<mapboxgl.Map>();
  const [popup, setPopup] = useState<Popup>();
  const { selectedMapVisibility, setSelectedMapVisibility } = useSelectedMapVisibility();

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

  useEffect(() => {
    const baseMap: mapboxgl.Map = MapOperations.createMapboxMap(
      theme === 'dark',
      { countries, disputedAreas, ipcData, selectedMapType, nutritionData },
      mapContainer
    );
    baseMap.on('load', () => setMap(baseMap));
    mapRef.current = baseMap;

    const popover = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });
    baseMap.on('load', () => {
      setMap(baseMap);
      setPopup(popover);
    });
    MapOperations.setMapInteractionFunctionality(
      baseMap,
      popover,
      setSelectedCountry,
      countries,
      setSelectedMapVisibility,
      setCountryData,
      setCountryIso3Data,
      setRegionData,
      setRegionNutritionData,
      setCountryDataLoading
    );
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

  useEffect(() => {
    if (selectedCountry && map) {
      MapOperations.zoomToCountry(map, selectedCountry, leafletMap, mapContainer, context, setIsAlertsDisplayDisabled);
    }
  }, [selectedCountry]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%', zIndex: 2 }} />;
}
