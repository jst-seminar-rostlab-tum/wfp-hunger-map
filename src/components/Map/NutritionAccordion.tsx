import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { ArrowDown2 } from 'iconsax-react';
import React from 'react';

import AccordionContainer from '@/components/Accordions/AccordionContainer';
import CustomInfoCircle from '@/components/CustomInfoCircle/CustomInfoCircle';
import { NutrientType } from '@/domain/enums/NutrientType.ts';
import NutritionAccordionProps from '@/domain/props/NutritionAccordionProps';
import { FcsAccordionOperations } from '@/operations/map/FcsAccordionOperations';
import NutritionStateChoroplethOperations from '@/operations/map/NutritionStateChoroplethOperations';

export default function NutritionAccordion({
  setSelectedNutrient,
  selectedNutrient,
  countryName,
  loading,
}: NutritionAccordionProps) {
  return (
    <div className="absolute left-[108px] top-4" style={{ zIndex: 1000 }}>
      <div className=" w-[350px] box-border">
        <AccordionContainer
          title={countryName ?? undefined}
          accordionModalActive
          maxWidth={600}
          loading={loading}
          items={[
            {
              title: 'Micronutrients',
              infoIcon: <CustomInfoCircle />,
              popoverInfo: FcsAccordionOperations.getFoodSecutriyTrendsPopoverInfo(), // TODO this is the popover in the old map but a seperate could be created
              description: 'Population at Risk of Inadequate Micronutrient Intake',
              content: (
                <div className="flex flex-row gap-4 justify-center flex-wrap pb-8">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="solid" color="default" className="text-white min-w-[12rem]">
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
