import { Undo } from 'lucide-react';
import React from 'react';
import { GeoJSON } from 'react-leaflet';

import FscCountryChoroplethProps from '@/domain/props/FcsCountryChoroplethProps';
import { FcsCountryChoroplethOperations } from '@/operations/map/FcsCountryChoroplethOperations';

import { CustomButton } from '../Buttons/CustomButton';
import FcsAccordion from './FcsAccordion';

export default function FscCountryChoropleth({
  regionData,
  countryData,
  countryIso3Data,
  countryName,
  handleBackButtonClick,
  loading,
}: FscCountryChoroplethProps) {
  return (
    <>
      <div className="absolute left-[1250px] top-[19px]" style={{ zIndex: 1000 }}>
        <CustomButton variant="solid" onClick={handleBackButtonClick}>
          <div className="flex items-center space-x-2 text-black dark:text-white">
            <Undo />
            <span>Global View</span>
          </div>
        </CustomButton>
      </div>
      <div>
        <FcsAccordion
          countryData={countryData}
          countryIso3Data={countryIso3Data}
          loading={loading}
          countryName={countryName}
        />
        <GeoJSON
          data={regionData}
          style={FcsCountryChoroplethOperations.styleFunction}
          onEachFeature={(feature, layer) => FcsCountryChoroplethOperations.onEachFeature(feature, layer, regionData)}
        />
      </div>
    </>
  );
}
