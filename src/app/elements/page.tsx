import { Chart } from '@/components/Charts/Chart';
import container from '@/container';
import CountryRepository from '@/domain/repositories/CountryRepository';

/**
 * You can use this page to try and show off your components.
 * It's not accessible from the UI, but you can reach it by manually navigating to /elements
 */
export default async function Elements() {
  const countryData = await container.resolve<CountryRepository>('CountryRepository').getCountryData(50);
  return <Chart chartData={countryData.fcsGraph} />;
}
