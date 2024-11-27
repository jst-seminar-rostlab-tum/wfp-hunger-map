import { NutrientType } from '@/domain/enums/NutrientType.ts';

export const NUTRIENT_LABELS: Map<NutrientType, string> = new Map([
  [NutrientType.MINI_SIMPLE, 'Mean Adequacy Ratio'],
  [NutrientType.FOL_AI, 'Folate'],
  [NutrientType.FE_AI, 'Iron'],
  [NutrientType.ZN_AI, 'Zinc'],
  [NutrientType.VA_AI, 'Vitamin A'],
  [NutrientType.VB12_AI, 'Vitamin B12'],
]);
