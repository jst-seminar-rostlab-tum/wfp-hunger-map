'use client';

import { useMemo, useState } from 'react';

import ComparisonAccordionSkeleton from '@/components/ComparisonPortal/ComparisonAccordionSkeleton';
import { useRegionDataQuery } from '@/domain/hooks/countryHooks';
import { RegionComparisonAccordionProps } from '@/domain/props/RegionComparisonAccordionProps';
import { RegionComparisonOperations } from '@/operations/comparison-portal/RegionComparisonOperations';

import AccordionContainer from '../Accordions/AccordionContainer';

// Uganda has the most regions (112) -> stress test:
// http://localhost:3000/comparison-portal?tab=region&regionComparisonCountry=253&regions=8705%2C8704%2C8703%2C8702%2C8118%2C7949%2C7921%2C7922%2C7920%2C7919%2C7918%2C7917%2C7916%2C7886%2C7885%2C7884%2C7856%2C7849%2C7845%2C7844%2C7843%2C7842%2C7841%2C7835%2C7834%2C7833%2C7830%2C7829%2C7828%2C7826%2C7827%2C7825%2C7824%2C7783%2C7781%2C7779%2C7743%2C7742%2C7741%2C7740%2C7739%2C7736%2C7737%2C7726%2C7709%2C7707%2C7706%2C7703%2C7702%2C7700%2C7699%2C7322%2C7319%2C7318%2C7316%2C7312%2C7310%2C7306%2C7305%2C7303%2C7304%2C7301%2C7302%2C7278%2C7265%2C7264%2C7263%2C7262%2C7254%2C7253%2C7239%2C7238%2C7236%2C7237%2C7235%2C7234%2C7232%2C7231%2C7222%2C7221%2C7220%2C7212%2C7211%2C7210%2C7209%2C7208%2C7197%2C7183%2C7182%2C7181%2C7180%2C7178%2C7166%2C7179%2C7165%2C7164%2C7163%2C7162%2C7161%2C7160%2C7158%2C7157%2C7156%2C7155%2C7154%2C7153%2C7152%2C7151%2C7150%2C7149%2C7148

export default function RegionComparisonAccordion({
  selectedRegions,
  selectedRegionComparisonCountry,
}: RegionComparisonAccordionProps) {
  const { data: regionData, isLoading } = useRegionDataQuery(Number(selectedRegionComparisonCountry));

  // TODO: Toggle this within the chart options. If the pie chart is selected, switch to false and hide the toggle button.
  const [showRelativeNumbers] = useState(false);

  const accordionItems = useMemo(() => {
    const chartData = RegionComparisonOperations.getChartData(regionData, selectedRegions, showRelativeNumbers);
    return RegionComparisonOperations.getComparisonAccordionItems(chartData);
  }, [regionData, selectedRegions, showRelativeNumbers]);

  if (!accordionItems || isLoading) return <ComparisonAccordionSkeleton nItems={2} />;

  if (selectedRegions.length < 2) {
    return (
      <p className="pb-4">
        Select {selectedRegions.length === 1 ? 'one additional region' : 'two or more regions'} to start a comparison.
      </p>
    );
  }

  return <AccordionContainer multipleSelectionMode loading={isLoading} items={accordionItems} />;
}
