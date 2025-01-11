'use client';

import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Button } from '@nextui-org/button';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Spinner } from '@nextui-org/spinner';
import { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';

import { AccordionContainerProps } from '@/domain/props/AccordionContainerProps';
import AccordionOperations from '@/operations/accordions/AccordionOperations';

import { ReadMore } from '../ReadMore/ReadMore';
import { Tooltip } from '../Tooltip/Tooltip';

/**
 * Any number of items are displayed as collapsible accordion boxes stacked vertically.
 * Important: Exclusively used by `AccordionContainer` component.
 * @param {AccordionContainerProps} props - The props object.
 * @param {AccordionItemProps[]} props.items - The items to display in the accordion.
 * @param {string} props.title - The title of the accordion.
 * @param {boolean} [props.loading=false] - A boolean that indicates if the accordion is loading.
 * @param {boolean} [props.multipleSelectionMode=false] - A boolean that indicates if multiple items can be selected.
 * @param {boolean} [props.noSelectionMode=false] - A boolean that indicates if no item can be selected.
 * @param {string} [props.color='bg-content1'] - The color of the accordion.
 * @param {number} [props.maxWidth] - The maximum width of the accordion.
 * @param {boolean} [props.expandAll=false] - A boolean that indicates if all items are expanded.
 * @param {string[]} [props.highlightedTitleWords=[]] - The words to highlight in the title.
 * @returns {JSX.Element} - The accordion box items component.
 */

export default function AccordionBoxItems({
  items,
  title,
  loading = false,
  multipleSelectionMode = false,
  noSelectionMode = false,
  color = 'bg-content1',
  maxWidth,
  expandAll = false,
  highlightedTitleWords = [],
}: AccordionContainerProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string> | 'all'>(new Set());
  const selectionMode = AccordionOperations.getSelectionModeType(noSelectionMode, multipleSelectionMode);
  const maxWidthClass = maxWidth ? `max-w-[${maxWidth}px]` : '';

  useEffect(() => {
    if (expandAll) setExpandedItems('all');
    else setExpandedItems(new Set());
  }, [expandAll]);

  return (
    <div className={`w-full ${maxWidthClass} overflow-x-auto rounded-lg shadow-none`}>
      {title && (
        <div className="bg-primary p-4 break-words text-balance rounded-lg mb-2">
          <h1 className="text-2xl font-black font-sans text-white">{title}</h1>
        </div>
      )}
      <Accordion
        variant="splitted"
        selectionMode={selectionMode}
        className="p-0 mb-4"
        selectedKeys={expandedItems}
        onSelectionChange={(keys) => setExpandedItems(keys as Set<string>)}
      >
        {items.map((item, index) => (
          <AccordionItem
            key={typeof item.title === 'string' ? item.title : `accordion-item-${index}`}
            aria-label={typeof item.title === 'string' ? item.title : `Accordion Item ${index}`}
            className={`last:border-b-0 ${color} white:bg-white overflow-hidden shadow-md`}
            hideIndicator={noSelectionMode}
            title={
              <span className="flex justify-between items-center w-full">
                <span className="flex gap-4">
                  <Highlighter searchWords={highlightedTitleWords} textToHighlight={item.title} autoEscape />
                  {loading && <Spinner size="sm" />}
                </span>
                {item.tooltipInfo && (
                  <Tooltip text={item.tooltipInfo}>
                    {item.infoIcon && <span className="w-[37px] h-[37px] p-[5.5px]">{item.infoIcon}</span>}
                  </Tooltip>
                )}
                {item.popoverInfo && (
                  <Popover>
                    <PopoverTrigger>
                      {item.infoIcon && (
                        <Button as="span" isIconOnly className="w-[37px] h-[37px] p-[5.5px]" variant="light">
                          {item.infoIcon}
                        </Button>
                      )}
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="p-2 max-w-[400px] prose prose-sm dark:prose-invert prose-headings:text-medium">
                        <ReadMore maxHeight={100} maxExpandedHeight={500}>
                          {item.popoverInfo}
                        </ReadMore>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
                {!item.tooltipInfo && !item.popoverInfo && item.infoIcon && (
                  <span className="w-[37px] h-[37px] p-[5.5px]">{item.infoIcon}</span>
                )}
              </span>
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
