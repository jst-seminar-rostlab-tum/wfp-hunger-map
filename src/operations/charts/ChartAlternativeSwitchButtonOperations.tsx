import { Chart, Diagram, Graph } from 'iconsax-react';
import React from 'react';

import { ChartType } from '@/domain/enums/ChartType.ts';

export default class ChartDownloadButtonOperations {
  public static getChartTypeIcon(chartType: ChartType, className: string) {
    switch (chartType) {
      case ChartType.LINE:
        return <Diagram className={className} />;
      case ChartType.COLUMN:
        return <Chart className={className} />;
      case ChartType.PIE:
        return <Graph className={className} />;
      default:
        return <Chart className={className} />;
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
