'use client';

import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/modal';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Maximize4 } from 'iconsax-react';
import { useRef, useState } from 'react';

import ChartAlternativeSwitchButton from '@/components/Charts/helpers/buttons/ChartAlternativeSwitchButton';
import ChartDownloadButton from '@/components/Charts/helpers/buttons/ChartDownloadButton';
import ChartSliderButton from '@/components/Charts/helpers/buttons/ChartSliderButton';
import { ChartModal } from '@/components/Charts/helpers/ChartModal';
import ChartSlider from '@/components/Charts/helpers/ChartSlider';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import ChartContainerProps from '@/domain/props/ChartContainerProps';

/**
 * This component is the general component, which renders a box that primarily displays a title, description text, and a chart.
 * This component has a width of 100%, so it adjusts to the width of its parent element in which it is used.
 * The height of the entire box depends on the provided text, while the chart itself has a fixed height.
 * It also provides the option to open the chart in a full-screen modal, where one can download the data as well.
 *
 * It is used by the `CategoricalChart` and `LineChart` components, which define the type of chart through the passed `chartOptions`.
 * The main goal of this component is to prevents code redundancy between `LineChart` and `CategoricalChart`.
 */
export function ChartContainer({
  chartOptions,
  chartData,
  title,
  description,
  small,
  noPadding,
  transparentBackground,
  disableExpandable,
  disableDownload,
  alternativeSwitchButtonProps,
  sliderProps,
}: ChartContainerProps) {
  const TITLE_TEXT_SIZE = small ? 'text-sm' : 'text-md';
  const DESCRIPTION_TEXT_SIZE = small ? 'text-tiny' : 'text-sm';
  const CHART_HEIGHT = small ? 12 : 16;
  const ICON_BUTTON_SIZE = small ? 3 : 4;
  const HEADER_PADDING = title ? 3 : 0;
  const MAIN_BOX_PADDING_FACTOR = noPadding ? 0 : 1;
  const BOX_BACKGROUND = transparentBackground ? 'bg-transparent' : 'bg-background';

  const chartRef = useRef<HighchartsReact.RefObject | null>(null);

  // full screen modal state handling
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  // handling the x-axis range slider visibility
  const [showSlider, setShowSlider] = useState(false);

  // if chartOptions is undefined -> display "no data available"
  if (!chartOptions) {
    // todo check
    return (
      <div
        className={`w-full h-40 flex-col rounded-md ${BOX_BACKGROUND} text-secondary text-xs flex flex-row justify-center items-center`}
      >
        <p>no data available</p>
        <p className="max-w-52 pt-1 text-[0.65rem] font-light text-center">
          &#39;{title}&#39; chart cannot be displayed
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={`w-full h-fit flex-col rounded-md ${BOX_BACKGROUND}`}>
        <div
          className={`w-full h-fit flex flex-row justify-between items-start gap-1 pl-${3 * MAIN_BOX_PADDING_FACTOR} pb-${HEADER_PADDING}`}
        >
          <h2 className={`${TITLE_TEXT_SIZE} font-normal pt-${2 * MAIN_BOX_PADDING_FACTOR} flex flex-row items-center`}>
            {title}
          </h2>
          <div
            className={`flex flex-row gap-0.5 pt-${0.5 * MAIN_BOX_PADDING_FACTOR} pr-${0.5 * MAIN_BOX_PADDING_FACTOR}`}
          >
            {
              // button to hide/show the slider to e.g. manipulate the plotted x-axis range of the chart
              sliderProps && (
                <ChartSliderButton showSlider={showSlider} setShowSlider={setShowSlider} size={ICON_BUTTON_SIZE} />
              )
            }
            {
              // button to switch between different chart types
              alternativeSwitchButtonProps && (
                <ChartAlternativeSwitchButton {...alternativeSwitchButtonProps} size={4} />
              )
            }
            {
              // button to download chart as png, svg, etc.
              !disableDownload && (
                <ChartDownloadButton chartRef={chartRef} chartData={chartData} size={ICON_BUTTON_SIZE} />
              )
            }
            {
              // button to trigger the full screen modal; rendered if `disableExpandable` is not selected
              !disableExpandable && (
                <Tooltip text="Enlarge Chart">
                  <Button isIconOnly variant="light" size="sm" onClick={onOpen}>
                    <Maximize4 className={`h-${ICON_BUTTON_SIZE} w-${ICON_BUTTON_SIZE}`} />
                  </Button>
                </Tooltip>
              )
            }
          </div>
        </div>

        {
          // description text element should only be rendered if description is available
          description && (
            <p className={`w-full h-fit pb-4 ${DESCRIPTION_TEXT_SIZE} px-${3 * MAIN_BOX_PADDING_FACTOR}`}>
              {description}
            </p>
          )
        }

        {/* the actual chart */}
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          ref={chartRef}
          containerProps={{
            style: {
              width: '100%',
              height: `${CHART_HEIGHT}rem`,
              borderRadius: '0 0 0.375rem 0.375rem',
            },
          }}
        />

        {
          // slider to e.g. manipulate the plotted x-axis range of the chart
          showSlider && sliderProps && <ChartSlider {...sliderProps} />
        }
      </div>

      <ChartModal
        chartOptions={chartOptions}
        chartData={chartData}
        title={title}
        description={description}
        disableDownload={disableDownload}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        alternativeSwitchButtonProps={alternativeSwitchButtonProps}
        sliderProps={sliderProps}
        showSlider={showSlider}
        setShowSlider={setShowSlider}
      />
    </>
  );
}
