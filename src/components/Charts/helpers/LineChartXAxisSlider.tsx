import { Slider } from '@nextui-org/slider';

import { LineChartXAxisSliderProps } from '@/domain/props/LineChartProps';
import LineChartOperations from '@/operations/charts/LineChartOperations.ts';

/**
 * This component is tied to the `LineChart` and `LineChartModal` component
 * and should not be used independently.
 * It renders a NextUI slider with which the shown x-axis range of the chart
 * within `LineChart` and `LineChartModal` can be manipulated.
 */
export default function LineChartXAxisSlider({
  selectedXAxisRange,
  setSelectedXAxisRange,
  data,
}: LineChartXAxisSliderProps) {
  const xAxisValues: number[] = LineChartOperations.getDistinctXAxisValues(data);

  return (
    <div className="pl-5 pr-2">
      <h3 className="font-normal text-secondary text-tiny pb-1">Adjusting x-axis range:</h3>
      <Slider
        aria-label="x-axis range slider"
        minValue={0}
        maxValue={xAxisValues.length - 1}
        step={1}
        value={selectedXAxisRange}
        onChange={(e) => setSelectedXAxisRange(e as number[])}
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
