import { Undo } from 'lucide-react';
import React from 'react';
import { GeoJSON } from 'react-leaflet';

import { CustomButton } from '@/components/Buttons/CustomButton';
import IpcCountryChoroplethProps from '@/domain/props/IpcCountryChoroplethProps';
import { IpcChoroplethOperations } from '@/operations/map/IpcChoroplethOperations';

import IpcAccordion from './IpcAccordion';

function IpcCountryChoropleth({
  regionIpcData,
  countryData,
  countryName,
  handleBackButtonClick,
}: IpcCountryChoroplethProps) {
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
      <IpcAccordion countryData={countryData} countryName={countryName} />
      <GeoJSON style={IpcChoroplethOperations.ipcCountryStyle} data={regionIpcData} />
    </>
  );
}

export default IpcCountryChoropleth;
