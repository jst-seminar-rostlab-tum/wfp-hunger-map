import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';

import { CountryNutrition } from '@/domain/entities/country/CountryNutrition.ts';
import { AlertType } from '@/domain/enums/AlertType';

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
    selectedAlert: AlertType | null,
    setSelectedCountryId: (countryId: number | null) => void,
    toggleAlert: (alertType: AlertType) => void
  ) {
    setSelectedCountryId(feature.properties?.adm0_id);
    if (selectedAlert) {
      toggleAlert(selectedAlert);
    }
  }

  public static onEachFeature(
    feature: Feature<Geometry, GeoJsonProperties>,
    layer: L.Layer,
    selectedAlert: AlertType | null,
    setSelectedCountryId: (countryId: number | null) => void,
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
        NutritionChoroplethOperations.handleCountryClick(feature, selectedAlert, setSelectedCountryId, toggleAlert);
      },
    });
  }

  static countryStyle: L.PathOptions = {
    color: undefined,
    fillOpacity: 0,
  };
}
