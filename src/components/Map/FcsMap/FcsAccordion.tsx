import FcsAccordionProps from '@/domain/props/FcsAccordionProps';
import { useMediaQuery } from '@/utils/resolution.ts';

import AccordionContainer from '../../Accordions/AccordionContainer';
import FcsFoodSecurityAccordion from './FcsFoodSecurityAccordion';
import FcsMacroEconomicAccordion from './FcsMacroEconomicAccordion';

export default function FcsAccordion({ countryData, loading, countryIso3Data, countryName }: FcsAccordionProps) {
  const isMobile = useMediaQuery('(max-width: 700px)');
  const foodSecurityAccordion = FcsFoodSecurityAccordion({ countryData, countryIso3Data });
  const macroEconomicAccordion = FcsMacroEconomicAccordion({ countryData, countryIso3Data });

  return (
    <>
      {!isMobile ? (
        <div
          className="absolute w-[370px] left-[108px] top-4 z-9999 overflow-y-auto max-h-[400px]"
          style={{ maxHeight: '900px' }} // Adjust height as needed
        >
          <AccordionContainer
            loading={loading}
            title={countryName ?? undefined}
            accordionModalActive
            maxWidth={600}
            items={foodSecurityAccordion}
            expandAll
          />
        </div>
      ) : (
        <div className="absolute w-[350px] left-[108px] top-4 z-9999">
          <AccordionContainer
            loading={loading}
            title={countryName ?? undefined}
            accordionModalActive
            maxWidth={600}
            items={[...foodSecurityAccordion, ...macroEconomicAccordion]}
          />
        </div>
      )}
      {!isMobile && (
        <div className="absolute w-[370px] right-[1rem] inset-y-20 z-9999">
          <AccordionContainer loading={loading} accordionModalActive maxWidth={600} items={macroEconomicAccordion} />
        </div>
      )}
    </>
  );
}
