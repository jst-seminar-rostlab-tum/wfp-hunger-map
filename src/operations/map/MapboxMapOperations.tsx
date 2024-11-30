/* eslint-disable */
import { LeafletContextInterface } from '@react-leaflet/core';
import { FeatureCollection } from 'geojson';
import mapboxgl, { Popup } from 'mapbox-gl';
import { RefObject } from 'react';

import { MapColorsType } from '@/domain/entities/map/MapColorsType.ts';
import { GlobalInsight } from '@/domain/enums/GlobalInsight.ts';
import { MapProps } from '@/domain/props/MapProps';
import { getColors } from '@/styles/MapColors.ts';

export class MapboxMapOperations {
  static createMapboxMap(isDark: boolean, mapProps: MapProps, mapContainer: RefObject<HTMLDivElement>): mapboxgl.Map {
    const mapColors: MapColorsType = getColors(isDark);

    const { countries } = mapProps;
    return new mapboxgl.Map({
      container: mapContainer.current as unknown as string | HTMLElement,
      logoPosition: 'bottom-left',  // default which can be changed to 'bottom-right'
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
            bounds: [-180, -60, 180, 90],
          },
        },
        layers: [
          {
            id: 'ocean',
            type: 'background',
            paint: { 'background-color': mapColors.ocean },
          },
          {
            id: 'countries-base',
            type: 'fill',
            source: 'countries',
            paint: { 'fill-color': mapColors.countriesBase },
          },
          // additional layers (FCS, vegetation etc.) are being placed here
          {
            id: 'country-borders',
            type: 'line',
            source: 'countries',
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

  static changeMapTheme(baseMap: mapboxgl.Map, isDark: boolean) {
    const mapColors: MapColorsType = getColors(isDark);
    baseMap.setPaintProperty('ocean', 'background-color', mapColors.ocean);
    baseMap.setPaintProperty('countries-base', 'fill-color', mapColors.countriesBase);
    baseMap.setPaintProperty('countries-inactive', 'fill-color', mapColors.inactiveCountriesOverlay);
    baseMap.setPaintProperty('countries-hover', 'fill-color', mapColors.outline);
    baseMap.setPaintProperty('country-borders', 'line-color', mapColors.outline);
    baseMap.setPaintProperty('mapbox-roads', 'line-color', mapColors.roads);
  }

  static FCS_RASTER = 'fcsRaster';

  static FCS_LAYER = 'fcsLayer';

  static RAINFALL_RASTER = 'rainfallRaster';

  static RAINFALL_LAYER = 'rainfallLayer';

  static VEGETATION_RASTER = 'vegetationRaster';

  static VEGETATION_LAYER = 'vegetationLayer';

  static initFCSLayer(baseMap: mapboxgl.Map) {
    baseMap.on('load', () => {
      baseMap.addSource(this.FCS_RASTER, {
        type: 'raster',
        tiles: ['https://static.hungermapdata.org/proteus_tiles/{z}/{x}/{y}.png'],
        tileSize: 256,
        scheme: 'tms',
      });
    });
  }

  static initRainfallLayer(baseMap: mapboxgl.Map) {
    baseMap.on('load', () => {
      baseMap.addSource(this.RAINFALL_RASTER, {
        type: 'raster',
        tiles: [`https://dev.api.earthobservation.vam.wfp.org/tiles/latest/r3q_dekad/{z}/{x}/{y}.png`],
        tileSize: 256,
        scheme: 'xyz',
        maxzoom: 7,
        bounds: [-180, -49, 180, 49],
      });
    });
  }

  static initVegetationLayer(baseMap: mapboxgl.Map) {
    baseMap.on('load', () => {
      baseMap.addSource(this.VEGETATION_RASTER, {
        type: 'raster',
        tiles: [`https://dev.api.earthobservation.vam.wfp.org/tiles/latest/viq_dekad/{z}/{x}/{y}.png`],
        tileSize: 256,
        scheme: 'xyz',
        maxzoom: 7,
        bounds: [-180, -60, 180, 80],
      });
    });
  }

  static addMapAsLayer(baseMap: mapboxgl.Map, isDark: boolean, mapProps: MapProps, popover: Popup) {
    const mapColors: MapColorsType = getColors(isDark);
    switch (mapProps.selectedMapType) {
      case GlobalInsight.FOOD:
        baseMap.addLayer(
          {
            id: this.FCS_LAYER,
            type: 'raster',
            source: this.FCS_RASTER,
          },
          'country-borders'
        );
        break;
      case GlobalInsight.VEGETATION:
        baseMap.addLayer(
          {
            id: this.VEGETATION_LAYER,
            type: 'raster',
            source: this.VEGETATION_RASTER,
          },
          'country-borders'
        );
        break;
      case GlobalInsight.RAINFALL:
        baseMap.addLayer(
          {
            id: this.RAINFALL_LAYER,
            type: 'raster',
            source: this.RAINFALL_RASTER,
          },
          'country-borders'
        );
        break;
      default:
    }
  }

  static removeActiveMapLayer(baseMap: mapboxgl.Map, isDark: boolean) {
    const mapColors: MapColorsType = getColors(isDark);
    const layers = baseMap.getStyle()?.layers;
    if (!layers) return;
    const layerToRemove = layers.find((layer) =>
      // TODO make sure to update this list with the new layers!
      [this.FCS_LAYER, this.VEGETATION_LAYER, this.RAINFALL_LAYER].includes(layer.id)
    );
    if (!layerToRemove) {
      baseMap.setPaintProperty('countries-base', 'fill-color', mapColors.countriesBase);
      return;
    }
    baseMap.removeLayer(layerToRemove.id);
  }
}
