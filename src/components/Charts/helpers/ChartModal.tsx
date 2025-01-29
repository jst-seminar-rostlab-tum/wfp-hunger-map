import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Minus } from 'iconsax-react';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';

import ChartAlternativeSwitchButton from '@/components/Charts/helpers/buttons/ChartAlternativeSwitchButton';
import ChartDownloadButton from '@/components/Charts/helpers/buttons/ChartDownloadButton';
import ChartSliderButton from '@/components/Charts/helpers/buttons/ChartSliderButton';
import ChartSortingButton from '@/components/Charts/helpers/buttons/ChartSortingButton';
import ChartSlider from '@/components/Charts/helpers/ChartSlider';
import ChartModalProps from '@/domain/props/ChartModalProps';

/**
 * This component is tied to the `ChartContainer` component and should not be used independently.
 * It renders the modal, which can be opened by the user from the `ChartContainer`
 * to display the chart in a larger view.
 */
export function ChartModal({
  chartOptions,
  chartData,
  title,
  description,
  disableDownload,
  isOpen,
  onClose,
  onOpenChange,
  alternativeSwitchButtonProps,
  sortingButtonProps,
  sliderProps,
  showSlider,
  setShowSlider,
}: ChartModalProps) {
  const { theme } = useTheme();

  const chartRef = useRef<HighchartsReact.RefObject | null>(null);
  const [chartKey, setChartKey] = useState(0);

  // handling chart type switch -> force chart to remount -> correct chart animation will be re-triggered
  useEffect(() => {
    setChartKey((prev) => prev + 1);
  }, [theme, alternativeSwitchButtonProps?.showAlternativeChart]);

  return (
    <Modal
      size="5xl"
      isOpen={isOpen}
      backdrop="blur"
      scrollBehavior="inside"
      onOpenChange={onOpenChange}
      className="bg-background"
      classNames={{
        closeButton: 'mt-3 rounded-lg mr-3',
      }}
      closeButton={
        <Button isIconOnly variant="light" size="sm" onPress={onClose}>
          <Minus className="h-4 w-4" />
        </Button>
      }
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 mr-12">
          <div className="flex flex-row justify-between w-full h-full">
            <h2 className="flex flex-col justify-center font-normal text-sm sm:text-md md:text-lg"> {title} </h2>
            <div className="flex flex-row w-fit h-full gap-0.5 sm:gap-4 md:gap-6">
              {sliderProps && showSlider && setShowSlider && (
                <ChartSliderButton showSlider={showSlider} setShowSlider={setShowSlider} />
              )}

              {alternativeSwitchButtonProps && <ChartAlternativeSwitchButton {...alternativeSwitchButtonProps} />}

              {sortingButtonProps && <ChartSortingButton {...sortingButtonProps} />}

              {!disableDownload && <ChartDownloadButton chartRef={chartRef} chartData={chartData} />}
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
              key={chartKey}
              containerProps={{ style: { width: '100%', height: '45dvh', borderRadius: '0 0 0.5rem 0.5rem' } }}
            />
          </div>
        </ModalBody>
        {
          // slider to e.g. manipulate the plotted x-axis range of the chart
          sliderProps && (
            <ModalFooter>
              <div className="w-full">
                <ChartSlider {...sliderProps} />
              </div>
            </ModalFooter>
          )
        }
      </ModalContent>
    </Modal>
  );
}
