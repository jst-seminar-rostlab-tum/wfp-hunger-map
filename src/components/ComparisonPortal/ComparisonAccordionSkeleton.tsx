import { Skeleton } from '@nextui-org/skeleton';
import React from 'react';

function ComparisonAccordionSkeleton({ numberOfItems }: { numberOfItems: number }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-none">
      <div className="flex flex-col gap-2 mb-4">
        {[...Array(numberOfItems)].map(() => (
          <div className="rounded-medium last:border-b-0 bg-content1 white:bg-white overflow-hidden shadow-md">
            <Skeleton className="rounded-lg bg-content1 dark:bg-content1">
              <div className="h-[69px]" />
            </Skeleton>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComparisonAccordionSkeleton;
