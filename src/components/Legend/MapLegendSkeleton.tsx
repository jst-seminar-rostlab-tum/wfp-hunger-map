import { Skeleton } from '@nextui-org/skeleton';

export default function MapLegendSkeleton() {
  return (
    <>
      {/* Desktop version */}
      <div className="hidden sm700:block w-[450px] absolute bottom-0 right-20 z-legend">
        <div className="flex flex-col gap-2 mb-4">
          <Skeleton className="rounded-medium bg-content1 dark:bg-content1">
            <div className="h-[69px]" />
          </Skeleton>
          <Skeleton className="rounded-medium bg-content1 dark:bg-content1">
            <div className="h-[88px]" />
          </Skeleton>
        </div>
      </div>

      {/* Mobile version */}
      <div className="sm700:hidden absolute z-legend bottom-10 right-16">
        <Skeleton className="rounded-full bg-content1 dark:bg-content1">
          <div className="w-10 h-10" />
        </Skeleton>
      </div>
    </>
  );
}
