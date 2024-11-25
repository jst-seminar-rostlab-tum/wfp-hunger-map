export default class NutritionStateChoroplethOperations {
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

  public static nutrientLabels: { [key: string]: string } = {
    fe_ai: 'Iron',
    fol_ai: 'Folate',
    va_ai: 'Vitamin A',
    vb12_ai: 'Vitamin B12',
    zn_ai: 'Zinc',
    mimi_simple: 'Mean Adequacy Ratio',
  };
}
