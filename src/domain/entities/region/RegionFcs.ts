/**
 * This is displayed on the tooltip when you hover on a region
 */
export interface RegionFcs {
  // FCS Score = share of people with insufficient food consumption (0-1)
  score: number;
  scoreLow: number;
  scoreHigh: number;

  // Percentage of people with insufficient food consumption (0-100, 2 decimals)
  ratio: number;
  ratioLow: number;
  ratioHigh: number;

  // Number of people with insufficient food consumption (in Millions)
  people: number;
  peopleLow: number;
  peopleHigh: number;

  dataType: string;
}
