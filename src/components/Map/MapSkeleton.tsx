import ZoomControlSkeleton from '@/components/Map/ZoomControlSkeleton';
import MapSkeletonData from '@/domain/constant/map/MapSkeletonData';

/**
 * Skeleton element shown when the map is initially loading. Based on an SVG file that shows the world map.
 * @constructor
 */
export default function MapSkeleton() {
  return (
    <div className="z-1 h-full w-full">
      <MapSkeletonData className="h-full w-full animate-opacityPulse fill-countriesBase bg-ocean" />
      <ZoomControlSkeleton />
    </div>
  );
}
