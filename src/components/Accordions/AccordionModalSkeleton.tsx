import { Skeleton } from '@nextui-org/skeleton';

/**
 * The skeleton for the accordion modal button.
 * @returns {JSX.Element} - The accordion modal skeleton component.
 */

export default function AccordionModalSkeleton() {
  return (
    <div className="absolute bottom-10 right-28 z-9999">
      {/* For screens smaller than 450px */}
      <div className="block sm450:hidden sm700:hidden">
        <Skeleton className="rounded-full w-[40px] h-[40px] bg-content1 dark:bg-content1" />
      </div>

      {/* For screens between 450px and 700px */}
      <div className="hidden sm450:block sm700:hidden">
        <Skeleton className="rounded-xl w-[112px] h-[40px] bg-content1 dark:bg-content1" />
      </div>
    </div>
  );
}
