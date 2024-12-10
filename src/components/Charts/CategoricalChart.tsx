'use client';

import Highcharts from 'highcharts';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { ChartContainer } from '@/components/Charts/helpers/ChartContainer';
import CategoricalChartProps from '@/domain/props/CategoricalChartProps';
import CategoricalChartOperations from '@/operations/charts/CategoricalChartOperations.ts';

/**
 * todo
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
  // the 'chartOptions' are dependent on the theme
  const { theme } = useTheme();

  // build chart options for 'Highcharts'
  const defaultChartOptions: Highcharts.Options = CategoricalChartOperations.getHighChartOptions(data);

  // controlling if a bar or pie chart is rendered; bar chart is the default
  const [showPieChart, setShowPieChart] = useState(false);
  const [chartOptions, setChartOptions] = useState(defaultChartOptions);

  // handling the line and bar chart switch and the theme switch;
  // also handling changing the x-axis range using the `LineChartXAxisSlider`;
  // special: if the selected x-axis range has length 1 -> bar chart is displayed
  useEffect(() => {
    setChartOptions(CategoricalChartOperations.getHighChartOptions(data, showPieChart));
  }, [showPieChart, theme]);

  return (
    <ChartContainer
      chartOptions={chartOptions}
      chartData={data}
      title={title}
      description={description}
      small={small}
      noPadding={noPadding}
      disableExpandable={disableExpandable}
      disableDownload={disableDownload}
      transparentBackground={transparentBackground}
      disableAlternativeChart={disablePieChartSwitch}
      showAlternativeChart={showPieChart}
      setShowAlternativeChart={setShowPieChart}
      disableSlider
    />
  );
}
