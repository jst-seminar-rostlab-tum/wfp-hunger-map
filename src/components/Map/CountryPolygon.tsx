import { useState } from 'react';
import { Polygon } from 'react-leaflet';

import { CountryMapData } from '@/domain/entities/country/CountryMapData';

import { CountryPopup } from './CountryPopup';

export function CountryPolygon({ country }: { country: CountryMapData }) {
  const [active, setActive] = useState(false);

  return (
    <>
      <Polygon
        pathOptions={{ color: 'purple' }}
        positions={country.geometry.coordinates}
        eventHandlers={{ click: () => setActive(true) }}
      />
      {active && <CountryPopup country={country} onClose={() => setActive(false)} />}
    </>
  );
}
