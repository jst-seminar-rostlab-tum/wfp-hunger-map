'use client';

import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Spinner } from '@nextui-org/spinner';
import { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { v4 as uuid } from 'uuid';

import { AccordionContainerProps } from '@/domain/props/AccordionContainerProps';
import AccordionOperations from '@/operations/accordions/AccordionOperations';

import { InfoPopover } from '../InfoPopover/InfoPopover';
import { Tooltip } from '../Tooltip/Tooltip';

/**
 * AccordionBoxItems - component for displaying collapsible accordion boxes stacked vertically for desktop version.
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
 * @param {boolean} [props.noPadding=false] - A boolean that indicates if bottom margin is needed for the accordion.
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
  noPadding = false,
}: AccordionContainerProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string> | 'all'>(new Set());
  const selectionMode = AccordionOperations.getSelectionModeType(noSelectionMode, multipleSelectionMode);
  const maxWidthClass = maxWidth ? `max-w-[${maxWidth}px]` : '';

  const accordionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [popoverPositions, setPopoverPositions] = useState<Record<string, { top: number; right: number }>>({});

  useEffect(() => {
    if (expandAll) setExpandedItems('all');
    else setExpandedItems(new Set());
  }, [expandAll]);

  useEffect(() => {
    const updatePositions = () => {
      if (!accordionRef.current) return;
      if (!containerRef.current) return;

      const containerPosition = containerRef.current.getBoundingClientRect();
      const positions: Record<string, { top: number; right: number }> = {};

      Array.from(accordionRef.current.children).forEach((child) => {
        const key = child.getAttribute('id');

        if (key) {
          // find the position of an element with id="popover-info-placeholder" inside the child
          const placeholder = child.querySelector('#popover-info-placeholder');
          if (!placeholder) return;
          // get the position of the placeholder element
          const rect = placeholder.getBoundingClientRect();
          positions[key] = {
            top: rect.top - containerPosition.top,
            right: 43,
          };
        }
      });

      setPopoverPositions(positions);
    };
    updatePositions();
  }, [expandedItems, items]);

  return (
    <div ref={containerRef} className={`w-full ${maxWidthClass} overflow-x-auto rounded-lg shadow-none relative`}>
      {title && (
        <div className="bg-primary p-4 break-words text-balance rounded-lg mb-2">
          <h1 className="text-2xl font-black font-sans text-white">{title}</h1>
        </div>
      )}
      <Accordion
        ref={accordionRef}
        key={uuid()}
        variant="splitted"
        selectionMode={selectionMode}
        className={`p-0 ${noPadding ? '' : 'mb-4'}`}
        selectedKeys={expandedItems}
        onSelectionChange={(keys) => setExpandedItems(keys as Set<string>)}
      >
        {items.map((item) => (
          <AccordionItem
            id={item.title}
            key={item.title}
            aria-label={item.title}
            className={`last:border-b-0 ${color} overflow-hidden shadow-md`}
            hideIndicator={noSelectionMode}
            title={
              <span className="flex justify-between items-center w-full">
                {/* Since lighthosue looks up the parent background-color styles in order until an explicit background definition is found. It should add background color in parent element, avoid third party component like accordion has other influence of bg color */}
                <span className={`flex gap-4 ${color}`}>
                  <Highlighter searchWords={highlightedTitleWords} textToHighlight={item.title} autoEscape />

                  {loading && <Spinner size="sm" />}
                </span>
                {item.tooltipInfo && (
                  <Tooltip text={item.tooltipInfo}>
                    {item.infoIcon && <span className="w-[37px] h-[37px] p-[5.5px]">{item.infoIcon}</span>}
                  </Tooltip>
                )}
                {item.popoverInfo && <span id="popover-info-placeholder" className="w-[37px] h-[37px] p-[5.5px]" />}
              </span>
            }
          >
            {item.description && <p className="text-sm text-balance pb-8 text-center">{item.description}</p>}
            {item.content}
          </AccordionItem>
        ))}
      </Accordion>
      {items.map((item) => {
        const key = item.title;
        const position = popoverPositions[key];
        return (
          <div
            key={`popover-item-${key}`}
            style={{
              position: 'absolute',
              top: position?.top,
              right: position?.right,
            }}
          >
            {item.popoverInfo && <InfoPopover infoIcon={item.infoIcon} popoverInfo={item.popoverInfo} />}
          </div>
        );
      })}
    </div>
  );
}
