import { Skeleton } from '@nextui-org/skeleton';
import React from 'react';

/**
 * A skeleton for the Select component.
 * @returns {JSX.Element}
 */
export default function SelectionSkeleton(): JSX.Element {
  return (
    <div className="w-full">
      <div className="group flex flex-col w-full">
        <div className="w-full flex flex-col">
          <Skeleton aria-hidden="true" className="relative px-3 gap-3 w-full shadow-sm h-10 min-h-10 rounded-medium">
            <div className="inline-flex h-full w-[calc(100%_-_theme(spacing.6))] min-h-4 items-center gap-1.5 box-border" />
          </Skeleton>
        </div>
      </div>
    </div>
  );
}
