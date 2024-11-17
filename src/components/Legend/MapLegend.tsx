'use client';

import LegendContainer from '@/components/Legend/LegendContainer';
import { mapLegendData } from '@/domain/constant/legend/mapLegendData.ts';
import { useSidebar } from '@/domain/contexts/SidebarContext';

export default function MapLegend() {
  const { selectedMapType } = useSidebar();
  return (
    <div className="absolute bottom-5 right-0 z-50 pr-10">
      <LegendContainer items={mapLegendData(selectedMapType)} />
    </div>
  );
}
