'use client';

import { Spacer } from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';

import CustomInfoCircle from '@/components/CustomInfoCircle/CustomInfoCircle';
import { useSnackbar } from '@/domain/contexts/SnackbarContext';
import { CountryMapData } from '@/domain/entities/country/CountryMapData';
import { useCountryDataListQuery, useCountryIso3DataListQuery } from '@/domain/hooks/countryHooks';
import { CountryComparisonOperations } from '@/operations/comparison-portal/CountryComparisonOperations';
import { FcsAccordionOperations } from '@/operations/map/FcsAccordionOperations';

import AccordionContainer from '../Accordions/AccordionContainer';
import { LineChart } from '../Charts/LineChart';

interface CountryComparisonAccordionProps {
  selectedCountries: CountryMapData[];
}

export default function CountryComparisonAccordion({ selectedCountries }: CountryComparisonAccordionProps) {
  const [expandAll, setExpandAll] = useState(false);
  const { showSnackBar } = useSnackbar();

  const countryDataQuery = useCountryDataListQuery(
    selectedCountries.map((country) => country.properties.adm0_id),
    (countryId) => {
      const countryName = CountryComparisonOperations.getCountryNameById(countryId, selectedCountries);
      CountryComparisonOperations.showDataNotFoundSnackBar(showSnackBar, countryName);
    }
  );

  const countryIso3DataQuery = useCountryIso3DataListQuery(
    selectedCountries.map((country) => country.properties.iso3),
    (countryCode) => {
      const countryName = CountryComparisonOperations.getCountryNameByIso3(countryCode, selectedCountries);
      CountryComparisonOperations.showDataNotFoundSnackBar(showSnackBar, countryName);
    }
  );

  const isLoading = useMemo(() => {
    return (
      countryDataQuery.some((result) => result.isLoading) || countryIso3DataQuery.some((result) => result.isLoading)
    );
  }, [countryDataQuery, countryIso3DataQuery]);

  useEffect(() => {
    // expand all items only after the first load
    if (!expandAll && !isLoading) setExpandAll(true);
  }, [isLoading]);

  const { countryDataList, countryIso3DataList } = useMemo(() => {
    return CountryComparisonOperations.getFilteredCountryData(countryDataQuery, countryIso3DataQuery);
  }, [countryDataQuery, countryIso3DataQuery]);

  const {
    fcsChartData,
    rcsiChartData,
    foodSecurityBarChartData,
    importDependencyBarChartData,
    balanceOfTradeData,
    headlineInflationData,
    foodInflationData,
  } = useMemo(() => {
    return CountryComparisonOperations.getChartData(countryDataList, countryIso3DataList, selectedCountries);
  }, [countryDataList, countryIso3DataList, selectedCountries]);

  return countryDataList.length > 1 ? (
    <div>
      <AccordionContainer
        loading={isLoading}
        expandAll={expandAll}
        // TODO: extract these items into the const folder
        items={[
          {
            title: 'Food Security',
            content: (
              <div>
                {foodSecurityBarChartData && (
                  <LineChart
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
    </div>
  ) : (
    <p className="pb-4">
      Select {countryDataList.length === 1 ? 'one additional country' : 'two or more countries'} to start a comparison.
    </p>
  );
}
