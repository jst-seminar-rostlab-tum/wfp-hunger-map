'use client';

import { useEffect } from 'react';

import AccordionBoxItems from '@/components/Accordions/AccordionBoxItems';
import AccordionListItems from '@/components/Accordions/AccordionListItems';
import { useAccordionsModal } from '@/domain/contexts/AccodionsModalContext';
import { AccordionContainerProps } from '@/domain/props/AccordionContainerProps';
import { useMediaQuery } from '@/utils/resolution.ts';

/**
 * This container allows any number of items to be displayed in an accordion.
 * If 'accordionModalActive' is selected, a button is rendered at the bottom of the screen
 * for small screen sizes (mobile), allowing the accordions to open in a separate modal.
 * By default, the component adjusts to its parent's width. A max width (in px) can be configured using `maxWidth`.
 * @param {AccordionContainerProps} props - The props object.
 * @param {AccordionItemProps[]} props.items - The items to display in the accordion.
 * @param {string} props.title - The title of the accordion.
 * @param {boolean} [props.loading=false] - A boolean that indicates if the accordion is loading.
 * @param {boolean} [props.multipleSelectionMode=false] - A boolean that indicates if multiple items can be selected.
 * @param {boolean} [props.noSelectionMode=false] - A boolean that indicates if no item can be selected.
 * @param {string} [props.color='bg-content1'] - The color of the accordion.
 * @param {boolean} [props.accordionModalActive] - A boolean that indicates if the accordions are displayed in a modal on mobile screens.
 * @param {number} [props.maxWidth] - The maximum width of the accordion.
 * @param {boolean} [props.expandAll=false] - A boolean that indicates if all items are expanded.
 * @param {string[]} [props.highlightedTitleWords=[]] - The words to highlight in the title.
 * @returns {JSX.Element} - The accordion container component.
 */

export default function AccordionContainer({
  items,
  title,
  loading = false,
  multipleSelectionMode = false,
  noSelectionMode = false,
  color = 'bg-content1',
  accordionModalActive,
  maxWidth,
  expandAll = false,
  highlightedTitleWords = [],
}: AccordionContainerProps) {
  const isMobile = useMediaQuery('(max-width: 700px)');
  const { setModalContent, setModalTitle } = useAccordionsModal();

  // If 'accordionModalActive' is enabled, the accordions are hidden in a modal on mobile screens,
  // this modal can be opened using a button at the bottom edge (see `AccordionsModal` component).
  // The accordions are passed to the 'AccordionModal' component via the 'userAccordionsModal' hook.
  useEffect(() => {
    if (items.length > 0 && accordionModalActive) {
      setModalContent(
        <AccordionListItems
          items={items}
          loading={loading}
          multipleSelectionMode={multipleSelectionMode}
          noSelectionMode={noSelectionMode}
          expandAll={expandAll}
          highlightedTitleWords={highlightedTitleWords}
        />
      );
      setModalTitle(title || '');
    }
  }, [items, loading, multipleSelectionMode, noSelectionMode, color]);

  // standard accordion design
  return !isMobile || !accordionModalActive ? (
    <AccordionBoxItems
      items={items}
      title={title}
      loading={loading}
      multipleSelectionMode={multipleSelectionMode}
      noSelectionMode={noSelectionMode}
      color={color}
      maxWidth={maxWidth}
      expandAll={expandAll}
      highlightedTitleWords={highlightedTitleWords}
    />
  ) : null;
}
