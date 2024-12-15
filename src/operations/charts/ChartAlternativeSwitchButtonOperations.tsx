import { Chart, Diagram, Graph } from 'iconsax-react';
import React from 'react';

import { ChartType } from '@/domain/enums/ChartType.ts';

export default class ChartDownloadButtonOperations {
  public static getChartTypeIcon(chartType: ChartType, size: number) {
    switch (chartType) {
      case ChartType.LINE:
        return <Diagram className={`h-${size} w-${size}`} />;
      case ChartType.COLUMN:
        return <Chart className={`h-${size} w-${size}`} />;
      case ChartType.PIE:
        return <Graph className={`h-${size} w-${size}`} />;
      default:
        return <Chart className={`h-${size} w-${size}`} />;
    }
  }

  public static getChartTypeTitle(chartType: ChartType) {
    switch (chartType) {
      case ChartType.LINE:
        return 'Line';
      case ChartType.COLUMN:
        return 'Bar';
      case ChartType.PIE:
        return 'Pie';
      default:
        return '';
    }
  }
}
