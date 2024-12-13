import { Button } from '@nextui-org/button';
import { Add, Minus } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';

import { MAP_MAX_ZOOM, MAP_MIN_ZOOM } from '@/domain/constant/map/Map';
import { useAccordionsModal } from '@/domain/contexts/AccodionsModalContext';

interface ZoomControlProps {
  threshold: number;
  callback: (zoom: number) => void;
}

export default function ZoomControl({ threshold, callback }: ZoomControlProps) {
  const map = useMap();
  const [zoomLevel, setZoomLevel] = useState(MAP_MIN_ZOOM);
  const { clearAccordionModal } = useAccordionsModal();

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
        aria-label="Zoom in"
        size="sm"
        onClick={() => map.zoomIn()}
        color="default"
        className="px-2 min-w-0 rounded-t-md rounded-b-none z-9999 bg-content1 hover:bg-content2"
      >
        <Add size={24} />
      </Button>
      <Button
        isDisabled={zoomLevel === MAP_MIN_ZOOM}
        aria-label="Zoom out"
        size="sm"
        onClick={() => map.zoomOut()}
        className="rounded-b-md px-2 min-w-0 rounded-t-none z-9999 bg-content1 hover:bg-content2"
      >
        <Minus size={24} />
      </Button>
    </div>
  );
}
