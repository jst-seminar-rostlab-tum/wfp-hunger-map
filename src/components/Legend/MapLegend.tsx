'use client';

import { useEffect, useState } from 'react';

import LegendContainer from '@/components/Legend/LegendContainer';
import { mapLegendData } from '@/domain/constant/legend/mapLegendData.ts';
import { useSelectedAlert } from '@/domain/contexts/SelectedAlertContext';
import { useSelectedMap } from '@/domain/contexts/SelectedMapContext';
import { GradientLegendContainerItem } from '@/domain/props/GradientLegendContainerItem.ts';
import PointLegendContainerItem from '@/domain/props/PointLegendContainerItem.ts';

export default function MapLegend() {
  const { selectedMapType } = useSelectedMap();
  const { selectedAlert } = useSelectedAlert();
  const [items, setItems] = useState<(PointLegendContainerItem | GradientLegendContainerItem)[]>([]);

  useEffect(() => {
    setItems(mapLegendData(selectedMapType, selectedAlert));
  }, [selectedAlert, selectedMapType]);

  return <LegendContainer items={items} />;
}
