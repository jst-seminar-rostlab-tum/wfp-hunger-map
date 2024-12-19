'use client';

import Highcharts from 'highcharts';
import { useState } from 'react';

import { ChartContainer } from '@/components/Charts/helpers/ChartContainer';
import { ChartType } from '@/domain/enums/ChartType.ts';
import CategoricalChartProps from '@/domain/props/CategoricalChartProps';
import CategoricalChartOperations from '@/operations/charts/CategoricalChartOperations.ts';

/**
 * The `CategoricalChart` component is a box that primarily renders a title, description text, and a bar chart.
 * It should be used to plot categorical data. For continues data please use the `ContinuousChart` component.
 * This component has a width of 100%, so it adjusts to the width of its parent element in which it is used.
 * The height of the entire box depends on the provided text, while the chart itself has a fixed height.
 * It also provides the option to open the chart in a full-screen modal, where one can download the data as well.
 *
 * @param data the actual data to be used in the chart
 * @param title chart title (optional)
 * @param description chart description text (optional)
 * @param small when selected, all components in the line chart box become slightly smaller (optional)
 * @param noPadding when selected, the main box has no padding on all sides (optional)
 * @param transparentBackground when selected, the background of the entire component is transparent (optional)
 * @param disableExpandable when selected, the functionality to open the chart in a larger modal is disabled (optional)
 * @param disablePieChartSwitch when selected, the functionality to switch to a pie chart is disabled (optional)
 * @param disableDownload when selected, the functionality to download the chart is disabled (optional)
 */
export function CategoricalChart({
  data,
  title,
  description,
  small,
  noPadding,
  transparentBackground,
  disableExpandable,
  disablePieChartSwitch,
  disableDownload,
}: CategoricalChartProps) {
  // controlling if a bar or pie chart is rendered; bar chart is the default
  const [showPieChart, setShowPieChart] = useState<boolean>(false);
  const [chartOptions, setChartOptions] = useState<Highcharts.Options | undefined>(
    CategoricalChartOperations.getHighChartOptions(data, showPieChart)
  );

  // function to update/recalculate the chart options
  const recalculateChartOptions = () => {
    setChartOptions(CategoricalChartOperations.getHighChartOptions(data, showPieChart));
  };

  const alternativeSwitchButtonProps = disablePieChartSwitch
    ? undefined
    : {
        defaultChartType: ChartType.COLUMN,
        alternativeChartType: ChartType.PIE,
        showAlternativeChart: showPieChart,
        setShowAlternativeChart: setShowPieChart,
      };

  return (
    <ChartContainer
      chartData={data}
      chartOptions={chartOptions}
      recalculateChartOptions={recalculateChartOptions}
      title={title}
      description={description}
      small={small}
      noPadding={noPadding}
      transparentBackground={transparentBackground}
      disableExpandable={disableExpandable}
      disableDownload={disableDownload}
      alternativeSwitchButtonProps={alternativeSwitchButtonProps}
    />
  );
}
