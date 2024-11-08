import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { GeoJSON } from 'react-leaflet/GeoJSON';
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { createRoot } from 'react-dom/client';

// Importing nutrition data from JSON
import nutrition from './nutrition.json';

console.log("here");

const NutritionChoropleth = ({
    selectedNutritionView,
    view,
    data,
    style,
    hoverStyle,
    handleClick,
    onEachFeature,
    onFeatureMouseOver,
    tooltip,
}) => {
    const geoJsonRef = useRef();
    const { map } = useMap();

    // Utility to find nutrition data for a country using the iso3 code
    const getCountryNutrition = (iso3) => {
        const countryData = nutrition.nutrition.find((item) => item.iso3 === iso3 && item.active);
        console.log(nutrition.nutrition);
        return countryData || null; 
    };

    const features = (feature, layer) => {
        layer.on({
            mouseover: (e) => {
                if (view !== 'nutrition') {
                    e.target.setStyle(hoverStyle);
                } else {
                    e.target.setStyle(0);
                }
                if (onFeatureMouseOver) onFeatureMouseOver();
            },
            mouseout: (e) => {
                if (view !== 'nutrition') geoJsonRef.current.resetStyle(e.target);
            },
            click: (e) => {
                handleClick(e.target.feature, e.target.getBounds(), map);
            },
        });

        if (onEachFeature) onEachFeature(feature, layer);

        const content = tooltip ? tooltip.render(feature) : feature.properties.adm0_name;
        const div = document.createElement('div');
        const root = createRoot(div);
        root.render(content);

        layer.bindTooltip(div, { sticky: true, className: tooltip ? tooltip.className : 'countryTooltip' });
    };

    // Determine the fill color based on nutrition data
    const nutritionFill = (value) => {
        if (value === null) return 'none';
        if (value <= 1) return '#fde2e1';
        if (value <= 2) return '#fcd0ce';
        if (value <= 3) return '#f88884';
        if (value <= 4) return '#f5524c';
        if (value <= 5) return '#f32e27';
        return '#A0A0A0';
    };

    // Define style based on nutrition data if available
    const nutritionAdm1Styles = (feature) => {
      console.log("style");
        const iso3 = feature.properties.iso3;
        console.log(iso3);
        const nutritionValue = getCountryNutrition(iso3)?.[selectedNutritionView];

        return nutritionValue !== undefined
            ? {
                  color: '#fff',
                  weight: 1,
                  fillOpacity: 2,
                  fillColor: nutritionFill(nutritionValue),
              }
            : {
                  color: '#fff',
                  weight: 1,
                  fillOpacity: 0,
                  fillColor: 'none',
              };
    };

    useEffect(() => {
        if (geoJsonRef.current) {
            geoJsonRef.current.clearLayers();
            geoJsonRef.current.addData(data);

            if (view === 'nutrition') {
                geoJsonRef.current.setStyle((feature) =>
                    getCountryNutrition(feature.properties.iso3) !== null
                        ? nutritionAdm1Styles(feature)
                        : { color: '#fff', weight: 1, fillOpacity: 0, fillColor: 'none' }
                );
            }
        }
    }, [geoJsonRef, data, selectedNutritionView, tooltip, handleClick]);

    return (
        <>
            <GeoJSON ref={geoJsonRef} style={style} data={data} onEachFeature={features} />
        </>
    );
};

NutritionChoropleth.propTypes = {
    data: PropTypes.object.isRequired,
    style: PropTypes.func,
    hoverStyle: PropTypes.func,
    handleClick: PropTypes.func,
    onEachFeature: PropTypes.func,
    onFeatureMouseOver: PropTypes.func,
    tooltip: PropTypes.shape({
        className: PropTypes.string,
        render: PropTypes.func,
    }),
};

NutritionChoropleth.defaultProps = {
    style: () => ({}),
    hoverStyle: null,
    handleClick: () => {},
    onFeatureMouseOver: () => {},
};

export default NutritionChoropleth;
