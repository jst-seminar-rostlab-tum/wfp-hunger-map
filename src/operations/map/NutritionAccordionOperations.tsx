import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import React from 'react';

import CustomAccordion from '@/components/Accordions/Accordion';
import { AccordionItem, NutrientAccordionProps, NutrientOption } from '@/domain/props/NutritionStateProps';

function NutrientAccordion({ setSelectedNutrient, selectedLabel, setSelectedLabel }: NutrientAccordionProps) {
  const nutrientOptions: NutrientOption[] = [
    { label: 'Mean Adequacy Ratio', key: 'mimi_simple' },
    { label: 'Folate', key: 'fol_ai' },
    { label: 'Iron', key: 'fe_ai' },
    { label: 'Zinc', key: 'zn_ai' },
    { label: 'Vitamin A', key: 'va_ai' },
    { label: 'Vitamin B12', key: 'vb12_ai' },
  ];

  const accordionData: AccordionItem[] = [
    {
      title: 'Micronutrients',
      iconSrc: '/Images/InfoIcon.svg',
      description: 'Population at Risk of Inadequate Micronutrient Intake',
      content: (
        <div className="flex flex-row gap-4 justify-center flex-wrap pb-8">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="solid" color="default">
                {selectedLabel}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Nutrient Selection"
              onAction={(key) => {
                const selectedKey = key.toString();
                const selectedOption = nutrientOptions.find((option) => option.key === selectedKey);
                setSelectedNutrient(selectedKey);
                setSelectedLabel(selectedOption?.label || 'Mean Adequancy Ratio');
              }}
            >
              {nutrientOptions.map(({ label, key }) => (
                <DropdownItem key={key}>{label}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      ),
    },
  ];

  return <CustomAccordion items={accordionData} />;
}

export default NutrientAccordion;
