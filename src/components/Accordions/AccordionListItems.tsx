'use client';

import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Spinner } from '@nextui-org/spinner';
import { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';

import { AccordionContainerProps } from '@/domain/props/AccordionContainerProps';
import AccordionOperations from '@/operations/accordions/AccordionOperations';

import { InfoPopover } from '../InfoPopover/InfoPopover';
import { Tooltip } from '../Tooltip/Tooltip';

/**
 * AccordionListItems - A dynamic and responsive accordion component for the `AccordionModal` on mobile screens.
 * This component displays a list of accordion items with customizable behavior:
 * - If a single item is provided, it will be expanded by default.
 * - If multiple items are provided, they remain collapsed unless specified otherwise.
 * @param {AccordionContainerProps} props - The props object.
 * @param {AccordionItemProps[]} props.items - The items to display in the accordion.
 * @param {boolean} [props.loading=false] - A boolean that indicates if the accordion is loading.
 * @param {boolean} [props.multipleSelectionMode=false] - A boolean that indicates if multiple items can be selected.
 * @param {boolean} [props.noSelectionMode=false] - A boolean that indicates if no item can be selected.
 * @param {boolean} [props.expandAll=false] - A boolean that indicates if all items are expanded.
 * @param {string[]} [props.highlightedTitleWords=[]] - The words to highlight in the title.
 * @returns {JSX.Element} - A responsive accordion component rendering a list of items with their respective content and interactions.
 */

export default function AccordionListItems({
  items,
  loading = false,
  multipleSelectionMode = false,
  noSelectionMode = false,
  expandAll = false,
  highlightedTitleWords = [],
}: AccordionContainerProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string> | 'all'>(new Set());
  const selectionMode = AccordionOperations.getSelectionModeType(noSelectionMode, multipleSelectionMode);
  const defaultExpandedKeys = items.length === 1 ? [items[0].title] : [];

  useEffect(() => {
    if (expandAll) setExpandedItems('all');
    else setExpandedItems(new Set());
  }, [expandAll]);

  return (
    <Accordion
      variant="splitted"
      selectionMode={selectionMode}
      defaultExpandedKeys={defaultExpandedKeys}
      className="p-0 mb-4 gap-0"
      selectedKeys={expandedItems}
      onSelectionChange={(keys) => setExpandedItems(keys as Set<string>)}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.title}
          aria-label={item.title}
          className="bg-transparent overflow-hidden p-0 border-t-1 border-clickableSecondary rounded-none shadow-none"
          hideIndicator={noSelectionMode}
          title={
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-4">
                <span className="text-md font-light">
                  <Highlighter searchWords={highlightedTitleWords} textToHighlight={item.title} autoEscape />
                </span>
                {loading && <Spinner size="sm" />}
              </div>
              {item.tooltipInfo && (
                <Tooltip text={item.tooltipInfo}>
                  {item.infoIcon && <span className="w-[37px] h-[37px] p-[5.5px]">{item.infoIcon}</span>}
                </Tooltip>
              )}
              {item.popoverInfo && <InfoPopover infoIcon={item.infoIcon} popoverInfo={item.popoverInfo} />}
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
