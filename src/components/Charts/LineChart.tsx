'use client';

import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import OfflineExporting from 'highcharts/modules/offline-exporting';
import HighchartsReact from 'highcharts-react-official';
import { Chart, Diagram, DocumentDownload, GalleryImport, Maximize4, Minus, Settings } from 'iconsax-react';
import { useRef, useState } from 'react';

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
 * @param data the actual data to be used in the chart
 */
export function LineChart({
  title,
  description,
  expandable,
  small,
  barChartSwitch,
  xAxisSlider,
  data,
}: LineChartProps) {
  const TITLE_TEXT_SIZE = small ? 'text-sm' : 'text-md';
  const DESCRIPTION_TEXT_SIZE = small ? 'text-xs' : 'text-sm';
  const CHART_HEIGHT = small ? 12 : 16;
  const ICON_BUTTON_SIZE = small ? 3 : 4;
  const HEADER_PADDING = title ? 3 : 0;

  // convert data to `LineChartData` and build chart options for 'Highcharts' (line and bar chart)
  const lineChartData: LineChartData = LineChartOperations.convertToLineChartData(data);
  const lineChartOptions: Highcharts.Options = LineChartOperations.getHighChartLineData(lineChartData);
  const barChartOptions: Highcharts.Options = LineChartOperations.getHighChartBarData(lineChartData);

  // controlling if a line or bar chart is rendered
  const [showBarChart, setShowBarChart] = useState(false);
  const [chartOptions, setChartOptions] = useState(lineChartOptions);
  // handling the x-axis range slider visibility
  const [showXAxisSlider, setShowXAxisSlider] = useState(false);

  // referencing the Highcharts chart object (needed for download the chart as a png)
  const chartRef = useRef<HighchartsReact.RefObject | null>(null);
  // full screen modal state handling
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  // handling the switch between line and bar chart
  const switchChartType = (): void => {
    if (showBarChart) {
      // switch to line chart
      setChartOptions(lineChartOptions);
      setShowBarChart(false);
      return;
    }
    // switch to bar chart
    setChartOptions(barChartOptions);
    setShowBarChart(true);
  };

  // full screen modal that can be opened if `expandable==true`; offers a larger chart and an additional features (see buttons)
  const fullScreenModal = (
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
                    <Button isIconOnly variant="light" size="sm" onClick={switchChartType}>
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
          <div className="py-6">
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
            xAxisSlider ? <> x-Axis slider will be implemented in another issue (todo)</> : null
          }
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <>
      <div className="w-full h-fit flex-col rounded-md bg-background">
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
                  <Button isIconOnly variant="light" size="sm" onClick={switchChartType}>
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
          xAxisSlider ? <> x-Axis slider will be implemented in another issue (todo)</> : null
        }
      </div>
      {fullScreenModal}
    </>
  );
}
