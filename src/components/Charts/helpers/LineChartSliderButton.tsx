import { Button } from '@nextui-org/button';
import { Settings } from 'iconsax-react';

import { Tooltip } from '@/components/Tooltip/Tooltip';
import { LineChartSliderButtonProps } from '@/domain/props/LineChartProps';

/**
 * This component is tied to the `LineChart` and `LineChartModal` component
 * and should not be used independently.
 */
export default function LineChartSliderButton({
  showXAxisSlider,
  setShowXAxisSlider,
  size,
}: LineChartSliderButtonProps) {
  return (
    <Tooltip text="x-Axis Slider">
      <Button
        isIconOnly
        variant="light"
        size="sm"
        onPress={() => {
          setShowXAxisSlider(!showXAxisSlider);
        }}
      >
        <Settings className={`h-${size} w-${size}`} />
      </Button>
    </Tooltip>
  );
}
