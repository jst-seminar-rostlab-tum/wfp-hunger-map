/**
 * Information on people with crisis or above crisis food-based coping.
 */
export interface RegionRcsi {
  // Percentage of people crisis or above crisis food-based coping (0-100, 2 decimals)
  ratio: number | null;
  ratioLow: number | null;
  ratioHigh: number | null;

  // Number of people with crisis or above crisis food-based coping (in Millions)
  people: number | null;
  peopleLow: number | null;
  peopleHigh: number | null;
}
