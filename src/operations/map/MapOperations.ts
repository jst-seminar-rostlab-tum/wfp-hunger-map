import { LeafletContextInterface } from '@react-leaflet/core';
import { FeatureCollection } from 'geojson';
import mapboxgl, { DataDrivenPropertyValueSpecification } from 'mapbox-gl';
import { RefObject } from 'react';

import { CountryMapData } from '@/domain/entities/country/CountryMapData.ts';
import { MapColorsType } from '@/domain/entities/map/MapColorsType.ts';
import { MapProps } from '@/domain/props/MapProps';
import { getColors } from '@/styles/MapColors.ts';

import { IPCMapOperations } from '../IPC/IpcMapOperations';

export class MapOperations {
  static createMapboxMap(
    isDark: boolean,
    { countries, ipcData, selectedMapType }: MapProps,
    mapContainer: RefObject<HTMLDivElement>
  ): mapboxgl.Map {
    const mapColors: MapColorsType = getColors(isDark);

    const getCountryFillPaint = (): DataDrivenPropertyValueSpecification<string> => {
      switch (selectedMapType) {
        case 'ipc':
          return [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            mapColors.activeCountries,
            [
              'match',
              ['get', 'adm0_name'],
              ...Object.entries(IPCMapOperations.generateColorMap(ipcData!, countries!)).flat(),
              mapColors.activeCountries,
            ],
          ];
        // TODO add nutrition
        default:
          return [
            'case',
            ['boolean', ['coalesce', ['get', 'interactive'], false]],
            mapColors.activeCountries,
            mapColors.inactiveCountries,
          ];
      }
    };

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
              'fill-color': getCountryFillPaint(),
              'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.7, 1],
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
  }

  static setMapInteractionFunctionality(baseMap: mapboxgl.Map): void {
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
        // alert(`You clicked on ${(e.features[0] as unknown as CountryMapData).properties.adm0_name}`);
      }
    });
  }

  static synchronizeLeafletMapbox(
    baseMap: mapboxgl.Map,
    mapContainer: RefObject<HTMLDivElement>,
    context: LeafletContextInterface
  ): void {
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
  }
}
