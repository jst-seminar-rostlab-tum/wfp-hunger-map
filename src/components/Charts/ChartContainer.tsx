'use client';

import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/modal';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Maximize4 } from 'iconsax-react';
import { useState } from 'react';

import LineChartBarLineSwitchButton from '@/components/Charts/helpers/LineChartBarLineSwitchButton';
import LineChartSliderButton from '@/components/Charts/helpers/LineChartSliderButton';
import LineChartXAxisSlider from '@/components/Charts/helpers/LineChartXAxisSlider';
import { LineChartModal } from '@/components/Charts/LineChartModal';
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
  expandable,
  transparentBackground,
  chartTypeSwitchHandle,
  sliderHandle,
  sliderMin,
  sliderMax,
}: ChartContainerProps) {
  const TITLE_TEXT_SIZE = small ? 'text-sm' : 'text-md';
  const DESCRIPTION_TEXT_SIZE = small ? 'text-tiny' : 'text-sm';
  const CHART_HEIGHT = small ? 12 : 16;
  const ICON_BUTTON_SIZE = small ? 3 : 4;
  const HEADER_PADDING = title ? 3 : 0;
  const MAIN_BOX_PADDING_FACTOR = noPadding ? 0 : 1;

  // slider only available and therefore activated if all required params are provided
  const sliderAvailable = sliderHandle && sliderMin && sliderMax;
  // chart type switch only available if all required params are provided
  const chartTypeSwitchAvailable = chartTypeSwitchHandle;

  // full screen modal state handling
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  // the `selectedXAxisRange` saves the to be rendered x-axis range of the chart
  // can be changed using the `LinkeChartXAxisSlider` if the param `xAxisSlider==true`
  const [selectedSliderRange, setSelectedSliderRange] = useState([sliderMin, sliderMax]);

  // controlling if a line or bar chart is rendered; line chart is the default
  const [showChartTypeAlternative, setShowChartTypeAlternative] = useState(false);
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
              sliderAvailable && (
                <LineChartSliderButton // todo linus rename
                  showXAxisSlider={showSlider}
                  setShowXAxisSlider={setShowSlider}
                  size={ICON_BUTTON_SIZE}
                />
              )
            }
            {
              // button to switch between different chart types
              chartTypeSwitchAvailable && (
                <LineChartBarLineSwitchButton // todo linus rename
                  showBarChart={showChartTypeAlternative}
                  setShowBarChart={setShowChartTypeAlternative}
                  size={ICON_BUTTON_SIZE}
                />
              )
            }
            {
              // button to trigger the full screen modal; rendered if `expandable` is selected
              expandable && (
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
          sliderAvailable && (
            <LineChartXAxisSlider // todo linus rename
              selectedXAxisRange={selectedSliderRange}
              setSelectedXAxisRange={setSelectedSliderRange}
              data={chartData}
            />
          )
        }
      </div>

      <LineChartModal // todo linus rename
        title={title}
        description={description}
        barChartSwitch={barChartSwitch}
        xAxisSlider={xAxisSlider}
        lineChartData={lineChartData}
        chartOptions={chartOptions}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        showXAxisSlider={showXAxisSlider}
        setShowXAxisSlider={setShowXAxisSlider}
        showBarChart={showBarChart}
        setShowBarChart={setShowBarChart}
        selectedXAxisRange={selectedXAxisRange}
        setSelectedXAxisRange={setSelectedXAxisRange}
      />
    </>
  );
}
