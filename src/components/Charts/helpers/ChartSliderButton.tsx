import { Button } from '@nextui-org/button';
import { Settings } from 'iconsax-react';

import { Tooltip } from '@/components/Tooltip/Tooltip';
import { LineChartSliderButtonProps } from '@/domain/props/LineChartProps';

/**
 * This component is tied to the `ChartContainer` and `ChartModal` component and should not be used independently.
 */
export default function ChartSliderButton({ showSlider, setShowSlider, size }: LineChartSliderButtonProps) {
  return (
    <Tooltip text="x-Axis Slider">
      <Button
        isIconOnly
        variant="light"
        size="sm"
        onPress={() => {
          setShowSlider(!showSlider);
        }}
      >
        <Settings className={`h-${size} w-${size}`} />
      </Button>
    </Tooltip>
  );
}
