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
  const JSON_DOWNLOAD_FILE_NAME = `hunger_map_line_chart_json-${title}.json`;

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
  const switchChartType = () => {
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

  // trigger download of the given line chart `data` as a json file
  const downloadDataJSON = () => {
    // convert data json object to string and encode as URI
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    // create a temporary link element and trigger the download
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = JSON_DOWNLOAD_FILE_NAME;
    link.click();
  };

  // trigger download of the given line chart `data` as a json file
  const downloadChartPNG = () => {
    if (chartRef.current) {
      chartRef?.current.chart.exportChartLocal({
        type: 'image/png',
        filename: 'chart-download',
      });
    }
  };

  // --------------
  // JSX - elements
  // --------------

  // slider to manipulate the plotted x-axis range of the chart; can be disabled via `xAxisSlider`
  const xAxisSliderComp = xAxisSlider ? <> x-Axis slider will be implemented in another issue (todo)</> : null;

  // description text element should only be rendered if description is available
  const descriptionText = description ? (
    <p className={`w-full h-fit pb-4 ${DESCRIPTION_TEXT_SIZE} px-3`}> {description} </p>
  ) : null;

  // button to switch between line and bar chart; can be disabled via `barChartSwitch`
  const barChartSwitchButton = (size: number = 4) => {
    if (!barChartSwitch) return null;

    const tooltipText = `Switch to ${showBarChart ? 'Line' : 'Bar'} Chart`;
    const icon = showBarChart ? (
      <Diagram className={`h-${size} w-${size}`} />
    ) : (
      <Chart className={`h-${size} w-${size}`} />
    );
    return (
      <Tooltip text={tooltipText}>
        <Button isIconOnly variant="light" size="sm" onClick={switchChartType}>
          {icon}
        </Button>
      </Tooltip>
    );
  };

  // button to trigger the full screen modal; rendered if `expandable`
  const fullScreenButton = expandable ? (
    <Tooltip text="Enlarge Chart">
      <Button isIconOnly variant="light" size="sm" onClick={onOpen}>
        <Maximize4 className={`h-${ICON_BUTTON_SIZE} w-${ICON_BUTTON_SIZE}`} />
      </Button>
    </Tooltip>
  ) : null;

  // button to hide/show the slider to manipulate the plotted x-axis range of the chart; can be disabled via `xAxisSlider`
  const xAxisSliderButton = (size: number = 4) => {
    return xAxisSlider ? (
      <Tooltip text="x-Axis Slider">
        <Button
          isIconOnly
          variant="light"
          size="sm"
          onPress={() => {
            setShowXAxisSlider(!showXAxisSlider);
          }}
        >
          <Settings className={`h-${size} w-${size}`} />
        </Button>
      </Tooltip>
    ) : null;
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
              {xAxisSliderButton()}
              {barChartSwitchButton()}
              <Tooltip text="Download Data as JSON">
                <Button isIconOnly variant="light" size="sm" onPress={downloadDataJSON}>
                  <DocumentDownload className="h-4 w-4" />
                </Button>
              </Tooltip>
              <Tooltip text="Download Chart as PNG">
                <Button isIconOnly variant="light" size="sm" onPress={downloadChartPNG}>
                  <GalleryImport className="h-4 w-4" />
                </Button>
              </Tooltip>
              <Tooltip text="Close">
                <Button isIconOnly variant="light" size="sm" onPress={onClose}>
                  <Minus className="h-4 w-4" />
                </Button>
              </Tooltip>
            </div>
          </div>
        </ModalHeader>

        <ModalBody>
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

        <ModalFooter> {xAxisSliderComp} </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <>
      <div className="w-full h-fit flex-col rounded-md bg-background">
        <div className={`w-full h-fit flex flex-row justify-between items-start gap-1 pl-3 pb-${HEADER_PADDING}`}>
          <p className={`${TITLE_TEXT_SIZE} font-normal pt-2 flex flex-row items-center`}> {title} </p>
          <div className="flex flex-row gap-0.5 pt-0.5 pr-0.5">
            {xAxisSliderButton(ICON_BUTTON_SIZE)}
            {barChartSwitchButton(ICON_BUTTON_SIZE)}
            {fullScreenButton}
          </div>
        </div>

        {descriptionText}

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
        {xAxisSlider}
      </div>
      {fullScreenModal}
    </>
  );
}
