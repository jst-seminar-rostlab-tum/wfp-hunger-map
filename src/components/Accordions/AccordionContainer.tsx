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
 */
export default function AccordionContainer({
  items,
  title,
  loading = false,
  multipleSelectionMode = false,
  noSelectionMode = false,
  color = 'bg-content1',
  accordionModalActive,
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
    />
  ) : null;
}
