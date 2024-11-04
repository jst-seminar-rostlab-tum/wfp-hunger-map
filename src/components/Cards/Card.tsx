'use client';

import './card.css';

import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface CardContent {
  imageSrc: string;
  text: string;
  timeText?: string;
  altText: string;
}

interface CardProps {
  title: string;
  content: CardContent[];
}

export default function Cards({ title, content }: CardProps) {
  const { theme } = useTheme();
  const [themeClass, setThemeClass] = useState('lightTheme');

  useEffect(() => {
    setThemeClass(theme === 'light' ? 'lightTheme' : 'darkTheme');
  }, [theme]);

  return (
    <Card className={`${'card'} ${themeClass}`}>
      <CardHeader className="cardHeader">
        <small>{title}</small>
      </CardHeader>
      <CardBody className="cardBody">
        <div className="cardContentContainer">
          {content.map((item) => (
            <div key={item.text} className="cardItem">
              <div className="imageWrapper">
                <Image alt={item.altText} className="image" src={item.imageSrc} />
              </div>
              <small className="text">{item.text}</small>
              {item.timeText && <small className="timeText">{item.timeText}</small>}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
