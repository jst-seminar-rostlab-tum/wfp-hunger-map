'use client';

import { useState } from 'react';

import AccordionContainer from '@/components/Accordions/AccordionContainer';
import { CustomButton } from '@/components/Buttons/CustomButton';
import { CategoricalChart } from '@/components/Charts/CategoricalChart';
import { LineChart } from '@/components/Charts/LineChart';
import MapSkeleton from '@/components/Map/MapSkeleton';
import SearchBar from '@/components/Search/SearchBar';
import { CategoricalChartData } from '@/domain/entities/charts/CategoricalChartData.ts';
import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';
import { LineChartDataType } from '@/domain/enums/LineChartDataType.ts';
import AccordionsOperations from '@/operations/accordions/AccordionOperations';

import { ReactComponent as FoodSvg } from '../../../public/Images/FoodConsumption.svg';

/**
 * You can use this page to try and show off your components.
 * It's not accessible from the UI, but you can reach it by manually navigating to /elements
 */
export default async function Elements() {
  const [searchTerm, setSearchTerm] = useState('');
  const simpleAndSmallLineChartData: LineChartData = {
    type: LineChartDataType.LINE_CHART_DATA,
    xAxisType: 'linear',
    lines: [
      {
        name: 'Category A',
        dataPoints: [
          { x: 0, y: 1 },
          { x: 1, y: 2 },
          { x: 2, y: 4 },
          { x: 3, y: 4 },
        ],
      },
    ],
  };

  const maxedOutLineChartData: LineChartData = {
    type: LineChartDataType.LINE_CHART_DATA,
    xAxisType: 'linear',
    yAxisLabel: 'yield',
    lines: [
      {
        name: 'Category A',
        showRange: true,
        dataPoints: [
          { x: 0, y: 1, yRangeMin: 0, yRangeMax: 2 },
          { x: 1, y: 3, yRangeMin: 2, yRangeMax: 4 },
          { x: 2, y: 4, yRangeMin: 3.5, yRangeMax: 4.5 },
          { x: 3, y: 8, yRangeMin: 7.5, yRangeMax: 8.5 },
        ],
      },
      {
        name: 'Category B',
        dataPoints: [
          { x: 0, y: 4 },
          { x: 1, y: 7 },
          { x: 2, y: 5 },
          { x: 3, y: 2 },
        ],
        dashStyle: 'LongDash',
      },
      {
        name: 'Category C',
        dataPoints: [
          { x: 0, y: 7 },
          { x: 1, y: 2 },
          { x: 3, y: 3 },
        ],
        dashStyle: 'Dot',
      },
    ],
    verticalLines: [
      {
        x: 1,
      },
      {
        x: 1.5,
        dashStyle: 'LongDash',
        color: 'rgba(129,27,27,0.53)',
      },
    ],
    verticalBands: [
      {
        xStart: -1,
        xEnd: 1,
        label: 'AB',
      },
      {
        xStart: 1,
        xEnd: 4,
        color: 'rgba(129,27,27,0.13)',
        label: 'EF',
      },
    ],
  };

  const predictionDummyChartData: LineChartData = {
    type: LineChartDataType.LINE_CHART_DATA,
    xAxisType: 'linear',
    yAxisLabel: 'Mill',
    predictionVerticalLineX: 3,
    lines: [
      {
        name: 'Category A',
        showRange: true,
        dataPoints: [
          { x: 0, y: 4, yRangeMin: 3.5, yRangeMax: 5 },
          { x: 1, y: 3, yRangeMin: 2, yRangeMax: 4 },
          { x: 2, y: 4, yRangeMin: 3.5, yRangeMax: 4.5 },
          { x: 3, y: 8, yRangeMin: 7.5, yRangeMax: 8.5 },
        ],
      },
      {
        name: 'Prediction',
        prediction: true,
        dataPoints: [
          { x: 0, y: 4 },
          { x: 1, y: 7 },
          { x: 2, y: 5 },
          { x: 3, y: 7 },
          { x: 4, y: 8 },
          { x: 5, y: 5 },
          { x: 6, y: 6 },
        ],
      },
    ],
  };

  const categoricalDummyChartData1: CategoricalChartData = {
    yAxisLabel: 'Mill',
    categories: [
      {
        name: 'Category A',
        dataPoint: { y: 5 },
      },
      {
        name: 'Category A',
        dataPoint: { y: 5 },
      },
    ],
  };
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="svg-icon">
        <FoodSvg width={200} height={200} />
      </div>
      <CustomButton variant="solid">Test</CustomButton>
      <CustomButton variant="bordered">Test</CustomButton>
      <CustomButton variant="flat">Test</CustomButton>
      <SearchBar
        value={searchTerm}
        onValueChange={setSearchTerm}
        placeholder="Search a country"
        className="max-w-96 py-1"
      />
      <AccordionContainer items={AccordionsOperations.getAccordionData()} />
      <div className="w-full h-fit flex flex-row flex-wrap gap-10 justify-around px-8 pt-40 pb-16 border-b border-gray-800">
        <div className="w-250px h-fit">
          <LineChart
            data={simpleAndSmallLineChartData}
            small
            disableDownload
            disableBarChartSwitch
            disableExpandable
            disableXAxisSlider
          />
        </div>
        <div className="w-400px h-fit">
          <LineChart
            title="Maxed Out Line Chart"
            description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor onsetetur sadipscing elitr."
            data={maxedOutLineChartData}
          />
        </div>
        <div className="w-400px h-fit">
          <LineChart title="" data={predictionDummyChartData} />
        </div>
        <div className="w-400px h-fit">
          <CategoricalChart title="" data={categoricalDummyChartData1} />
        </div>
      </div>
      <MapSkeleton />
    </div>
  );
}
