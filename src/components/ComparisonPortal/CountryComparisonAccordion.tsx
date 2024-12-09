'use client';

import { Spacer } from '@nextui-org/react';
import { useMemo, useState } from 'react';

import CustomInfoCircle from '@/components/CustomInfoCircle/CustomInfoCircle';
import { CountryDataRecord } from '@/domain/entities/country/CountryData';
import { CountryIso3DataRecord } from '@/domain/entities/country/CountryIso3Data.ts';
import { CountryMapData } from '@/domain/entities/country/CountryMapData';
import { useCountryDataListQuery, useCountryIso3DataListQuery } from '@/domain/hooks/countryHooks';
import { CountryComparisonOperations } from '@/operations/comparison-portal/CountryComparisonOperations';
import { FcsAccordionOperations } from '@/operations/map/FcsAccordionOperations';

import AccordionContainer from '../Accordions/AccordionContainer';
import CustomAlert from '../Alert/Alert';
import { LineChart } from '../Charts/LineChart';

interface CountryComparisonAccordionProps {
  selectedCountries: CountryMapData[];
}

export default function CountryComparisonAccordion({ selectedCountries }: CountryComparisonAccordionProps) {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  // TODO: merge useMemo calls below
  // TODO: merge error messages and show actual country
  // TODO @Bohdan: rename this to sth like countryDataQuery to distinct from below
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

  const countryIso3DataQuery = useCountryIso3DataListQuery(
    selectedCountries.map((country) => country.properties.iso3),
    (countryCode) => {
      setErrorMessages((prev) => [...prev, `Error fetching data for country ${countryCode}`]);
    }
  );
  const countryIso3DataList: CountryIso3DataRecord[] = useMemo(() => {
    return countryIso3DataQuery
      .map((result) => result.data)
      .filter((data): data is CountryIso3DataRecord => data !== null && data !== undefined);
  }, [countryIso3DataQuery]);

  // TODO: merge useMemo calls into one
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
  const importDependencyBarChartData = useMemo(() => {
    return countryDataList.length > 1
      ? CountryComparisonOperations.getImportDependencyBarChartData(countryDataList, selectedCountries)
      : undefined;
  }, [countryDataList]);
  const balanceOfTradeData = useMemo(() => {
    return countryIso3DataList.length > 1
      ? CountryComparisonOperations.getBalanceOfTradeData(countryIso3DataList, selectedCountries)
      : undefined;
  }, [countryDataList]);
  const headlineInflationData = useMemo(() => {
    return countryIso3DataList.length > 1
      ? CountryComparisonOperations.getInflationData(countryIso3DataList, selectedCountries, 'headline')
      : undefined;
  }, [countryDataList]);
  const foodInflationData = useMemo(() => {
    return countryIso3DataList.length > 1
      ? CountryComparisonOperations.getInflationData(countryIso3DataList, selectedCountries, 'food')
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
          expandAll
          // TODO: extract these items into the const folder
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
            {
              title: 'Import Dependency',
              infoIcon: <CustomInfoCircle />,
              popoverInfo: FcsAccordionOperations.getMacroEconomicPopoverInfo(),
              content: (
                <div>
                  {importDependencyBarChartData && (
                    <LineChart data={importDependencyBarChartData} expandable small noPadding transparentBackground />
                  )}
                </div>
              ),
            },
            {
              title: 'Balance of Trade',
              infoIcon: <CustomInfoCircle />,
              popoverInfo: FcsAccordionOperations.getBalanceOfTradePopoverInfo(),
              content: (
                <div>
                  {balanceOfTradeData && (
                    <LineChart data={balanceOfTradeData} expandable small noPadding transparentBackground />
                  )}
                </div>
              ),
            },
            {
              title: 'Food and Headline Inflation',
              infoIcon: <CustomInfoCircle />,
              popoverInfo: FcsAccordionOperations.getHeadlineAndFoodInflationPopoverInfo(),
              content: (
                <div>
                  {headlineInflationData && (
                    <LineChart
                      title="Headline Inflation"
                      data={headlineInflationData}
                      expandable
                      small
                      noPadding
                      transparentBackground
                    />
                  )}
                  {foodInflationData && (
                    <LineChart
                      title="Food Inflation"
                      data={foodInflationData}
                      expandable
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
