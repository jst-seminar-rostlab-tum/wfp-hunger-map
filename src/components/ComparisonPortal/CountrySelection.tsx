'use client';

import { Autocomplete, AutocompleteItem, Button } from '@nextui-org/react';
import { Forbidden2 } from 'iconsax-react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { GlobalFcsData } from '@/domain/entities/country/CountryFcsData';
import { CountryMapData, CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';

interface CountrySelectionProps {
  countryMapData: CountryMapDataWrapper;
  globalFcsData: GlobalFcsData;
  selectedCountries: CountryMapData[];
  setSelectedCountries: (countries: CountryMapData[]) => void;
}

export default function CountrySelection({
  countryMapData,
  globalFcsData,
  selectedCountries,
  setSelectedCountries,
}: CountrySelectionProps) {
  const [autocompletes, setAutocompletes] = useState<number[]>([0]);

  const handleCountrySelect = (index: number, countryId: string) => {
    const selectedCountry = countryMapData.features.find(
      (feature) => feature.properties.adm0_id.toString() === countryId
    );

    if (selectedCountry) {
      const updatedCountries = [...selectedCountries];
      updatedCountries[index] = selectedCountry;

      setSelectedCountries(updatedCountries);
    }
  };

  const addAutocomplete = () => {
    if (autocompletes.length < 5) {
      setAutocompletes([...autocompletes, autocompletes.length]);
    }
  };

  const removeAutocomplete = (index: number) => {
    const updatedAutocompletes = autocompletes.filter((_, i) => i !== index);
    const updatedCountries = selectedCountries.filter((_, i) => i !== index);

    setAutocompletes(updatedAutocompletes);
    setSelectedCountries(updatedCountries);
  };

  const isLastCountrySelected = () => {
    const lastIndex = autocompletes.length - 1;
    return !!selectedCountries[lastIndex];
  };

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-4">
        {autocompletes.map((_, autocompleteIndex) => (
          <div key={uuid()} className="flex items-center space-x-2">
            <Autocomplete
              placeholder="Search a country"
              onSelectionChange={(key) => handleCountrySelect(autocompleteIndex, key as string)}
              className="w-full"
              classNames={{ popoverContent: 'bg-clickableSecondary' }}
              variant="faded"
              color="primary"
              selectedKey={
                selectedCountries[autocompleteIndex]?.properties?.adm0_id
                  ? selectedCountries[autocompleteIndex].properties.adm0_id.toString()
                  : ''
              }
              disabledKeys={countryMapData.features
                .filter((country) => !globalFcsData[country.properties.adm0_id]?.fcs)
                .map((country) => country.properties.adm0_id.toString())
                .concat(selectedCountries.map((country) => country.properties.adm0_id.toString()))}
            >
              {countryMapData.features
                .sort((a, b) => a.properties.adm0_name.localeCompare(b.properties.adm0_name))
                .map((country) => (
                  <AutocompleteItem
                    key={country.properties.adm0_id.toString()}
                    aria-label={country.properties.adm0_name}
                    className="transition-all hover:text-background dark:text-foreground"
                  >
                    {country.properties.adm0_name}
                  </AutocompleteItem>
                ))}
            </Autocomplete>

            {/* Add Button */}
            {autocompleteIndex === autocompletes.length - 1 && autocompletes.length < 5 && (
              <Button
                size="sm"
                variant="flat"
                color="primary"
                className="ml-2"
                onClick={addAutocomplete}
                isDisabled={!isLastCountrySelected()} // Disable if the last country isn't selected
              >
                + Add Country
              </Button>
            )}

            {/* Remove Button */}
            {autocompleteIndex > 0 && autocompleteIndex !== autocompletes.length - 1 && (
              <Button
                size="sm"
                variant="flat"
                color="danger"
                className="ml-2"
                onClick={() => removeAutocomplete(autocompleteIndex)}
                isIconOnly
              >
                <Forbidden2 size="20" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
