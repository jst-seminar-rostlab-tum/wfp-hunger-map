export default interface NutritionAccordionProps {
  selectedNutrient: string;
  setSelectedNutrient: React.Dispatch<React.SetStateAction<string>>;
  selectedLabel: string;
  setSelectedLabel: React.Dispatch<React.SetStateAction<string>>;
}
