import CustomAccordion from '@/components/Accordions/Accordion';
import { CustomButton } from '@/components/Buttons/CustomButton';
import { Chart } from '@/components/Charts/Chart';
import container from '@/container';
import CountryRepository from '@/domain/repositories/CountryRepository';
import AccordionsOperations from '@/operations/accordions/AccordionOperations';

/**
 * You can use this page to try and show off your components.
 * It's not accessible from the UI, but you can reach it by manually navigating to /elements
 */
export default async function Elements() {
  const countryData = await container.resolve<CountryRepository>('CountryRepository').getCountryData(50);
  return (
    <div>
      <Chart chartData={countryData.fcsGraph} />;<CustomButton variant="solid">Test</CustomButton>
      <CustomButton variant="bordered">Test</CustomButton>
      <CustomButton variant="flat">Test</CustomButton>
      <CustomAccordion items={AccordionsOperations.getAccordionData()} />;
    </div>
  );
}
