'use client';

import './accordion.css';

import { Accordion, AccordionItem } from '@nextui-org/accordion';

interface AccordionItemProps {
  title: string;
  iconSrc?: string;
  content: React.ReactNode;
}

interface AccordionsProps {
  items: AccordionItemProps[];
}

export default function Accordions({ items }: AccordionsProps) {
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
            {item.content}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
