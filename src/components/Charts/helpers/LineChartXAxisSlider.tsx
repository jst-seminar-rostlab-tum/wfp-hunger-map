import { Slider } from '@nextui-org/slider';

import { LineChartXAxisSlider } from '@/domain/props/LineChartProps';

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
}: LineChartXAxisSlider) {
  const xAxisValues: string[] = data.lines[0]?.dataPoints.map((d) => d.x) || [];

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
        showSteps
        color="secondary"
        size="sm"
        classNames={{
          base: 'max-w-md',
          track: 'bg-secondary bg-opacity-10',
          filler: 'bg-secondary',
        }}
      />
    </div>
  );
}
