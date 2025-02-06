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
  const className = small ? 'h-3 w-3' : 'h-4 w-4';

  const chartSwitchTitle = showAlternativeChart
    ? ChartDownloadButtonOperations.getChartTypeTitle(defaultChartType)
    : ChartDownloadButtonOperations.getChartTypeTitle(alternativeChartType);

  const chartSwitchIcon = showAlternativeChart
    ? ChartDownloadButtonOperations.getChartTypeIcon(defaultChartType, className)
    : ChartDownloadButtonOperations.getChartTypeIcon(alternativeChartType, className);

  return (
    <Tooltip text={`Switch to ${chartSwitchTitle} Chart`}>
      <Button isIconOnly variant="light" size="sm" onPress={() => setShowAlternativeChart(!showAlternativeChart)}>
        {chartSwitchIcon}
      </Button>
    </Tooltip>
  );
}
