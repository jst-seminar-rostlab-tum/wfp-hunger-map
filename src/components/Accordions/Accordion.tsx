'use client';

import { Accordion, AccordionItem } from '@nextui-org/accordion';

import { AccordionsProps } from '@/domain/props/AccordionProps';
import { commonColors } from '@nextui-org/theme';
import { useTheme } from 'next-themes';

export default function CustomAccordion({ items }: AccordionsProps) {
  const { theme } = useTheme();
  const lightThemeBg = commonColors.zinc;
  const darkThemeBg = commonColors.black;
  return (
    <div className="accordion-wrapper">
      <Accordion variant="splitted" className="accordion-container">
        {items.map((item) => (
          <AccordionItem
          style={{
            backgroundColor: theme === 'dark' ? darkThemeBg : lightThemeBg[500],
          }}
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
