import { GradientLegendContainerItem } from '@/domain/props/GradientLegendContainerItem';

import LegendContainer from '../Legend/LegendContainer';

export default function NutritionStateLegend() {
  const legendItem: GradientLegendContainerItem = {
    title: 'Risk of Inadequate Micronutrient Intake',
    startColor: 'nutritionGradientStart',
    endColor: 'nutritionGradientEnd',
    startLabel: '0%',
    endLabel: '100%',
    middleColor: 'nutritionGradientMiddle',
    tooltipInfo: 'Shows the inadequate ratio of nutrient intake.',
  };
  return (
    <div className="absolute bottom-5 right-0 z-50 pr-10">
      <LegendContainer items={[legendItem]} />
    </div>
  );
}
