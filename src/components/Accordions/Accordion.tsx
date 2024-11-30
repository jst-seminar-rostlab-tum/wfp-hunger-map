'use client';

import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Spinner } from '@nextui-org/spinner';

import { AccordionsProps } from '@/domain/props/AccordionProps';

import { Tooltip } from '../Tooltip/Tooltip';

export default function CustomAccordion({
  items,
  loading = false,
  multipleSelectionMode = false,
  noSelectionMode = false,
  color = 'bg-content1',
}: AccordionsProps) {
  const selectionMode = noSelectionMode ? 'none' : multipleSelectionMode ? 'multiple' : 'single';
  return (
    <div className="w-full overflow-x-auto py-2 rounded-lg">
      <Accordion variant="splitted" selectionMode={selectionMode}>
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
            {typeof item.content === 'string' ? (
              <div className="p-4 break-words text-balance">{item.content}</div>
            ) : (
              item.content
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
