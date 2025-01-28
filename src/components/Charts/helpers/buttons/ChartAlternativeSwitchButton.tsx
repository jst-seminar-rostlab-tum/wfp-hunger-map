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
  small = false,
}: ChartAlternativeSwitchButtonProps) {
  const SIZE = small ? 3 : 4;

  const chartSwitchTitle = showAlternativeChart
    ? ChartDownloadButtonOperations.getChartTypeTitle(defaultChartType)
    : ChartDownloadButtonOperations.getChartTypeTitle(alternativeChartType);

  const chartSwitchIcon = showAlternativeChart
    ? ChartDownloadButtonOperations.getChartTypeIcon(defaultChartType, SIZE)
    : ChartDownloadButtonOperations.getChartTypeIcon(alternativeChartType, SIZE);

  return (
    <Tooltip text={`Switch to ${chartSwitchTitle} Chart`}>
      <Button isIconOnly variant="light" size="sm" onClick={() => setShowAlternativeChart(!showAlternativeChart)}>
        {chartSwitchIcon}
      </Button>
    </Tooltip>
  );
}
