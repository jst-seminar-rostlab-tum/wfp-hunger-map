import React from 'react';

import { NutrientType } from '@/domain/enums/NutrientType.ts';

export default interface NutritionAccordionProps {
  setSelectedNutrient: React.Dispatch<React.SetStateAction<NutrientType>>;
  selectedNutrient: NutrientType;
  countryName: string | null;
}
