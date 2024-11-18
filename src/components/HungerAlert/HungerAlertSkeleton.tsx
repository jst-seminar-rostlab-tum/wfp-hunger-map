import { Skeleton } from '@nextui-org/skeleton';

export default function HungerAlertSkeleton() {
  return (
    <div className="absolute bottom-0 left-0 z-10 cursor-pointer " style={{ bottom: '18rem', left: '1.86rem' }}>
      <Skeleton
        className="rounded-full flex flex-col items-center justify-center text-center bg-white dark:bg-content2 relative p-5"
        style={{ width: '4rem', height: '4rem' }}
      />
    </div>
  );
}
