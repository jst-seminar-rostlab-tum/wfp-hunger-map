'use client';

import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import * as Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Chart, Diagram, Maximize4 } from 'iconsax-react';
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
 * @param noBarChartSwitch todo
 * @param data the actual data to be used in the chart
 */
export function LineChart({ title, description, expandable, small, noBarChartSwitch, data }: LineChartProps) {
  const TITLE_TEXT_SIZE = small ? 'text-sm' : 'text-md';
  const DESCRIPTION_TEXT_SIZE = small ? 'text-xs' : 'text-sm';
  const CHART_HEIGHT = small ? 12 : 16;
  const ICON_BUTTON_SIZE = small ? 3 : 4;
  const HEADER_BOTTOM_PADDING = title ? 3 : 0;
  const JSON_DOWNLOAD_FILE_NAME = `hunger_map_line_chart_json-${title}.json`;

  const [showBarChart, setShowBarChart] = useState(false);

  // full screen modal state handling
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // convert data to `LineChartData` and build chart options for 'Highcharts'
  const lineChartData: LineChartData = LineChartOperations.convertToLineChartData(data);
  const chartOptions: Highcharts.Options = LineChartOperations.getHighChartData(lineChartData);

  // check if switching to bar chart should be possibel
  const switchToBarChartAvailable = !noBarChartSwitch && lineChartData.lines.length >= 2;

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

  // Full screen modal that can be opened if `expandable==true`. Offers a larger chart and a download button.
  const fullScreenModal = (
    <Modal size="5xl" isOpen={isOpen} backdrop="blur" scrollBehavior="inside" onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
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
        <ModalFooter>
          <Button color="primary" onPress={downloadDataJson}>
            Download data as JSON
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  // Button to trigger the full screen modal; rendered if `expandable==true`
  const fullScreenButton = expandable ? (
    <Button isIconOnly variant="light" size="sm" onClick={onOpen}>
      <Maximize4 className={`h-${ICON_BUTTON_SIZE} w-${ICON_BUTTON_SIZE}`} />
    </Button>
  ) : null;

  // Description text element should only be rendered if description is available
  const descriptionText = description ? (
    <p className={`w-full h-fit pb-4 ${DESCRIPTION_TEXT_SIZE} px-3`}> {description} </p>
  ) : null;

  // todo
  const barChartSwitchButton = switchToBarChartAvailable ? (
    <Button isIconOnly variant="light" size="sm" onClick={() => setShowBarChart(!showBarChart)}>
      {showBarChart ? (
        <Tooltip text="Switch to Line Chart">
          <Diagram className={`h-${ICON_BUTTON_SIZE} w-${ICON_BUTTON_SIZE}`} />
        </Tooltip>
      ) : (
        <Tooltip text="Switch to Bar Chart">
          <Chart className={`h-${ICON_BUTTON_SIZE} w-${ICON_BUTTON_SIZE}`} />
        </Tooltip>
      )}
    </Button>
  ) : null;

  return (
    <>
      <div className="w-full h-fit flex-col rounded-md bg-background">
        <div
          className={`w-full h-fit flex flex-row justify-between items-start gap-1 pl-3 pb-${HEADER_BOTTOM_PADDING}`}
        >
          <p className={`${TITLE_TEXT_SIZE} font-normal pt-2 flex flex-row items-center`}> {title} </p>
          <div className="flex flex-row gap-1 pt-0.5 pr-0.5">
            {barChartSwitchButton}
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
      </div>
      {fullScreenModal}
    </>
  );
}
