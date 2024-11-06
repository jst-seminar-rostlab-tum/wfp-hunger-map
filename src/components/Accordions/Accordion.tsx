'use client';

import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { commonColors } from '@nextui-org/theme';
import { useTheme } from 'next-themes';

import { AccordionsProps } from '@/domain/props/AccordionProps';

export default function CustomAccordion({ items }: AccordionsProps) {
  const { theme } = useTheme();
  const lightThemeBg = commonColors.zinc;
  const darkThemeBg = commonColors.black;

  return (
    <div className="w-full flex justify-start items-start max-w-[600px] overflow-hidden p-2 rounded-lg">
      <Accordion variant="splitted" className="overflow-x-hidden">
        {items.map((item) => (
          <AccordionItem
            key={item.title}
            aria-label={item.title}
            className="last:border-b-[none]"
            style={{
              backgroundColor: theme === 'dark' ? darkThemeBg : lightThemeBg[500],
            }}
            title={
              <div className="flex justify-between w-full">
                <span>{item.title}</span>
                {item.iconSrc && <img src={item.iconSrc} alt="info icon" className="w-[37px] h-[37px] p-[5.5px]" />}
              </div>
            }
          >
            {typeof item.content === 'string' ? <div className="p-4 break-words">{item.content}</div> : item.content}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
