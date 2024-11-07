'use client';

import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';

import { CardProps } from '@/domain/props/CardProps';

export default function CustomCard({ title, content }: CardProps) {
  return (
    <Card className="w-fit h-auto min-w-[210px] justify-evenly m-2.5 p-['90px'] dark:primary white:bg-white">
      <CardHeader className="flex flex-col items-center p-[5px] overflow-hidden">
        <h2 className="text-large break.words"> {title} </h2>
      </CardHeader>
      <CardBody className="flex flex-col items-center justify-center overflow-visible overflow-y-auto max-h-[300px] py-2">
        <div className="flex flex-row gap-6 overflow-y-auto">
          {content.map((item) => (
            <div key={item.text} className="flex flex-col gap-[3px] items-center">
              <div className="imageWrapper">
                <Image alt={item.altText} className="w-[102px] h-[75px] rounded-xl" src={item.imageSrc} />
              </div>
              <h1 className="text-base text-center mt-2">{item.text}</h1>
              {item.timeText && <h1 className="text-xs text-[#888888] text-center break-words">{item.timeText}</h1>}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
