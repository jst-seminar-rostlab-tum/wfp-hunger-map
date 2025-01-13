import { useCountryDataQuery, useCountryIso3DataQuery } from '@/domain/hooks/countryHooks';
import FcsAccordionProps from '@/domain/props/FcsAccordionProps';
import { FcsFoodSecurityOperations } from '@/operations/map/FcsFoodSecurityOperations';
import { FcsMacroEconomicOperations } from '@/operations/map/FcsMacroEconomicOperations';
import { useMediaQuery } from '@/utils/resolution.ts';

import AccordionContainer from '../../Accordions/AccordionContainer';

/** The FcsAccordion function returns a component that displays a country's information on Population, Macroeconomics,
    Nutrition, Food Consumption trends, and more in an accordion format, dynamically adjusting its layout for mobile and desktop views.
 * @param {FcsAccordionProps} props - The props of the component
 * @param {string} props.countryName - The name of the country
 * @param {number} props.countryId - The ID of the country
 * @param {number} props.countryCode - The ISO3 code of the country
 * @returns {JSX.Element} - The rendered AccordionContainer component
 */
export default function FcsAccordion({ countryName, countryId, countryCode }: FcsAccordionProps) {
  const isMobile = useMediaQuery('(max-width: 700px)');
  const { data: countryData, isLoading: countryDataLoading } = useCountryDataQuery(countryId);
  const { data: countryIso3Data, isLoading: iso3DataLoading } = useCountryIso3DataQuery(countryCode);
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
        loading={countryDataLoading || iso3DataLoading}
        title={countryName}
        accordionModalActive
        maxWidth={600}
        items={[...foodSecurityAccordionItems, ...macroEconomicAccordionItems]}
      />
    </div>
  ) : (
    <>
      <div className="absolute w-[350px] left-[108px] top-4 z-9999 overflow-y-scroll max-h-screen">
        <AccordionContainer
          loading={countryDataLoading || iso3DataLoading}
          title={countryName}
          multipleSelectionMode
          accordionModalActive
          maxWidth={600}
          items={foodSecurityAccordionItems}
          expandAll={!countryDataLoading && !iso3DataLoading}
        />
      </div>
      <div className="absolute w-[350px] right-[1rem] inset-y-24 z-9999">
        <AccordionContainer
          loading={countryDataLoading || iso3DataLoading}
          accordionModalActive
          maxWidth={600}
          items={macroEconomicAccordionItems}
        />
      </div>
    </>
  );
}
