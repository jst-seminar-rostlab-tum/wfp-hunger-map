/**
 * Converts a tailwind color variable to its hex format
 * @param colorVariable a TailwindCSS color parameter
 * @returns the color in hex format, as a string
 */
export const getTailwindColor = (colorVariable: string): string => {
  if (typeof window === 'undefined' || !document || !document.documentElement) {
    return '';
  }
  const [hue, saturation, lightness] = getComputedStyle(document.documentElement)
    .getPropertyValue(colorVariable)
    .split(' ');
  return `hsl(${hue}, ${saturation}, ${lightness})`;
};
