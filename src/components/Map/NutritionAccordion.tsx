import React from 'react';

import NutritionAccordionProps from '@/domain/props/NutritionAccordionProps';
import NutrientAccordion from '@/operations/map/NutritionAccordionOperations';

export default function NutritionAccordion({
  selectedNutrient,
  setSelectedNutrient,
  selectedLabel,
  setSelectedLabel,
}: NutritionAccordionProps) {
  return (
    <div className="absolute left-[108px] top-4" style={{ zIndex: 1000 }}>
      <div className="absolute w-[350px] box-border">
        <NutrientAccordion
          selectedNutrient={selectedNutrient}
          setSelectedNutrient={setSelectedNutrient}
          selectedLabel={selectedLabel}
          setSelectedLabel={setSelectedLabel}
        />
      </div>
    </div>
  );
}
