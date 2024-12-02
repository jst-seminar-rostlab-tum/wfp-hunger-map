export function formatToMillion(value: number | undefined | null): number | undefined {
  if (value === undefined) return undefined;
  if (value === null) return undefined;
  return Math.round((value / 1000000) * 100) / 100;
}
