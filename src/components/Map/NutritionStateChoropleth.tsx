import React, { useState } from 'react';

import { NutritionStateChoroplethProps } from '@/domain/props/NutritionStateProps';
import NutritionStateChoroplethOperations from '@/operations/map/NutritionStateChoroplethOperations';

import NutritionAccordion from './NutritionAccordion';
import NutritionStateLegend from './NutritionStateLegend';

function NutritionStateChoropleth({
  regionNutri,
  regionData,
  handleClick = () => {},
  tooltip,
}: NutritionStateChoroplethProps) {
  const [selectedNutrient, setSelectedNutrient] = useState<string>('mimi_simple');
  const [selectedLabel, setSelectedLabel] = useState<string>('Mean Adequacy Ratio');
  return (
    <>
      <NutritionAccordion
        selectedNutrient={selectedNutrient}
        setSelectedNutrient={setSelectedNutrient}
        selectedLabel={selectedLabel}
        setSelectedLabel={setSelectedLabel}
      />
      <NutritionStateChoroplethOperations
        regionNutri={regionNutri}
        regionData={regionData}
        selectedNutrient={selectedNutrient}
        tooltip={tooltip}
        handleClick={handleClick}
      />
      <NutritionStateLegend />
    </>
  );
}

export default NutritionStateChoropleth;
