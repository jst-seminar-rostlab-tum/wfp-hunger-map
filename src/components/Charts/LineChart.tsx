'use client';

import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/modal';
import { Slider } from '@nextui-org/slider';
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import OfflineExporting from 'highcharts/modules/offline-exporting';
import HighchartsReact from 'highcharts-react-official';
import { Chart, Diagram, Maximize4, Settings } from 'iconsax-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { LineChartModal } from '@/components/Charts/LineChartModal';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import { LineChartData } from '@/domain/entities/charts/LineChartData';
import LineChartProps from '@/domain/props/LineChartProps';
import LineChartOperations from '@/operations/charts/LineChartOperations';

// initialize the exporting module
if (typeof Highcharts === 'object') {
  Exporting(Highcharts);
  OfflineExporting(Highcharts);
}

/**
 * The LineChart component is a box that primarily renders a title, description text, and a line chart.
 * This component has a width of 100%, so it adjusts to the width of its parent element in which it is used.
 * The height of the line chart box depends on the provided text, while the chart itself has a fixed height.
 * It also provides the option to open the chart in a full-screen modal, where one can download the data as well.
 *
 * The data to be displayed in the chart can be provided in different types (see `LineChartProps.data`).
 * However, the preferred type is `LineChartData`.
 *
 * To enable the LineChart component to support an additional `data` type, the following steps are required:
 * 1. Define an interface and add it to `LineChartProps.data`.
 * 2. Add another switch case in `LineChartOperations.convertToLineChartData` to convert the new interface to `LineChartData`.
 *
 * @param title chart title (optional)
 * @param description chart description text (optional)
 * @param expandable when selected, the user is given the option to open the chart in a larger modal (optional)
 * @param small when selected, all components in the line chart box become slightly smaller (optional)
 * @param barChartSwitch when selected, the user is given the option to switch to a bar chart (optional)
 * @param xAxisSlider when selected, the user is given the option to change the x-axis range via a slider (optional)
 * @param transparentBackground when selected, the background of the entire component is transparent (optional)
 * @param data the actual data to be used in the chart
 */
export function LineChart({
  title,
  description,
  expandable,
  small,
  barChartSwitch,
  xAxisSlider,
  transparentBackground,
  data,
}: LineChartProps) {
  const TITLE_TEXT_SIZE = small ? 'text-sm' : 'text-md';
  const DESCRIPTION_TEXT_SIZE = small ? 'text-xs' : 'text-sm';
  const CHART_HEIGHT = small ? 12 : 16;
  const ICON_BUTTON_SIZE = small ? 3 : 4;
  const HEADER_PADDING = title ? 3 : 0;

  // full screen modal state handling
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  // the 'chartOptions' are dependent on the theme
  const { theme } = useTheme();

  // convert data to `LineChartData` and build chart options for 'Highcharts' (line and bar chart)
  const lineChartData: LineChartData = LineChartOperations.convertToLineChartData(data);
  const lineChartOptions: Highcharts.Options = LineChartOperations.getHighChartLineData(lineChartData, theme);

  // todo descr
  const xAxisValues: string[] = lineChartData.lines[0]?.dataPoints.map((d) => d.x) || [];
  const [selectedXAxisRange, setSelectedXAxisRange] = useState([0, xAxisValues.length - 1]);

  // controlling if a line or bar chart is rendered; line chart is the default
  const [showBarChart, setShowBarChart] = useState(false);
  const [chartOptions, setChartOptions] = useState(lineChartOptions);
  // handling the x-axis range slider visibility
  const [showXAxisSlider, setShowXAxisSlider] = useState(false);

  // handling the line and bar chart switch and the theme switch
  // todo descr slider
  useEffect(() => {
    const newChartOptions = showBarChart
      ? LineChartOperations.getHighChartBarData(lineChartData, theme, selectedXAxisRange[0], selectedXAxisRange[1])
      : LineChartOperations.getHighChartLineData(lineChartData, theme, selectedXAxisRange[0], selectedXAxisRange[1]);
    setChartOptions(newChartOptions);
  }, [showBarChart, theme, selectedXAxisRange]);

  return (
    <>
      <div className={`w-full h-fit flex-col rounded-md ${transparentBackground ? 'bg-background' : 'bg-transparent'}`}>
        <div className={`w-full h-fit flex flex-row justify-between items-start gap-1 pl-3 pb-${HEADER_PADDING}`}>
          <h2 className={`${TITLE_TEXT_SIZE} font-normal pt-2 flex flex-row items-center`}> {title} </h2>
          <div className="flex flex-row gap-0.5 pt-0.5 pr-0.5">
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
                    <Settings className={`h-${ICON_BUTTON_SIZE} w-${ICON_BUTTON_SIZE}`} />
                  </Button>
                </Tooltip>
              ) : null
            }
            {
              // button to switch between line and bar chart; can be disabled via `barChartSwitch`
              barChartSwitch ? (
                <Tooltip text={`Switch to ${showBarChart ? 'Line' : 'Bar'} Chart`}>
                  <Button isIconOnly variant="light" size="sm" onClick={() => setShowBarChart(!showBarChart)}>
                    {showBarChart ? (
                      <Diagram className={`h-${ICON_BUTTON_SIZE} w-${ICON_BUTTON_SIZE}`} />
                    ) : (
                      <Chart className={`h-${ICON_BUTTON_SIZE} w-${ICON_BUTTON_SIZE}`} />
                    )}
                  </Button>
                </Tooltip>
              ) : null
            }
            {
              // button to trigger the full screen modal; rendered if `expandable`
              expandable ? (
                <Tooltip text="Enlarge Chart">
                  <Button isIconOnly variant="light" size="sm" onClick={onOpen}>
                    <Maximize4 className={`h-${ICON_BUTTON_SIZE} w-${ICON_BUTTON_SIZE}`} />
                  </Button>
                </Tooltip>
              ) : null
            }
          </div>
        </div>
        {
          // description text element should only be rendered if description is available
          description ? <p className={`w-full h-fit pb-4 ${DESCRIPTION_TEXT_SIZE} px-3`}> {description} </p> : null
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
          // slider to manipulate the plotted x-axis range of the chart; can be disabled via `xAxisSlider`
          showXAxisSlider ? (
            <div className="pl-5 pr-2">
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
      </div>

      <LineChartModal
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
