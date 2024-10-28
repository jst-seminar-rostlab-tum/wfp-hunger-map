'use client';

import * as Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';

export function Chart() {
  const options: Highcharts.Options = {
    title: {
      text: 'Food',
    },
    series: [
      {
        type: 'line',
        data: [1, 2, 3],
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
