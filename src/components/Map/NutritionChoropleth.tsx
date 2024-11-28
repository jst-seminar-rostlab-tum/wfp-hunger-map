import NutritionChoroplethProps from '@/domain/props/NutritionChoroplethProps';

import NutritionStateChoropleth from './NutritionStateChoropleth';

export default function NutritionChoropleth({
  countryId,
  selectedCountryId,
  regionData,
  regionNutritionData,
}: NutritionChoroplethProps) {
  return (
    <div>
      {
        // if this country ('countryId') is selected and data is loaded ('regionData') show Choropleth for all states
        regionData && countryId === selectedCountryId && (
          <NutritionStateChoropleth regionData={regionData} regionNutrition={regionNutritionData} />
        )
      }
    </div>
  );
}
