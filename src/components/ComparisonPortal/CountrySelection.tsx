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
  disabledCountryIds,
}: CountrySelectionProps) {
  const selectedKeys = useMemo(
    () => selectedCountries?.map((country) => country.properties.adm0_id.toString()),
    [selectedCountries]
  );

  const availableCountries = useMemo(() => {
    return countryMapData.features.filter((country) => FcsChoroplethOperations.checkIfActive(country, globalFcsData));
  }, [countryMapData, globalFcsData]);

  const disabledKeys = useMemo(() => {
    if (!selectedCountries) return [];
    return availableCountries
      .filter(
        (country) =>
          // if there are already 5 selected countries, disable the rest
          selectedCountries.length >= 5 &&
          !selectedCountries.find(
            (selectedCountry) => selectedCountry.properties.adm0_id === country.properties.adm0_id
          )
      )
      .map((country) => country.properties.adm0_id.toString())
      .concat(disabledCountryIds);
  }, [selectedCountries, availableCountries, disabledCountryIds]);

  return (
    <div className="pb-4 space-y-6">
      <Select
        placeholder="Select up to 5 countries"
        aria-label="Select countries for comparison"
        selectionMode="multiple"
        onSelectionChange={(keys) =>
          CountrySelectionOperations.onSelectionChange(keys, setSelectedCountries, countryMapData)
        }
        defaultSelectedKeys={selectedKeys}
        selectedKeys={selectedKeys}
        disabledKeys={disabledKeys}
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
    </div>
  );
}
