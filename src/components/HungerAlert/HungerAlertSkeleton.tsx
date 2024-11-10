import { Skeleton } from '@nextui-org/skeleton';

export default function HungerAlertSkeleton() {
  return (
    <div className="absolute bottom-20 left-20 z-10 cursor-pointer">
      <Skeleton className="rounded-full flex flex-col items-center justify-center text-center bg-white dark:bg-content2 relative p-5">
        <div className="w-36 h-36" />
      </Skeleton>
    </div>
  );
}
