'use client';

import { useMemo } from 'react';

import ComparisonAccordionSkeleton from '@/components/ComparisonPortal/ComparisonAccordionSkeleton';
import { useSnackbar } from '@/domain/contexts/SnackbarContext';
import { useCountryDataListQuery, useCountryIso3DataListQuery } from '@/domain/hooks/countryHooks';
import CountryComparisonAccordionProps from '@/domain/props/CountryComparisonAccordionProps';
import { CountryComparisonOperations } from '@/operations/comparison-portal/CountryComparisonOperations';

import AccordionContainer from '../Accordions/AccordionContainer';

export default function CountryComparisonAccordion({
  selectedCountries,
  setSelectedCountries,
}: CountryComparisonAccordionProps) {
  const { showSnackBar } = useSnackbar();

  const countryDataQuery = useCountryDataListQuery(
    // selected country ids
    selectedCountries?.map((country) => country.properties.adm0_id),
    // callback to show snackbar if data not found
    (invalidCountryId) => {
      if (!selectedCountries) return;
      const invalidCountryName = CountryComparisonOperations.getCountryNameById(invalidCountryId, selectedCountries);
      CountryComparisonOperations.showDataNotFoundSnackBar(showSnackBar, invalidCountryName);
      setSelectedCountries(selectedCountries.filter((country) => country.properties.adm0_id !== invalidCountryId));
    }
  );

  const countryIso3DataQuery = useCountryIso3DataListQuery(
    // selected country iso3 codes
    selectedCountries?.map((country) => country.properties.iso3),
    // callback to show snackbar if data not found
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

  return <AccordionContainer multipleSelectionMode loading={isLoading} items={accordionItems} />;
}
