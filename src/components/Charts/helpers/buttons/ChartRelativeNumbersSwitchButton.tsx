import { Button } from '@nextui-org/button';
import { Percent, Sigma } from 'lucide-react';
import React from 'react';

import { Tooltip } from '@/components/Tooltip/Tooltip';
import { ChartRelativeNumbersSwitchButtonProps } from '@/domain/props/ChartContainerProps';

/**
 * This component is tied to the `ChartContainer` and `ChartModal` component and should not be used independently.
 */
export default function ChartRelativeNumbersSwitchButton({
  showRelativeNumbers,
  setShowRelativeNumbers,
  small = false,
}: ChartRelativeNumbersSwitchButtonProps) {
  const SIZE = small ? 3 : 4;
  const switchToText = showRelativeNumbers ? 'absolute' : 'relative';
  const icon = showRelativeNumbers ? (
    <Sigma className={`h-${SIZE} w-${SIZE}`} />
  ) : (
    <Percent className={`h-${SIZE} w-${SIZE}`} />
  );

  return (
    <Tooltip text={`Show ${switchToText} numbers`}>
      <Button isIconOnly variant="light" size="sm" onClick={() => setShowRelativeNumbers(!showRelativeNumbers)}>
        {icon}
      </Button>
    </Tooltip>
  );
}
