'use client';

import Highcharts from 'highcharts';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { ChartContainer } from '@/components/Charts/ChartContainer';
import { LineChartData } from '@/domain/entities/charts/LineChartData';
import LineChartProps from '@/domain/props/LineChartProps';
import LineChartOperations from '@/operations/charts/LineChartOperations';

/**
 * The LineChart component is a box that primarily renders a title, description text, and a line chart.
 * This component has a width of 100%, so it adjusts to the width of its parent element in which it is used.
 * The height of the line chart box depends on the provided text, while the chart itself has a fixed height.
 * It also provides the option to open the chart in a full-screen modal, where one can download the data as well.
 *
 * The data to be displayed in the chart can be provided in different types (see `LineChartProps.data`).
 * However, the preferred type is `LineChartData`.
 *
 * To enable the LineChart component to support an additional `data` type, the following steps are required:
 * 1. Define an interface and add it to `LineChartProps.data`.
 * 2. Add another switch case in `LineChartOperations.convertToLineChartData` to convert the new interface to `LineChartData`.
 *
 * @param title chart title (optional)
 * @param description chart description text (optional)
 * @param expandable when selected, the user is given the option to open the chart in a larger modal (optional)
 * @param barChartSwitch when selected, the user is given the option to switch to a bar chart (optional)
 * @param xAxisSlider when selected, the user is given the option to change the x-axis range via a slider (optional)
 * @param small when selected, all components in the line chart box become slightly smaller (optional)
 * @param small when selected, the download button dropdown is not shown (optional)
 * @param roundLines when selected, all plotted lines will be rounded (optional)
 * @param noPadding when selected, the main box has no padding on all sides (optional)
 * @param transparentBackground when selected, the background of the entire component is transparent (optional)
 * @param data the actual data to be used in the chart
 */
export function LineChart({
  title,
  description,
  expandable,
  barChartSwitch,
  xAxisSlider,
  small,
  disableDownload,
  roundLines,
  noPadding,
  transparentBackground,
  data,
}: LineChartProps) {
  // the 'chartOptions' are dependent on the theme
  const { theme } = useTheme();

  // convert data to `LineChartData` and build chart options for 'Highcharts' (line and bar chart)
  const lineChartData: LineChartData = LineChartOperations.convertToLineChartData(data);
  const lineChartOptions: Highcharts.Options = LineChartOperations.getHighChartOptions(
    lineChartData,
    theme === 'dark',
    roundLines
  );

  // the `selectedXAxisRange` saves the to be rendered x-axis range of the chart
  // can be changed using the `LinkeChartXAxisSlider` if the param `xAxisSlider==true`
  const xAxisLength: number = LineChartOperations.getDistinctXAxisValues(lineChartData).length;
  const [selectedXAxisRange, setSelectedXAxisRange] = useState([0, xAxisLength - 1]);

  // controlling if a line or bar chart is rendered; line chart is the default
  const [showBarChart, setShowBarChart] = useState(false);
  const [chartOptions, setChartOptions] = useState(lineChartOptions);

  // handling the line and bar chart switch and the theme switch;
  // also handling changing the x-axis range using the `LineChartXAxisSlider`;
  // special: if the selected x-axis range has length 1 -> bar chart is displayed
  useEffect(() => {
    if (showBarChart || selectedXAxisRange[1] - selectedXAxisRange[0] === 0) {
      setChartOptions(
        LineChartOperations.getHighChartOptions(
          lineChartData,
          theme === 'dark',
          roundLines,
          selectedXAxisRange[0],
          selectedXAxisRange[1],
          true
        )
      );
    } else {
      setChartOptions(
        LineChartOperations.getHighChartOptions(
          lineChartData,
          theme === 'dark',
          roundLines,
          selectedXAxisRange[0],
          selectedXAxisRange[1]
        )
      );
    }
  }, [showBarChart, theme, selectedXAxisRange]);

  return (
    <ChartContainer
      chartOptions={chartOptions}
      chartData={lineChartData}
      title={title}
      description={description}
      small={small}
      noPadding={noPadding}
      expandable={expandable}
      transparentBackground={transparentBackground}
      showAlternativeChart={barChartSwitch ? showBarChart : undefined}
      setShowAlternativeChart={barChartSwitch ? setShowBarChart : undefined}
      sliderTitle="Adjusting x-axis range:"
      sliderMin={0}
      sliderMax={xAxisLength - 1}
      selectedSliderRange={selectedXAxisRange}
      setSelectedSliderRange={setSelectedXAxisRange}
    />
  );
}
