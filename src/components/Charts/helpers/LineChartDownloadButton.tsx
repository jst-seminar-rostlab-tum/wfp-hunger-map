import { Button } from '@nextui-org/button';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { DocumentDownload, GalleryImport } from 'iconsax-react';

import { Tooltip } from '@/components/Tooltip/Tooltip';
import { LineChartDownloadButtonProps } from '@/domain/props/LineChartProps';
import LineChartOperations from '@/operations/charts/LineChartOperations.ts';

/**
 * This component is tied to the `LineChart` and `LineChartModal` component
 * and should not be used independently.
 * It renders a button to open a dropdown menu to download the chart as csv, png, etc.
 */
export default function LineChartDownloadButton({ chartRef, lineChartData }: LineChartDownloadButtonProps) {
  return (
    <Popover placement="bottom" offset={10} backdrop="opaque">
      <PopoverTrigger>
        <Button isIconOnly variant="light" size="sm">
          <Tooltip text="Export Chart / Data">
            <DocumentDownload className="h-4 w-4" />
          </Tooltip>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit h-fit p-2 flex flex-col gap-1 items-start">
        <Button
          variant="light"
          size="sm"
          className="w-full justify-start"
          onPress={() => {
            if (chartRef.current) LineChartOperations.downloadChartPNG(chartRef.current);
          }}
          startContent={<GalleryImport className="h-4 w-4" />}
        >
          Chart as PNG
        </Button>
        <Button
          variant="light"
          size="sm"
          className="w-full justify-start"
          onPress={() => {
            if (chartRef.current) LineChartOperations.downloadChartDataSVG(chartRef.current);
          }}
          startContent={<GalleryImport className="h-4 w-4" />}
        >
          Chart as SVG
        </Button>
        <Button
          variant="light"
          size="sm"
          className="w-full justify-start"
          onPress={() => {
            if (chartRef.current) LineChartOperations.downloadChartDataCSV(chartRef.current);
          }}
          startContent={<DocumentDownload className="h-4 w-4" />}
        >
          Data as CSV
        </Button>
        <Button
          variant="light"
          size="sm"
          className="w-full justify-start"
          onPress={() => {
            LineChartOperations.downloadDataJSON(lineChartData);
          }}
          startContent={<DocumentDownload className="h-4 w-4" />}
        >
          Data as JSON
        </Button>
      </PopoverContent>
    </Popover>
  );
}
