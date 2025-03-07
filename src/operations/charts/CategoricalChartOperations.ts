'use client';

import Highcharts, { TooltipFormatterContextObject } from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import patternFill from 'highcharts/modules/pattern-fill';

import { CategoricalChartData } from '@/domain/entities/charts/CategoricalChartData';
import { CategoricalChartSorting } from '@/domain/enums/CategoricalChartSorting';
import ChartColorsOperations from '@/operations/charts/ChartColorsOperations';
import { getTailwindColor } from '@/utils/tailwind-util.ts';

// initialize the exporting module
if (typeof Highcharts === 'object') {
  highchartsMore(Highcharts);
  patternFill(Highcharts);
}

/**
 * Using CategoricalChartOperations, the CategoricalChart component can generate
 * the chart `Highcharts.Options` object required by the Highcharts component.
 */
export default class CategoricalChartOperations {
  /**
   * Tooltip formatter function for `Options.tooltip.formatter` usage only.
   */
  private static chartTooltipFormatter(points: TooltipFormatterContextObject[] | undefined) {
    let tooltip = '';
    points?.forEach((p) => {
      if (p.point.options.y !== undefined) {
        tooltip += `<br><span style="color:${p.color}">\u25CF</span> <div> ${p.key}: ${p.point.options.y}</div>`;
      } else if (p.point.options.high !== undefined && p.point.options.low !== undefined) {
        tooltip += `<div style="color: ${getTailwindColor('--nextui-secondary')}"> (<div>${p.point.options.low} - ${p.point.options.high}</div>)</div>`;
      }
    });
    return tooltip;
  }

  /**
   * Tooltip formatter function for `Options.plotOptions.pie.dataLabels.formatter` usage only.
   */
  private static pieDataLabelsFormatter(
    point: Highcharts.Point,
    data: CategoricalChartData,
    relativeNumbers?: boolean
  ) {
    const suffix = relativeNumbers ? '%' : data.yAxisLabel;
    return `<p>${point.name}: </p><p style="color:${point.color}">${point.y} ${suffix}</p>`;
  }

  /**
   * With this static function, the CategoricalChart component can build the `HighCharts.Options` object
   * for a bar chart or pie chart, out of a given `CategoricalChartData` instance.
   * @param data `CategoricalChartData` object, containing all data to be plotted in the chart
   * @param sorting selected sorting of the chart
   * @param pieChart if true, a pie chart instead of a bar chart is created
   * @param relativeNumbers if true relative numbers (percentages) are calculated automatically
   * @return 'Highcharts.Options' ready to be passed to the Highcharts component,
   * or 'undefined' if there is no data available to be plotted in the chart (to be interpreted as "no data available")
   */
  public static getHighChartOptions(
    data: CategoricalChartData,
    sorting: CategoricalChartSorting,
    pieChart?: boolean,
    relativeNumbers?: boolean
  ): Highcharts.Options | undefined {
    // sort data
    CategoricalChartOperations.sortData(data, sorting, relativeNumbers);

    // get color map
    const colorMap = ChartColorsOperations.getColorMapperForCategoricalData(data);

    // build highchart options
    const seriesData = [];
    const categories = [];
    const seriesRangeData = [];

    for (let i = 0; i < data.categories.length; i += 1) {
      const categoryData = data.categories[i];

      // collect category names
      categories.push(categoryData.name);

      // check if range should be displayed
      const showRange =
        !pieChart && categoryData.dataPoint.yRangeMin !== undefined && categoryData.dataPoint.yRangeMax !== undefined;

      // build series object for highchart
      seriesData.push({
        name: categoryData.name,
        y: relativeNumbers ? categoryData.dataPoint.yRelative : categoryData.dataPoint.y,
        color: colorMap.get(categoryData.name),
        opacity: showRange ? 0.6 : 1,
      });

      // check if range should be displayed
      if (showRange) {
        seriesRangeData.push({
          x: i,
          low: relativeNumbers ? categoryData.dataPoint.yRangeMinRelative : categoryData.dataPoint.yRangeMin,
          high: relativeNumbers ? categoryData.dataPoint.yRangeMaxRelative : categoryData.dataPoint.yRangeMax,
          color: colorMap.get(categoryData.name),
        });
      }
    }

    // if there is not a single series -> we return 'undefined' -> 'undefined' is to be interpreted as "no data available"
    if (seriesData.length === 0) return undefined;

    // constructing the final HighCharts.Options
    return {
      title: {
        text: '',
      },
      chart: {
        type: pieChart ? 'Line' : 'column',
        backgroundColor: 'transparent',
      },
      legend: {
        enabled: false,
      },
      xAxis: {
        categories,
        visible: !pieChart,
        labels: {
          style: {
            color: getTailwindColor('--nextui-secondary'),
            fontSize: '0.7rem',
          },
        },
        lineColor: getTailwindColor('--nextui-chartsXAxisLine'),
        tickColor: getTailwindColor('--nextui-chartsXAxisLine'),
        tickLength: 4,
      },
      yAxis: {
        visible: !pieChart,
        title: {
          text: relativeNumbers ? '% of population' : data.yAxisLabel,
          style: {
            color: getTailwindColor('--nextui-secondary'),
          },
        },
        labels: {
          style: {
            color: getTailwindColor('--nextui-secondary'),
            fontSize: '0.7rem',
          },
          formatter() {
            if (relativeNumbers) {
              return `${this.value}%`;
            }
            return Highcharts.numberFormat(this.value as number, -1);
          },
        },
        lineColor: 'transparent',
        gridLineColor: getTailwindColor('--nextui-chartsGridLine'),
      },
      tooltip: {
        enabled: !pieChart,
        shared: true,
        formatter() {
          return CategoricalChartOperations.chartTooltipFormatter(this.points);
        },
        backgroundColor: getTailwindColor('--nextui-chartsLegendBackground'),
        style: {
          color: getTailwindColor('--nextui-foreground'),
          fontSize: '0.7rem',
        },
      },
      exporting: {
        enabled: false, // disabling export menu icon
      },
      series: [
        {
          name: '',
          data: seriesData,
          type: pieChart ? 'pie' : 'column',
        },
        {
          name: 'Range',
          type: 'errorbar', // Error bar series
          data: seriesRangeData, // Use the error bar data
          tooltip: {
            pointFormat: '(Range: {point.low} - {point.high})',
          },
        },
      ],
      plotOptions: {
        column: {
          animation: false,
          grouping: true,
          shadow: false,
          borderWidth: 0,
          colorByPoint: true,
        },
        errorbar: {
          animation: false,
          stemWidth: 1.5,
          whiskerLength: '30%',
          whiskerWidth: 1.5,
          colorByPoint: true, // use different colors for each bar
        },
        pie: {
          animation: false,
          allowPointSelect: false,
          cursor: 'default',
          innerSize: '60%',
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            formatter() {
              return CategoricalChartOperations.pieDataLabelsFormatter(this.point, data, relativeNumbers);
            },
            style: {
              color: getTailwindColor('--nextui-secondary'),
              fontSize: '12px',
              borderWidth: 0,
              fontWeight: 'light',
            },
          },
          states: {
            hover: {
              halo: {
                size: 4, // shrinking the halo/glow size on hover
              },
            },
          },
        },
      },
    };
  }

  /**
   * Sorting the categories data according to the selected sorting.
   */
  public static sortData(data: CategoricalChartData, sorting: CategoricalChartSorting, relativeNumbers?: boolean) {
    switch (sorting) {
      case CategoricalChartSorting.NAMES_ASC:
        data.categories.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case CategoricalChartSorting.NAMES_DESC:
        data.categories.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case CategoricalChartSorting.VALUES_ASC:
        if (relativeNumbers) {
          data.categories.sort((a, b) => (a.dataPoint.yRelative || 0) - (b.dataPoint.yRelative || 0));
        } else {
          data.categories.sort((a, b) => (a.dataPoint.y || 0) - (b.dataPoint.y || 0));
        }
        break;
      case CategoricalChartSorting.VALUES_DESC:
      default:
        if (relativeNumbers) {
          data.categories.sort((a, b) => (b.dataPoint.yRelative || 0) - (a.dataPoint.yRelative || 0));
        } else {
          data.categories.sort((a, b) => b.dataPoint.y - a.dataPoint.y);
        }
    }
  }
}
