import { FeatureCollection } from 'geojson';
import mapboxgl from 'mapbox-gl';
import { RefObject } from 'react';

import { MapColorsType } from '@/domain/entities/map/MapColorsType.ts';
import { MapProps } from '@/domain/props/MapProps';
import { getColors } from '@/styles/MapColors.ts';

export const createMapboxMap = (
  isDark: boolean,
  { countries }: MapProps,
  mapContainer: RefObject<HTMLDivElement>
): mapboxgl.Map => {
  const mapColors: MapColorsType = getColors(isDark);

  return new mapboxgl.Map({
    container: mapContainer.current as unknown as string | HTMLElement,
    style: {
      version: 8,
      name: 'HungerMap LIVE',
      metadata: '{metadata}',
      sources: {
        countries: {
          type: 'geojson',
          data: countries as FeatureCollection,
          generateId: true,
        },
        mapboxStreets: {
          type: 'vector',
          url: 'mapbox://mapbox.mapbox-streets-v8',
        },
      },
      layers: [
        {
          id: 'ocean',
          type: 'background',
          paint: {
            'background-color': mapColors.ocean,
          },
        },
        {
          id: 'country-fills',
          type: 'fill',
          source: 'countries',
          layout: {},
          paint: {
            'fill-color': [
              'case',
              ['boolean', ['coalesce', ['get', 'interactive'], false]],
              mapColors.activeCountries,
              mapColors.inactiveCountries,
            ],
            'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0.5],
          },
        },
        {
          id: 'country-borders',
          type: 'line',
          source: 'countries',
          layout: {},
          paint: {
            'line-color': mapColors.outline,
            'line-width': 0.7,
          },
        },

        {
          id: 'mapbox-roads',
          type: 'line',
          source: 'mapboxStreets',
          'source-layer': 'road',
          filter: ['in', 'class', 'motorway', 'trunk'],
          paint: {
            'line-color': mapColors.roads,
            'line-width': ['interpolate', ['exponential', 1.5], ['zoom'], 5, 0.5, 18, 10],
          },
          minzoom: 5,
        },
      ],
    },
    interactive: false,
  });
};
