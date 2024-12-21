'use client';

import Highcharts from 'highcharts';
import { useEffect, useMemo, useState } from 'react';

import { ChartContainer } from '@/components/Charts/helpers/ChartContainer';
import { ContinuousChartData } from '@/domain/entities/charts/ContinuousChartData.ts';
import { ChartType } from '@/domain/enums/ChartType.ts';
import ContinuousChartProps from '@/domain/props/ContinuousChartProps';
import ContinuousChartOperations from '@/operations/charts/ContinuousChartOperations.ts';

/**
 * The ContinuousChart component is a box that primarily renders a title, description text, and a line chart.
 * It should be used to plot categorical data. For continues data please use the `CategoricalChart` component.
 * This component has a width of 100%, so it adjusts to the width of its parent element in which it is used.
 * The height of the entire box depends on the provided text, while the chart itself has a fixed height.
 * It also provides the option to open the chart in a full-screen modal, where one can download the data as well.
 *
 * The data to be displayed in the chart can be provided in different types (see `ContinuousChartProps.data`).
 * However, the preferred type is `ContinuousChartData`.
 *
 * To enable the ContinuousChart component to support an additional `data` type, the following steps are required:
 * 1. Define an interface and add it to `ContinuousChartProps.data`.
 * 2. Add another switch case in `ContinuousChartOperations.convertToContinuousChartData` to convert the new interface to `ContinuousChartData`.
 *
 * @param data the actual data to be used in the chart
 * @param title chart title (optional)
 * @param description chart description text (optional)
 * @param small when selected, all components in the main box become slightly smaller (optional)
 * @param noPadding when selected, the main box has no padding on all sides (optional)
 * @param transparentBackground when selected, the background of the entire component is transparent (optional)
 * @param chartHeight with this parameter, the height of the actual chart can be set to a fixed value in pixels. If
 *        chartHeight is not specified, the chart is given a fixed default height depending on `small`.
 * @param disableExpandable when selected, the functionality to open the chart in a larger modal is disabled (optional)
 * @param disableBarChartSwitch when selected, the functionality to switch to a bar chart is disabled (optional)
 * @param disableXAxisSlider when selected, the functionality to change the x-axis range via a slider is disabled (optional)
 * @param disableDownload when selected, the functionality to download the chart is disabled (optional)
 */
export function ContinuousChart({
  data,
  title,
  description,
  small,
  noPadding,
  transparentBackground,
  chartHeight,
  disableExpandable,
  disableBarChartSwitch,
  disableXAxisSlider,
  disableDownload,
}: ContinuousChartProps) {
  // make sure data is converted to `continuousChartData`
  const continuousChartData: ContinuousChartData = ContinuousChartOperations.convertToContinuousChartData(data);

  // the `selectedXAxisRange` saves the to be rendered x-axis range of the chart
  // can be changed using the `LinkeChartXAxisSlider` if the param `xAxisSlider==true`
  const xAxisLength = useMemo(() => {
    return ContinuousChartOperations.getDistinctXAxisValues(continuousChartData).length;
  }, [continuousChartData]);
  const [selectedXAxisRange, setSelectedXAxisRange] = useState<number[]>([0, xAxisLength - 1]);

  // we have to make sure that if the data changes we update the XAxis slider configuration as well
  useEffect(() => {
    setSelectedXAxisRange([0, xAxisLength - 1]);
  }, [xAxisLength]);

  // controlling if a line or bar chart is rendered; line chart is the default
  const [showBarChart, setShowBarChart] = useState<boolean>(false);
  const [chartOptions, setChartOptions] = useState<Highcharts.Options | undefined>(
    ContinuousChartOperations.getHighChartOptions(continuousChartData)
  );

  // function to update/recalculate the chart options
  const recalculateChartOptions = () => {
    // also handling changing the x-axis range using the `ChartXAxisSlider`;
    // special: if the selected x-axis range has length 1 -> bar chart is displayed
    if (showBarChart || selectedXAxisRange[1] - selectedXAxisRange[0] === 0) {
      setChartOptions(
        ContinuousChartOperations.getHighChartOptions(
          continuousChartData,
          selectedXAxisRange[0],
          selectedXAxisRange[1],
          true
        )
      );
    } else {
      setChartOptions(
        ContinuousChartOperations.getHighChartOptions(continuousChartData, selectedXAxisRange[0], selectedXAxisRange[1])
      );
    }
  };

  // chart slider props - to manipulate the shown x-axis range
  const sliderProps = disableXAxisSlider
    ? undefined
    : {
        title: 'Adjusting x-axis range:',
        sliderMin: 0,
        sliderMax: xAxisLength - 1,
        selectedSliderRange: selectedXAxisRange,
        setSelectedSliderRange: setSelectedXAxisRange,
      };

  const alternativeSwitchButtonProps = disableBarChartSwitch
    ? undefined
    : {
        defaultChartType: ChartType.LINE,
        alternativeChartType: ChartType.COLUMN,
        showAlternativeChart: showBarChart,
        setShowAlternativeChart: setShowBarChart,
      };

  return (
    <ChartContainer
      chartData={continuousChartData}
      chartOptions={chartOptions}
      recalculateChartOptions={recalculateChartOptions}
      title={title}
      description={description}
      small={small}
      noPadding={noPadding}
      transparentBackground={transparentBackground}
      chartHeight={chartHeight}
      disableExpandable={disableExpandable}
      disableDownload={disableDownload}
      alternativeSwitchButtonProps={alternativeSwitchButtonProps}
      sliderProps={sliderProps}
    />
  );
}
