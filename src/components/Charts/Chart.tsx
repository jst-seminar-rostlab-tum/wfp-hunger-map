'use client';

import * as Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';

import { FcsChartData } from '@/domain/entities/charts/FcsChartData';

export function Chart({ data }: { data: FcsChartData[] }) {
  const options: Highcharts.Options = {
    title: {
      text: 'FCS Chart',
    },
    xAxis: {
      type: 'datetime',
      labels: {
        format: '{value:%b %d}',
      },
      categories: data.map((item) => item.x),
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
        data: data.map((item) => item.fcs),
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
        data: data.map((item) => item.fcsHigh),
        linkedTo: ':previous',
        color: 'orange',
        opacity: 0.3,
        showInLegend: false,
      },
      {
        name: 'Low',
        type: 'line',
        data: data.map((item) => item.fcsLow),
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
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
