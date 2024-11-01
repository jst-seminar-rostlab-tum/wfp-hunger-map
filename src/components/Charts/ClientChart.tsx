'use client';

import { useEffect, useState } from 'react';

import { Chart } from '@/components/Charts/Chart';
import { useCountry } from '@/domain/contexts/CountryContext';
import { CountryData } from '@/domain/entities/country/CountryData';

export function ClientChart() {
  const { getCountryData } = useCountry();
  const [data, setData] = useState<CountryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const countryData = await getCountryData(50);
        setData(countryData);
      } catch (error) {
        console.error('Error fetching country data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [getCountryData]);

  if (isLoading) {
    return <div className="w-full h-full flex justify-center items-center">Loading...</div>;
  }

  if (!data) {
    return <div>Error loading data</div>;
  }

  return <Chart data={data.fcsGraph} />;
}
