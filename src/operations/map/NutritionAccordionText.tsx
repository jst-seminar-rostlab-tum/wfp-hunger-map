import NutritionAccordionTextProps from '@/domain/props/NutritionAccordionTextProps';

function NutritionAccordionText({ nutritionValue, text }: NutritionAccordionTextProps) {
  return (
    <>
      <span className="text-base">{nutritionValue}</span>
      <span className="text-xs text-gray-400 ml-1">{text}</span>
    </>
  );
}
export default NutritionAccordionText;
