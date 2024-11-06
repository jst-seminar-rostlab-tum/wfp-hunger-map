import CustomAccordions from '@/components/Accordions/Accordion';
import AccordionsOperations from '@/operations/accordions/AccordionOperations';

/**
 * You can use this page to try and show off your components.
 * It's not accessible from the UI, but you can reach it by manually navigating to /elements
 */
export default function Elements() {
  // return <Chart />;
  return <CustomAccordions items={AccordionsOperations.getAccordionData()} />;
}
