export interface GradientLegendItem {
  startColor: string;
  middleColor?: string;
  endColor: string;
  title: string;
  startLabel: string;
  endLabel: string;
  tooltipInfo?: string;
}

export function isGradientLegendItem(value: unknown): value is GradientLegendItem {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const item = value as GradientLegendItem;
  return (
    typeof item.startColor === 'string' &&
    (typeof item.middleColor === 'string' || item.middleColor === undefined) &&
    typeof item.endColor === 'string' &&
    typeof item.title === 'string' &&
    typeof item.startLabel === 'string' &&
    typeof item.endLabel === 'string' &&
    (typeof item.tooltipInfo === 'string' || item.tooltipInfo === undefined)
  );
}
