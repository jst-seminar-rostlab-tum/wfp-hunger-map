import { Skeleton } from '@nextui-org/skeleton';
import React from 'react';

function CountrySelectionSkeleton() {
  return (
    <div className="pb-4 space-y-6">
      <div className="group flex flex-col w-full">
        <div className="w-full flex flex-col">
          <Skeleton className="relative px-3 gap-3 w-full shadow-sm h-10 min-h-10 rounded-medium">
            <div className="inline-flex h-full w-[calc(100%_-_theme(spacing.6))] min-h-4 items-center gap-1.5 box-border" />
          </Skeleton>
        </div>
      </div>
    </div>
  );
}

export default CountrySelectionSkeleton;
