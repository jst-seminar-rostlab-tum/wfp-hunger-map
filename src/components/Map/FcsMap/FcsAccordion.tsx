import FcsAccordionProps from '@/domain/props/FcsAccordionProps';
import { FcsFoodSecurityOperations } from '@/operations/map/FcsFoodSecurityOperations';
import { FcsMacroEconomicOperations } from '@/operations/map/FcsMacroEconomicOperations';
import { useMediaQuery } from '@/utils/resolution.ts';

import AccordionContainer from '../../Accordions/AccordionContainer';

/** The FcsAccordion function returns a component that displays a country's information on Population, Macroeconomics, 
    Nutrition, Food Consumption trends, and more in an accordion format, dynamically adjusting its layout for mobile and desktop views.
 * @param {FcsAccordionProps} props - The props of the component
 * @param {FcsAccordionProps.countryData} props.countryData - The data of the country
 * @param {FcsAccordionProps.loading} props.loading - The loading state of the component
 * @param {FcsAccordionProps.countryIso3Data} props.countryIso3Data - The iso3 data of the country
 * @param {FcsAccordionProps.countryName} props.countryName - The name of the country
 * @returns {JSX.Element} - The rendered AccordionContainer component
 */

export default function FcsAccordion({
  countryData,
  loading,
  countryIso3Data,
  countryName,
}: FcsAccordionProps): JSX.Element {
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
      <div className="absolute w-[350px] left-[108px] top-4 z-9999 overflow-y-scroll max-h-screen">
        <AccordionContainer
          loading={loading}
          title={countryName}
          multipleSelectionMode
          accordionModalActive
          maxWidth={600}
          items={foodSecurityAccordionItems}
          expandAll={!loading}
        />
      </div>
      <div className="absolute w-[350px] right-[1rem] inset-y-24 z-9999">
        <AccordionContainer loading={loading} accordionModalActive maxWidth={600} items={macroEconomicAccordionItems} />
      </div>
    </>
  );
}
