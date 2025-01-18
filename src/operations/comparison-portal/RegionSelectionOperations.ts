import { SelectedItems } from '@nextui-org/react';

export class RegionSelectionOperations {
  // selectedRegions contains all elements, never 'all'
  static regionSelectRenderValue(selectedRegions: SelectedItems, nAvailableRegions?: number) {
    if (selectedRegions.length === nAvailableRegions) return 'All regions';
    if (selectedRegions.length <= 3) {
      return selectedRegions.map((region) => region.rendered).join(', ');
    }
    return `${selectedRegions.length} out of ${nAvailableRegions ?? 0} regions`;
  }
}
