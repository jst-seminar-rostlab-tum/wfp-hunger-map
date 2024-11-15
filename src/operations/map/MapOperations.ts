import { LeafletContextInterface } from '@react-leaflet/core';
import { FeatureCollection } from 'geojson';
import mapboxgl from 'mapbox-gl';
import { RefObject } from 'react';

import { CountryMapData, CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData.ts';
import { MapColorsType } from '@/domain/entities/map/MapColorsType.ts';
import { GlobalInsight } from '@/domain/enums/GlobalInsight.ts';
import { MapProps } from '@/domain/props/MapProps';
import CountryRepositoryImpl from '@/infrastructure/repositories/CountryRepositoryImpl';
import { getColors } from '@/styles/MapColors.ts';

const CountryRepo = new CountryRepositoryImpl();

export class MapOperations {
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
        alert(`You clicked on ${(e.features[0] as unknown as CountryMapData).properties.adm0_name}`);
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

  static addNutritionChoroplethFunctionality(
    baseMap: mapboxgl.Map,
    selectedMapType: GlobalInsight,
    nutritionData: {
      iso3: string;
      active: boolean;
      va_ai: number;
      fo_ai: number;
      vb12_ai: number;
      fe_ai: number;
      zn_ai: number;
    }[],
    countryData: CountryMapDataWrapper
  ) {
    if (selectedMapType !== GlobalInsight.NUTRITION) {
      return;
    }
    const nutritionIso3List = nutritionData.map((data) => data.iso3);
    const countriesWithNutrition = countryData.features.filter((feature) =>
      nutritionIso3List.includes(feature.properties.iso3)
    );

    const countriesWithoutNutrition = countryData.features.filter(
      (feature) => !nutritionIso3List.includes(feature.properties.iso3)
    );
    const countriesWithNutritionSource = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: countriesWithNutrition,
      },
    };

    const countriesWithoutNutritionSource = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: countriesWithoutNutrition,
      },
    };
    baseMap.on('load', () => {
      baseMap.addSource('countriesWithNutrition', countriesWithNutritionSource);
      baseMap.addSource('countriesWithoutNutrition', countriesWithoutNutritionSource);
      baseMap.addLayer({
        id: 'nutritionChoroplethLayerYellow',
        type: 'fill',
        source: 'countriesWithNutrition',
        layout: {},
        paint: {
          'fill-color': '#F5A524',
          'fill-opacity': 0.7,
        },
      });
      baseMap.addLayer({
        id: 'nutritionChoroplethLayerGrey',
        type: 'fill',
        source: 'countriesWithoutNutrition',
        layout: {},
        paint: {
          'fill-color': '#52525B',
          'fill-opacity': 0.7,
        },
      });
      baseMap.addLayer({
        id: 'countryBordersLayer',
        type: 'line',
        source: 'countries',
        layout: {},
        paint: {
          'line-color': '#000000',
          'line-width': 1,
        },
      });
      baseMap.on('click', 'nutritionChoroplethLayerYellow', async (e) => {
        const clickedFeature = e.features?.[0];
        if (!clickedFeature) return;

        const countryId = clickedFeature.properties?.adm0_id;
        if (!countryId) return;

        console.log('Clicked country:', clickedFeature.properties);

        try {
          // Fetch the region data for the clicked country
          const regionData = await CountryRepo.getRegionData(countryId);

          if (regionData) {
            console.log('Region data:', regionData);

            // Format region data for GeoJSON
            const formattedRegionData = {
              type: 'FeatureCollection',
              features: regionData.features.map((region) => ({
                type: 'Feature',
                geometry: region.geometry,
                properties: region.properties,
              })),
            };

            // Remove existing region layers if present
            if (baseMap.getSource('regions')) {
              baseMap.removeLayer('regionsLayer');
              baseMap.removeSource('regions');
            }
            if (baseMap.getSource('regionBoundaries')) {
              baseMap.removeLayer('region-border-layer');
              baseMap.removeSource('regionBoundaries');
            }

            // Add region data source
            baseMap.addSource('regions', {
              type: 'geojson',
              data: formattedRegionData,
            });

            // Add fill layer for regions
            baseMap.addLayer({
              id: 'regionsLayer',
              type: 'fill',
              source: 'regions',
              layout: {},
              paint: {
                'fill-color': '#D32F2F', // Example region color
                'fill-opacity': 0.6,
              },
            });

            // Add boundary layer for region borders
            baseMap.addSource('regionBoundaries', {
              type: 'geojson',
              data: formattedRegionData,
            });

            baseMap.addLayer({
              id: 'region-border-layer',
              type: 'line',
              source: 'regionBoundaries',
              layout: {},
              paint: {
                'line-color': '#0000FF', // Blue border for regions
                'line-width': 2, // Set border thickness
              },
            });

            // Zoom to region bounds
            const bounds = new mapboxgl.LngLatBounds();
            formattedRegionData.features.forEach((feature) => {
              if (feature.geometry.type === 'Polygon') {
                feature.geometry.coordinates[0].forEach((coord) => bounds.extend(coord));
              } else if (feature.geometry.type === 'MultiPolygon') {
                feature.geometry.coordinates.forEach((polygon) => {
                  polygon[0].forEach((coord) => bounds.extend(coord));
                });
              }
            });

            baseMap.fitBounds(bounds, { padding: 20 });
          } else {
            console.warn('No regions found for this country.');
          }
        } catch (err) {
          console.error('Error fetching region data:', err);
        }
      });

      baseMap.on('click', (e) => {
        const features = baseMap.queryRenderedFeatures(e.point, {
          layers: ['nutritionChoroplethLayerYellow'],
        });
        baseMap.addLayer({
          id: 'region-border-layer',
          type: 'line',
          source: 'regionBoundaries',
          layout: {},
          paint: {
            'line-color': '#000000', // Black border for regions
            'line-width': 2, // Set border thickness
          },
        });

        if (features.length === 0 && baseMap.getSource('regions')) {
          baseMap.removeLayer('regionsLayer');
          baseMap.removeSource('regions');
          console.log('Regions layer removed as no country is clicked.');
        }
      });

      const layerVisibility = selectedMapType === 'nutrition' ? 'visible' : 'none';
      baseMap.setLayoutProperty('nutritionChoroplethLayerYellow', 'visibility', layerVisibility);
      baseMap.setLayoutProperty('countryBordersLayer', 'visibility', layerVisibility);
    });
  }
}
