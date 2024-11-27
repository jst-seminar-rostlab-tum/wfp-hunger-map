/* eslint-disable */
import { LeafletContextInterface } from '@react-leaflet/core';
import mapboxgl, { DataDrivenPropertyValueSpecification, Popup } from 'mapbox-gl';
import * as turf from '@turf/turf';
import { FeatureCollection, GeoJSON } from 'geojson';
import { Map } from 'leaflet';
import { RefObject } from 'react';

import { CountryMapData, CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData.ts';
import { MapColorsType } from '@/domain/entities/map/MapColorsType.ts';
import { GlobalInsight } from '@/domain/enums/GlobalInsight.ts';
import { MapProps } from '@/domain/props/MapProps';
import { getColors } from '@/styles/MapColors.ts';

import { IPCMapOperations } from '../IPC/IpcMapOperations';
import ReactDOMServer from 'react-dom/server';
import CountryHoverPopover from '../../components/CountryHoverPopover/CountryHoverPopover';
import { CountryIpcData } from '@/domain/entities/country/CountryIpcData';

export class MapOperations {
  private static getCountryFillColorForIPC = ({ selectedMapType, ipcData, countries }: MapProps, mapColors: MapColorsType): DataDrivenPropertyValueSpecification<string> => {
    switch (selectedMapType) {
      case GlobalInsight.IPC:
        return [
          'match',
          ['get', 'adm0_name'],
          ...Object.entries(IPCMapOperations.generateColorMap(ipcData, countries)).flat(),
          mapColors.countriesBase,
        ];
      default:
        return mapColors.countriesBase;
    }
  };

  static createMapboxMap(
    isDark: boolean,
    mapProps: MapProps,
    mapContainer: RefObject<HTMLDivElement>
  ): mapboxgl.Map {
    const mapColors: MapColorsType = getColors(isDark);

    const { countries } = mapProps
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
            paint: { 'fill-color': this.getCountryFillColorForIPC(mapProps, mapColors) },
          },
          // additional layers (FCS, vegetation etc.) are being placed here
          {
            id: 'countries-inactive',
            type: 'fill',
            source: 'countries',
            paint: { 'fill-color': mapColors.inactiveCountriesOverlay, 'fill-opacity': 0.5 },
            filter: ['==', ['coalesce', ['get', 'interactive'], false], false],
          },
          {
            id: 'countries-hover',
            type: 'fill',
            source: 'countries',
            paint: {
              'fill-color': mapColors.outline,
              'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.3, 0],
            },
          },
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

  static setMapInteractionFunctionality(
    baseMap: mapboxgl.Map, popover: Popup, setSelectedCountry: (country: CountryMapData | null) => void,
    countries: CountryMapDataWrapper
  ): void {
    let hoveredPolygonId: string | number | undefined;

    baseMap.on('mousemove', 'countries-hover', (e: any) => {
      const countryData = e.features && (e.features[0] as CountryMapData);

      if (hoveredPolygonId && (!countryData || hoveredPolygonId !== countryData.id)) {
        baseMap.setFeatureState({ source: 'countries', id: hoveredPolygonId }, { hover: false });
        hoveredPolygonId = undefined;
        baseMap.getCanvas().style.cursor = '';
      }

      if (!countryData) {
        popover.remove();
        return;
      }

      baseMap.getCanvas().style.cursor = 'pointer';
      hoveredPolygonId = countryData.id;
      if (hoveredPolygonId && (countryData as CountryMapData).properties.interactive) {
        baseMap.setFeatureState({ source: 'countries', id: hoveredPolygonId }, { hover: true });
      }
    });

    baseMap.on('mouseleave', 'countries-hover', () => {
      baseMap.getCanvas().style.cursor = '';
      if (hoveredPolygonId) {
        baseMap.setFeatureState({ source: 'countries', id: hoveredPolygonId }, { hover: false });
        hoveredPolygonId = undefined;
      }
      popover.remove();
    });

    let isDragging = false;
    baseMap.on('mousedown', () => {
      isDragging = false;
    });
    baseMap.on('mousemove', () => {
      isDragging = true;
    });

    baseMap.on('mouseup', 'countries-hover', (e) => {
      if (!isDragging && e.features && (e.features[0] as unknown as CountryMapData).properties.interactive) {
        const feature = e.features[0] as unknown as CountryMapData;
        const selectedCountryData: CountryMapData | undefined = countries.features.find(
          (countryItem) => countryItem.properties.adm0_name === feature.properties.adm0_name
        );
        if (selectedCountryData) {
          setSelectedCountry(selectedCountryData);
        }
      }
    })
  }

  private static onIpcMoveInvocation: ((e: any) => void) | null = null

  private static onIpcMouseMove(e: any, popover: Popup, ipcData: CountryIpcData[], countries: CountryMapDataWrapper, baseMap: mapboxgl.Map) {
    const countryData = e.features && (e.features[0] as CountryMapData);
    const countryName = countryData.properties.adm0_name;
    const ipcColorMap = IPCMapOperations.generateColorMap(ipcData, countries);

    if (!ipcColorMap[countryName]) {
      popover.remove();
      return;
    }

    const selectedCountryData = IPCMapOperations.findIpcData(countryName, ipcData);
    const date_of_analysis = selectedCountryData?.date_of_analysis || 'N/A';
    const analysis_period = selectedCountryData?.analysis_period || 'N/A';
    const ipc_percent = selectedCountryData?.ipc_percent ?? 0;
    const ipc_popnmbr = selectedCountryData?.ipc_popnmbr ?? 0;
    const formattedPopNum = ipc_popnmbr.toLocaleString('en-US', {
      useGrouping: true,
    });

    const popoverContentHTML = ReactDOMServer.renderToString(
      <CountryHoverPopover
        header={countryName}
        details={
          <>
            Date of analysis: {date_of_analysis}
            <br />
            Validity period: {analysis_period}
          </>
        }
        summary={
          <>
            <span className="font-bold text-danger text-base">{formattedPopNum}</span> people in IPC/CH Phase 3
            and above (<span className="font-bold text-danger text-base">{ipc_percent}%</span> of people in the
            analyzed areas)
          </>
        }
      />
    );
    popover.setLngLat(e.lngLat).setHTML(popoverContentHTML).addTo(baseMap);
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
          'countries-inactive'
        );
        break;
      case GlobalInsight.VEGETATION:
        baseMap.addLayer(
          {
            id: this.VEGETATION_LAYER,
            type: 'raster',
            source: this.VEGETATION_RASTER,
          },
          'countries-inactive'
        );
        break;
      case GlobalInsight.RAINFALL:
        baseMap.addLayer(
          {
            id: this.RAINFALL_LAYER,
            type: 'raster',
            source: this.RAINFALL_RASTER,
          },
          'countries-inactive'
        );
        break;
      case GlobalInsight.IPC:
        baseMap.setPaintProperty('countries-base', 'fill-color', this.getCountryFillColorForIPC(mapProps, mapColors))
        this.onIpcMoveInvocation = (e) => this.onIpcMouseMove(e, popover, mapProps.ipcData, mapProps.countries, baseMap)
        baseMap.on('mousemove', 'countries-hover', this.onIpcMoveInvocation)
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
      baseMap.setPaintProperty('countries-base', 'fill-color', mapColors.countriesBase)
      if (this.onIpcMoveInvocation) {
        baseMap.off('mousemove', 'countries-hover', this.onIpcMoveInvocation)
        this.onIpcMoveInvocation = null
      }
      return
    };
    baseMap.removeLayer(layerToRemove.id);
  }

  static zoomToCountry(
    baseMap: mapboxgl.Map,
    country: CountryMapData | null,
    leafletMap: Map,
    mapContainer: RefObject<HTMLDivElement>,
    context: LeafletContextInterface,
    setIsAlertsDisplayDisabled: (value: boolean) => void
  ) {
    if (country) {
      const bbox = turf.bbox(country as GeoJSON);

      const mapboxAdjustedBbox: [number, number, number, number] = [bbox[0], bbox[1], bbox[2], bbox[3]];
      /*
      const leafletAdjustedBbox: [[number, number], [number, number]] = [[bbox[1], bbox[0]], [bbox[3], bbox[2]]];
      leafletMap.fitBounds(leafletAdjustedBbox, { animate: true });
       */

      leafletMap.off();
      setIsAlertsDisplayDisabled(true);

      baseMap.fitBounds(mapboxAdjustedBbox, {
        padding: 20,
        duration: 500,
        essential: true,
      });

      baseMap.once('moveend', () => {
        const center = baseMap.getCenter();
        const zoom = baseMap.getZoom();
        leafletMap.setView([center.lat, center.lng], zoom + 1, {
          animate: false,
        });
        this.synchronizeLeafletMapbox(baseMap, mapContainer, context);
        setIsAlertsDisplayDisabled(false);
      });
    }
  }
}
