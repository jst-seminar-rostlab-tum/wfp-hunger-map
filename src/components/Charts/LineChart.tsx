'use client';

import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import * as Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Chart, Diagram, Maximize4, DocumentDownload, Minus, Settings } from 'iconsax-react';
import { Tooltip } from '@/components/Tooltip/Tooltip';

import { LineChartData } from '@/domain/entities/charts/LineChartData';
import LineChartProps from '@/domain/props/LineChartProps';
import LineChartOperations from '@/operations/charts/LineChartOperations';
import { useState } from 'react';

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
 * @param noBarChartSwitch todo (optional)
 * @param noXAxisSlider todo (optional)
 * @param showXAxisSliderOnRender todo (optional)
 * @param data the actual data to be used in the chart
 */
export function LineChart({
  title,
  description,
  expandable,
  small,
  noBarChartSwitch,
  noXAxisSlider,
  showXAxisSliderOnRender,
  data,
}: LineChartProps) {
  const TITLE_TEXT_SIZE = small ? 'text-sm' : 'text-md';
  const DESCRIPTION_TEXT_SIZE = small ? 'text-xs' : 'text-sm';
  const CHART_HEIGHT = small ? 12 : 16;
  const ICON_BUTTON_SIZE = small ? 3 : 4;
  const HEADER_BOTTOM_PADDING = title ? 3 : 0;
  const JSON_DOWNLOAD_FILE_NAME = `hunger_map_line_chart_json-${title}.json`;

  // convert data to `LineChartData` and build chart options for 'Highcharts'
  const lineChartData: LineChartData = LineChartOperations.convertToLineChartData(data);
  const lineChartOptions: Highcharts.Options = LineChartOperations.getHighChartLineData(lineChartData);
  const barChartOptions: Highcharts.Options = LineChartOperations.getHighChartBarData(lineChartData);

  // todo descr
  const [showBarChart, setShowBarChart] = useState(false); // todo check if necessary
  const [chartOptions, setChartOptions] = useState(lineChartOptions);
  const [showXAxisSlider, setShowXAxisSlider] = useState(showXAxisSliderOnRender && !noXAxisSlider);

  // full screen modal state handling
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  // listen to todo descr
  const switchChartType = () => {
    if (showBarChart) {
      // switch to line chart
      setChartOptions(lineChartOptions);
      setShowBarChart(false);
      return;
    }
    setChartOptions(barChartOptions);
    setShowBarChart(true);
  };

  // trigger download of the given line chart `data` as a json file
  const downloadDataJson = () => {
    // convert data json object to string and encode as URI
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    // create a temporary link element and trigger the download
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = JSON_DOWNLOAD_FILE_NAME;
    link.click();
  };

  // Button to trigger the full screen modal; rendered if `expandable==true`
  const fullScreenButton = expandable ? (
    <Tooltip text="Enlarge Chart">
      <Button isIconOnly variant="light" size="sm" onClick={onOpen}>
        <Maximize4 className={`h-${ICON_BUTTON_SIZE} w-${ICON_BUTTON_SIZE}`} />
      </Button>
    </Tooltip>
  ) : null;

  // Description text element should only be rendered if description is available
  const descriptionText = description ? (
    <p className={`w-full h-fit pb-4 ${DESCRIPTION_TEXT_SIZE} px-3`}> {description} </p>
  ) : null;

  // todo
  const barChartSwitchButton = (size: number = 4) => {
    if (noBarChartSwitch) return null;

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

  const xAxisSliderButton = (size: number = 4) => {
    return noXAxisSlider ? null : (
      <Tooltip text="X-Axis Slider">
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
    );
  };

  const xAxisSlider = showXAxisSlider ? <> X-Axis slider will be implemented in another issue (todo)</> : null;

  // Full screen modal that can be opened if `expandable==true`. Offers a larger chart and a download button.
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
              <Tooltip text="Download Chart">
                <Button isIconOnly variant="light" size="sm" onPress={downloadDataJson}>
                  <DocumentDownload className="h-4 w-4" />
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
              containerProps={{ style: { width: '100%', height: '40vh', borderRadius: '0 0 0.5rem 0.5rem' } }}
            />
          </div>
        </ModalBody>
        <ModalFooter>{xAxisSlider}</ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <>
      <div className="w-full h-fit flex-col rounded-md bg-background">
        <div
          className={`w-full h-fit flex flex-row justify-between items-start gap-1 pl-3 pb-${HEADER_BOTTOM_PADDING}`}
        >
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
