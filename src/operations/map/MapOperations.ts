import { LeafletContextInterface } from '@react-leaflet/core';
import * as turf from '@turf/turf';
import { FeatureCollection } from 'geojson';
import mapboxgl from 'mapbox-gl';
import { RefObject } from 'react';

import container from '@/container';
import { CountryMapData } from '@/domain/entities/country/CountryMapData.ts';
import { SelectedCountry } from '@/domain/entities/country/SelectedCountry';
import { MapColorsType } from '@/domain/entities/map/MapColorsType.ts';
import { GlobalInsight } from '@/domain/enums/GlobalInsight.ts';
import { MapProps } from '@/domain/props/MapProps';
import CountryRepository from '@/domain/repositories/CountryRepository';
import { getColors } from '@/styles/MapColors.ts';

export class MapOperations {
  static countryRepository: CountryRepository = container.resolve<CountryRepository>('CountryRepository');

  static createMapboxMap(
    isDark: boolean,
    { countries }: MapProps,
    mapContainer: RefObject<HTMLDivElement>
  ): mapboxgl.Map {
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

  static setMapInteractionFunctionality(
    baseMap: mapboxgl.Map,
    setSelectedCountry: (country: SelectedCountry | null) => void
  ): void {
    let hoveredPolygonId: string | number | undefined;
    let isDragging = false;

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

    baseMap.on('mousedown', () => {
      isDragging = false;
    });

    baseMap.on('mousemove', () => {
      isDragging = true;
    });

    baseMap.on('mouseup', 'country-fills', (e) => {
      if (!isDragging && e.features && (e.features[0] as unknown as CountryMapData).properties.interactive) {
        const feature = e.features[0] as unknown as CountryMapData;
        const country = {
          name: feature.properties.adm0_name,
          coordinates: { longitude: e.lngLat.lng, latitude: e.lngLat.lat },
        };
        setSelectedCountry(country);
        MapOperations.zoomToCountry(baseMap, country);
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

    const layerContainer = context.layerContainer || context.map;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const leafletMap = layerContainer.getContainer();
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

  static addFCSFunctionality(baseMap: mapboxgl.Map, selectedMapType: GlobalInsight) {
    baseMap.on('load', () => {
      baseMap.addSource('fcsRaster', {
        type: 'raster',
        tiles: ['https://static.hungermapdata.org/proteus_tiles/{z}/{x}/{y}.png'],
        tileSize: 256,
        scheme: 'tms',
      });

      baseMap.addLayer({
        id: 'fcsLayer',
        type: 'raster',
        source: 'fcsRaster',
        layout: { visibility: selectedMapType === GlobalInsight.FOOD ? 'visible' : 'none' },
        paint: {},
      });
    });
  }

  static async zoomToCountry(baseMap: mapboxgl.Map, country: SelectedCountry | null) {
    if (country) {
      const countryGeoJSON = await MapOperations.countryRepository.getCountryGeoJSON(country.name);
      const bbox = turf.bbox(countryGeoJSON);
      const adjustedBbox: [number, number, number, number] = [bbox[0], bbox[1], bbox[2], bbox[3]];

      baseMap.fitBounds(adjustedBbox, {
        padding: 20,
        duration: 1000,
        essential: true,
      });
    }
  }
}
