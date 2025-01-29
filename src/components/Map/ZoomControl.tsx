import { Button } from '@nextui-org/button';
import { GeoJSON } from 'geojson';
import { Add, Minus } from 'iconsax-react';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';

import { MAP_MAX_ZOOM, MAP_MIN_ZOOM } from '@/domain/constant/map/Map';
import { useAccordionsModal } from '@/domain/contexts/AccodionsModalContext';
import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { useSelectedMap } from '@/domain/contexts/SelectedMapContext';
import { useSidebar } from '@/domain/contexts/SidebarContext';
import { CountryMapData, CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';

interface ZoomControlProps {
  threshold: number;
  callback: (zoom: number) => void;
  countries: CountryMapDataWrapper;
}

export default function ZoomControl({ threshold, callback, countries }: ZoomControlProps) {
  const map = useMap();
  const [zoomLevel, setZoomLevel] = useState(MAP_MIN_ZOOM);
  const { clearAccordionModal } = useAccordionsModal();
  const { selectedMapType } = useSelectedMap();
  const { selectedCountryId } = useSelectedCountryId();
  const { closeSidebar } = useSidebar();

  // zoom to country if selection changes
  useEffect(() => {
    if (selectedCountryId) {
      closeSidebar();

      const selectedCountryData: CountryMapData | undefined = countries.features.find(
        (country) => country.properties.adm0_id === selectedCountryId
      );
      if (selectedCountryData) {
        window.gtag('event', `${selectedCountryData.properties.iso3}_country_selected`, {
          selectedMap: selectedMapType,
        });
        window.gtag('event', `${selectedCountryData.properties.iso3} _${selectedMapType}_countrymap_selected`);
        map.fitBounds(L.geoJSON(selectedCountryData as GeoJSON).getBounds(), { animate: true });
      }
    }
  }, [selectedCountryId, selectedMapType]);

  useEffect(() => {
    const handleZoomEnd = () => {
      const currentZoom = map.getZoom();
      if (currentZoom < threshold) {
        clearAccordionModal();
        callback(currentZoom);
      }
      setZoomLevel(currentZoom);
    };

    map.on('zoomend', handleZoomEnd);
    return () => {
      map.off('zoomend', handleZoomEnd);
    };
  }, [map, threshold, callback]);

  return (
    <div className="absolute right-4 bottom-7 z-9999 flex flex-col shadow-lg">
      <Button
        isDisabled={zoomLevel === MAP_MAX_ZOOM}
        size="sm"
        onClick={() => map.zoomIn()}
        color="default"
        className="px-2 min-w-0 rounded-t-md rounded-b-none z-9999 bg-content1 hover:bg-content2"
        aria-label="Zoom in"
      >
        <Add size={24} />
      </Button>
      <Button
        isDisabled={zoomLevel === MAP_MIN_ZOOM}
        size="sm"
        onClick={() => map.zoomOut()}
        className="rounded-b-md px-2 min-w-0 rounded-t-none z-9999 bg-content1 hover:bg-content2"
        aria-label="Zoom out"
      >
        <Minus size={24} />
      </Button>
    </div>
  );
}
