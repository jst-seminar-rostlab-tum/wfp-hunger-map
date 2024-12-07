'use client';

import { Select, SelectItem } from '@nextui-org/react';
import { useMemo } from 'react';

import { CountrySelectionProps } from '@/domain/props/CountrySelectionProps';
import { CountrySelectionOperations } from '@/operations/comparison-portal/CountrySelectionOperations';

export default function CountrySelection({
  countryMapData,
  globalFcsData,
  selectedCountries,
  setSelectedCountries,
}: CountrySelectionProps) {
  const disabledKeys = useMemo(() => {
    return countryMapData.features
      .filter((country) => !globalFcsData[country.properties.adm0_id]?.fcs || selectedCountries.length >= 5)
      .map((country) => country.properties.adm0_id.toString());
  }, [countryMapData, globalFcsData, selectedCountries]);

  return (
    <div className="pb-4 space-y-6">
      <Select
        placeholder="Select up to 5 countries"
        aria-label="Select countries for comparison"
        selectionMode="multiple"
        onSelectionChange={(keys) =>
          CountrySelectionOperations.onSelectionChange(keys, setSelectedCountries, countryMapData)
        }
        disabledKeys={disabledKeys}
        className="w-full"
        variant="faded"
        color="primary"
      >
        {countryMapData.features
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
    </div>
  );
}
