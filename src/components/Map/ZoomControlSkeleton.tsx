import { Skeleton } from '@nextui-org/skeleton';

export default function ZoomControlSkeleton() {
  return (
    <div className="absolute right-4 bottom-7">
      <Skeleton aria-hidden="true" className="bg-content1 dark:bg-content1 rounded-md w-10 h-16" />
    </div>
  );
}
