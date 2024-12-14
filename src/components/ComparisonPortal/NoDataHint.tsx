import { Alert } from '@nextui-org/alert';

import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';

function NoDataHint({
  lineChartData,
  selectedCountryNames,
}: {
  lineChartData: LineChartData;
  selectedCountryNames: string[];
}) {
  const countryNamesInChart = lineChartData.lines.map((i) => i.name);
  const missingCountryNames = selectedCountryNames.filter((countryName) => !countryNamesInChart.includes(countryName));
  if (!missingCountryNames.length) return null;

  const formattedMissingCountryNames =
    missingCountryNames.length > 1
      ? `${missingCountryNames.slice(0, -1).join(', ')} and ${missingCountryNames.slice(-1)}`
      : missingCountryNames[0];
  return (
    <Alert
      description={`No data for ${formattedMissingCountryNames}.`}
      classNames={{ mainWrapper: 'justify-center', iconWrapper: 'my-0.5' }}
    />
  );
}

export default NoDataHint;
