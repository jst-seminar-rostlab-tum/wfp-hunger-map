import { Skeleton } from '@nextui-org/skeleton';

export default function MapSkeleton() {
  return (
    <div className="w-screen h-screen bg-blue-100">
      <div className="w-full h-full p-4 flex flex-col items-center justify-center">
        <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full bg-blue-500 overflow-hidden">
          <Skeleton className="absolute w-full h-full rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
