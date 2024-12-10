'use client';

import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import OfflineExporting from 'highcharts/modules/offline-exporting';
import CategoricalChartProps from '@/domain/props/CategoricalChartProps.tsx';

// initialize the exporting module
if (typeof Highcharts === 'object') {
  Exporting(Highcharts);
  OfflineExporting(Highcharts);
}

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
  return <>cat chart</>;
}
