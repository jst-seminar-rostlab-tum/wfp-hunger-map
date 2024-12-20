import NutritionAccordionTextProps from '@/domain/props/NutritionAccordionTextProps';

function NutritionAccordionText({ nutritionValue, text }: NutritionAccordionTextProps) {
  return (
    <>
      <span className="text-lg">{nutritionValue}</span>
      <span className="text-sm text-gray-400 ml-1">{text}</span>
    </>
  );
}
export default NutritionAccordionText;
