import { Skeleton } from '@nextui-org/skeleton';
import React from 'react';
import { v4 as uuid } from 'uuid';

export default function ComparisonAccordionSkeleton() {
  const N_ITEMS = 5;
  return (
    <div className="overflow-x-auto rounded-lg shadow-none">
      <div className="flex flex-col gap-2 mb-4">
        {[...Array(N_ITEMS)].map(() => (
          <div
            key={uuid()}
            className="rounded-medium last:border-b-0 bg-content1 white:bg-white overflow-hidden shadow-md"
          >
            <Skeleton className="rounded-lg bg-content1 dark:bg-content1">
              <div className="h-[69px]" />
            </Skeleton>
          </div>
        ))}
      </div>
    </div>
  );
}
