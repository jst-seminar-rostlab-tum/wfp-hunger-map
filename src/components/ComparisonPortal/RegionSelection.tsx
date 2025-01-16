import { Select, SelectItem } from '@nextui-org/react';
import { useMemo } from 'react';

import { GlobalFcsData } from '@/domain/entities/country/CountryFcsData';
import { CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';
import { useRegionDataQuery } from '@/domain/hooks/countryHooks';
import FcsChoroplethOperations from '@/operations/map/FcsChoroplethOperations';

import SelectionSkeleton from './CountrySelectSkeleton';

interface RegionSelectionProps {
  countryMapData: CountryMapDataWrapper;
  globalFcsData: GlobalFcsData;
  selectedRegionComparisonCountry: string | undefined;
  setSelectedRegionComparisonCountry: (country: string | undefined) => void;
  selectedRegions: string[];
  setSelectedRegions: (regions: string[]) => void;
}

export default function RegionSelection({
  countryMapData,
  globalFcsData,
  selectedRegionComparisonCountry,
  setSelectedRegionComparisonCountry,
  selectedRegions,
  setSelectedRegions,
}: RegionSelectionProps): JSX.Element {
  const availableCountries = useMemo(() => {
    return countryMapData.features.filter((country) => FcsChoroplethOperations.checkIfActive(country, globalFcsData));
  }, [countryMapData, globalFcsData]);

  const { data: regionData, isLoading } = useRegionDataQuery(Number(selectedRegionComparisonCountry));

  return (
    <div className="pb-4 flex items-center gap-4">
      <Select
        placeholder="Select a country for region comparison"
        aria-label="Select a country for region comparison"
        selectionMode="single"
        onSelectionChange={(keys) => setSelectedRegionComparisonCountry(keys.currentKey)}
        selectedKeys={selectedRegionComparisonCountry ? [selectedRegionComparisonCountry] : []}
        className="w-full"
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
          onSelectionChange={(keys) => setSelectedRegions(Array.from(keys) as string[])}
          selectedKeys={selectedRegions}
          className="w-full"
          variant="faded"
          color="primary"
          isDisabled={!selectedRegionComparisonCountry}
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
    </div>
  );
}
