'use client';

import { Accordion, AccordionItem } from '@nextui-org/accordion';

import { AccordionsProps } from '@/domain/props/AccordionProps';

export default function CustomAccordion({ items }: AccordionsProps) {
  return (
    <div className="accordion-wrapper">
      <Accordion variant="splitted" className="accordion-container">
        {items.map((item) => (
          <AccordionItem
            key={item.title}
            aria-label={item.title}
            title={
              <div className="flex items-center justify-between w-full">
                <span>{item.title}</span>
                {item.iconSrc && <img src={item.iconSrc} alt="info icon" className="info-icon" />}
              </div>
            }
          >
            {typeof item.content === 'string' ? (
              <div className="accordion-item-content">{item.content}</div>
            ) : (
              item.content
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
