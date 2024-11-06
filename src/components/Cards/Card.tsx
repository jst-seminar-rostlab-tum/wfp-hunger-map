'use client';

import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import { commonColors } from '@nextui-org/theme';
import { useTheme } from 'next-themes';
import { CardProps } from '@/domain/props/CardProps';

export default function CustomCard({ title, content }: CardProps) {
  const { theme } = useTheme();
  const lightThemeBg = commonColors.white;
  const darkThemeBg = 'hsl(var(--nextui-content4))';
  return (
    <Card
      className={`${'card'}`}
      style={{
        backgroundColor: theme === 'dark' ? darkThemeBg : lightThemeBg,
      }}
    >
      <CardHeader
        className="cardHeader"
        style={{
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <h2
          className="text-large"
          style={{
            wordWrap: 'break-word',
            paddingLeft: '19px',
            paddingRight: '19px',
          }}
        >
          {' '}
          {title}{' '}
        </h2>
      </CardHeader>
      <CardBody className="cardBody">
        <div className="cardContentContainer">
          {content.map((item) => (
            <div key={item.text} className="cardItem">
              <div className="imageWrapper">
                <Image alt={item.altText} className="image" src={item.imageSrc} />
              </div>
              <h1 className="text">{item.text}</h1>
              {item.timeText && <h1 className="timeText">{item.timeText}</h1>}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
