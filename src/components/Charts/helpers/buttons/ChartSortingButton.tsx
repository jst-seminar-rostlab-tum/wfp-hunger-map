import { Button } from '@nextui-org/button';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { ArrowDownAZ, ArrowDownNarrowWide, ArrowDownWideNarrow, ArrowDownZA } from 'lucide-react';

import { Tooltip } from '@/components/Tooltip/Tooltip';
import { CategoricalChartSorting } from '@/domain/enums/CategoricalChartSorting.ts';
import { ChartSortingButtonProps } from '@/domain/props/ChartContainerProps';

/**
 * This component is tied to the `ChartContainer` and `ChartModal` component and should not be used independently.
 * It renders a button to open a dropdown menu to select the sorting for the chart.
 */
export default function ChartSortingButton({ sorting, setSorting, small = false }: ChartSortingButtonProps) {
  const className = small ? 'h-3 w-3' : 'h-4 w-4';

  let selectedSortingIcon;
  switch (sorting) {
    case CategoricalChartSorting.NAMES_ASC:
      selectedSortingIcon = <ArrowDownAZ className={className} />;
      break;
    case CategoricalChartSorting.NAMES_DESC:
      selectedSortingIcon = <ArrowDownZA className={className} />;
      break;
    case CategoricalChartSorting.VALUES_ASC:
      selectedSortingIcon = <ArrowDownNarrowWide className={className} />;
      break;
    case CategoricalChartSorting.VALUES_DESC:
    default:
      selectedSortingIcon = <ArrowDownWideNarrow className={className} />;
  }

  return (
    <Popover placement="bottom" offset={10} backdrop="opaque">
      <PopoverTrigger>
        <Button isIconOnly variant="light" size="sm">
          <Tooltip text="Export Chart / Data" offset={20}>
            {selectedSortingIcon}
          </Tooltip>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit h-fit p-2 flex flex-col gap-1 items-start">
        <Button
          variant="light"
          size="sm"
          className="w-full justify-start"
          onPress={() => setSorting(CategoricalChartSorting.VALUES_DESC)}
          startContent={<ArrowDownWideNarrow className="h-4 w-4" />}
        >
          Sort values descending
        </Button>
        <Button
          variant="light"
          size="sm"
          className="w-full justify-start"
          onPress={() => setSorting(CategoricalChartSorting.VALUES_ASC)}
          startContent={<ArrowDownNarrowWide className="h-4 w-4" />}
        >
          Sort values ascending
        </Button>
        <Button
          variant="light"
          size="sm"
          className="w-full justify-start"
          onPress={() => setSorting(CategoricalChartSorting.NAMES_ASC)}
          startContent={<ArrowDownAZ className="h-4 w-4" />}
        >
          Sort names A-Z
        </Button>
        <Button
          variant="light"
          size="sm"
          className="w-full justify-start"
          onPress={() => setSorting(CategoricalChartSorting.NAMES_DESC)}
          startContent={<ArrowDownZA className="h-4 w-4" />}
        >
          Sort names Z-A
        </Button>
      </PopoverContent>
    </Popover>
  );
}
