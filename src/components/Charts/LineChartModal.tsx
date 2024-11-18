import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Chart, Diagram, DocumentDownload, GalleryImport, Minus, Settings } from 'iconsax-react';
import { useRef } from 'react';

import { Tooltip } from '@/components/Tooltip/Tooltip';
import LineChartModalProps from '@/domain/props/LineChartModalProps';
import LineChartOperations from '@/operations/charts/LineChartOperations.ts';
import { Slider } from '@nextui-org/slider';

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

  // todo descr
  const xAxisValues: string[] = lineChartData.lines[0]?.dataPoints.map((d) => d.x) || [];

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
                xAxisSlider ? (
                  <Tooltip text="x-Axis Slider">
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      onPress={() => {
                        setShowXAxisSlider(!showXAxisSlider);
                      }}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </Tooltip>
                ) : null
              }
              {
                // button to switch between line and bar chart; can be disabled via `barChartSwitch`
                barChartSwitch ? (
                  <Tooltip text={`Switch to ${showBarChart ? 'Line' : 'Bar'} Chart`}>
                    <Button isIconOnly variant="light" size="sm" onClick={() => setShowBarChart(!showBarChart)}>
                      {showBarChart ? <Diagram className="h-4 w-4" /> : <Chart className="h-4 w-4" />}
                    </Button>
                  </Tooltip>
                ) : null
              }
              {/* chart download buttons */}
              <Tooltip text="Download Data as JSON">
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onPress={() => {
                    LineChartOperations.downloadDataJSON(lineChartData);
                  }}
                >
                  <DocumentDownload className="h-4 w-4" />
                </Button>
              </Tooltip>
              <Tooltip text="Download Chart as PNG">
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onPress={() => {
                    if (chartRef.current) LineChartOperations.downloadChartPNG(chartRef.current);
                  }}
                >
                  <GalleryImport className="h-4 w-4" />
                </Button>
              </Tooltip>
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
          <div className="pt-6">
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions}
              ref={chartRef}
              containerProps={{ style: { width: '100%', height: '40vh', borderRadius: '0 0 0.5rem 0.5rem' } }}
            />
          </div>
        </ModalBody>

        <ModalFooter>
          {
            // slider to manipulate the plotted x-axis range of the chart; can be disabled via `xAxisSlider`
            showXAxisSlider ? (
              <div className="w-full">
                <h3 className="font-normal text-secondary text-tiny pb-1">Adjusting x-axis range:</h3>
                <Slider
                  minValue={0}
                  maxValue={xAxisValues.length - 1}
                  step={1}
                  value={selectedXAxisRange}
                  onChange={(e) => setSelectedXAxisRange(e as number[])}
                  showSteps
                  color="secondary"
                  size="sm"
                  classNames={{
                    base: 'max-w-md',
                    track: 'bg-secondary bg-opacity-10',
                    filler: 'bg-secondary',
                  }}
                />
              </div>
            ) : null
          }
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
