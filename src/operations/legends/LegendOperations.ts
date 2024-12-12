import { GradientLegendContainerItem } from '@/domain/props/GradientLegendContainerItem.ts';

export class LegendOperations {
  static isGradientLegendContainerItem(value: unknown): value is GradientLegendContainerItem {
    if (typeof value !== 'object' || value === null) {
      return false;
    }
    return (
      Array.isArray((value as GradientLegendContainerItem).colorsData) &&
      (value as GradientLegendContainerItem).colorsData.every((colorsData) => typeof colorsData.color === 'string')
    );
  }
}
