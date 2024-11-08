'use client';

import { Accordion, AccordionItem } from '@nextui-org/accordion';

import { AccordionsProps } from '@/domain/props/AccordionProps';

export default function CustomAccordion({ items }: AccordionsProps) {
  return (
    <div className="w-full flex justify-start items-start max-w-[600px] overflow-visible overflow-x-auto p-2 rounded-lg">
      <Accordion variant="splitted">
        {items.map((item) => (
          <AccordionItem
            key={item.title}
            aria-label={item.title}
            className="last:border-b-[none] dark:bg-black white:bg-white overflow-x-auto"
            title={
              <div className="flex justify-between items-center w-full">
                <span>{item.title}</span>
                {item.iconSrc && <img src={item.iconSrc} alt="info icon" className="w-[37px] h-[37px] p-[5.5px]" />}
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
