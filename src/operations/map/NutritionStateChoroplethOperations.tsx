import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import L, { PathOptions } from 'leaflet';

import { NUTRIENT_LABELS } from '@/domain/constant/map/NutritionChoropleth.ts';
import { CountryMimiData } from '@/domain/entities/country/CountryMimiData';
import { LayerWithFeature } from '@/domain/entities/map/LayerWithFeature.ts';
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

  public static addHoverEffect(layer: LayerWithFeature): void {
    const pathLayer = layer as L.Path;
    pathLayer.on({
      mouseover: () => {
        pathLayer.setStyle({ fillOpacity: 1 });
      },
      mouseout: () => {
        pathLayer.setStyle({ fillOpacity: 0.6 });
      },
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

  // create and add state nutrition tooltip to the corresponding layer
  static addNutritionTooltip(
    layer: LayerWithFeature,
    feature: Feature | undefined,
    regionNutrition: CountryMimiData | undefined,
    selectedNutrient: NutrientType
  ) {
    if (!feature) return;

    const stateId = feature.id || feature.properties?.id;
    const match = regionNutrition?.features.find((item) => item.id === stateId);
    const nutrientValue = match ? match?.properties?.nutrition[selectedNutrient as keyof Nutrition] : null;

    const formattedNutrientValue = NutritionStateChoroplethOperations.formatNutrientValue(nutrientValue);
    const nutrientLabel = NutritionStateChoroplethOperations.getNutrientLabel(selectedNutrient);
    const tooltipContent = `
        <div class="bg-background text-foreground rounded-md shadow-md max-w-sm z-9999">
          <div class="p-4">
            <h3 class="text-lg text-foreground font-bold">${feature.properties?.Name}</h3>
            <div class="mt-2 text-foreground">
              Risk of inadequate intake of <strong>${nutrientLabel}</strong>: ${formattedNutrientValue}
            </div>
          </div>
        </div>
      `;

    layer.unbindTooltip();
    layer.bindTooltip(tooltipContent, {
      className: 'state-tooltip',
      direction: 'top',
      offset: [0, -10],
      permanent: false,
      sticky: true,
    });
  }
}
