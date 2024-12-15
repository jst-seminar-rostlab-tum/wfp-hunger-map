import { Alert } from '@nextui-org/alert';
import { useEffect, useState } from 'react';

import { NoDataHintProps } from '@/domain/props/NoDataHintProps.ts';

function NoDataHint({ lineChartData, selectedCountryNames, isLoading }: NoDataHintProps) {
  const [formattedMissingCountryNames, setFormattedMissingCountryNames] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;

    const countryNamesInChart = lineChartData.lines.map((i) => i.name);
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
  }, [isLoading, lineChartData, selectedCountryNames]);

  return formattedMissingCountryNames ? (
    <Alert
      description={`No data for ${formattedMissingCountryNames}.`}
      classNames={{ mainWrapper: 'justify-center', iconWrapper: 'my-0.5' }}
    />
  ) : null;
}

export default NoDataHint;
