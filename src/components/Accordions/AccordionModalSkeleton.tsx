import { Skeleton } from '@nextui-org/skeleton';

/**
 * AccordionModalSkeleton - A skeleton loader component for the accordion modal button.
 * This component renders a responsive skeleton placeholder for the accordion modal button
 * to indicate loading states. It adjusts its size and shape based on the screen width:
 * - For screens smaller than 450px, it renders a circular skeleton.
 * - For screens between 450px and 700px, it renders a rectangular skeleton with rounded edges.
 * @returns {JSX.Element} The accordion modal skeleton component.
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
