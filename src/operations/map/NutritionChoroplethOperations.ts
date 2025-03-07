import L from 'leaflet';

import { CountryMapData } from '@/domain/entities/country/CountryMapData.ts';
import { CountryNutrition } from '@/domain/entities/country/CountryNutrition.ts';
import { inactiveCountryOverlayStyling } from '@/styles/MapColors.ts';

export default class NutritionChoroplethOperations {
  private static getFillColor(dataType: string | undefined): string {
    switch (dataType) {
      case 'actual':
        return '#FFB74D';
      case 'predicted':
        return '#E3F2FD';
      default:
        return '#52525b';
    }
  }

  // check if the country is not selected and if there is data available for the country
  public static checkIfActive(feature: CountryMapData, nutritionData: CountryNutrition): boolean {
    return nutritionData.body?.find((c) => c.adm0_code === feature.properties.adm0_id) !== undefined;
  }

  private static handleCountryClick(feature: CountryMapData, setSelectedCountryId: (countryId: number | null) => void) {
    setSelectedCountryId(feature.properties?.adm0_id);
  }

  public static onEachFeature(
    feature: CountryMapData,
    layer: L.Layer,
    setSelectedCountryId: (countryId: number | null) => void,
    nutritionData: CountryNutrition
  ) {
    const pathLayer = layer as L.Path;
    pathLayer.on({
      click: async () => {
        if (this.checkIfActive(feature, nutritionData)) {
          NutritionChoroplethOperations.handleCountryClick(feature, setSelectedCountryId);
        }
        document.getElementsByClassName('leaflet-container').item(0)?.classList.remove('interactive');
      },
      mouseover: () => {
        if (this.checkIfActive(feature, nutritionData)) {
          pathLayer.setStyle({
            fillOpacity: 0.8,
          });
          document.getElementsByClassName('leaflet-container').item(0)?.classList.add('interactive');
        }
      },
      mouseout: () => {
        if (this.checkIfActive(feature, nutritionData)) {
          pathLayer.setStyle({
            fillOpacity: 0.5,
          });
          document.getElementsByClassName('leaflet-container').item(0)?.classList.remove('interactive');
        }
      },
      keydown: (e) => {
        if (e.originalEvent.key === 'Enter' || e.originalEvent.key === ' ') {
          NutritionChoroplethOperations.handleCountryClick(feature, setSelectedCountryId);
          document.getElementsByClassName('leaflet-container').item(0)?.classList.remove('interactive');
        }
      },
    });
  }

  static countryStyle(feature: CountryMapData, nutritionData: CountryNutrition, isDark: boolean): L.PathOptions {
    return this.checkIfActive(feature, nutritionData)
      ? {
          color: '#fff',
          weight: 1,
          fillOpacity: 0.5,
          fillColor: NutritionChoroplethOperations.getFillColor(
            nutritionData.body?.find((c) => c.adm0_code === feature.properties.adm0_id)?.data_type
          ),
        }
      : inactiveCountryOverlayStyling(isDark);
  }
}
