'use client';

import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Button } from '@nextui-org/button';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Spinner } from '@nextui-org/spinner';

import { AccordionContainerProps } from '@/domain/props/AccordionContainerProps';

import { Tooltip } from '../Tooltip/Tooltip';

export default function AccordionListItems({
  items,
  loading = false,
  multipleSelectionMode = false,
  noSelectionMode = false,
}: AccordionContainerProps) {
  const selectionMode = noSelectionMode ? 'none' : multipleSelectionMode ? 'multiple' : 'single';

  return (
    <Accordion variant="splitted" selectionMode={selectionMode} className="p-0 mb-4 gap-0">
      {items.map((item, index) => (
        <AccordionItem
          key={typeof item.title === 'string' ? item.title : `accordion-item-${index}`}
          aria-label={typeof item.title === 'string' ? item.title : `Accordion Item ${index}`}
          className="bg-transparent overflow-hidden p-0 border-t-1 border-clickableSecondary rounded-none shadow-none"
          hideIndicator={noSelectionMode}
          title={
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-4">
                <span className="text-md font-light">{item.title}</span>
                {loading && <Spinner size="sm" />}
              </div>
              {item.tooltipInfo && (
                <Tooltip text={item.tooltipInfo}>
                  {item.infoIcon && <span className="w-[37px] h-[37px] p-[5.5px]">{item.infoIcon}</span>}
                </Tooltip>
              )}
              {item.popoverInfo && (
                <Popover>
                  <PopoverTrigger>
                    {item.infoIcon && (
                      <Button isIconOnly className="w-[37px] h-[37px] p-[5.5px]" variant="light">
                        {item.infoIcon}
                      </Button>
                    )}
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="p-2 max-w-[400px] content">{item.popoverInfo}</div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          }
        >
          {item.description && <p className="text-sm text-balance pb-8 text-center">{item.description}</p>}
          {item.content}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
