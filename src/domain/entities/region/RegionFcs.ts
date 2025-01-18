/**
 * Information on people with insufficient food consumption.
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

  // Number of people with insufficient food consumption (in millions)
  people: number;
  peopleLow: number;
  peopleHigh: number;

  dataType: string;
}
