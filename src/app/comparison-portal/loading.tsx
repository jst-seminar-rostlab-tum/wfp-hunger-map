import ComparisonAccordionSkeleton from '@/components/ComparisonPortal/ComparisonAccordionSkeleton';
import ComparisonPortalSkeleton from '@/components/ComparisonPortal/ComparisonPortalSkeleton';

export default function Loading() {
  return (
    <>
      <h1>Comparison Portal</h1>
      <ComparisonPortalSkeleton />
      <ComparisonAccordionSkeleton nItems={5} />
    </>
  );
}
