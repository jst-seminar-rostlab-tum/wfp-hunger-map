import { Feature, GeoJsonProperties, Geometry } from 'geojson';

import { Nutrition } from '@/domain/entities/region/RegionNutritionProperties.ts';
import { NutrientType } from '@/domain/enums/NutrientType.ts';
import NutritionStateChoroplethOperations from '@/operations/map/NutritionStateChoroplethOperations';

/**
 * NutritionRegionTooltipProps is an interface for the props of the NutritionRegionTooltip component.
 * @param {feature} Feature<Geometry, GeoJsonProperties> - The feature of the region
 * @param {selectedNutrient} NutrientType - The selected nutrient
 */
interface NutritionRegionTooltipProps {
  feature: Feature<Geometry, GeoJsonProperties>;
  selectedNutrient: NutrientType;
}
/** NutritionRegionTooltip Component rendering the tooltip for the Nutrition Map. The tooltiop displays the name of the region
 * and the risk of inadequate intake of the selected nutrient.
 * @param {NutritionRegionTooltipProps} props - The props of the component.
 * @param {Feature<Geometry, GeoJsonProperties>} props.feature - The feature of the region.
 * @param {NutrientType} props.selectedNutrient - The selected nutrient.
 * @returns {JSX.Element} Tooltip component which shows the name of the region and the value of selected micronutrient
 */

export default function NutritionRegionTooltip({
  feature,
  selectedNutrient,
}: NutritionRegionTooltipProps): JSX.Element {
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
