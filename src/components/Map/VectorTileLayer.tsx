import 'mapbox-gl/dist/mapbox-gl.css';

import { useLeafletContext } from '@react-leaflet/core';
import { FeatureCollection } from 'geojson';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useTheme } from 'next-themes';
import React, { useEffect, useRef } from 'react';

import { CountryMapData } from '@/domain/entities/country/CountryMapData.ts';
import { MapProps } from '@/domain/props/MapProps';

export default function VectorTileLayer({ countries }: MapProps) {
  const context = useLeafletContext();
  const mapContainer = useRef<HTMLDivElement>(null);

  const isDark: boolean = useTheme().theme === 'dark';
  const activeCountries: string = isDark ? '#6890a8' : '#c6d5d8';
  const inactiveCountries: string = isDark ? '#85929b' : '#a7b3ba';
  const ocean: string = isDark ? '#143b51' : '#83b9d7';
  const outline: string = isDark ? '#0e2a3a' : '#306f96';

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

  useEffect(() => {
    const baseMap = new mapboxgl.Map({
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
        },
        glyphs:
          'https://api.mapbox.com/styles/v1/mapbox/streets-v11/fonts/{fontstack}/{range}.pbf?access_token={accessToken}',
        layers: [
          {
            id: 'ocean',
            type: 'background',
            paint: {
              'background-color': ocean,
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
                activeCountries,
                inactiveCountries,
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
              'line-color': outline,
              'line-width': 1,
            },
          },
          // {
          //   id: 'land',
          //   source: 'hungermap',
          //   'source-layer': 'land',
          //   type: 'fill',
          //   paint: {
          //     'fill-color': 'hsl(192, 100%, 8%)',
          //   },
          // },
          // {
          //   id: 'water',
          //   source: 'hungermap',
          //   'source-layer': 'water',
          //   type: 'fill',
          //   paint: {
          //     'fill-color': 'hsl(195, 100%, 11%)',
          //   },
          // },
          // {
          //   id: 'roads_trunk',
          //   source: 'hungermap',
          //   'source-layer': 'roads_trunk',
          //   type: 'line',
          //   paint: {
          //     'line-color': 'hsl(0, 0%, 28%)',
          //     'line-width': {
          //       stops: [
          //         [4, 0],
          //         [6, 2],
          //       ],
          //       base: 2,
          //     },
          //   },
          // },
          // {
          //   id: 'roads_primary',
          //   source: 'hungermap',
          //   'source-layer': 'roads_primary',
          //   type: 'line',
          //   paint: {
          //     'line-color': 'hsl(0, 0%, 28%)',
          //     'line-width': {
          //       stops: [
          //         [6, 0],
          //         [8, 1],
          //       ],
          //       base: 2,
          //     },
          //   },
          // },
        ],
      },
      interactive: false,
    });

    let hoveredPolygonId: string | number | undefined;

    baseMap.on('mousemove', 'country-fills', (e) => {
      if (e.features && e.features.length > 0 && (e.features[0] as unknown as CountryMapData).properties.interactive) {
        if (hoveredPolygonId) {
          baseMap.setFeatureState({ source: 'countries', id: hoveredPolygonId }, { hover: false });
        }
        hoveredPolygonId = e.features[0].id;
        if (hoveredPolygonId) {
          baseMap.setFeatureState({ source: 'countries', id: hoveredPolygonId }, { hover: true });
        }
      }
    });

    baseMap.on('mouseleave', 'country-fills', () => {
      if (hoveredPolygonId) {
        baseMap.setFeatureState({ source: 'countries', id: hoveredPolygonId }, { hover: false });
      }
      hoveredPolygonId = undefined;
    });

    let isDragging = false;
    baseMap.on('mousedown', () => {
      isDragging = false;
    });

    baseMap.on('mousemove', () => {
      isDragging = true;
    });

    baseMap.on('mouseup', 'country-fills', (e) => {
      if (!isDragging && e.features && (e.features[0] as unknown as CountryMapData).properties.interactive) {
        alert(`You clicked on ${(e.features[0] as unknown as CountryMapData).properties.adm0_name}`);
      }
    });

    baseMap.dragRotate.disable();

    const syncZoom = () => {
      baseMap.setZoom(context.map.getZoom() - 1);
      baseMap.setMaxZoom(context.map.getMaxZoom() - 1);
      baseMap.setMinZoom(context.map.getMinZoom() - 1);
    };

    const container = context.layerContainer || context.map;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const leafletMap = container.getContainer();
    leafletMap.appendChild(mapContainer.current);

    baseMap.setZoom(context.map.getZoom());
    baseMap.setMaxZoom(context.map.getMaxZoom() - 1);
    baseMap.setMinZoom(context.map.getMinZoom() - 1);

    const { lat, lng } = context.map.getCenter();
    baseMap.setCenter([lng, lat]);
    baseMap.setZoom(context.map.getZoom() - 1);

    context.map.on('move', () => {
      const { lat: moveLat, lng: moveLng } = context.map.getCenter();
      baseMap.setCenter([moveLng, moveLat]);
      syncZoom();
    });

    context.map.on('zoom', () => {
      const { lat: zoomLat, lng: zoomLng } = context.map.getCenter();
      baseMap.setCenter([zoomLng, zoomLat]);
      syncZoom();
    });

    context.map.on('movestart', () => {
      const { lat: moveStartLat, lng: moveStartLng } = context.map.getCenter();
      baseMap.setCenter([moveStartLng, moveStartLat]);
      syncZoom();
    });

    context.map.on('zoomstart', () => {
      syncZoom();
    });

    context.map.on('moveend', () => {
      const { lat: moveEndLat, lng: moveEndLng } = context.map.getCenter();
      baseMap.setCenter([moveEndLng, moveEndLat]);
      syncZoom();
    });

    context.map.on('zoomend', () => {
      const { lat: zoomEndLat, lng: zoomEndLng } = context.map.getCenter();
      baseMap.setCenter([zoomEndLng, zoomEndLat]);
      syncZoom();
    });

    return () => {
      baseMap.remove();
      context.map.off('move');
    };
  }, [context, isDark]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%', zIndex: 2 }} />;
}
