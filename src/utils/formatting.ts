export function formatToMillion(value: number): number {
  return Math.round((value / 1000000) * 100) / 100;
}
