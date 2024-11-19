import { GeoJSON } from 'react-leaflet';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import CustomAccordion from '@/components/Accordions/Accordion';
import { cardsWrapperClass } from '@/utils/primitives';
import CustomCard from '@/components/Cards/Card';
import { CustomButton } from '@/components/Buttons/CustomButton';
import LegendContainer from '@/components/Legend/LegendContainer';
import { useTheme } from 'next-themes';

const StateChoropleth = ({ regionNutri, regionData, hoverStyle, handleClick, tooltip }) => {
  const [showAccordion, setShowAccordion] = useState(true);
  const [selectedNutrient, setSelectedNutrient] = useState('mimi_simple');
  const layersRef = useRef([]);
  const { theme } = useTheme();
  const accordionImage = theme === 'dark' ? '/Images/Micronutrients.svg' : '/Images/MicronutrientsDark.svg';

  useEffect(() => {
    layersRef.current.forEach((layer) => {
      const feature = layer.feature;
      const stateId = feature.id || feature.properties.id;
      const match = regionNutri.features.find((item) => item.id === stateId);
      const nutrientValue = match ? match.properties.nutrition[selectedNutrient] : null;
      const formattedNutrientValue = formatNutrientValue(nutrientValue);
      const nutrientLabels = {
        fe_ai: 'Iron',
        fol_ai: 'Folate',
        va_ai: 'Vitamin A',
        vb12_ai: 'Vitamin B12',
        zn_ai: 'Zinc',
        mimi_simple: 'Mean Adequacy Ratio',
      };
      const nutrientLabel = nutrientLabels[selectedNutrient] || 'Unknown Nutrient';
      const tooltipContent = `
                <b>${feature.properties.Name}</b><br/>
                Risk of inadequate Intake of ${nutrientLabel}: ${formattedNutrientValue}
            `;
      layer.unbindTooltip();
      layer.bindTooltip(tooltipContent, { className: tooltip.className || 'state-tooltip' });
    });
  }, [selectedNutrient]);

  const formatNutrientValue = (value) => {
    if (value === null || value === undefined) return 'N/A';
    return `${value.toFixed(1)}%`;
  };

  const dynamicStyle = (feature) => {
    const stateId = feature.id || feature.properties.id;
    const match = regionNutri.features.find((item) => item.id === stateId);
    const value = match ? match.properties.nutrition[selectedNutrient] : null;
    return {
      fillColor: nutritionFill(value),
      color: '#000',
      weight: 1,
      fillOpacity: 0.6,
    };
  };

  const nutritionFill = (value) => {
    if (value === null || value === undefined) return 'none';
    if (value <= 19) return '#fde2e1';
    if (value <= 39) return '#fcd0ce';
    if (value <= 59) return '#f88884';
    if (value <= 79) return '#f5524c';
    if (value <= 100) return '#f32e27';
    return '#A0A0A0';
  };

  const onEachFeature = (feature, layer) => {
    layersRef.current.push(layer); // Store the layer reference
    layer.on('click', () => handleClick(feature));

    const stateId = feature.id || feature.properties.id;
    const match = regionNutri.features.find((item) => item.id === stateId);
    const nutrientValue = match ? match.properties.nutrition[selectedNutrient] : null;
    const formattedNutrientValue = formatNutrientValue(nutrientValue);

    const nutrientLabels = {
      fe_ai: 'Iron',
      fol_ai: 'Folate',
      va_ai: 'Vitamin A',
      vb12_ai: 'Vitamin B12',
      zn_ai: 'Zinc',
      mimi_simple: 'Mean Adequacy Ratio',
    };
    const nutrientLabel = nutrientLabels[selectedNutrient] || 'Unknown Nutrient';

    const tooltipContent = `
            <b>${feature.properties.Name}</b><br/>
            Risk of inadequate Intake of ${nutrientLabel}: ${formattedNutrientValue}
        `;
    layer.bindTooltip(tooltipContent, { className: tooltip.className || 'state-tooltip' });
    layer.on('mouseover', (e) => e.target.setStyle(hoverStyle));
    layer.on('mouseout', (e) => e.target.setStyle(dynamicStyle));
  };
  const accordionData = StateChoropleth.getAccordionData(selectedNutrient, accordionImage);
  const legendItems = [
    {
      title: 'Risk of Inadequate Micronutrient Intake',
      startColor: '#345d34',
      endColor: '#fa190e',
      startLabel: '0%',
      endLabel: '100%',
      middleColor: '#ea6a2c',
      tooltipInfo: 'Shows the inadequate ratio of nutrient intake.',
    },
  ];

  return (
    <>
      {showAccordion && (
        <div className="absolute left-[108px] top-4" style={{ zIndex: 1000 }}>
          <div className="absolute w-[350px] box-border">
            <CustomAccordion items={accordionData} />
            <div className="mt-4 grid grid-cols-2 gap-4 justify-items-center">
              {[
                { label: 'Mean Adequacy Ratio', key: 'mimi_simple' },
                { label: 'Folate', key: 'fol_ai' },
                { label: 'Iron', key: 'fe_ai' },
                { label: 'Zinc', key: 'zn_ai' },
                { label: 'Vitamin A', key: 'va_ai' },
                { label: 'Vitamin B12', key: 'vb12_ai' },
              ].map(({ label, key }) => (
                <CustomButton key={label} variant="flat" onClick={() => setSelectedNutrient(key)} color="#C4841D">
                  {label}
                </CustomButton>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="absolute bottom-5 right-0 z-50 pr-10">
        <LegendContainer items={legendItems} />
      </div>
      <GeoJSON data={regionData} style={dynamicStyle} onEachFeature={onEachFeature} />
    </>
  );
};

StateChoropleth.getAccordionData = function (selectedNutrient, accordionImage) {
  const nutrientLabels = {
    fe_ai: 'Iron',
    fol_ai: 'Folate',
    va_ai: 'Vitamin A',
    vb12_ai: 'Vitamin B12',
    zn_ai: 'Zinc',
    mimi_simple: 'Mean Adequacy Ratio',
  };

  const selectedLabel = nutrientLabels[selectedNutrient] || 'Unknown Nutrient';
  return [
    {
      title: 'Micronutrients',
      iconSrc: '/Images/InfoIcon.svg',
      content: (
        <div className={cardsWrapperClass}>
          <CustomCard
            title="Inadequate Micronutrient Intake"
            content={[{ imageSrc: accordionImage, text: selectedLabel, altText: 'Icon' }]}
          />
        </div>
      ),
    },
  ];
};

StateChoropleth.propTypes = {
  regionNutri: PropTypes.object.isRequired,
  regionData: PropTypes.object.isRequired,
  hoverStyle: PropTypes.object,
  handleClick: PropTypes.func,
  tooltip: PropTypes.shape({
    render: PropTypes.func,
    className: PropTypes.string,
  }),
};

StateChoropleth.defaultProps = {
  hoverStyle: {},
  handleClick: () => {},
};

export default StateChoropleth;
