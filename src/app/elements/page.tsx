import React from 'react';

import Accordions from '@/components/Accordions/Accordion';
import Cards from '@/components/Cards/Card';
/* import { Chart } from '@/components/Charts/Chart'; */

/**
 * You can use this page to try and show off your components.
 * It's not accessible from the UI, but you can reach it by manually navigating to /elements
 */
const accordionData = [
  {
    title: 'Food Security',
    iconSrc: '/Images/image.svg',
    content: (
      <div className=" cards-wrapper flex flex-row gap-4 justify-center">
        <Cards
          title="Population"
          content={[{ imageSrc: '/Images/Vector.svg', text: '4.4 Mio', altText: 'Population Icon' }]}
        />
        <Cards
          title="Population with Food Consumption"
          content={[
            { imageSrc: '/Images/Vector2.svg', text: '11.2 Mio', altText: 'Population Icon' },
            { imageSrc: '/Images/Arrow5.svg', text: '+ 0.19 Mio', timeText: '3 Months ago', altText: 'Icon' },
            { imageSrc: '/Images/Arrow6.svg', text: '- 2.5 Mio ', timeText: 'A Month ago', altText: 'Other Icon' },
          ]}
        />
      </div>
    ),
  },
  {
    title: 'Nutrition',
    iconSrc: '/Images/image.svg',
    content: (
      <div className=" cards-wrapper flex flex-row gap-4 justify-center">
        <Cards
          title="Acute Nutrition"
          content={[{ imageSrc: '/Images/Group2.svg', text: '28.0% of Cereals', altText: ' Icon' }]}
        />
        <Cards
          title="Chronic Nutrition"
          content={[{ imageSrc: '/Images/Group3.svg', text: '28.0% of Cereals', altText: ' Icon' }]}
        />
      </div>
    ),
  },
  {
    title: 'Macroeconomic',
    iconSrc: '/Images/image.svg',
    content: (
      <div className="cards-wrapper flex flex-row gap-4 justify-center">
        <Cards
          title="Import Dependency"
          content={[{ imageSrc: '/Images/Group.svg', text: '28.0% of Cereals', altText: ' Icon' }]}
        />
      </div>
    ),
  },
];
export default function Elements() {
  // return <Chart />;
  return <Accordions items={accordionData} />;
}
