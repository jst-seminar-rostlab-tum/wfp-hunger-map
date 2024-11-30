'use client';

import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Spinner } from '@nextui-org/spinner';
import { useEffect } from 'react';

import { useAccordionsModal } from '@/domain/contexts/AccodionsModalContext';
import { AccordionsProps } from '@/domain/props/AccordionProps';
import { useMediaQuery } from '@/utils/resolution.ts';

import { Tooltip } from '../Tooltip/Tooltip';

export default function CustomAccordion({
  items,
  title,
  loading = false,
  multipleSelectionMode = false,
  noSelectionMode = false,
  color = 'bg-content1',
}: AccordionsProps) {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const { setModalContent } = useAccordionsModal();

  const selectionMode = noSelectionMode ? 'none' : multipleSelectionMode ? 'multiple' : 'single';

  const accordion = (
    <Accordion variant="splitted" selectionMode={selectionMode} className="p-0 mb-4">
      {items.map((item, index) => (
        <AccordionItem
          key={typeof item.title === 'string' ? item.title : `accordion-item-${index}`}
          aria-label={typeof item.title === 'string' ? item.title : `Accordion Item ${index}`}
          className={`last:border-b-0 ${color} white:bg-white overflow-hidden`}
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
          {item.content}
        </AccordionItem>
      ))}
    </Accordion>
  );

  // todo linus descr
  useEffect(() => {
    if (items.length > 0) setModalContent(accordion);
  }, [items, loading, multipleSelectionMode, noSelectionMode, color]); // todo linus better descr

  return !isMobile ? (
    <div className="w-full max-w-[600px] overflow-x-auto rounded-lg shadow-xl">
      {title && (
        <div className="bg-primary p-4 break-words text-balance rounded-lg mb-6">
          <h1 className="text-2xl font-black font-sans text-white">{title}</h1>
        </div>
      )}
      {accordion}
    </div>
  ) : null;
}
