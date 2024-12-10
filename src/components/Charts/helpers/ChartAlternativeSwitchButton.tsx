import { Button } from '@nextui-org/button';
import { Chart, Diagram } from 'iconsax-react';

import { Tooltip } from '@/components/Tooltip/Tooltip';
import { ChartTypeSwitchButtonProps } from '@/domain/props/ChartContainerProps';

/**
 * This component is tied to the `ChartContainer` and `ChartModal` component and should not be used independently.
 */
export default function ChartAlternativeSwitchButton({
  showAlternativeChart,
  setShowAlternativeChart,
  size,
}: ChartTypeSwitchButtonProps) {
  return (
    <Tooltip text={`Switch to ${showAlternativeChart ? 'Line' : 'Bar'} Chart`}>
      // todo
      <Button isIconOnly variant="light" size="sm" onClick={() => setShowAlternativeChart(!showAlternativeChart)}>
        {showAlternativeChart ? (
          <Diagram className={`h-${size} w-${size}`} />
        ) : (
          <Chart className={`h-${size} w-${size}`} />
        )}
      </Button>
    </Tooltip>
  );
}
