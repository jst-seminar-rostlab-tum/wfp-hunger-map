import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { ArrowDown2 } from 'iconsax-react';
import React from 'react';

import AccordionContainer from '@/components/Accordions/AccordionContainer';
import CustomInfoCircle from '@/components/CustomInfoCircle/CustomInfoCircle';
import { DataSourcePopover } from '@/components/Legend/DataSourcePopover';
import { NutrientType } from '@/domain/enums/NutrientType.ts';
import NutritionAccordionProps from '@/domain/props/NutritionAccordionProps';
import NutritionStateChoroplethOperations from '@/operations/map/NutritionStateChoroplethOperations';

/** NutritionAccordion function renders the accordion for the Nutrition Map. Inside the accordion, 
  the user can select a micronutrient using the NextUI dropdown component to display it on the map.
 * @param {NutritionAccordionProps} props - The props of the component
 * @param {setSelectedNutrient} props.React.Dispatch<React.SetStateAction<NutrientType>> - Function to set the selected nutrient
 * @param {selectedNutrient} props.NutrientType - The selected nutrient
 * @param {countryName} props.string - The name of the country
 * @param {loading} props.boolean - The loading state of the component
 * @returns {JSX.Element} AccordionContainer
 */

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
              popoverInfo: <DataSourcePopover dataSourceKeys="micronutrients" />,
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
