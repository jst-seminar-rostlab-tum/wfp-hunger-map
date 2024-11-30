import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';

import { CountryNutrition } from '@/domain/entities/country/CountryNutrition.ts';

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
    setSelectedCountryId: (countryId: number | null) => void
  ) {
    setSelectedCountryId(feature.properties?.adm0_id);
  }

  public static onEachFeature(
    feature: Feature<Geometry, GeoJsonProperties>,
    layer: L.Layer,
    setSelectedCountryId: (countryId: number | null) => void,
    countryStyles: { [key: number]: L.PathOptions }
  ) {
    const pathLayer = layer as L.Path;
    const featureStyle = countryStyles[feature.properties?.adm0_id];
    if (featureStyle) {
      pathLayer.setStyle(featureStyle);
    }
    pathLayer.on({
      click: async () => {
        NutritionChoroplethOperations.handleCountryClick(feature, setSelectedCountryId);
      },
    });
  }

  static countryStyle: L.PathOptions = {
    color: undefined,
    fillOpacity: 0,
  };
}
