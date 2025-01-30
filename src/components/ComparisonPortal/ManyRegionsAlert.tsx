import { Alert } from '@nextui-org/alert';

/**
 * Displays an alert when there are more than 30 selected regions.
 * Otherwise, returns null.
 * @param {number | undefined} nSelectedRegions Number of selected regions
 * @returns {JSX.Element | null} The ManyRegionsAlert component if there are many selected regions, otherwise null
 */
export default function ManyRegionsAlert({ nSelectedRegions }: { nSelectedRegions?: number }): JSX.Element | null {
  if ((nSelectedRegions ?? 0) > 30) {
    return (
      <Alert
        description={`${nSelectedRegions} regions are selected. Charts might be overloaded and slow.`}
        classNames={{
          mainWrapper: 'justify-center',
          iconWrapper: 'my-0.5',
          base: 'shadow-md mb-2 py-[14.5px] dark:text-background',
        }}
        color="warning"
        variant="solid"
      />
    );
  }
  return null;
}
