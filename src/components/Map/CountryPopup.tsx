import { Popup } from 'react-leaflet';

import { CountryMapData } from '@/domain/entities/country/CountryMapData';
import { useCountryDataQuery } from '@/domain/hooks/countryHooks';

/**
 * This is just an example of how the sidebars could fetch the data when a country is clicked
 */
export function CountryPopup({ country, onClose }: { country: CountryMapData; onClose: () => void }) {
  const { data, isPending } = useCountryDataQuery(country.properties.adm0_id);

  return (
    <Popup
      position={{ lat: country.properties.centroid.latitude, lng: country.properties.centroid.longitude }}
      eventHandlers={{ remove: onClose }}
    >
      FCS: {isPending || !data ? 'Loading...' : data.fcs}
    </Popup>
  );
}
