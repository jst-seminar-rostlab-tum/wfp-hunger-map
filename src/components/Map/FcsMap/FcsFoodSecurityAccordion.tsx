import FcsAccordionProps from '@/domain/props/FcsAccordionProps';
import { getFcsFoodSecurityAccordionItems } from '@/operations/map/FcsFoodSecurityOperations';

export default function FoodSecurityAccordion({ countryData, countryIso3Data }: FcsAccordionProps) {
  const FcsFoodSecurityAccordion = getFcsFoodSecurityAccordionItems(countryData, countryIso3Data);
  return FcsFoodSecurityAccordion;
}
