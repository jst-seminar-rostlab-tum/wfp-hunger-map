import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface ZoomTrackerProps {
  threshold: number;
  callback: (zoom: number) => void;
}

export default function ZoomTracker({ threshold, callback }: ZoomTrackerProps) {
  const map = useMap();

  useEffect(() => {
    const handleZoomEnd = () => {
      const currentZoom = map.getZoom();
      if (currentZoom < threshold) {
        callback(currentZoom);
      }
    };

    map.on('zoomend', handleZoomEnd);
    return () => {
      map.off('zoomend', handleZoomEnd);
    };
  }, [map, threshold, callback]);
  return null;
}
