import { Alert } from '@nextui-org/alert';
import { useEffect, useState } from 'react';

import { isContinuousChartData } from '@/domain/entities/charts/ContinuousChartData.ts';
import { NoDataHintProps } from '@/domain/props/NoDataHintProps.ts';

/**
 * Displays an alert when there is one or more selected countries that are not present in the chart.
 * @param {NoDataHintProps} props Props for the NoDataHint component
 * @param {ContinuousChartData | CategoricalChartData} props.chartData Chart data
 * @param {string[]} props.selectedCountryNames Selected country names
 * @param {boolean} props.isLoading Whether the data is loading
 * @returns {JSX.Element | null} The NoDataHint component if there is missing data, otherwise null
 */
export default function NoDataHint({
  chartData,
  selectedCountryNames,
  isLoading,
}: NoDataHintProps): JSX.Element | null {
  const [formattedMissingCountryNames, setFormattedMissingCountryNames] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;

    const countryNamesInChart = isContinuousChartData(chartData)
      ? chartData.lines.map((line) => line.name)
      : chartData.categories.map((category) => category.name);
    const missingCountryNames = selectedCountryNames.filter(
      (countryName) => !countryNamesInChart.includes(countryName)
    );
    switch (missingCountryNames.length) {
      case 0:
        setFormattedMissingCountryNames(null);
        break;
      case 1:
        setFormattedMissingCountryNames(missingCountryNames[0]);
        break;
      default:
        setFormattedMissingCountryNames(
          `${missingCountryNames.slice(0, -1).join(', ')} and ${missingCountryNames.slice(-1)}`
        );
    }
  }, [isLoading, chartData, selectedCountryNames]);

  return formattedMissingCountryNames ? (
    <Alert
      description={`No data for ${formattedMissingCountryNames}.`}
      classNames={{ mainWrapper: 'justify-center', iconWrapper: 'my-0.5' }}
    />
  ) : null;
}
