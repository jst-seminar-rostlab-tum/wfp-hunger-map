import IpcNutritionAccordionProps from '@/domain/props/IpcNutritionAccordionProps';
import { IpcFoodSecurityAccordionOperations } from '@/operations/map/IpcFoodSecurityOperations';

export default function IpcNutritionAccordion({ countryIso3Data }: IpcNutritionAccordionProps) {
  const nutritionAccordion = IpcFoodSecurityAccordionOperations.getNutritionAccordion(countryIso3Data);
  return nutritionAccordion;
}
