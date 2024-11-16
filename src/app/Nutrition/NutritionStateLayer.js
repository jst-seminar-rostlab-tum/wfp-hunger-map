import { GeoJSON } from 'react-leaflet';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import CustomAccordion from '@/components/Accordions/Accordion';
import { cardsWrapperClass } from '@/utils/primitives';
import CustomCard from '@/components/Cards/Card';
import { CustomButton } from '@/components/Buttons/CustomButton';

const StateChoropleth = ({ regionData, style, hoverStyle, handleClick, tooltip }) => {
    const [showAccordion, setShowAccordion] = useState(true);
    const [selectedNutrient, setSelectedNutrient] = useState("Select the Micronutrient");
    const [accordionData, setAccordionData] = useState(StateChoropleth.getAccordionData(selectedNutrient));
    console.log(accordionData);
    const handleButtonClick = (nutrient) => {
        setSelectedNutrient(nutrient);
    };
    useEffect(() => {
        setAccordionData(StateChoropleth.getAccordionData(selectedNutrient));
    }, [selectedNutrient]);

    const onEachFeature = (feature, layer) => {
        layer.on('click', () => {
        handleClick(feature); 
         });
        
        if (tooltip && tooltip.render) {
            const content = tooltip.render(feature);
            layer.bindTooltip(content, { className: tooltip.className || 'state-tooltip' });
        }

        layer.on('mouseover', (e) => e.target.setStyle(hoverStyle));
        layer.on('mouseout', (e) => e.target.setStyle(style));
    };

        return (
            <>
            {showAccordion && (
                <div className="absolute left-[108px] top-4" style={{zIndex: 1000}}>
                   <div className="absolute w-[350px] box-border">
                    <CustomAccordion items={accordionData} />
                    <div className="mt-4 grid grid-cols-2 gap-4 justify-items-center">
                            <CustomButton variant="flat" onClick={() => handleButtonClick("Adequate Ratio") } color = "#C4841D">
                                     Adequate Ratio
                             </CustomButton>
                             <CustomButton variant="flat" onClick={() => handleButtonClick("Folate") } color = "#C4841D" >
                                         Folate
                            </CustomButton>
                             <CustomButton variant="flat" onClick={() => handleButtonClick("Vitamin A") } color = "#C4841D">
                                         Vitamin A
                             </CustomButton>
                            <CustomButton variant="flat" onClick={() => handleButtonClick("Iron") } color = "#C4841D">
                                        Iron
                            </CustomButton>
                            <CustomButton variant="flat" onClick={() => handleButtonClick("Calcium") } color = "#C4841D">
                                        Calcium
                            </CustomButton>
                            <CustomButton variant="flat" onClick={() => handleButtonClick("Zinc") } color = "#C4841D">
                                        Zinc
                            </CustomButton>
                        </div>
                    </div>
                </div>
            )}
            <GeoJSON data={regionData} style={style} onEachFeature={onEachFeature} />
            </>
        );
};
StateChoropleth.getAccordionData = function (selectedNutrient) {
    return [
        {
            title: 'Micronutrients',
        iconSrc: '/Images/InfoIcon.svg',
        content: (
          <div className={cardsWrapperClass}>
            <CustomCard
              title="Inadequate Micronutrient Intake"
              content={[{ imageSrc: '/Images/Micronutrients.svg', text: selectedNutrient, altText: 'Icon' }]}
            />
          </div>
        ),
        },
    ];
};

StateChoropleth.propTypes = {
    regionData: PropTypes.object.isRequired,
    style: PropTypes.object,
    hoverStyle: PropTypes.object,
    handleClick: PropTypes.func,
    tooltip: PropTypes.shape({
        render: PropTypes.func,
        className: PropTypes.string,
    }),
};

StateChoropleth.defaultProps = {
    style: {},
    hoverStyle: {},
    handleClick: () => {},
};

export default StateChoropleth;