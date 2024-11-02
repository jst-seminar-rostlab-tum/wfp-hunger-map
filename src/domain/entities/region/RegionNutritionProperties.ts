/**
 * Empty for every country, so unknown
 */
export type Nutrition = unknown;

export interface RegionNutritionProperties {
  Code: number;
  Name: string;
  nutrition: Nutrition;
}
