'use client';

import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Spinner } from '@nextui-org/spinner';

import { AccordionsProps } from '@/domain/props/AccordionProps';

import { Tooltip } from '../Tooltip/Tooltip';
import { useMediaQuery } from '@/utils/resolution.ts';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import LineChartSliderButton from '@/components/Charts/helpers/LineChartSliderButton.tsx';
import LineChartBarLineSwitchButton from '@/components/Charts/helpers/LineChartBarLineSwitchButton.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Button } from '@nextui-org/button';
import { DocumentDownload, GalleryImport, Minus } from 'iconsax-react';
import LineChartOperations from '@/operations/charts/LineChartOperations.ts';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useAccordionsModal } from '@/domain/contexts/AccodionsModalContext.tsx';

export default function CustomAccordion({
  items,
  loading = false,
  multipleSelectionMode = false,
  noSelectionMode = false,
  color = 'bg-content1',
}: AccordionsProps) {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const { isOpen, onOpen, onClose, onOpenChange } = useAccordionsModal();

  const selectionMode = noSelectionMode ? 'none' : multipleSelectionMode ? 'multiple' : 'single';
  return !isMobile ? (
    <div className="w-full max-w-[600px] overflow-x-auto p-2 rounded-lg bg-yellow-200">
      <Accordion variant="splitted" selectionMode={selectionMode} className="bg-pink-300">
        {items.map((item, index) => (
          <AccordionItem
            key={typeof item.title === 'string' ? item.title : `accordion-item-${index}`}
            aria-label={typeof item.title === 'string' ? item.title : `Accordion Item ${index}`}
            className={`last:border-b-0 ${color} white:bg-white overflow-hidden bg-green-500`}
            hideIndicator={noSelectionMode}
            title={
              <div className="flex justify-between items-center w-full">
                <div className="flex gap-4">
                  <span>{item.title}</span>
                  {loading && <Spinner size="sm" />}
                </div>
                {item.tooltipInfo ? (
                  <Tooltip text={item.tooltipInfo}>
                    {item.infoIcon && <span className="w-[37px] h-[37px] p-[5.5px]">{item.infoIcon}</span>}
                  </Tooltip>
                ) : (
                  item.infoIcon && <span className="w-[37px] h-[37px] p-[5.5px]">{item.infoIcon}</span>
                )}
              </div>
            }
          >
            {item.description && <p className="text-sm text-balance pb-8 text-center">{item.description}</p>}
            {typeof item.content === 'string' ? (
              <div className="p-4 break-words text-balance">{item.content}</div>
            ) : (
              item.content
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ) : (
    <Modal
      size="5xl"
      isOpen={isOpen}
      backdrop="blur"
      scrollBehavior="inside"
      onOpenChange={onOpenChange}
      hideCloseButton
      className="bg-background"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">header</ModalHeader>
        <ModalBody>body</ModalBody>
      </ModalContent>
    </Modal>
  );
}
