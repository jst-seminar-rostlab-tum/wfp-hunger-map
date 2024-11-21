import { Button } from '@nextui-org/button';
import { Chart, Diagram } from 'iconsax-react';

import { Tooltip } from '@/components/Tooltip/Tooltip';
import { LineChartBarLineSwitchButtonProps } from '@/domain/props/LineChartProps';

/**
 * This component is tied to the `LineChart` and `LineChartModal` component
 * and should not be used independently.
 */
export default function LineChartBarLineSwitchButton({
  showBarChart,
  setShowBarChart,
  size,
}: LineChartBarLineSwitchButtonProps) {
  return (
    <Tooltip text={`Switch to ${showBarChart ? 'Line' : 'Bar'} Chart`}>
      <Button isIconOnly variant="light" size="sm" onClick={() => setShowBarChart(!showBarChart)}>
        {showBarChart ? <Diagram className={`h-${size} w-${size}`} /> : <Chart className={`h-${size} w-${size}`} />}
      </Button>
    </Tooltip>
  );
}
