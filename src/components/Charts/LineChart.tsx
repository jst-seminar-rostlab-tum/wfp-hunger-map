'use client';

import { Button } from '@nextui-org/button';
import * as Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';
import { Maximize4 } from 'iconsax-react';

import LineChartProps from '@/domain/props/LineChartProps';
import LineChartOperations from '@/operations/charts/LineCharOperations.ts';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';

export function LineChart({ title, description, expandable, data }: LineChartProps) {
  const JSON_DOWNLOAD_FILE_NAME = `hunger_map_line_chart_json-${title}.json`;

  // full screen modal state handling
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const lineChartData: LineChartData = LineChartOperations.convertToLineChartData(data);
  const chartOptions: Highcharts.Options = LineChartOperations.getHighChartData(lineChartData);

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
        <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
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
            Download data as Json
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  // todo descr
  const fullScreenButton = expandable ? (
    <Button isIconOnly variant="light" size="sm" onClick={onOpen}>
      <Maximize4 className="h-4 w-4" />
    </Button>
  ) : null;

  return (
    <>
      <div className="w-full h-fit flex-col rounded-lg pt-2 bg-background">
        <div className="w-full h-fit flex flex-row justify-between items-start gap-2 px-2">
          <p className="text-md font-normal pt-1 flex flex-row items-center"> {title} </p>
          {fullScreenButton}
        </div>
        <p className="w-full h-fit pt-1 pb-3 text-sm font-normal px-2">{description}</p>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          containerProps={{ style: { width: '100%', height: '16rem', borderRadius: '0 0 0.5rem 0.5rem' } }}
        />
      </div>
      {fullScreenModal}
    </>
  );
}
