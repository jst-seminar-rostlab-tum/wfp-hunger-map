import { Button } from '@nextui-org/button';
import React from 'react';

import { Tooltip } from '@/components/Tooltip/Tooltip';
import { ChartAlternativeSwitchButtonProps } from '@/domain/props/ChartContainerProps';
import ChartDownloadButtonOperations from '@/operations/charts/ChartAlternativeSwitchButtonOperations';

/**
 * This component is tied to the `ChartContainer` and `ChartModal` component and should not be used independently.
 */
export default function ChartAlternativeSwitchButton({
  defaultChartType,
  alternativeChartType,
  showAlternativeChart,
  setShowAlternativeChart,
  size = 4,
}: ChartAlternativeSwitchButtonProps) {
  const chartSwitchTitle = showAlternativeChart
    ? ChartDownloadButtonOperations.getChartTypeTitle(defaultChartType)
    : ChartDownloadButtonOperations.getChartTypeTitle(alternativeChartType);

  const chartSwitchIcon = showAlternativeChart
    ? ChartDownloadButtonOperations.getChartTypeIcon(defaultChartType, size)
    : ChartDownloadButtonOperations.getChartTypeIcon(alternativeChartType, size);

  return (
    <Tooltip text={`Switch to ${chartSwitchTitle} Chart`}>
      <Button isIconOnly variant="light" size="sm" onPress={() => setShowAlternativeChart(!showAlternativeChart)}>
        {chartSwitchIcon}
      </Button>
    </Tooltip>
  );
}
