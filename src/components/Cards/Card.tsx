'use client';

import { Card, CardBody, Image } from '@nextui-org/react';
import React from 'react';
import { v4 as uuid } from 'uuid';

import { CardProps } from '@/domain/props/CardProps';

/**
 * A custom card component that displays a title and content.
 * @param {CardProps} props - The props object.
 * @param {string} props.title - The title of the card.
 * @param {CardItemProps[]} props.content - The content of the card.
 * @returns {JSX.Element} - The custom card component.
 */

export default function CustomCard({ title, content }: CardProps) {
  return (
    <Card className="w-fit h-auto min-w-[200px] justify-evenly m-2.5 dark:primary white:bg-white flex-grow">
      <CardBody className="flex flex-col items-left justify-center overflow-hidden max-h-[300px] py-2">
        <div className="flex flex-row flex-wrap gap-6 ">
          {content.map((item) => (
            <div key={uuid()} className="flex flex-row gap-2 items-start">
              {item.svgIcon && <div className="svg-icon w-[50px] h-[50px]">{item.svgIcon}</div>}
              {!item.svgIcon && item.imageSrc && (
                <Image alt={item.altText || ''} className="w-[50px] h-[50px] -mt-4" src={item.imageSrc} />
              )}
              <div className="flex flex-col">
                {title && <h2 className="text-sm text-left">{title}</h2>}
                {item.text && <h2 className={`text-left ${item.textClass || 'text-xs'}`}>{item.text}</h2>}
                {item.value && (
                  <p className="text-sm text-left">
                    {typeof item.value === 'number' ? `${item.value.toFixed(2)} M` : item.value || 'N/A'}
                  </p>
                )}
              </div>
              {item.changeValues && (
                <div className="flex flex-row space-x-1">
                  {item.changeValues.map((delta) => (
                    <div key={uuid()} className="flex flex-col items-center gap-1">
                      <Image src={delta.imageSrc} alt={delta.altText} className="w-6 h-6" width={24} height={24} />
                      <div className="text-center">
                        <p className="text-xs font-medium whitespace-nowrap">{delta.text}</p>
                        <p className="text-xs text-gray-600">{delta.timeText}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
