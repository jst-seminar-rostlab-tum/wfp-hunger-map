import React from 'react';

import FcsChoroplethProps from '@/domain/props/FcsChoroplethProps';

import FscCountryChoropleth from './FcsCountryChoropleth';

export default function FcsChoropleth({
  countryId,
  selectedCountryId,
  countryData,
  countryIso3Data,
  regionData,
  countryDataLoading,
}: FcsChoroplethProps) {
  return (
    <div>
      {regionData && countryId === selectedCountryId && (
        <FscCountryChoropleth
          regionData={regionData}
          countryData={countryData}
          countryIso3Data={countryIso3Data}
          loading={countryDataLoading}
        />
      )}
    </div>
  );
}
