'use client';

import { useEffect, useState } from 'react';

import LegendContainer from '@/components/Legend/LegendContainer';
import { mapLegendData } from '@/domain/constant/legend/mapLegendData';
import { useSelectedAlert } from '@/domain/contexts/SelectedAlertContext';
import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { useSelectedMap } from '@/domain/contexts/SelectedMapContext';
import { GradientLegendContainerItem } from '@/domain/props/GradientLegendContainerItem.ts';
import PointLegendContainerItem from '@/domain/props/PointLegendContainerItem.ts';

/**
 * MapLegend component
 *
 * @returns A LegendContainer component with the legend items based on the selected
 * map type, alert, and countryId.
 */
export default function MapLegend() {
  const { selectedMapType } = useSelectedMap();
  const { selectedAlert } = useSelectedAlert();
  const { selectedCountryId } = useSelectedCountryId();
  const [items, setItems] = useState<(PointLegendContainerItem | GradientLegendContainerItem)[]>([]);

  useEffect(() => {
    setItems(mapLegendData(selectedMapType, selectedAlert, selectedCountryId));
  }, [selectedAlert, selectedMapType, selectedCountryId]);

  return <LegendContainer items={items} />;
}
