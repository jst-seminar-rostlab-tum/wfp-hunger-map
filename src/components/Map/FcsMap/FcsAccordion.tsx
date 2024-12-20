import FcsAccordionProps from '@/domain/props/FcsAccordionProps';
import { FcsFoodSecurityOperations } from '@/operations/map/FcsFoodSecurityOperations';
import { FcsMacroEconomicOperations } from '@/operations/map/FcsMacroEconomicOperations';
import { useMediaQuery } from '@/utils/resolution.ts';

import AccordionContainer from '../../Accordions/AccordionContainer';

export default function FcsAccordion({ countryData, loading, countryIso3Data, countryName }: FcsAccordionProps) {
  const isMobile = useMediaQuery('(max-width: 700px)');
  const foodSecurityAccordionItems = FcsFoodSecurityOperations.getFcsFoodSecurityAccordionItems(
    countryData,
    countryIso3Data
  );
  const macroEconomicAccordionItems = FcsMacroEconomicOperations.getMacroEconomicAccordionItems(
    countryData,
    countryIso3Data
  );

  return isMobile ? (
    <div className="absolute w-[350px] left-[108px] top-4 z-9999">
      <AccordionContainer
        loading={loading}
        title={countryName}
        accordionModalActive
        maxWidth={600}
        items={[...foodSecurityAccordionItems, ...macroEconomicAccordionItems]}
      />
    </div>
  ) : (
    <>
      <div className="absolute w-[310px] left-[108px] top-4 z-9999 overflow-y-scroll max-h-screen">
        <AccordionContainer
          loading={loading}
          title={countryName}
          multipleSelectionMode
          accordionModalActive
          maxWidth={600}
          items={foodSecurityAccordionItems}
          expandAll
        />
      </div>
      <div className="absolute w-[300px] right-[1rem] inset-y-24 z-9999">
        <AccordionContainer loading={loading} accordionModalActive maxWidth={600} items={macroEconomicAccordionItems} />
      </div>
    </>
  );
}
