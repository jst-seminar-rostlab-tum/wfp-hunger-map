import { Button } from '@nextui-org/button';
import { Diagram } from 'iconsax-react';
import React from 'react';

import { Tooltip } from '@/components/Tooltip/Tooltip';
import { ChartRelativeNumbersSwitchButtonProps } from '@/domain/props/ChartContainerProps';

/**
 * This component is tied to the `ChartContainer` and `ChartModal` component and should not be used independently.
 */
export default function ChartRelativeNumbersSwitchButton({
  showRelativeNumbers,
  setShowRelativeNumbers,
  size = 4,
}: ChartRelativeNumbersSwitchButtonProps) {
  return (
    <Tooltip text={`Switch to ${"todo"} Chart`}>
      <Button isIconOnly variant="light" size="sm" onClick={() => setShowRelativeNumbers(!showRelativeNumbers)}>
        <Diagram className={`h-${size} w-${size}`} />;
      </Button>
    </Tooltip>
  );
}
