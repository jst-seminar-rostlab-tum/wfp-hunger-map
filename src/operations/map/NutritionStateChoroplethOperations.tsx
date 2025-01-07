import { Feature } from 'geojson';
import { PathOptions } from 'leaflet';
import { createRoot } from 'react-dom/client';

import NutritionRegionTooltip from '@/components/Map/NutritionMap/NutritionRegionTooltip';
import { NUTRIENT_LABELS } from '@/domain/constant/map/NutritionChoropleth.ts';
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
    if (!value) return 'hsl(var(--nextui-notAnalyzed))';
    if (value <= 19) return '#fff3f3';
    if (value <= 39) return '#fcd0ce';
    if (value <= 59) return '#f88884';
    if (value <= 79) return '#f5524c';
    if (value <= 100) return '#f32e27';
    return '#A0A0A0';
  }

  public static dynamicStyle(feature: Feature | undefined, selectedNutrient: NutrientType): PathOptions {
    if (!feature?.properties) return {};
    const value = feature.properties.nutrition[selectedNutrient as keyof Nutrition] || null;

    return {
      fillColor: this.nutritionFillColor(value),
      color: 'hsl(var(--nextui-countryBorders))',
      weight: 1,
      fillOpacity: 1,
    };
  }

  public static addHoverEffect(layer: LayerWithFeature): void {
    const pathLayer = layer as L.Path;
    pathLayer.on({
      mouseover: () => {
        pathLayer.setStyle({ fillOpacity: 0.6 });
      },
      mouseout: () => {
        pathLayer.setStyle({ fillOpacity: 1 });
      },
    });
  }

  // create and add state nutrition tooltip to the corresponding layer
  static addNutritionTooltip(layer: LayerWithFeature, feature: Feature | undefined, selectedNutrient: NutrientType) {
    if (!feature) return;

    const tooltipContainer = document.createElement('div');
    const root = createRoot(tooltipContainer);
    root.render(<NutritionRegionTooltip feature={feature} selectedNutrient={selectedNutrient} />);

    layer.unbindTooltip();
    layer.bindTooltip(tooltipContainer, {
      className: 'state-tooltip',
      direction: 'top',
      offset: [0, -10],
      permanent: false,
      sticky: true,
    });
  }
}
