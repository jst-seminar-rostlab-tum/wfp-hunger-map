import { Skeleton } from '@nextui-org/skeleton';
import React from 'react';

function DocsSearchBarSkeleton() {
  return (
    <div className="h-10">
      <div className="flex w-full fixed left-0 z-10">
        <Skeleton
          aria-hidden="true"
          className="relative w-full inline-flex shadow-sm h-10 rounded-lg max-w-[90%] px-2 sm:max-w-md mx-auto"
        />
      </div>
    </div>
  );
}

export default DocsSearchBarSkeleton;
