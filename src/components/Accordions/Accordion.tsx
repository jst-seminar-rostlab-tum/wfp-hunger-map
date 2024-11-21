'use client';

import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Spinner } from '@nextui-org/spinner';

import { AccordionsProps } from '@/domain/props/AccordionProps';

import { Tooltip } from '../Tooltip/Tooltip';

export default function CustomAccordion({ items, loading = false }: AccordionsProps) {
  return (
    <div className="w-full flex justify-start items-start max-w-[600px] overflow-visible overflow-x-auto p-2 rounded-lg">
      <Accordion variant="splitted">
        {items.map((item) => (
          <AccordionItem
            key={item.title}
            aria-label={item.title}
            className="last:border-b-[none] bg-content1 white:bg-white overflow-x-auto"
            title={
              <div className="flex justify-between items-center w-full">
                <div className="flex gap-4">
                  <span>{item.title}</span>
                  {loading && <Spinner size="sm" />}
                </div>
                {item.tooltipInfo ? (
                  <Tooltip text={item.tooltipInfo}>
                    {item.iconSrc && <img src={item.iconSrc} alt="info icon" className="w-[37px] h-[37px] p-[5.5px]" />}
                  </Tooltip>
                ) : (
                  item.iconSrc && <img src={item.iconSrc} alt="info icon" className="w-[37px] h-[37px] p-[5.5px]" />
                )}
              </div>
            }
          >
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
