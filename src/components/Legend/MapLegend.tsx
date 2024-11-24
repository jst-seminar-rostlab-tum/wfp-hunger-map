'use client';

import { useEffect, useState } from 'react';

import LegendContainer from '@/components/Legend/LegendContainer';
import { mapLegendData } from '@/domain/constant/legend/mapLegendData.ts';
import { useSelectedAlert } from '@/domain/contexts/SelectedAlertContext';
import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { useSelectedMap } from '@/domain/contexts/SelectedMapContext';
import { GradientLegendContainerItem } from '@/domain/props/GradientLegendContainerItem.ts';
import PointLegendContainerItem from '@/domain/props/PointLegendContainerItem.ts';

export default function MapLegend() {
  const { selectedMapType } = useSelectedMap();
  const { selectedAlert } = useSelectedAlert();
  const { selectedCountryId } = useSelectedCountryId();
  const [items, setItems] = useState<(PointLegendContainerItem | GradientLegendContainerItem)[]>([]);

  useEffect(() => {
    setItems(mapLegendData(selectedMapType, selectedAlert, selectedCountryId));
  }, [selectedAlert, selectedMapType, selectedCountryId]);

  return (
    <div className="absolute bottom-5 right-0 z-50 pr-10">
      <LegendContainer items={items} />
    </div>
  );
}
