'use client';

import { Select, SelectItem } from '@nextui-org/react';
import { useEffect, useMemo } from 'react';

import { CustomButton } from '@/components/Buttons/CustomButton';
import { useSnackbar } from '@/domain/contexts/SnackbarContext';
import { SNACKBAR_SHORT_DURATION } from '@/domain/entities/snackbar/Snackbar';
import { SnackbarPosition, SnackbarStatus } from '@/domain/enums/Snackbar';
import { useRegionDataQuery } from '@/domain/hooks/countryHooks';
import { RegionSelectionProps } from '@/domain/props/RegionSelectionProps';
import { CountryComparisonOperations } from '@/operations/comparison-portal/CountryComparisonOperations';
import { RegionSelectionOperations } from '@/operations/comparison-portal/RegionSelectionOperations';
import FcsChoroplethOperations from '@/operations/map/FcsChoroplethOperations';

import SelectionSkeleton from './CountrySelectSkeleton';

export default function RegionSelection({
  countryMapData,
  globalFcsData,
  selectedRegionComparisonCountry,
  setSelectedRegionComparisonCountry,
  selectedRegions,
  setSelectedRegions,
}: RegionSelectionProps): JSX.Element {
  const { data: regionData, isLoading, error } = useRegionDataQuery(Number(selectedRegionComparisonCountry));
  const nAvailableRegions = regionData?.features.length;

  const { showSnackBar } = useSnackbar();
  const availableCountries = useMemo(() => {
    return countryMapData.features.filter((country) => FcsChoroplethOperations.checkIfActive(country, globalFcsData));
  }, [countryMapData, globalFcsData]);

  useEffect(() => {
    if (error) {
      const errorCountryName = CountryComparisonOperations.getCountryNameById(
        Number(selectedRegionComparisonCountry),
        countryMapData.features
      );
      showSnackBar({
        message: `Error fetching region data for ${errorCountryName}`,
        status: SnackbarStatus.Error,
        position: SnackbarPosition.BottomMiddle,
        duration: SNACKBAR_SHORT_DURATION,
      });
    }
  }, [error]);

  return (
    <div className="pb-4 flex items-center gap-4 flex-wrap justify-end">
      <Select
        placeholder="Select a country for region comparison"
        aria-label="Select a country for region comparison"
        selectionMode="single"
        onSelectionChange={(keys) => setSelectedRegionComparisonCountry(keys.currentKey)}
        selectedKeys={selectedRegionComparisonCountry ? [selectedRegionComparisonCountry] : []}
        className="flex-1 basis-0"
        variant="faded"
        color="primary"
      >
        {availableCountries
          .sort((a, b) => a.properties.adm0_name.localeCompare(b.properties.adm0_name))
          .map((country) => (
            <SelectItem
              key={country.properties.adm0_id.toString()}
              aria-label={country.properties.adm0_name}
              className="transition-all hover:text-background dark:text-foreground"
            >
              {country.properties.adm0_name}
            </SelectItem>
          ))}
      </Select>
      {isLoading ? (
        <SelectionSkeleton />
      ) : (
        <Select
          placeholder="Select regions"
          aria-label="Select regions for comparison"
          selectionMode="multiple"
          onSelectionChange={(keys) => setSelectedRegions(Array.from(keys) as string[], nAvailableRegions)}
          selectedKeys={selectedRegions}
          className="flex-1 basis-0"
          variant="faded"
          color="primary"
          isDisabled={error !== null || !selectedRegionComparisonCountry}
          renderValue={(selectedItems) =>
            RegionSelectionOperations.regionSelectRenderValue(selectedItems, nAvailableRegions)
          }
        >
          {(regionData?.features || []).map((region) => (
            <SelectItem
              key={region.id}
              aria-label={region.properties.Name}
              className="transition-all hover:text-background dark:text-foreground"
            >
              {region.properties.Name}
            </SelectItem>
          ))}
        </Select>
      )}
      <div className="flex gap-4 flex-1 md:flex-initial">
        <CustomButton
          className="flex-1"
          variant="bordered"
          onClick={() => setSelectedRegions('all')}
          isDisabled={
            isLoading || selectedRegionComparisonCountry === undefined || selectedRegions.length === nAvailableRegions
          }
        >
          Select all
        </CustomButton>
        <CustomButton
          className="flex-1"
          variant="bordered"
          onClick={() => setSelectedRegions([])}
          isDisabled={isLoading || selectedRegionComparisonCountry === undefined || selectedRegions.length === 0}
        >
          Clear
        </CustomButton>
      </div>
    </div>
  );
}
