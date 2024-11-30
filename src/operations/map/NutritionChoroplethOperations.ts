import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';

import container from '@/container';
import { CountryMimiData } from '@/domain/entities/country/CountryMimiData';
import { CountryNutrition } from '@/domain/entities/country/CountryNutrition.ts';
import { AlertType } from '@/domain/enums/AlertType';
import CountryRepository from '@/domain/repositories/CountryRepository';

export default class NutritionChoroplethOperations {
  private static getFillColor(dataType: string): string {
    switch (dataType) {
      case 'actual':
        return '#FFB74D';
      case 'predicted':
        return '#E3F2FD';
      default:
        return '#52525b';
    }
  }

  public static getCountryStyles(nutritionData: CountryNutrition) {
    if (nutritionData && Array.isArray(nutritionData.body)) {
      return nutritionData.body.reduce(
        (acc, item) => {
          acc[item.adm0_code] = {
            color: '#fff',
            weight: 1,
            fillOpacity: 0.5,
            fillColor: NutritionChoroplethOperations.getFillColor(item.data_type),
          };
          return acc;
        },
        {} as { [key: number]: L.PathOptions }
      );
    }
    return {};
  }

  private static async handleCountryClick(
    feature: Feature<Geometry, GeoJsonProperties>,
    bounds: L.LatLngBounds,
    map: L.Map,
    selectedAlert: AlertType | null,
    setSelectedCountryId: (countryId: number | null) => void,
    setRegionData: (data: FeatureCollection<Geometry, GeoJsonProperties> | undefined) => void,
    setRegionNutritionData: (data: CountryMimiData) => void,
    toggleAlert: (alertType: AlertType) => void
  ) {
    map.fitBounds(bounds);
    setSelectedCountryId(feature.properties?.adm0_id);
    if (selectedAlert) {
      toggleAlert(selectedAlert);
    }
    if (feature.properties?.adm0_id) {
      const countryRepository = container.resolve<CountryRepository>('CountryRepository');
      const regionNutrition = await countryRepository.getRegionNutritionData(feature.properties.adm0_id);
      const regionData = regionNutrition.features;
      if (regionData) {
        setRegionData({
          type: 'FeatureCollection',
          features: regionData as Feature<Geometry, GeoJsonProperties>[],
        });
        setRegionNutritionData(regionNutrition);
      }
    }
  }

  public static onEachFeature(
    feature: Feature<Geometry, GeoJsonProperties>,
    layer: L.Layer,
    map: L.Map,
    selectedAlert: AlertType | null,
    setSelectedCountryId: (countryId: number | null) => void,
    setRegionData: (data: FeatureCollection<Geometry, GeoJsonProperties> | undefined) => void,
    setRegionNutritionData: (data: CountryMimiData) => void,
    countryStyles: { [key: number]: L.PathOptions },
    toggleAlert: (alertType: AlertType) => void
  ) {
    const pathLayer = layer as L.Path;
    const featureStyle = countryStyles[feature.properties?.adm0_id];
    if (featureStyle) {
      pathLayer.setStyle(featureStyle);
    }
    pathLayer.on({
      click: async () => {
        const bounds = (layer as L.GeoJSON).getBounds();
        NutritionChoroplethOperations.handleCountryClick(
          feature,
          bounds,
          map,
          selectedAlert,
          setSelectedCountryId,
          setRegionData,
          setRegionNutritionData,
          toggleAlert
        );
      },
    });
    layer.on('mouseover', () => {
      if (
        pathLayer.options.fillColor === '#FFB74D' ||
        pathLayer.options.fillColor === '#E3F2FD' ||
        pathLayer.options.fillColor === '#52525b'
      ) {
        pathLayer.setStyle({
          fillOpacity: 0.8,
        });
      } else {
        pathLayer.setStyle({
          fillOpacity: 0.1,
        });
      }
    });
    pathLayer.on('mouseout', () => {
      if (
        pathLayer.options.fillColor === '#FFB74D' ||
        pathLayer.options.fillColor === '#E3F2FD' ||
        pathLayer.options.fillColor === '#52525b'
      ) {
        pathLayer.setStyle({
          fillOpacity: 0.5,
        });
      } else {
        pathLayer.setStyle({
          fillOpacity: 0,
        });
      }
    });
  }

  static countryStyle: L.PathOptions = {
    color: undefined,
    fillOpacity: 0,
  };
}