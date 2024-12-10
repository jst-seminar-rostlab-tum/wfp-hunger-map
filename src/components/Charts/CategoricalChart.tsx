'use client';

import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import OfflineExporting from 'highcharts/modules/offline-exporting';

import CategoricalChartProps from '@/domain/props/CategoricalChartProps';
import { useTheme } from 'next-themes';
import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';
import LineChartOperations from '@/operations/charts/LineChartOperations.ts';

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
  const lineChartOptions: Highcharts.Options = LineChartOperations.getHighChartOptions(lineChartData, theme === 'dark');


  return <>cat chart</>;
}
