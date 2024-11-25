import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { ArrowDown2 } from 'iconsax-react';
import React from 'react';

import CustomAccordion from '@/components/Accordions/Accordion';
import NutritionAccordionProps from '@/domain/props/NutritionAccordionProps';
import NutritionStateChoroplethOperations from '@/operations/map/NutritionStateChoroplethOperations.tsx';

export default function NutritionAccordion({
  setSelectedNutrient,
  selectedLabel,
  setSelectedLabel,
}: NutritionAccordionProps) {
  return (
    <div className="absolute left-[108px] top-4" style={{ zIndex: 1000 }}>
      <div className="absolute w-[350px] box-border">
        <CustomAccordion
          items={[
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
                        <ArrowDown2 className="h-4 w-4" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Nutrient Selection"
                      onAction={(key) => {
                        const selectedKey = key.toString();
                        const selectedOption = NutritionStateChoroplethOperations.NUTRITION_OPTIONS.find(
                          (option) => option.key === selectedKey
                        );
                        setSelectedNutrient(selectedKey);
                        setSelectedLabel(selectedOption?.label || 'Mean Adequancy Ratio');
                      }}
                    >
                      {NutritionStateChoroplethOperations.NUTRITION_OPTIONS.map(({ label, key }) => (
                        <DropdownItem key={key}>{label}</DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
