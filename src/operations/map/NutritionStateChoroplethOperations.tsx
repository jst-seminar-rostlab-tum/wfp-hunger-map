import { GeoJsonProperties, Geometry } from 'geojson';
import { PathOptions } from 'leaflet';

import { NUTRIENT_LABELS } from '@/domain/constant/map/NutritionChoropleth.ts';
import { CountryMimiData } from '@/domain/entities/country/CountryMimiData';
import { Nutrition } from '@/domain/entities/region/RegionNutritionProperties.ts';
import { NutrientType } from '@/domain/enums/NutrientType.ts';

export default class NutritionStateChoroplethOperations {
  public static getNutrientLabel(nutrient: NutrientType): string {
    return NUTRIENT_LABELS.get(nutrient) || '';
  }

  public static formatNutrientValue = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return 'N/A';
    return `${value.toFixed(1)}%`;
  };

  public static nutritionFillColor(value: number | null): string {
    if (!value) return 'none';
    if (value <= 19) return '#fff3f3';
    if (value <= 39) return '#fcd0ce';
    if (value <= 59) return '#f88884';
    if (value <= 79) return '#f5524c';
    if (value <= 100) return '#f32e27';
    return '#A0A0A0';
  }

  public static dynamicStyle(
    feature: GeoJSON.Feature<Geometry, GeoJsonProperties> | undefined,
    regionNutri: CountryMimiData | undefined,
    selectedNutrient: NutrientType
  ): PathOptions {
    if (!feature) return {};

    const stateId = feature.id || feature?.properties?.id;
    const match = regionNutri?.features.find((item) => item.id === stateId);
    const value = match ? match?.properties?.nutrition[selectedNutrient as keyof Nutrition] : null;

    return {
      fillColor: this.nutritionFillColor(value),
      color: '#000',
      weight: 1,
      fillOpacity: 0.6,
    };
  }

  public static addHoverEffect(
    layer: L.Layer,
    feature: GeoJSON.Feature<Geometry, GeoJsonProperties>,
    regionNutri: CountryMimiData | undefined,
    getCurrentNutrient: () => NutrientType
  ): void {
    const initialOpacity = 0.6;
    const pathLayer = layer as L.Path;
    // Add mouseover event
    layer.on('mouseover', () => {
      const dynamicNutrient = getCurrentNutrient();
      const dynamicFillColor = this.nutritionFillColor(this.getNutritionValue(feature, regionNutri, dynamicNutrient));

      pathLayer.setStyle({
        fillOpacity: 0.8,
        fillColor: dynamicFillColor,
      });
    });

    // Add mouseout event
    pathLayer.on('mouseout', () => {
      const dynamicNutrient = getCurrentNutrient();
      const dynamicFillColor = this.nutritionFillColor(this.getNutritionValue(feature, regionNutri, dynamicNutrient));
      pathLayer.setStyle({
        fillOpacity: initialOpacity,
        fillColor: dynamicFillColor,
      });
    });
  }

  // Get the nutrition value for a region
  private static getNutritionValue(
    feature: GeoJSON.Feature<Geometry, GeoJsonProperties>,
    regionNutri: CountryMimiData | undefined,
    selectedNutrient: NutrientType
  ): number | null {
    if (!regionNutri) return null;
    const stateId = feature.id || feature?.properties?.id;
    const match = regionNutri?.features.find((item) => item.id === stateId);
    return match ? match?.properties?.nutrition[selectedNutrient as keyof Nutrition] : null;
  }
}
