'use client';

import Highcharts from 'highcharts';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { ChartContainer } from '@/components/Charts/helpers/ChartContainer';
import { LineChartData } from '@/domain/entities/charts/LineChartData';
import { ChartType } from '@/domain/enums/ChartType.ts';
import LineChartProps from '@/domain/props/LineChartProps';
import LineChartOperations from '@/operations/charts/LineChartOperations';

/**
 * The LineChart component is a box that primarily renders a title, description text, and a line chart.
 * It should be used to plot categorical data. For continues data please use the `CategoricalChart` component.
 * This component has a width of 100%, so it adjusts to the width of its parent element in which it is used.
 * The height of the entire box depends on the provided text, while the chart itself has a fixed height.
 * It also provides the option to open the chart in a full-screen modal, where one can download the data as well.
 *
 * The data to be displayed in the chart can be provided in different types (see `LineChartProps.data`).
 * However, the preferred type is `LineChartData`.
 *
 * To enable the LineChart component to support an additional `data` type, the following steps are required:
 * 1. Define an interface and add it to `LineChartProps.data`.
 * 2. Add another switch case in `LineChartOperations.convertToLineChartData` to convert the new interface to `LineChartData`.
 *
 * @param data the actual data to be used in the chart
 * @param title chart title (optional)
 * @param description chart description text (optional)
 * @param small when selected, all components in the line chart box become slightly smaller (optional)
 * @param noPadding when selected, the main box has no padding on all sides (optional)
 * @param transparentBackground when selected, the background of the entire component is transparent (optional)
 * @param disableExpandable when selected, the functionality to open the chart in a larger modal is disabled (optional)
 * @param disableBarChartSwitch when selected, the functionality to switch to a bar chart is disabled (optional)
 * @param disableXAxisSlider when selected, the functionality to change the x-axis range via a slider is disabled (optional)
 * @param disableDownload when selected, the functionality to download the chart is disabled (optional)
 */
export function LineChart({
  data,
  title,
  description,
  small,
  noPadding,
  transparentBackground,
  disableExpandable,
  disableBarChartSwitch,
  disableXAxisSlider,
  disableDownload,
}: LineChartProps) {
  const { theme } = useTheme();

  // make sure data is converted to `LineChartData`
  const lineChartData: LineChartData = LineChartOperations.convertToLineChartData(data);

  // the `selectedXAxisRange` saves the to be rendered x-axis range of the chart
  // can be changed using the `LinkeChartXAxisSlider` if the param `xAxisSlider==true`
  const xAxisLength: number = LineChartOperations.getDistinctXAxisValues(lineChartData).length;
  const [selectedXAxisRange, setSelectedXAxisRange] = useState<number[]>([0, xAxisLength - 1]);

  // controlling if a line or bar chart is rendered; line chart is the default
  const [showBarChart, setShowBarChart] = useState<boolean>(false);
  const [chartOptions, setChartOptions] = useState<Highcharts.Options | undefined>(
    LineChartOperations.getHighChartOptions(lineChartData)
  );

  // general function to update the chart options -> only used by the following `useEffect` hooks
  const updateChartOptions = () => {
    // also handling changing the x-axis range using the `LineChartXAxisSlider`;
    // special: if the selected x-axis range has length 1 -> bar chart is displayed
    if (showBarChart || selectedXAxisRange[1] - selectedXAxisRange[0] === 0) {
      setChartOptions(
        LineChartOperations.getHighChartOptions(lineChartData, selectedXAxisRange[0], selectedXAxisRange[1], true)
      );
    } else {
      setChartOptions(
        LineChartOperations.getHighChartOptions(lineChartData, selectedXAxisRange[0], selectedXAxisRange[1])
      );
    }
  };

  // handling the line and bar chart switch, selected x-axis range changes and data changes
  useEffect(() => {
    updateChartOptions();
  }, [showBarChart, selectedXAxisRange, data]);

  // handling the theme switch
  useEffect(() => {
    // `theme` change does not guarantee that the NextUI CSS colors have already been changed;
    // therefore we synchronize the update with the next repaint cycle, ensuring the CSS variables are updated
    const rafId = requestAnimationFrame(() => {
      updateChartOptions();
    });
    return () => cancelAnimationFrame(rafId);
  }, [theme]);

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
      chartOptions={chartOptions}
      chartData={lineChartData}
      title={title}
      description={description}
      small={small}
      noPadding={noPadding}
      transparentBackground={transparentBackground}
      disableExpandable={disableExpandable}
      disableDownload={disableDownload}
      alternativeSwitchButtonProps={alternativeSwitchButtonProps}
      sliderProps={sliderProps}
    />
  );
}
