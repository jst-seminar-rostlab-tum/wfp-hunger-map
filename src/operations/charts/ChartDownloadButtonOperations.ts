'use client';

import Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import ExportData from 'highcharts/modules/export-data';
import Exporting from 'highcharts/modules/exporting';
import OfflineExporting from 'highcharts/modules/offline-exporting';
import patternFill from 'highcharts/modules/pattern-fill';
import HighchartsReact from 'highcharts-react-official';

import { CategoricalChartData } from '@/domain/entities/charts/CategoricalChartData.ts';
import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';

// initialize the exporting module
if (typeof Highcharts === 'object') {
  highchartsMore(Highcharts);
  patternFill(Highcharts);
  Exporting(Highcharts);
  ExportData(Highcharts);
  OfflineExporting(Highcharts);
}
/**
 * All chart download functionalities are implemented here.
 */
export default class ChartDownloadButtonOperations {
  /**
   * Trigger download of the given line chart as a png file.
   */
  public static downloadChartPNG(chart: HighchartsReact.RefObject): void {
    chart.chart.exportChartLocal({
      type: 'image/png',
      filename: 'chart-download',
    });
  }

  /**
   * Trigger download of the given line chart as a svg file.
   */
  public static downloadChartDataSVG(chart: HighchartsReact.RefObject): void {
    const svg = chart.chart.getSVG();
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    // create a temporary link element and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chart.svg'; // Name of the SVG file
    a.click();
    // clean up the URL object
    URL.revokeObjectURL(url);
  }

  /**
   * Trigger download of the given line chart data as a csv file.
   */
  public static downloadChartDataCSV(chart: HighchartsReact.RefObject): void {
    chart.chart.downloadCSV();
  }

  /**
   * Trigger download of the given line chart `data` as a json file.
   */
  public static downloadDataJSON(data: LineChartData | CategoricalChartData): void {
    // convert data json object to string and encode as URI
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    // create a temporary link element and trigger the download
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'hunger_map_chart_data.json';
    link.click();
  }
}
