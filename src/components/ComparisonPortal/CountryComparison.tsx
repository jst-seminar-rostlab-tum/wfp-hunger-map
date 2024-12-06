'use client';

import { useEffect, useState } from 'react';

import { CountryData } from '@/domain/entities/country/CountryData';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data';
import { CountryMapData, CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';
import { CountryComparisonOperations } from '@/operations/comparison-portal/CountryComparisonOperations';

import AccordionContainer from '../Accordions/AccordionContainer';
import CountrySelection from './CountrySelection';

interface CountryComparisonProps {
  countryMapData: CountryMapDataWrapper;
}

export default function CountryComparison({ countryMapData }: CountryComparisonProps) {
  const [selectedCountries, setSelectedCountries] = useState<CountryMapData[]>([]);
  const [countryData, setCountryData] = useState<CountryData[]>();
  const [countryIso3Data, setCountryIso3Data] = useState<CountryIso3Data[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selectedCountries.length > 1) {
      setIsLoading(true);
      CountryComparisonOperations.fetchComparisonData(selectedCountries, setCountryData, setCountryIso3Data);
      setIsLoading(false);
    }
  }, [selectedCountries]);
  return (
    <div>
      <CountrySelection
        countryMapData={countryMapData}
        selectedCountries={selectedCountries}
        setSelectedCountries={setSelectedCountries}
      />
      {selectedCountries.length > 1 && (
        <div>
          <AccordionContainer
            loading={isLoading}
            items={[
              {
                title: 'Food Security',
                content: (
                  <div>
                    <p>Food security content</p>
                    <div>
                      {countryData?.length}
                      {countryIso3Data?.length}
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}
