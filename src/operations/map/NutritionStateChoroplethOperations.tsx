import { NutrientOption } from '@/domain/props/NutritionStateProps.ts';

export default class NutritionStateChoroplethOperations {
  // all selectable nutrition categories
  public static NUTRITION_OPTIONS: NutrientOption[] = [
    { label: 'Mean Adequacy Ratio', key: 'mimi_simple' },
    { label: 'Folate', key: 'fol_ai' },
    { label: 'Iron', key: 'fe_ai' },
    { label: 'Zinc', key: 'zn_ai' },
    { label: 'Vitamin A', key: 'va_ai' },
    { label: 'Vitamin B12', key: 'vb12_ai' },
  ];

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

  public static getNutritionLabel(key: string): string | undefined {
    return this.NUTRITION_OPTIONS.find((o) => o.key === key)?.label;
  }
}
