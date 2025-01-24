'use client';

import { useMemo, useState } from 'react';

import ComparisonAccordionSkeleton from '@/components/ComparisonPortal/ComparisonAccordionSkeleton';
import ManyRegionsAlert from '@/components/ComparisonPortal/ManyRegionsAlert';
import { useRegionDataQuery } from '@/domain/hooks/countryHooks';
import { RegionComparisonAccordionProps } from '@/domain/props/RegionComparisonAccordionProps';
import { RegionComparisonOperations } from '@/operations/comparison-portal/RegionComparisonOperations';

import AccordionContainer from '../Accordions/AccordionContainer';

/**
 * The `CountryComparisonAccordion` component displays comparison accordion for selected regions.
 * Once a country is selected, it fetches all its regions once using the respective hook.
 * @param {string[] | 'all'} selectedRegions
 * @param {string | undefined} selectedRegionComparisonCountry
 */
export default function RegionComparisonAccordion({
  selectedRegions,
  selectedRegionComparisonCountry,
}: RegionComparisonAccordionProps) {
  const { data: regionData, isLoading } = useRegionDataQuery(Number(selectedRegionComparisonCountry ?? undefined));

  // TODO (F-254): Toggle this within the chart options. If the pie chart is selected, switch to false and hide the toggle button.
  const [showRelativeNumbers] = useState(false);

  const accordionItems = useMemo(() => {
    if (!regionData || !selectedRegions) return [];
    const chartData = RegionComparisonOperations.getChartData(regionData, selectedRegions, showRelativeNumbers);
    return RegionComparisonOperations.getComparisonAccordionItems(chartData, selectedRegions, regionData.features);
  }, [regionData, selectedRegions, showRelativeNumbers]);

  if (selectedRegions !== undefined && selectedRegions.length < 2) {
    return (
      <p className="pb-4">
        Select {selectedRegions?.length === 1 ? 'one additional region' : 'two or more regions'} to start a comparison.
      </p>
    );
  }

  const nSelectedRegions = selectedRegions === 'all' ? regionData?.features.length : selectedRegions?.length;

  if (!accordionItems || isLoading || regionData === undefined)
    return (
      <>
        <ManyRegionsAlert nSelectedRegions={nSelectedRegions} />
        <ComparisonAccordionSkeleton nItems={nSelectedRegions === undefined ? 3 : 2} />
      </>
    );

  return (
    <>
      <ManyRegionsAlert nSelectedRegions={nSelectedRegions} />
      <AccordionContainer multipleSelectionMode loading={isLoading} items={accordionItems} />
    </>
  );
}
