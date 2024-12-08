'use client';

import { Spacer } from '@nextui-org/react';
import { useMemo, useState } from 'react';

import { CountryDataRecord } from '@/domain/entities/country/CountryData';
import { CountryMapData } from '@/domain/entities/country/CountryMapData';
import { useCountryDataListQuery } from '@/domain/hooks/countryHooks';
import { CountryComparisonOperations } from '@/operations/comparison-portal/CountryComparisonOperations';

import AccordionContainer from '../Accordions/AccordionContainer';
import CustomAlert from '../Alert/Alert';
import { LineChart } from '../Charts/LineChart';

interface CountryComparisonAccordionProps {
  selectedCountries: CountryMapData[];
}

export default function CountryComparisonAccordion({ selectedCountries }: CountryComparisonAccordionProps) {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const queryResultList = useCountryDataListQuery(
    selectedCountries.map((country) => country.properties.adm0_id),
    (countryId) => {
      setErrorMessages((prev) => [...prev, `Error fetching data for country ${countryId}`]);
    }
  );
  const isLoading = useMemo(() => {
    return queryResultList.some((result) => result.isLoading);
  }, [queryResultList]);
  const countryDataList: CountryDataRecord[] = useMemo(() => {
    return queryResultList
      .map((result) => result.data)
      .filter((data): data is CountryDataRecord => data !== null && data !== undefined);
  }, [queryResultList]);
  const fcsChartData = useMemo(() => {
    return countryDataList.length > 1
      ? CountryComparisonOperations.getFcsChartData(countryDataList, selectedCountries)
      : undefined;
  }, [countryDataList]);
  const rcsiChartData = useMemo(() => {
    return countryDataList.length > 1
      ? CountryComparisonOperations.getRcsiChartData(countryDataList, selectedCountries)
      : undefined;
  }, [countryDataList]);
  const foodSecurityBarChartData = useMemo(() => {
    return countryDataList.length > 1
      ? CountryComparisonOperations.getFoodSecurityBarChartData(countryDataList, selectedCountries)
      : undefined;
  }, [countryDataList]);

  return (
    <div>
      {errorMessages.map((message) => (
        // TODO: integrate snackbar instead of alert - depends on f-129
        <CustomAlert className="py-2" description={message} title="Error" />
      ))}
      {countryDataList.length > 1 && (
        <AccordionContainer
          loading={isLoading}
          items={[
            {
              title: 'Food Security',
              content: (
                <div>
                  {foodSecurityBarChartData && (
                    <LineChart
                      title="Food Security"
                      data={foodSecurityBarChartData}
                      expandable
                      small
                      noPadding
                      transparentBackground
                      // TODO: f-165 barChartOnly
                    />
                  )}
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
      )}
    </div>
  );
}
