'use client';

import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/modal';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Maximize4 } from 'iconsax-react';
import { useRef, useState } from 'react';

import ChartAlternativeSwitchButton from '@/components/Charts/helpers/ChartAlternativeSwitchButton';
import ChartDownloadButton from '@/components/Charts/helpers/ChartDownloadButton';
import ChartSlider from '@/components/Charts/helpers/ChartSlider';
import ChartSliderButton from '@/components/Charts/helpers/ChartSliderButton';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import ChartContainerProps from '@/domain/props/ChartContainerProps';

/**
 * todo
 */
export function ChartContainer({
  chartOptions,
  chartData,
  title,
  description,
  small,
  noPadding,
  disableExpandable,
  disableDownload,
  transparentBackground,
  disableAlternativeChart,
  showAlternativeChart,
  setShowAlternativeChart,
  disableSlider,
  sliderTitle,
  sliderMin,
  sliderMax,
  selectedSliderRange,
  setSelectedSliderRange,
}: ChartContainerProps) {
  const TITLE_TEXT_SIZE = small ? 'text-sm' : 'text-md';
  const DESCRIPTION_TEXT_SIZE = small ? 'text-tiny' : 'text-sm';
  const CHART_HEIGHT = small ? 12 : 16;
  const ICON_BUTTON_SIZE = small ? 3 : 4;
  const HEADER_PADDING = title ? 3 : 0;
  const MAIN_BOX_PADDING_FACTOR = noPadding ? 0 : 1;

  const chartRef = useRef<HighchartsReact.RefObject | null>(null);

  // full screen modal state handling
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  // handling the x-axis range slider visibility
  const [showSlider, setShowSlider] = useState(false);

  return (
    <>
      <div className={`w-full h-fit flex-col rounded-md ${transparentBackground ? 'bg-transparent' : 'bg-background'}`}>
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
              !disableSlider && (
                <ChartSliderButton showSlider={showSlider} setShowSlider={setShowSlider} size={ICON_BUTTON_SIZE} />
              )
            }
            {
              // button to switch between different chart types
              !disableAlternativeChart && (
                <ChartAlternativeSwitchButton
                  showAlternativeChart={showAlternativeChart!} // todo rework props
                  setShowAlternativeChart={setShowAlternativeChart!}
                  size={ICON_BUTTON_SIZE}
                />
              )
            }
            {
              // button to download chart as png, svg, etc.
              !disableDownload && <ChartDownloadButton chartRef={chartRef} chartData={chartData} />
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
          !disableSlider && (
            <ChartSlider
              title={sliderTitle}
              sliderMin={sliderMin!}
              sliderMax={sliderMax!} // todo rework props
              selectedSliderRange={selectedSliderRange}
              setSelectedSliderRange={setSelectedSliderRange}
            />
          )
        }
      </div>

      {/**
       * <LineChartModal // todo linus rename
       *         title={title}
       *         description={description}
       *         barChartSwitch={barChartSwitch}
       *         xAxisSlider={xAxisSlider}
       *         lineChartData={chartData}
       *         chartOptions={chartOptions}
       *         isOpen={isOpen}
       *         onClose={onClose}
       *         onOpenChange={onOpenChange}
       *         showXAxisSlider={showXAxisSlider}
       *         setShowXAxisSlider={setShowXAxisSlider}
       *         showBarChart={showBarChart}
       *         setShowBarChart={setShowBarChart}
       *         selectedXAxisRange={selectedXAxisRange}
       *         setSelectedXAxisRange={setSelectedXAxisRange}
       *       />
       */}
    </>
  );
}
