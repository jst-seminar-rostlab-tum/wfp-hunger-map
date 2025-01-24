import { Skeleton } from '@nextui-org/skeleton';
import React from 'react';
import { v4 as uuid } from 'uuid';

/**
 * A skeleton component for the ComparisonAccordion component.
 * @param {number} nItems Number of accordion items for the skeleton.
 */
export default function ComparisonAccordionSkeleton({ nItems }: { nItems: number }): JSX.Element {
  return (
    <div className="overflow-x-auto rounded-lg shadow-none">
      <div className="flex flex-col gap-2 mb-4">
        {[...Array(nItems)].map(() => (
          <div
            key={uuid()}
            className="rounded-medium last:border-b-0 bg-content1 white:bg-white overflow-hidden shadow-md"
          >
            <Skeleton aria-hidden="true" className="rounded-lg bg-content1 dark:bg-content1">
              <div className="h-[69px]" />
            </Skeleton>
          </div>
        ))}
      </div>
    </div>
  );
}
