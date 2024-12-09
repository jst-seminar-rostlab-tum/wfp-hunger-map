'use client';

import { Select, SelectItem } from '@nextui-org/react';
import { useMemo } from 'react';

import { CountrySelectionProps } from '@/domain/props/CountrySelectionProps';
import { CountrySelectionOperations } from '@/operations/comparison-portal/CountrySelectionOperations';
import FcsChoroplethOperations from '@/operations/map/FcsChoroplethOperations';

export default function CountrySelection({
  countryMapData,
  globalFcsData,
  selectedCountries,
  setSelectedCountries,
}: CountrySelectionProps) {
  const disabledKeys = useMemo(() => {
    return countryMapData.features
      .filter(
        (country) =>
          // filter out countries that don't have fcs data
          !FcsChoroplethOperations.checkIfActive(country, globalFcsData) ||
          // if there are already 5 selected countries, disable the rest
          (selectedCountries.length >= 5 &&
            !selectedCountries.find(
              (selectedCountry) => selectedCountry.properties.adm0_id === country.properties.adm0_id
            ))
      )
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
