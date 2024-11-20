import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { GeoJsonProperties, Geometry } from 'geojson';
import { Layer, LeafletMouseEvent, PathOptions } from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import { GeoJSON } from 'react-leaflet';

import CustomAccordion from '@/components/Accordions/Accordion';
import LegendContainer from '@/components/Legend/LegendContainer';
import { GradientLegendContainerItem } from '@/domain/props/GradientLegendContainerItem';
import NutritionStateChoroplethProps from '@/domain/props/NutritionStateProps';

interface NutrientOption {
  label: string;
  key: string;
}

interface AccordionItem {
  title: string;
  iconSrc: string;
  description: string;
  content: JSX.Element;
}

type LayerWithFeature = Layer & {
  feature?: GeoJSON.Feature<Geometry, GeoJsonProperties>;
};
const formatNutrientValue = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return 'N/A';
  return `${value.toFixed(1)}%`;
};

const nutritionFill = (value: number | null): string => {
  if (!value) return 'none';
  if (value <= 19) return '#fff3f3';
  if (value <= 39) return '#fcd0ce';
  if (value <= 59) return '#f88884';
  if (value <= 79) return '#f5524c';
  if (value <= 100) return '#f32e27';
  return '#A0A0A0';
};

function StateChoropleth({ regionNutri, regionData, handleClick = () => {}, tooltip }: NutritionStateChoroplethProps) {
  const [showAccordion] = useState<boolean>(true);
  const [selectedNutrient, setSelectedNutrient] = useState<string>('mimi_simple');
  const [selectedLabel, setSelectedLabel] = useState<string>('Select Micronutrient');
  const layersRef = useRef<LayerWithFeature[]>([]);

  useEffect(() => {
    layersRef.current.forEach((layer) => {
      const { feature } = layer;
      if (feature) {
        const stateId = feature.id || feature.properties?.id;
        const match = regionNutri?.features.find((item) => item.id === stateId);
        const nutrientValue = match ? match?.properties?.nutrition[selectedNutrient] : null;
        const formattedNutrientValue = formatNutrientValue(nutrientValue);
        const nutrientLabels: { [key: string]: string } = {
          fe_ai: 'Iron',
          fol_ai: 'Folate',
          va_ai: 'Vitamin A',
          vb12_ai: 'Vitamin B12',
          zn_ai: 'Zinc',
          mimi_simple: 'Mean Adequacy Ratio',
        };
        const nutrientLabel = nutrientLabels[selectedNutrient] || 'Unknown Nutrient';
        const tooltipContent = `
          <b>${feature.properties?.Name}</b><br/>
          Risk of inadequate Intake of ${nutrientLabel}: ${formattedNutrientValue}
        `;
        layer.unbindTooltip();
        layer.bindTooltip(tooltipContent, { className: tooltip?.className || 'state-tooltip' });
      }
    });
  }, [selectedNutrient]);

  const dynamicStyle = (feature: GeoJSON.Feature<Geometry, GeoJsonProperties> | undefined): PathOptions => {
    if (!feature) return {};

    const stateId = feature.id || feature?.properties?.id;
    const match = regionNutri?.features.find((item) => item.id === stateId);
    const value = match ? match?.properties?.nutrition[selectedNutrient] : null;

    return {
      fillColor: nutritionFill(value),
      color: '#000',
      weight: 1,
      fillOpacity: 0.6,
    };
  };

  const onEachFeature = (feature: GeoJsonProperties, layer: L.Layer): void => {
    layersRef.current.push(layer);
    layer.on('click', () => handleClick(feature));

    const stateId = feature?.id || feature?.properties.id;
    const match = regionNutri?.features.find((item) => item.id === stateId);
    const nutrientValue = match ? match?.properties?.nutrition[selectedNutrient] : null;
    const formattedNutrientValue = formatNutrientValue(nutrientValue);

    const nutrientLabels: { [key: string]: string } = {
      fe_ai: 'Iron',
      fol_ai: 'Folate',
      va_ai: 'Vitamin A',
      vb12_ai: 'Vitamin B12',
      zn_ai: 'Zinc',
      mimi_simple: 'Mean Adequacy Ratio',
    };
    const nutrientLabel = nutrientLabels[selectedNutrient] || 'Unknown Nutrient';

    const tooltipContent = `
            <b>${feature?.properties.Name}</b><br/>
            Risk of inadequate Intake of ${nutrientLabel}: ${formattedNutrientValue}
        `;
    layer.bindTooltip(tooltipContent, { className: tooltip?.className || 'state-tooltip' });
    layer.on('mouseout', (e: LeafletMouseEvent) =>
      e.target.setStyle(dynamicStyle(feature as GeoJSON.Feature<Geometry, GeoJsonProperties>))
    );
  };

  const accordionData = StateChoropleth.getAccordionData(
    selectedNutrient,
    setSelectedNutrient,
    selectedLabel,
    setSelectedLabel
  );

  const legendItem: GradientLegendContainerItem = {
    title: 'Risk of Inadequate Micronutrient Intake',
    startColor: 'nutritionGradientStart',
    endColor: 'nutritionGradientEnd',
    startLabel: '0%',
    endLabel: '100%',
    middleColor: 'nutritionGradientMiddle',
    tooltipInfo: 'Shows the inadequate ratio of nutrient intake.',
  };

  return (
    <>
      {showAccordion && (
        <div className="absolute left-[108px] top-4" style={{ zIndex: 1000 }}>
          <div className="absolute w-[350px] box-border">
            <CustomAccordion items={accordionData} />
          </div>
        </div>
      )}
      <div className="absolute bottom-5 right-0 z-50 pr-10">
        <LegendContainer items={[legendItem]} />
      </div>
      <GeoJSON data={regionData} style={dynamicStyle} onEachFeature={onEachFeature} />
    </>
  );
}

StateChoropleth.getAccordionData = function (
  selectedNutrient: string,
  setSelectedNutrient: React.Dispatch<React.SetStateAction<string>>,
  selectedLabel: string,
  setSelectedLabel: React.Dispatch<React.SetStateAction<string>>
): AccordionItem[] {
  const nutrientOptions: NutrientOption[] = [
    { label: 'Mean Adequacy Ratio', key: 'mimi_simple' },
    { label: 'Folate', key: 'fol_ai' },
    { label: 'Iron', key: 'fe_ai' },
    { label: 'Zinc', key: 'zn_ai' },
    { label: 'Vitamin A', key: 'va_ai' },
    { label: 'Vitamin B12', key: 'vb12_ai' },
  ];

  return [
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
                setSelectedLabel(selectedOption?.label || 'Select Micronutrient');
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
};
export default StateChoropleth;
