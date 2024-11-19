import 'leaflet/dist/leaflet.css';

import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { GeoJSON, useMap } from 'react-leaflet';

import CountryRepositoryImpl from '@/infrastructure/repositories/CountryRepositoryImpl';

import StateChoropleth from './NutritionStateLayer';

const CountryRepo = new CountryRepositoryImpl();

export default function NutritionChoropleth({ data, style, handleClick, onEachFeature, tooltip }) {
  const geoJsonRef = useRef();
  const map = useMap();
  const [regionData, setRegionData] = useState(null);
  const [showStateChoropleth, setShowStateChoropleth] = useState(false);
  const [selectedCountryId, setSelectedCountryId] = useState(null);

  const handleCountryClick = async (feature, bounds) => {
    const countryId = feature.properties.adm0_id;
    if (countryId) {
      try {
        const regData = await CountryRepo.getRegionData(countryId);
        const regNutritionData = await CountryRepo.getRegionNutritionData(countryId);

        setSelectedCountryId(regNutritionData);
        if (regData && regData.features) {
          setRegionData({
            type: 'FeatureCollection',
            features: regData.features,
          });
          setShowStateChoropleth(true);
          map.fitBounds(bounds);
        }
      } catch (error) {
        console.error('Error fetching country data:', error);
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
          regionNutri={selectedCountryId}
          regionData={regionData}
          hoverStyle={{
            fillColor: '#3F3F46',
            fillOpacity: 1,
          }}
          handleClick={(feature) => console.log('State clicked:', feature)}
          tooltip={{
            render: (feature) => `<div>${feature.properties.Name}</div>`,
            className: 'state-tooltip',
          }}
        />
      )}
    </>
  );
}

NutritionChoropleth.propTypes = {
  data: PropTypes.object.isRequired,
  style: PropTypes.func,
  hoverStyle: PropTypes.func,
  handleClick: PropTypes.func,
  onEachFeature: PropTypes.func,
  tooltip: PropTypes.shape({
    className: PropTypes.string,
    render: PropTypes.func,
  }),
};

NutritionChoropleth.defaultProps = {
  style: () => ({}),
  hoverStyle: null,
  handleClick: () => {},
};
