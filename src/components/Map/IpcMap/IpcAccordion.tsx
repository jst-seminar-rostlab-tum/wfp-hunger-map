import AccordionContainer from '@/components/Accordions/AccordionContainer';
import IpcAccordionProps from '@/domain/props/IpcAccordionProps';

import IpcFoodSecurityAccordion from './IpcFoodSecurityAccordion';
import IpcNutritionAccordion from './IpcNutritionAccordion';

export default function IpcAccordion({ countryData, countryName, countryIso3Data }: IpcAccordionProps) {
  const deltaOneMonth = countryData?.fcsMinus1 ? countryData.fcs - countryData.fcsMinus1 : null;
  const deltaThreeMonth = countryData?.fcsMinus3 ? countryData.fcs - countryData.fcsMinus3 : null;

  const ipcFoodSecurityAccordion = IpcFoodSecurityAccordion({
    countryData,
    deltaOneMonth,
    deltaThreeMonth,
  });
  const ipcNutrititonAccordion = IpcNutritionAccordion({ countryIso3Data });

  return (
    <div className="absolute w-[370px] left-[108px] top-4 z-9999">
      <AccordionContainer
        title={countryName ?? undefined}
        accordionModalActive
        maxWidth={600}
        items={[ipcFoodSecurityAccordion, ipcNutrititonAccordion]}
        expandAll
      />
    </div>
  );
}
