import ComparisonAccordionSkeleton from '@/components/ComparisonPortal/ComparisonAccordionSkeleton';
import SelectionSkeleton from '@/components/ComparisonPortal/CountrySelectSkeleton';

export default function Loading() {
  return (
    <>
      <h1>Comparison Portal</h1>
      <SelectionSkeleton />
      <ComparisonAccordionSkeleton nItems={5} />
    </>
  );
}
