'use client';

import Highcharts from 'highcharts';
import { Dispatch, SetStateAction, useState } from "react";

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
 * @param {Object} props - The properties object
 * @param {CategoricalChartData} props.data - the actual data to be used in the chart
 * @param {string} props.title - chart title (optional)
 * @param {string} props.description - chart description text (optional)
 * @param {boolean} props.small - when selected, all components in the line chart box become slightly smaller (optional)
 * @param {boolean} props.noPadding - when selected, the main box has no padding on all sides (optional)
 * @param {boolean} props.transparentBackground - when selected, the background of the entire component is transparent (optional)
 * @param {number} props.chartHeight - with this parameter, the height of the actual chart can be set to a fixed value in pixels;
 *        If chartHeight is not specified, the chart is given a fixed default height depending on `small` (optional)
 * @param {boolean} props.disableExpandable - when selected, the functionality to open the chart in a larger modal is disabled (optional)
 * @param {boolean} props.disablePieChartSwitch - when selected, the functionality to switch to a pie chart is disabled (optional)
 * @param {boolean} props.disableDownload - when selected, the functionality to download the chart is disabled (optional)
 * @param {boolean} props.disableRelativeAbsoluteNumbersSwitch - when selected, the option to switch to relative values is disabled (optional)
 */
export function CategoricalChart({
  data,
  title,
  description,
  small,
  noPadding,
  transparentBackground,
  chartHeight,
  disableExpandable,
  disablePieChartSwitch,
  disableDownload,
  disableRelativeNumbersSwitch,
}: CategoricalChartProps) {
  // controlling if a bar or pie chart is rendered; bar chart is the default
  const [showPieChart, setShowPieChart] = useState<boolean>(false);

  // handling toggling between relative and absolute numbers
  const [showRelativeNumbers, setShowRelativeNumbers] = useState(false);

  const [chartOptions, setChartOptions] = useState<Highcharts.Options | undefined>(
    CategoricalChartOperations.getHighChartOptions(data, showPieChart, showRelativeNumbers)
  );

  // function to update/recalculate the chart options
  const recalculateChartOptions = () => {
    setChartOptions(CategoricalChartOperations.getHighChartOptions(data, showPieChart, ));
  };

  const alternativeSwitchButtonProps = disablePieChartSwitch
    ? undefined
    : {
        defaultChartType: ChartType.COLUMN,
        alternativeChartType: ChartType.PIE,
        showAlternativeChart: showPieChart,
        setShowAlternativeChart: setShowPieChart,
      };

  const relativeNumbersSwitchButtonProps = disableRelativeNumbersSwitch
    ? undefined
    : {
        showRelativeNumbers,
        setShowRelativeNumbers,
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
      chartHeight={chartHeight}
      disableExpandable={disableExpandable}
      disableDownload={disableDownload}
      relativeNumbersSwitchButtonProps={relativeNumbersSwitchButtonProps}
      alternativeSwitchButtonProps={alternativeSwitchButtonProps}
    />
  );
}
