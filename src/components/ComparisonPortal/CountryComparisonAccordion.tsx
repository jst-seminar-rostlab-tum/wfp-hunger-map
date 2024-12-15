'use client';

import { useEffect, useMemo, useState } from 'react';

import ComparisonAccordionSkeleton from '@/components/ComparisonPortal/ComparisonAccordionSkeleton';
import { useSnackbar } from '@/domain/contexts/SnackbarContext';
import { CountryMapData } from '@/domain/entities/country/CountryMapData';
import { useCountryDataListQuery, useCountryIso3DataListQuery } from '@/domain/hooks/countryHooks';
import { CountryComparisonOperations } from '@/operations/comparison-portal/CountryComparisonOperations';

import AccordionContainer from '../Accordions/AccordionContainer';

interface CountryComparisonAccordionProps {
  selectedCountries: CountryMapData[] | undefined;
}

export default function CountryComparisonAccordion({ selectedCountries }: CountryComparisonAccordionProps) {
  const [expandAll, setExpandAll] = useState(false);
  const { showSnackBar } = useSnackbar();

  const countryDataQuery = useCountryDataListQuery(
    selectedCountries?.map((country) => country.properties.adm0_id),
    (countryId) => {
      if (!selectedCountries) return;
      const countryName = CountryComparisonOperations.getCountryNameById(countryId, selectedCountries);
      CountryComparisonOperations.showDataNotFoundSnackBar(showSnackBar, countryName);
    }
  );

  const countryIso3DataQuery = useCountryIso3DataListQuery(
    selectedCountries?.map((country) => country.properties.iso3),
    (countryCode) => {
      if (!selectedCountries) return;
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

  const { countryDataList, countryIso3DataList } = useMemo(
    () => CountryComparisonOperations.getFilteredCountryData(countryDataQuery, countryIso3DataQuery),
    [countryDataQuery, countryIso3DataQuery]
  );

  const accordionItems = useMemo(() => {
    if (!selectedCountries) return undefined;
    const chartData = CountryComparisonOperations.getChartData(countryDataList, countryIso3DataList, selectedCountries);
    const selectedCountryNames = selectedCountries.map((country) => country.properties.adm0_name);
    return CountryComparisonOperations.getComparisonAccordionItems(chartData, selectedCountryNames, isLoading);
  }, [countryDataList, countryIso3DataList, selectedCountries]);

  if (!accordionItems || (countryDataList.length < 2 && isLoading)) return <ComparisonAccordionSkeleton />;

  if (countryDataList.length < 2) {
    return (
      <p className="pb-4">
        Select {countryDataList.length === 1 ? 'one additional country' : 'two or more countries'} to start a
        comparison.
      </p>
    );
  }

  return <AccordionContainer multipleSelectionMode loading={isLoading} expandAll={expandAll} items={accordionItems} />;
}
