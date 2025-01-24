import { useMap } from 'react-leaflet';

import { useUserRole } from '@/domain/contexts/UserRoleContext';
import { useCountryDataQuery, useCountryForecastDataQuery, useCountryIso3DataQuery } from '@/domain/hooks/countryHooks';
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
  const { isAdmin } = useUserRole();
  const { data: countryData, isLoading: countryDataLoading } = useCountryDataQuery(countryId);
  const { data: countryForecastData, isLoading: countryForecastDataLoading } = useCountryForecastDataQuery(countryId);
  const { data: countryIso3Data, isLoading: iso3DataLoading } = useCountryIso3DataQuery(countryCode);
  const foodSecurityAccordionItems = FcsFoodSecurityOperations.getFcsFoodSecurityAccordionItems(
    countryData,
    isAdmin ? countryForecastData : undefined,
    countryIso3Data
  );
  const macroEconomicAccordionItems = FcsMacroEconomicOperations.getMacroEconomicAccordionItems(
    countryData,
    countryIso3Data
  );
  const mapInstance = useMap();
  const disableMapScroll = () => {
    if (mapInstance && mapInstance.scrollWheelZoom) {
      mapInstance.scrollWheelZoom.disable();
    }
  };

  const enableMapScroll = () => {
    if (mapInstance && mapInstance.scrollWheelZoom) {
      mapInstance.scrollWheelZoom.enable();
    }
  };

  return isMobile ? (
    <div className="absolute w-[350px] left-[108px] top-4 z-9999">
      <AccordionContainer
        loading={countryDataLoading || iso3DataLoading || countryForecastDataLoading}
        title={countryName}
        accordionModalActive
        maxWidth={600}
        items={[...foodSecurityAccordionItems, ...macroEconomicAccordionItems]}
      />
    </div>
  ) : (
    <>
      <div
        className="absolute w-[350px] left-[108px] top-4 z-9999 overflow-y-scroll max-h-[92vh]"
        onMouseEnter={disableMapScroll}
        onMouseLeave={enableMapScroll}
        onWheel={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onTouchMove={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <AccordionContainer
          loading={countryDataLoading || iso3DataLoading || countryForecastDataLoading}
          title={countryName}
          multipleSelectionMode
          accordionModalActive
          maxWidth={600}
          items={foodSecurityAccordionItems}
          expandAll={!countryDataLoading && !iso3DataLoading && !countryForecastDataLoading}
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
