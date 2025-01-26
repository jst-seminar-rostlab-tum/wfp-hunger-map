import { Button } from '@nextui-org/button';
import { PercentageSquare, Scroll } from 'iconsax-react';
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
  const switchToText = showRelativeNumbers ? 'absolute' : 'relative';
  const icon = showRelativeNumbers ? (
    <Scroll className={`h-${size} w-${size}`} />
  ) : (
    <PercentageSquare className={`h-${size} w-${size}`} />
  );

  return (
    <Tooltip text={`Show ${switchToText} numbers`}>
      <Button isIconOnly variant="light" size="sm" onClick={() => setShowRelativeNumbers(!showRelativeNumbers)}>
        {icon}
      </Button>
    </Tooltip>
  );
}
