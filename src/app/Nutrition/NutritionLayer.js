import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { createRoot } from 'react-dom/client';

import CountryRepositoryImpl from '@/infrastructure/repositories/CountryRepositoryImpl';
import StateChoropleth from './NutritionStateLayer';

const CountryRepo = new CountryRepositoryImpl();

const NutritionChoropleth = ({
    view,
    data,
    style,
    handleClick,
    onEachFeature,
    tooltip,
}) => {
    const geoJsonRef = useRef();
    const map = useMap();
    const [regionData, setRegionData] = useState(null);
    const [showStateChoropleth, setShowStateChoropleth] = useState(false);

    const handleCountryClick = async (feature, bounds) => {
        const countryId = feature.properties.adm0_id;
        if (countryId) {
            try {
                const regionData = await CountryRepo.getRegionData(countryId);
                if (regionData && regionData.features) {
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
    return (
        <>
            <GeoJSON ref={geoJsonRef} style={style} data={data} onEachFeature={features} />
            {showStateChoropleth && regionData && (
                <StateChoropleth
                    regionData={regionData}
                    style={{
                        fillColor: '#F9C97C',
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
