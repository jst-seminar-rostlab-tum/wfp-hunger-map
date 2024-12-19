import FcsAccordionProps from '@/domain/props/FcsAccordionProps';
import { FcsFoodSecurityOperations } from '@/operations/map/FcsFoodSecurityOperations';
import { FcsMacroEconomicOperations } from '@/operations/map/FcsMacroEconomicOperations';
import { useMediaQuery } from '@/utils/resolution.ts';

import AccordionContainer from '../../Accordions/AccordionContainer';

export default function FcsAccordion({ countryData, loading, countryIso3Data, countryName }: FcsAccordionProps) {
  const isMobile = useMediaQuery('(max-width: 700px)');
  const foodSecurityAccordion = FcsFoodSecurityOperations.getFcsFoodSecurityAccordionItems(
    countryData,
    countryIso3Data
  );
  const macroEconomicAccordion = FcsMacroEconomicOperations.getMacroEconomicAccordionItems(
    countryData,
    countryIso3Data
  );

  return (
    <>
      {isMobile && (
        <div className="absolute w-[350px] left-[108px] top-4 z-9999">
          <AccordionContainer
            loading={loading}
            title={countryName}
            accordionModalActive
            maxWidth={600}
            items={[...foodSecurityAccordion, ...macroEconomicAccordion]}
          />
        </div>
      )}
      : (
      <div className="absolute w-[300px] left-[108px] top-4 z-9999 overflow-visible overflow-y-auto h-screen">
        <AccordionContainer
          loading={loading}
          title={countryName}
          multipleSelectionMode
          accordionModalActive
          maxWidth={600}
          items={foodSecurityAccordion}
          expandAll
        />
      </div>
      )
      {!isMobile && (
        <div className="absolute w-[300px] right-[1rem] inset-y-24 z-9999">
          <AccordionContainer loading={loading} accordionModalActive maxWidth={600} items={macroEconomicAccordion} />
        </div>
      )}
    </>
  );
}
