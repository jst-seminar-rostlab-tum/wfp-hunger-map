import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import Highcharts from 'highcharts';
import ExportDataModule from 'highcharts/modules/export-data';
import Exporting from 'highcharts/modules/exporting';
import OfflineExporting from 'highcharts/modules/offline-exporting';
import HighchartsReact from 'highcharts-react-official';
import { DocumentDownload, GalleryImport, Minus } from 'iconsax-react';
import { useRef } from 'react';

import LineChartBarLineSwitchButton from '@/components/Charts/helpers/LineChartBarLineSwitchButton';
import LineChartSliderButton from '@/components/Charts/helpers/LineChartSliderButton';
import LineChartXAxisSlider from '@/components/Charts/helpers/LineChartXAxisSlider';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import LineChartModalProps from '@/domain/props/LineChartModalProps';
import LineChartOperations from '@/operations/charts/LineChartOperations.ts';

// initialize the exporting module
if (typeof Highcharts === 'object') {
  Exporting(Highcharts);
  ExportDataModule(Highcharts);
  OfflineExporting(Highcharts);
}

/**
 * This component is tied to the `LineChart` component and should not be used independently.
 * It renders the modal, which can be opened by the user from the `LineChart` to display the chart
 * in a larger view and access additional functionalities, such as downloading the chart as a PNG.
 * For more details, please refer to the `LineChart` component.
 */
export function LineChartModal({
  title,
  description,
  barChartSwitch,
  xAxisSlider,
  lineChartData,
  chartOptions,
  isOpen,
  onClose,
  onOpenChange,
  showXAxisSlider,
  setShowXAxisSlider,
  showBarChart,
  setShowBarChart,
  selectedXAxisRange,
  setSelectedXAxisRange,
}: LineChartModalProps) {
  // referencing the Highcharts chart object (needed for download the chart as a png)
  const chartRef = useRef<HighchartsReact.RefObject | null>(null);

  // full screen modal by the 'LineChart' component that can be opened if `expandable==true`;
  // offers a larger chart and an additional features (see buttons)
  return (
    <Modal
      size="5xl"
      isOpen={isOpen}
      backdrop="blur"
      scrollBehavior="inside"
      onOpenChange={onOpenChange}
      hideCloseButton
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex flex-row justify-between w-full h-full">
            {title}
            <div className="flex flex-row w-fit h-full gap-4">
              {
                // button to hide/show the slider to manipulate the plotted x-axis range of the chart;
                // can be disabled via `xAxisSlider`
                xAxisSlider && (
                  <LineChartSliderButton
                    showXAxisSlider={showXAxisSlider}
                    setShowXAxisSlider={setShowXAxisSlider}
                    size={4}
                  />
                )
              }
              {
                // button to switch between line and bar chart; can be disabled via `barChartSwitch`
                barChartSwitch && (
                  <LineChartBarLineSwitchButton
                    showBarChart={showBarChart}
                    setShowBarChart={setShowBarChart}
                    size={4}
                  />
                )
              }

              {/* chart download dropdown */}
              <Popover placement="bottom" offset={10} backdrop="opaque">
                <PopoverTrigger>
                  <Button isIconOnly variant="light" size="sm">
                    <Tooltip text="Download Data as JSON">
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
                      if (chartRef.current) LineChartOperations.downloadDataJSON(lineChartData);
                    }}
                    startContent={<DocumentDownload className="h-4 w-4" />}
                  >
                    Data as JSON
                  </Button>
                </PopoverContent>
              </Popover>

              {/* close model button */}
              <Tooltip text="Close">
                <Button isIconOnly variant="light" size="sm" onPress={onClose}>
                  <Minus className="h-4 w-4" />
                </Button>
              </Tooltip>
            </div>
          </div>
        </ModalHeader>

        <ModalBody>
          {/* modal main content: description and chart */}
          <p className="w-full h-fit text-md font-normal">{description}</p>
          <div className="py-6">
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions}
              ref={chartRef}
              containerProps={{ style: { width: '100%', height: '45vh', borderRadius: '0 0 0.5rem 0.5rem' } }}
            />
          </div>
        </ModalBody>
        {
          // slider to manipulate the plotted x-axis range of the chart; can be disabled via `xAxisSlider`
          showXAxisSlider && (
            <ModalFooter>
              <div className="w-full">
                <LineChartXAxisSlider
                  selectedXAxisRange={selectedXAxisRange}
                  setSelectedXAxisRange={setSelectedXAxisRange}
                  data={lineChartData}
                />
              </div>
            </ModalFooter>
          )
        }
      </ModalContent>
    </Modal>
  );
}
