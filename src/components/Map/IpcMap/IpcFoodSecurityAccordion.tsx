import IpcFoodSecurityAccordionProps from '@/domain/props/IpcFoodSecurityAccordionProps';
import { IpcFoodSecurityAccordionOperations } from '@/operations/map/IpcFoodSecurityOperations';

export default function IpcFoodSecurityAccordion({
  countryData,
  deltaOneMonth,
  deltaThreeMonth,
}: IpcFoodSecurityAccordionProps) {
  const foodSecurityAccordion = IpcFoodSecurityAccordionOperations.getFoodSecurityAccordionItems(
    countryData,
    deltaOneMonth,
    deltaThreeMonth
  );
  return foodSecurityAccordion;
}
