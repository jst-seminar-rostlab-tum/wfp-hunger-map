'use client';

import { Slider } from '@nextui-org/slider';

import { ChartSliderProps } from '@/domain/props/ChartContainerProps';

/**
 * This component is tied to the `ChartContainer` and `ChartModal` component and should not be used independently.
 * It renders a simple NextUI slider.
 */
export default function ChartSlider({
  title,
  sliderMin,
  sliderMax,
  selectedSliderRange,
  setSelectedSliderRange,
}: ChartSliderProps) {
  return (
    <div className="pl-5 pr-2">
      <h3 className="font-normal text-secondary text-tiny pb-1">{title || ''}</h3>
      <Slider
        aria-label="x-axis range slider"
        minValue={sliderMin}
        maxValue={sliderMax}
        step={1}
        value={selectedSliderRange}
        onChange={(e) => setSelectedSliderRange(e as number[])}
        color="secondary"
        size="sm"
        showOutline
        classNames={{
          base: 'max-w-md',
          track: 'bg-clickableSecondary h-0.5',
          filler: 'bg-surfaceGrey',
          step: 'bg-clickableSecondary data-[in-range=true]:bg-surfaceGrey h-1.5 w-0.5',
          thumb: 'w-5 h-5 bg-clickableSecondary data-[dragging=true]:bg-primary',
        }}
      />
    </div>
  );
}
