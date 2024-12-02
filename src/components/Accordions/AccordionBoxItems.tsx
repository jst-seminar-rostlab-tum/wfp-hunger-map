'use client';

import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Button } from '@nextui-org/button';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Spinner } from '@nextui-org/spinner';

import { AccordionContainerProps } from '@/domain/props/AccordionContainerProps';
import AccordionOperations from '@/operations/accordions/AccordionOperations';

import { Tooltip } from '../Tooltip/Tooltip';

/**
 * Any number of items are displayed as collapsible accordion boxes stacked vertically.
 * Important: Exclusively used by `AccordionContainer` component.
 */
export default function AccordionBoxItems({
  items,
  title,
  loading = false,
  multipleSelectionMode = false,
  noSelectionMode = false,
  color = 'bg-content1',
}: AccordionContainerProps) {
  const selectionMode = AccordionOperations.getSelectionModeType(noSelectionMode, multipleSelectionMode);

  return (
    <div className="w-full max-w-[600px] overflow-x-auto rounded-lg shadow-none">
      {title && (
        <div className="bg-primary p-4 break-words text-balance rounded-lg mb-2">
          <h1 className="text-2xl font-black font-sans text-white">{title}</h1>
        </div>
      )}
      <Accordion variant="splitted" selectionMode={selectionMode} className="p-0 mb-4">
        {items.map((item, index) => (
          <AccordionItem
            key={typeof item.title === 'string' ? item.title : `accordion-item-${index}`}
            aria-label={typeof item.title === 'string' ? item.title : `Accordion Item ${index}`}
            className={`last:border-b-0 ${color} white:bg-white overflow-hidden shadow-md`}
            hideIndicator={noSelectionMode}
            title={
              <div className="flex justify-between items-center w-full">
                <div className="flex gap-4">
                  <span>{item.title}</span>
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
                {!item.tooltipInfo && !item.popoverInfo && item.infoIcon && (
                  <span className="w-[37px] h-[37px] p-[5.5px]">{item.infoIcon}</span>
                )}
              </div>
            }
          >
            {item.description && <p className="text-sm text-balance pb-8 text-center">{item.description}</p>}
            {item.content}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
