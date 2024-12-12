import { Button } from '@nextui-org/button';
import { Chart, Diagram } from 'iconsax-react';
import React from 'react';

import { Tooltip } from '@/components/Tooltip/Tooltip';
import { ChartType } from '@/domain/enums/ChartType.ts';
import { ChartAlternativeSwitchButtonProps } from '@/domain/props/ChartContainerProps';

/**
 * This component is tied to the `ChartContainer` and `ChartModal` component and should not be used independently.
 */
export default function ChartAlternativeSwitchButton({
  defaultChartType,
  alternativeChartType,
  showAlternativeChart,
  setShowAlternativeChart,
  size,
}: ChartAlternativeSwitchButtonProps) {
  const chartTypeIcons = new Map<ChartType, React.JSX.Element>();
  chartTypeIcons.set(ChartType.LINE, <Diagram className={`h-${size} w-${size}`} />);
  chartTypeIcons.set(ChartType.COLUMN, <Chart className={`h-${size} w-${size}`} />);
  chartTypeIcons.set(ChartType.PIE, <Chart className={`h-${size} w-${size}`} />);

  const chartTypeTitles = new Map<ChartType, string>();
  chartTypeTitles.set(ChartType.LINE, 'Line');
  chartTypeTitles.set(ChartType.COLUMN, 'Column');
  chartTypeTitles.set(ChartType.PIE, 'Pie');

  return (
    <Tooltip
      text={`Switch to ${showAlternativeChart ? chartTypeTitles.get(defaultChartType) : chartTypeTitles.get(alternativeChartType)} Chart`}
    >
      <Button isIconOnly variant="light" size="sm" onClick={() => setShowAlternativeChart(!showAlternativeChart)}>
        {showAlternativeChart ? chartTypeIcons.get(defaultChartType) : chartTypeIcons.get(alternativeChartType)}
      </Button>
    </Tooltip>
  );
}
