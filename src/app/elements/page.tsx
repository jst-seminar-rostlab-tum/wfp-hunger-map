import React from 'react';

import Accordions from '@/components/Accordions/Accordion';
import Cards from '@/components/Cards/Card';
/* import { Chart } from '@/components/Charts/Chart'; */
import { cardsWrapperClass } from '@/utils/primitives';

/**
 * You can use this page to try and show off your components.
 * It's not accessible from the UI, but you can reach it by manually navigating to /elements
 */

const accordionData = [
  {
    title: 'Food Security',
    iconSrc: '/Images/InfoIcon.svg',
    content: (
      <div className={cardsWrapperClass}>
        <Cards
          title="Population"
          content={[{ imageSrc: '/Images/Population.svg', text: '4.4 Mio', altText: 'Population Icon' }]}
        />
        <Cards
          title="Population with Food Consumption"
          content={[
            { imageSrc: '/Images/FoodConsumption.svg', text: '11.2 Mio', altText: 'Population Icon' },
            { imageSrc: '/Images/ArrowRed.svg', text: '+ 0.19 Mio', timeText: '3 Months ago', altText: 'Icon' },
            { imageSrc: '/Images/ArrowGreen.svg', text: '- 2.5 Mio ', timeText: 'A Month ago', altText: 'Other Icon' },
          ]}
        />
      </div>
    ),
  },
  {
    title: 'Nutrition',
    iconSrc: '/Images/InfoIcon.svg',
    content: (
      <div className={cardsWrapperClass}>
        <Cards
          title="Acute Nutrition"
          content={[{ imageSrc: '/Images/Acute.svg', text: '28.0% of Cereals', altText: ' Icon' }]}
        />
        <Cards
          title="Chronic Nutrition"
          content={[{ imageSrc: '/Images/Chronic.svg', text: '28.0% of Cereals', altText: ' Icon' }]}
        />
        </div>
    ),
  },
  {
    title: 'Macroeconomic',
    iconSrc: '/Images/InfoIcon.svg',
    content: (
      <div className={cardsWrapperClass}>
        <Cards
          title="Import Dependency"
          content={[{ imageSrc: '/Images/Import.svg', text: '28.0% of Cereals', altText: ' Icon' }]}
        />
      </div>
    ),
  },
];
export default function Elements() {
  // return <Chart />;
  return <Accordions items={accordionData} />;
}
