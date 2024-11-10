'use client';

import * as Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';
import { Maximize4 } from 'iconsax-react';

import LineChartProps from '@/domain/props/LineChartProps';
import LineChartOperations from '@/operations/charts/LineCharOperations.ts';
import { Button } from '@nextui-org/button';

export function LineChart({ title, description, expandable, data }: LineChartProps) {
  const options: Highcharts.Options = LineChartOperations.getHighChartData(data);

  const toggleFullScreen = (): void => {
    // todo
  };

  const fullScreenButton = expandable ? (
    <Button isIconOnly variant="light" size="sm" onClick={toggleFullScreen}>
      <Maximize4 className="h-4 w-4" />
    </Button>
  ) : null;

  return (
    <div className="w-full h-fit flex-col rounded-lg pt-2 bg-background">
      <div className="w-full h-fit flex flex-row justify-between items-start gap-2 px-2">
        <p className="text-md font-normal pt-1 flex flex-row items-center"> {title} </p>
        {fullScreenButton}
      </div>
      <p className="w-full h-fit py-2 text-sm font-normal px-2">{description}</p>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { width: '100%', height: '16rem', borderRadius: '0 0 0.5rem 0.5rem' } }}
      />
    </div>
  );
}
