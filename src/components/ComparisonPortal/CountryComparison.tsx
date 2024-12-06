'use client';

import { Spacer } from '@nextui-org/react';
import { useEffect, useState } from 'react';

import { LineChartData } from '@/domain/entities/charts/LineChartData';
import { GlobalFcsData } from '@/domain/entities/country/CountryFcsData';
import { CountryMapData, CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';
import {
  CountryComparisonOperations,
  CountryDataRecord,
  CountryIso3DataRecord,
} from '@/operations/comparison-portal/CountryComparisonOperations';

import AccordionContainer from '../Accordions/AccordionContainer';
import { LineChart } from '../Charts/LineChart';
import CountrySelection from './CountrySelection';

interface CountryComparisonProps {
  countryMapData: CountryMapDataWrapper;
  globalFcsData: GlobalFcsData;
}

export default function CountryComparison({ countryMapData, globalFcsData }: CountryComparisonProps) {
  const [selectedCountries, setSelectedCountries] = useState<CountryMapData[]>([]);
  const [countryDataList, setCountryDataList] = useState<CountryDataRecord[]>();
  const [countryIso3DataList, serCountryIso3DataList] = useState<CountryIso3DataRecord[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fcsChartData, setFcsChartData] = useState<LineChartData>();
  const [rcsiChartData, setRcsiChartData] = useState<LineChartData>();

  useEffect(() => {
    if (selectedCountries.length > 1) {
      CountryComparisonOperations.fetchComparisonData(
        selectedCountries,
        setCountryDataList,
        serCountryIso3DataList,
        setIsLoading
      );
    }
  }, [selectedCountries]);

  useEffect(() => {
    if (countryDataList) {
      setFcsChartData(CountryComparisonOperations.getFcsChartData(countryDataList));
      setRcsiChartData(CountryComparisonOperations.getRcsiChartData(countryDataList));
    }
  }, [countryDataList]);

  return (
    <div>
      <CountrySelection
        countryMapData={countryMapData}
        globalFcsData={globalFcsData}
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
                      {countryDataList?.length}
                      {countryIso3DataList?.length}
                    </div>
                  </div>
                ),
              },
              {
                title: 'Food Security Trends',
                content: (
                  <div>
                    {fcsChartData && (
                      <LineChart
                        title="Trend of the number of people with insufficient food consumption"
                        data={fcsChartData}
                        expandable
                        xAxisSlider
                        small
                        noPadding
                        transparentBackground
                      />
                    )}
                    <Spacer y={6} />
                    {rcsiChartData && (
                      <LineChart
                        title="Trend of the number of people using crisis or above crisis food-based coping"
                        data={rcsiChartData}
                        expandable
                        xAxisSlider
                        small
                        noPadding
                        transparentBackground
                      />
                    )}
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
