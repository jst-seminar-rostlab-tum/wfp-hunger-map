import { Select, SelectItem } from '@nextui-org/react';
import { useMemo } from 'react';

import { CountrySelectionProps } from '@/domain/props/CountrySelectionProps';
import { CountrySelectionOperations } from '@/operations/comparison-portal/CountrySelectionOperations';
import FcsChoroplethOperations from '@/operations/map/FcsChoroplethOperations';

import { CustomButton } from '../Buttons/CustomButton';

/**
 * A Select component that allows users to select up to 5 countries for comparison.
 * Allows selection from a list of countries that have active FCS data.
 * Since the api might not return data for all selected countries,
 * the component accepts disabledCountryIds to disable countries that have missing data.
 * @param {CountrySelectionProps} props Props for the CountrySelection component
 * @param {CountryMapDataWrapper} props.countryMapData Country map data
 * @param {GlobalFcsData} props.globalFcsData National FCS Data of all countries
 * @param {CountryMapData[] | undefined} props.selectedCountries Selected countries
 * @param {(countries: CountryMapData[]) => void} props.setSelectedCountries Function to set selected countries
 * @param {string[]} props.disabledCountryIds Ids of countries that cannot be selected
 * @returns {JSX.Element} The CountrySelection component
 */
export default function CountrySelection({
  countryMapData,
  globalFcsData,
  selectedCountries,
  setSelectedCountries,
  disabledCountryIds,
}: CountrySelectionProps): JSX.Element {
  const COUNTRY_LIMIT = 5;
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
          selectedCountries.length >= COUNTRY_LIMIT &&
          !selectedCountries.find(
            (selectedCountry) => selectedCountry.properties.adm0_id === country.properties.adm0_id
          )
      )
      .map((country) => country.properties.adm0_id.toString())
      .concat(disabledCountryIds);
  }, [selectedCountries, availableCountries, disabledCountryIds]);

  return (
    <div className="pb-4 flex items-center gap-4">
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
      <CustomButton
        variant="bordered"
        onClick={() => setSelectedCountries([])}
        isDisabled={selectedCountries === undefined || selectedCountries.length === 0}
      >
        Clear
      </CustomButton>
    </div>
  );
}
