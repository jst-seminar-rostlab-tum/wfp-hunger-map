import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/modal';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Maximize4 } from 'iconsax-react';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';

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
 * It is used by the `CategoricalChart` and `ContinuousChart` components, which define the type of chart through the passed `chartOptions`.
 * The main goal of this component is to prevents code redundancy between `ContinuousChart` and `CategoricalChart`.
 */
export function ChartContainer({
  chartData,
  chartOptions,
  recalculateChartOptions,
  title,
  description,
  small,
  noPadding,
  transparentBackground,
  chartHeight,
  disableExpandable,
  disableDownload,
  alternativeSwitchButtonProps,
  sliderProps,
}: ChartContainerProps) {
  const TITLE_TEXT_SIZE = small ? 'text-sm' : 'text-md';
  const DESCRIPTION_TEXT_SIZE = small ? 'text-tiny' : 'text-sm';
  // eslint-disable-next-line no-nested-ternary
  const CHART_HEIGHT = chartHeight ? `${chartHeight}px` : small ? '12rem' : '16rem';
  const ICON_BUTTON_SIZE = small ? 3 : 4;
  const HEADER_PADDING = title ? 3 : 0;
  const MAIN_BOX_PADDING_FACTOR = noPadding ? 0 : 1;
  const BOX_BACKGROUND = transparentBackground ? 'bg-transparent' : 'bg-background';

  const { theme } = useTheme();

  const chartRef = useRef<HighchartsReact.RefObject | null>(null);
  const [chartKey, setChartKey] = useState(0);

  // full screen modal state handling
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  // handling the theme switch
  useEffect(() => {
    // `theme` change does not guarantee that the NextUI CSS colors have already been changed;
    // therefore we synchronize the update with the next repaint cycle, ensuring the CSS variables are updated
    const rafId = requestAnimationFrame(() => recalculateChartOptions());
    return () => cancelAnimationFrame(rafId);
  }, [theme]);

  // handling chart type switch
  useEffect(() => {
    recalculateChartOptions();
    setChartKey((prev) => prev + 1); // forces chart to remount -> correct chart animation will be re-triggered
  }, [alternativeSwitchButtonProps?.showAlternativeChart]);

  // data changes and slider changes
  useEffect(() => {
    recalculateChartOptions();
  }, [chartData, sliderProps?.selectedSliderRange]);

  // handling the x-axis range slider visibility
  const [showSlider, setShowSlider] = useState(false);

  // if chartOptions is undefined -> display "no data available"
  if (!chartOptions) {
    return (
      <div
        className={`w-full h-fit min-h-40 py-8 flex-col rounded-md ${BOX_BACKGROUND} text-secondary text-tiny flex flex-row gap-1 justify-center items-center`}
      >
        <p>no data available</p>
        <p className="max-w-80 font-light text-center">&#39;{title}&#39; chart cannot be displayed</p>
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
                <ChartAlternativeSwitchButton {...alternativeSwitchButtonProps} size={ICON_BUTTON_SIZE} />
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
          key={chartKey}
          containerProps={{
            style: {
              width: '100%',
              height: CHART_HEIGHT,
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
