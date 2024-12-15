'use client';

import { Card, CardBody } from '@nextui-org/react';
import React from 'react';
import { v4 as uuid } from 'uuid';

import { CardProps } from '@/domain/props/CardProps';

export default function CustomCard({ title, content }: CardProps) {
  return (
    <Card className="w-fit h-auto min-w-[200px] justify-evenly m-2.5 dark:primary white:bg-white">
      <CardBody className="flex flex-col items-center justify-center overflow-visible overflow-y-auto max-h-[300px] py-2">
        <div className="flex flex-row flex-wrap gap-6 overflow-y-auto">
          {content.map((item) => (
            <div key={uuid()} className="flex flex-row gap-4 items-start">
              {item.svgIcon ? (
                <div className="svg-icon w-[70px] h-[70px] object-contain">{item.svgIcon}</div>
              ) : item.imageSrc ? (
                <img alt={item.altText || ''} className="w-[70px] h-[70px] -mt-4" src={item.imageSrc} />
              ) : null}
              <div className="flex flex-col">
                {title && <h2 className="text-lg text-center">{title}</h2>}
                {item.text && <h2 className={`text-center ${item.textClass || 'text-xs'}`}>{item.text}</h2>}
                {item.value && (
                  <p className="text-sm/[2rem] text-center">
                    {typeof item.value === 'number' ? `${item.value.toFixed(2)} M` : item.value || 'N/A'}
                  </p>
                )}
              </div>
              {/* Additional Content (Time-based data) */}
              {item.changeValues && (
                <div className="flex flex-row space-x-3">
                  {item.changeValues.map((delta) => (
                    <div key={uuid()} className="flex flex-col items-center gap-2">
                      <img src={delta.imageSrc} alt={delta.altText} className="w-6 h-6" />
                      <div className="text-center">
                        <p className="text-sm font-medium whitespace-nowrap">{delta.text}</p>
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
