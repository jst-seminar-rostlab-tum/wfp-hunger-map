'use client';

import { Switch } from '@nextui-org/switch';
import { useTheme } from 'next-themes';
import { LineChart } from '@/components/Charts/LineChart.tsx';
import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';

/**
 * For testing purposes only -> todo: to be deleted after PR
 */
export default function Sandbox() {
  const { theme, setTheme } = useTheme();

  const simpleLineChartData: LineChartData = {
    type: 'LineChartData',
    title: 'Simple Line Chart Data',
    xAxisType: 'linear',
    yAxisLabel: 'yield',
    line: [
      {
        name: 'Category A',
        dataPoints: [
          { x: '0', y: 1 },
          { x: '1', y: 2 },
          { x: '2', y: 4 },
          { x: '3', y: 8 },
        ],
      },
    ],
  };

  const lineChartTestBox = (
    <div className="w-full h-fit flex flex-row flex-wrap gap-10 justify-around px-8 pt-40 pb-16 border-b border-gray-800">
      <div className="w-400px h-fit">
        <LineChart
          title="Simple Line Chart"
          description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
          expandable
          data={simpleLineChartData}
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="w-full h-10 p-8 flex flex-row items-center gap-4 border-b border-gray-800">
        <p> Change dark/light mode: </p>
        <Switch onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label="Toggle theme" size="sm" />
      </div>
      {lineChartTestBox}
    </>
  );
}
