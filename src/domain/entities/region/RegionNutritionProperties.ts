/**
 * Empty for every country, so unknown
 */
export type Nutrition = {
  fe_ai: number;
  fol_ai: number;
  mimi_simple: number;
  va_ai: number;
  vb12_ai: number;
  zn_ai: number;
};

export interface RegionNutritionProperties {
  Code: number;
  Name: string;
  nutrition: Nutrition;
}
