import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import Highcharts from 'highcharts';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsReact from 'highcharts-react-official';
import { Minus } from 'iconsax-react';
import { useRef } from 'react';

import LineChartBarLineSwitchButton from '@/components/Charts/helpers/LineChartBarLineSwitchButton';
import LineChartDownloadButton from '@/components/Charts/helpers/LineChartDownloadButton';
import LineChartSliderButton from '@/components/Charts/helpers/LineChartSliderButton';
import LineChartXAxisSlider from '@/components/Charts/helpers/LineChartXAxisSlider';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import LineChartModalProps from '@/domain/props/LineChartModalProps';

highchartsAccessibility(Highcharts);

/**
 * This component is tied to the `LineChart` component and should not be used independently.
 * It renders the modal, which can be opened by the user from the `LineChart` to display the chart
 * in a larger view and access additional functionalities, such as downloading the chart as a PNG.
 * For more details, please refer to the `LineChart` component.
 */
export function LineChartModal({
  title,
  description,
  disableDownload,
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
      className="bg-background"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex flex-row justify-between w-full h-full">
            <h2 className="flex flex-col justify-center font-normal text-sm sm:text-md md:text-lg"> {title} </h2>
            <div className="flex flex-row w-fit h-full gap-0.5 sm:gap-4 md:gap-6">
              {xAxisSlider && (
                <LineChartSliderButton
                  showXAxisSlider={showXAxisSlider}
                  setShowXAxisSlider={setShowXAxisSlider}
                  size={4}
                />
              )}

              {barChartSwitch && (
                <LineChartBarLineSwitchButton showBarChart={showBarChart} setShowBarChart={setShowBarChart} size={4} />
              )}

              {!disableDownload && <LineChartDownloadButton chartRef={chartRef} lineChartData={lineChartData} />}

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
          <p className="w-full h-fit font-normal text-tiny sm:text-sm md:text-md">{description}</p>
          <div className="py-6">
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions}
              ref={chartRef}
              containerProps={{ style: { width: '100%', height: '45dvh', borderRadius: '0 0 0.5rem 0.5rem' } }}
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
