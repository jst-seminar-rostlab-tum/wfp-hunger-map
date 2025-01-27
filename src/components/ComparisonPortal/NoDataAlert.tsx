import { Alert } from '@nextui-org/alert';
import { useEffect, useState } from 'react';

import { isContinuousChartData } from '@/domain/entities/charts/ContinuousChartData.ts';
import { NoDataAlertProps } from '@/domain/props/NoDataAlertProps.ts';

/**
 * Displays an alert when there is one or more selected chart categories (i.e. countries or regions) that are not present in the chart.
 * Otherwise, returns null.
 * @param {NoDataAlertProps} props Props for the NoDataAlert component
 * @param {ContinuousChartData | CategoricalChartData} props.chartData Chart data
 * @param {string[]} props.requestedChartCategories Selected country names
 * @param {boolean} props.isLoading Whether the data is loading
 * @returns {JSX.Element | null} The NoDataAlert component if there is missing data, otherwise null
 */
export default function NoDataAlert({
  chartData,
  requestedChartCategories,
  isLoading = false,
}: NoDataAlertProps): JSX.Element | null {
  const [formattedMissingCategories, setFormattedMissingCategories] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;

    const actualChartCategories = isContinuousChartData(chartData)
      ? chartData.lines.map((line) => line.name)
      : chartData.categories.map((category) => category.name);
    const missingChartCategories = requestedChartCategories.filter(
      (category) => !actualChartCategories.includes(category)
    );

    // if there is no data for at least one country we do not show the warnings
    // cause the chart components will display a "no data available" message
    if (missingChartCategories.length === requestedChartCategories.length) {
      setFormattedMissingCategories(null);
      return;
    }

    switch (missingChartCategories.length) {
      case 0:
        setFormattedMissingCategories(null);
        break;
      case 1:
        setFormattedMissingCategories(missingChartCategories[0]);
        break;
      default:
        setFormattedMissingCategories(
          `${missingChartCategories.slice(0, -1).join(', ')} and ${missingChartCategories.slice(-1)}`
        );
    }
  }, [isLoading, chartData, requestedChartCategories]);

  return formattedMissingCategories ? (
    <Alert
      description={`No data for ${formattedMissingCategories}.`}
      classNames={{ mainWrapper: 'justify-center', iconWrapper: 'my-0.5' }}
    />
  ) : null;
}
