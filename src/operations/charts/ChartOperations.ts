import { FcsChartData } from '@/domain/entities/charts/FcsChartData';

export default class ChartOperations {
  static getChartData(chartData: FcsChartData[]): Highcharts.Options {
    return {
      title: {
        text: 'FCS Chart',
      },
      xAxis: {
        type: 'datetime',
        labels: {
          format: '{value:%b %d}',
        },
        categories: chartData.map((item) => item.x),
      },
      yAxis: {
        title: {
          text: 'FCS Value',
        },
      },
      series: [
        {
          name: 'FCS',
          type: 'line',
          data: chartData.map((item) => item.fcs),
          zIndex: 1,
          marker: {
            fillColor: 'white',
            lineWidth: 2,
            lineColor: 'orange',
          },
        },
        {
          name: 'High',
          type: 'line',
          data: chartData.map((item) => item.fcsHigh),
          linkedTo: ':previous',
          color: 'orange',
          opacity: 0.3,
          showInLegend: false,
        },
        {
          name: 'Low',
          type: 'line',
          data: chartData.map((item) => item.fcsLow),
          linkedTo: ':previous',
          color: 'orange',
          opacity: 0.3,
          showInLegend: false,
        },
      ],
      plotOptions: {
        line: {
          animation: true,
          marker: {
            enabled: true,
          },
        },
        arearange: {
          animation: true,
          fillOpacity: 0.1,
          lineWidth: 0,
          marker: {
            enabled: false,
          },
        },
      },
    };
  }
}
