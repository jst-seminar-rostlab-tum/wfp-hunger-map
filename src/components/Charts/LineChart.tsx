'use client';

import { Button } from '@nextui-org/button';
import * as Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';
import { Maximize4 } from 'iconsax-react';

import LineChartProps from '@/domain/props/LineChartProps';
import LineChartOperations from '@/operations/charts/LineCharOperations.ts';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';

export function LineChart({ title, description, expandable, small, data }: LineChartProps) {
  const TITLE_TEXT_SIZE = small ? 'text-sm' : 'text-md';
  const DESCRIPTION_TEXT_SIZE = small ? 'text-xs' : 'text-sm';
  const CHART_HEIGHT = small ? 12 : 16;
  const ICON_BUTTON_SIZE = small ? 3 : 4;
  const HEADER_BOTTOM_PADDING = title ? 3 : 0;
  const JSON_DOWNLOAD_FILE_NAME = `hunger_map_line_chart_json-${title}.json`;

  // full screen modal state handling
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // convert data to `LineChartData` and build chart options for 'Highcharts'
  const lineChartData: LineChartData = LineChartOperations.convertToLineChartData(data);
  const chartOptions: Highcharts.Options = LineChartOperations.getHighChartData(lineChartData);

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

  /**
   * todo descr
   */

  const fullScreenModal = (
    <Modal size="5xl" isOpen={isOpen} backdrop="blur" onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalBody>
          <p className="w-full h-fit text-md font-normal">{description}</p>
          <div className="py-6">
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions}
              containerProps={{ style: { width: '100%', height: '40rem', borderRadius: '0 0 0.5rem 0.5rem' } }}
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

  // todo descr
  const fullScreenButton = expandable ? (
    <Button isIconOnly variant="light" size="sm" onClick={onOpen}>
      <Maximize4 className={`h-${ICON_BUTTON_SIZE} w-${ICON_BUTTON_SIZE}`} />
    </Button>
  ) : null;

  const descriptionText = description ? (
    <p className={`w-full h-fit pb-4 ${DESCRIPTION_TEXT_SIZE} px-3`}> {description} </p>
  ) : null;

  return (
    <>
      <div className="w-full h-fit flex-col rounded-lg bg-background">
        <div
          className={`w-full h-fit flex flex-row justify-between items-start gap-3 pl-3 pb-${HEADER_BOTTOM_PADDING}`}
        >
          <p className={`${TITLE_TEXT_SIZE} font-normal pt-2 flex flex-row items-center`}> {title} </p>
          {fullScreenButton}
        </div>
        {descriptionText}
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          containerProps={{
            style: {
              width: '100%',
              height: `${CHART_HEIGHT}rem`,
              borderRadius: '0 0 0.5rem 0.5rem',
            },
          }}
        />
      </div>
      {fullScreenModal}
    </>
  );
}
