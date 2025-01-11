import { useMemo } from 'react';

import AccordionContainer from '@/components/Accordions/AccordionContainer';
import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { useCountryDataQuery, useCountryIso3DataQuery } from '@/domain/hooks/countryHooks';
import IpcAccordionProps from '@/domain/props/IpcAccordionProps';
import { IpcFoodSecurityAccordionOperations } from '@/operations/map/IpcFoodSecurityOperations';
import { useMediaQuery } from '@/utils/resolution.ts';

export default function IpcAccordion({ countryMapData }: IpcAccordionProps) {
  const { selectedCountryId } = useSelectedCountryId();

  const { selectedCountryIso3, selectedCountryName } = useMemo(() => {
    const selectedCountry = countryMapData.features.find((country) => country.properties.adm0_id === selectedCountryId);
    if (!selectedCountry) return {};
    return {
      selectedCountryIso3: selectedCountry.properties.iso3,
      selectedCountryName: selectedCountry.properties.adm0_name,
    };
  }, [countryMapData, selectedCountryId]);

  const { data: countryData, isLoading: countryDataLoading } = useCountryDataQuery(selectedCountryId!);
  const { data: countryIso3Data, isLoading: iso3DataLoading } = useCountryIso3DataQuery(selectedCountryIso3!);

  const deltaOneMonth = countryData?.fcsMinus1 ? countryData.fcs - countryData.fcsMinus1 : null;
  const deltaThreeMonth = countryData?.fcsMinus3 ? countryData.fcs - countryData.fcsMinus3 : null;
  const foodSecurityAccordionItems = IpcFoodSecurityAccordionOperations.getFoodSecurityAccordionItems(
    countryData,
    deltaOneMonth,
    deltaThreeMonth
  );
  const nutrititonAccordionItems = IpcFoodSecurityAccordionOperations.getNutritionAccordionItems(countryIso3Data);
  const isMobile = useMediaQuery('(max-width: 700px)');

  return (
    <div className="absolute w-[350px] left-[108px] top-4 z-9999">
      <AccordionContainer
        title={selectedCountryName}
        accordionModalActive
        maxWidth={600}
        loading={iso3DataLoading || countryDataLoading}
        items={[foodSecurityAccordionItems, nutrititonAccordionItems]}
        multipleSelectionMode={!isMobile}
        expandAll={!isMobile && !countryDataLoading && !iso3DataLoading}
      />
    </div>
  );
}
