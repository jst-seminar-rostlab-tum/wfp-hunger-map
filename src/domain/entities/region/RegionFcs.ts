/**
 * Information on people with insufficient food consumption.
 */
export interface RegionFcs {
  // FCS Score = share of people with insufficient food consumption (0-1)
  score: number | null;
  scoreLow: number | null;
  scoreHigh: number | null;

  // Percentage of people with insufficient food consumption (0-100, 2 decimals)
  ratio: number | null;
  ratioLow: number | null;
  ratioHigh: number | null;

  // Number of people with insufficient food consumption (in millions)
  people: number | null;
  peopleLow: number | null;
  peopleHigh: number | null;

  dataType: string;
}
