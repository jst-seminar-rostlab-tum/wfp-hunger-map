import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { ArrowDown2 } from 'iconsax-react';
import React from 'react';

import CustomAccordion from '@/components/Accordions/Accordion';
import CustomInfoCircle from '@/components/CustomInfoCircle/CustomInfoCircle';
import { NutrientType } from '@/domain/enums/NutrientType.ts';
import NutritionAccordionProps from '@/domain/props/NutritionAccordionProps';
import NutritionStateChoroplethOperations from '@/operations/map/NutritionStateChoroplethOperations';

export default function NutritionAccordion({
  setSelectedNutrient,
  selectedNutrient,
  countryName,
}: NutritionAccordionProps) {
  return (
    <div className="absolute left-[108px] top-6" style={{ zIndex: 1000 }}>
      <CustomAccordion
        items={[
          {
            title: <div className="text-4xl sm:text-5xl lg:text-3xl font-black font-sans">{countryName}</div>,
          },
        ]}
        noSelectionMode
        color="bg-primary"
      />
      <div className=" w-[350px] box-border mt-2">
        <CustomAccordion
          items={[
            {
              title: 'Micronutrients',
              infoIcon: <CustomInfoCircle />,
              description: 'Population at Risk of Inadequate Micronutrient Intake',
              content: (
                <div className="flex flex-row gap-4 justify-center flex-wrap pb-8">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="solid" color="default">
                        {NutritionStateChoroplethOperations.getNutrientLabel(selectedNutrient)}
                        <ArrowDown2 className="h-4 w-4" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Nutrient Selection"
                      onAction={(key) => {
                        const newSelectedNutrient = key as NutrientType;
                        setSelectedNutrient(newSelectedNutrient);
                      }}
                    >
                      {Object.values(NutrientType).map((nutrient: NutrientType) => (
                        <DropdownItem key={nutrient}>
                          {NutritionStateChoroplethOperations.getNutrientLabel(nutrient)}
                        </DropdownItem>
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
