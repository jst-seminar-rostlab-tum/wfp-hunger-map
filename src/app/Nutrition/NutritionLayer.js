import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { createRoot } from 'react-dom/client';

import nutrition from './nutrition.json';
import CountryRepositoryImpl from '@/infrastructure/repositories/CountryRepositoryImpl';
import StateChoropleth from './NutritionStateLayer';

const CountryRepo = new CountryRepositoryImpl();

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
    const map = useMap();
    const [regionData, setRegionData] = useState(null);
    const [showStateChoropleth, setShowStateChoropleth] = useState(false);

    const getCountryNutrition = (iso3) => {
        const countryData = nutrition.nutrition.find((item) => item.iso3 === iso3 && item.active);
        return countryData || null;
    };

    const handleCountryClick = async (feature, bounds) => {
        const countryId = feature.properties.adm0_id;
        if (countryId) {
            try {
                const regionData = await CountryRepo.getRegionData(countryId);
                if (regionData && regionData.features) {
                    console.log("Fetched region data:", regionData);
                    setRegionData({
                        type: "FeatureCollection",
                        features: regionData.features
                    });
                    setShowStateChoropleth(true);
                    map.fitBounds(bounds);
                }
            } catch (error) {
                console.error("Error fetching country data:", error);
            }
        }
        if (handleClick) handleClick(feature, bounds, map);
    };

    const features = (feature, layer) => {
        layer.on({
            mouseover: (e) => {
                if (view !== 'nutrition') {
                    e.target.setStyle(hoverStyle);
                }
                if (onFeatureMouseOver) onFeatureMouseOver();
            },
            mouseout: (e) => {
                if (view !== 'nutrition') geoJsonRef.current.resetStyle(e.target);
            },
            click: (e) => {
                handleCountryClick(e.target.feature, e.target.getBounds());
            },
        });

        if (onEachFeature) onEachFeature(feature, layer);

        const content = tooltip ? tooltip.render(feature) : feature.properties.adm0_name;
        const div = document.createElement('div');
        const root = createRoot(div);
        root.render(content);

        layer.bindTooltip(div, { sticky: true, className: tooltip ? tooltip.className : 'countryTooltip' });
    };

    const nutritionFill = (value) => {
        if (value === null) return 'none';
        if (value <= 1) return '#fde2e1';
        if (value <= 2) return '#fcd0ce';
        if (value <= 3) return '#f88884';
        if (value <= 4) return '#f5524c';
        if (value <= 5) return '#f32e27';
        return '#A0A0A0';
    };

    const nutritionAdm1Styles = (feature) => {
        const iso3 = feature.properties.iso3;
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
            {showStateChoropleth && regionData && (
                <StateChoropleth
                    regionData={regionData}
                    style={{
                        fillColor: '#992F7B',
                        color: '#000',
                        weight: 1,
                        fillOpacity: 0.6,
                    }}
                    hoverStyle={{
                        fillColor: '#FFD700',
                        fillOpacity: 0.8,
                    }}
                    handleClick={(feature) => console.log("State clicked:", feature)}
                    tooltip={{
                        render: (feature) => `<div>${feature.properties.Name}</div>`,
                        className: 'state-tooltip',
                    }}
                />
            )}
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
