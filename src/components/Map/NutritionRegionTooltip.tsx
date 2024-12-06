import { Feature, GeoJsonProperties, Geometry } from 'geojson';

import { Nutrition } from '@/domain/entities/region/RegionNutritionProperties.ts';
import { NutrientType } from '@/domain/enums/NutrientType.ts';
import NutritionStateChoroplethOperations from '@/operations/map/NutritionStateChoroplethOperations';

interface NutritionRegionTooltipProps {
  feature: Feature<Geometry, GeoJsonProperties>;
  selectedNutrient: NutrientType;
}

export default function NutritionRegionTooltip({ feature, selectedNutrient }: NutritionRegionTooltipProps) {
  const nutrientValue = feature ? feature?.properties?.nutrition[selectedNutrient as keyof Nutrition] : null;
  const formattedNutrientValue = NutritionStateChoroplethOperations.formatNutrientValue(nutrientValue);
  const nutrientLabel = NutritionStateChoroplethOperations.getNutrientLabel(selectedNutrient);

  return (
    <div className="bg-background text-foreground rounded-md shadow-md max-w-sm z-9999">
      <div className="p-4">
        <h3 className="text-lg text-foreground font-bold">{feature.properties?.Name}</h3>
        <div className="mt-2 text-foreground">
          Risk of inadequate intake of <strong>{nutrientLabel}</strong>: {formattedNutrientValue}
        </div>
      </div>
    </div>
  );
}
