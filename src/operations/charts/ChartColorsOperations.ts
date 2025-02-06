'use client';

import Highcharts from 'highcharts';

import { CategoricalChartData } from '@/domain/entities/charts/CategoricalChartData';
import { ContinuousChartData } from '@/domain/entities/charts/ContinuousChartData';
import { getTailwindColor } from '@/utils/tailwind-util.ts';

/**
 * Using these operations, a map is generated for the given ‘CategoricalChartData’ or ‘ContinuousChartData’,
 * assigning a color to each name in the dataset.
 *
 * It ensures that the names are assigned in alphabetical order. This makes it possible, for example, in the comparison portal
 * to the same colors for the same countries are used, even when different graphs with different orderings are displayed.
 */
export default class ChartColorsOperations {
  /**
   * The first four colors are fixed; if more than four vars are rendered,
   * the default Highcharts colors will be used.
   */
  private static getCategoriesColorList() {
    const colorList = [
      getTailwindColor('--nextui-clusterOrange'),
      getTailwindColor('--nextui-clusterBlue'),
      getTailwindColor('--nextui-clusterGreen'),
      getTailwindColor('--nextui-clusterRed'),
    ];
    const highchartsDefaultColors = Highcharts.getOptions().colors || [];
    return [...colorList, ...highchartsDefaultColors];
  }

  /**
   * Building the color map for `CategoricalChartData`.
   */
  public static getColorMapperForCategoricalData(data: CategoricalChartData): Map<string, string> {
    // sort data categories according to their names
    const categories = [...data.categories];
    categories.sort((a, b) => a.name.localeCompare(b.name));

    // get static list of colors
    const colors = this.getCategoriesColorList();

    // build color map
    const colorMap: Map<string, string> = new Map<string, string>();
    categories.forEach((c, i) => {
      if (typeof c.color !== 'undefined') {
        colorMap.set(c.name, c.color);
      } else {
        colorMap.set(c.name, colors[i % colors.length].toString());
      }
    });
    return colorMap;
  }

  /**
   * Building the color map for `ContinuousChartData`.
   */
  public static getColorMapperForContinuousData(data: ContinuousChartData): Map<string, string> {
    // sort data categories according to their names
    const lines = [...data.lines];
    lines.sort((a, b) => a.name.localeCompare(b.name));

    // get static list of colors
    const colors = this.getCategoriesColorList();

    // build color map
    const colorMap: Map<string, string> = new Map<string, string>();
    lines.forEach((l, i) => {
      if (l.prediction) {
        colorMap.set(l.name, getTailwindColor('--nextui-chartForecast'));
      } else if (typeof l.color !== 'undefined') {
        colorMap.set(l.name, l.color);
      } else {
        colorMap.set(l.name, colors[i % colors.length].toString());
      }
    });
    return colorMap;
  }
}
