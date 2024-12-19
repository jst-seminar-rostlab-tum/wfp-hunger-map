import AccordionContainer from '@/components/Accordions/AccordionContainer';
import IpcAccordionProps from '@/domain/props/IpcAccordionProps';
import { IpcFoodSecurityAccordionOperations } from '@/operations/map/IpcFoodSecurityOperations';
import { useMediaQuery } from '@/utils/resolution.ts';

export default function IpcAccordion({ countryData, countryName, countryIso3Data }: IpcAccordionProps) {
  const deltaOneMonth = countryData?.fcsMinus1 ? countryData.fcs - countryData.fcsMinus1 : null;
  const deltaThreeMonth = countryData?.fcsMinus3 ? countryData.fcs - countryData.fcsMinus3 : null;

  const ipcFoodSecurityAccordion = IpcFoodSecurityAccordionOperations.getFoodSecurityAccordionItems(
    countryData,
    deltaOneMonth,
    deltaThreeMonth
  );
  const ipcNutrititonAccordion = IpcFoodSecurityAccordionOperations.getNutritionAccordion(countryIso3Data);
  const isMobile = useMediaQuery('(max-width: 700px)');

  return (
    <div className="absolute w-[300px] left-[108px] top-4 z-9999">
      <AccordionContainer
        title={countryName}
        accordionModalActive
        maxWidth={600}
        items={[ipcFoodSecurityAccordion, ipcNutrititonAccordion]}
        expandAll={!isMobile}
      />
    </div>
  );
}
