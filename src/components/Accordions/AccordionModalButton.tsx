'use client';

import { Button } from '@nextui-org/button';

import { useAccordionsModal } from '@/domain/contexts/AccodionsModalContext';
import { useMediaQuery } from '@/utils/resolution.ts';

export default function AccordionModalButton() {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const { onOpen, openButtonVisible } = useAccordionsModal();

  return isMobile && openButtonVisible ? (
    <Button className="absolute z-accordionsModalButton bottom-3 left-44" onClick={onOpen}>
      Country Insights
    </Button>
  ) : null;
}
