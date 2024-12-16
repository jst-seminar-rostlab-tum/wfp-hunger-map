import FcsAccordionProps from '@/domain/props/FcsAccordionProps';
import { getMacroEconomicAccordionOperations } from '@/operations/map/FcsMacroEconomicOperations';

export default function MacroEconomicAccordion({ countryData, countryIso3Data }: FcsAccordionProps) {
  const FcsMacroEconomicAccordion = getMacroEconomicAccordionOperations(countryData, countryIso3Data);
  return FcsMacroEconomicAccordion;
}
