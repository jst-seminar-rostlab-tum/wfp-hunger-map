export interface RegionRcsi {
  // Percentage of people crisis or above crisis food-based coping (0-100, 2 decimals)
  ratio: number;
  ratioLow: number;
  ratioHigh: number;

  // Number of people with crisis or above crisis food-based coping (in Millions)
  people: number;
  peopleLow: number;
  peopleHigh: number;
}
