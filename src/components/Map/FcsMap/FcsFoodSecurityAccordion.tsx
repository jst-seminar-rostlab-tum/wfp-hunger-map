import { Spacer } from '@nextui-org/react';

import FcsAccordionProps from '@/domain/props/FcsAccordionProps';
import { FcsAccordionOperations } from '@/operations/map/FcsAccordionOperations';
import { cardsWrapperClass } from '@/utils/primitives';

import { ReactComponent as FoodConsumption } from '../../../../public/Images/FoodConsumption.svg';
import { ReactComponent as Population } from '../../../../public/Images/Population.svg';
import CustomCard from '../../Cards/Card';
import { LineChart } from '../../Charts/LineChart';
import CustomInfoCircle from '../../CustomInfoCircle/CustomInfoCircle';

export default function FoodSecurityAccordion({ countryData }: FcsAccordionProps) {
  const deltaOneMonth = countryData?.fcsMinus1 ? countryData.fcs - countryData.fcsMinus1 : null;
  const deltaThreeMonth = countryData?.fcsMinus3 ? countryData.fcs - countryData.fcsMinus3 : null;
  const fcsChartData = FcsAccordionOperations.getFcsChartData(countryData);
  const rcsiChartData = FcsAccordionOperations.getRcsiChartData(countryData);

  const FcsFoodSecurityAccordion = [
    {
      title: 'Food Security',
      infoIcon: <CustomInfoCircle />,
      popoverInfo: FcsAccordionOperations.getFoodSecutriyPopoverInfo(),
      content: (
        <div className={cardsWrapperClass}>
          <CustomCard
            title="Population"
            content={[
              {
                svgIcon: <Population />,
                text: countryData?.population ? `${countryData.population.toFixed(2)} M` : 'N/A',
                altText: 'Population Icon',
                textClass: 'text-base',
              },
            ]}
          />
          <CustomCard
            content={[
              {
                svgIcon: <FoodConsumption className="w-[70px] h-[70px] object-contain" />,
                text: 'Population with insufficient food consumption',
                value: countryData?.fcs ? `${countryData.fcs.toFixed(2)} M` : 'N/A',
                textClass: 'text-xs',
                changeValues: [
                  {
                    imageSrc: deltaOneMonth && deltaOneMonth > 0 ? '/Images/ArrowUp.svg' : '/Images/ArrowDown.svg',
                    text: deltaOneMonth ? `${deltaOneMonth.toFixed(2)} M` : 'N/A',
                    timeText: '1 Month ago',
                    altText: 'Delta Icon',
                  },
                  {
                    imageSrc: deltaThreeMonth && deltaThreeMonth > 0 ? '/Images/ArrowUp.svg' : '/Images/ArrowDown.svg',
                    text: deltaThreeMonth ? `${deltaThreeMonth.toFixed(2)} M` : 'N/A',
                    timeText: '3 Month ago',
                    altText: 'Delta Icon',
                  },
                ],
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: 'Food Security Trends',
      infoIcon: <CustomInfoCircle />,
      popoverInfo: FcsAccordionOperations.getFoodSecutriyTrendsPopoverInfo(),
      content: (
        <div>
          {fcsChartData ? (
            <LineChart
              title="Trend of the number of people with insufficient food consumption"
              data={fcsChartData}
              expandable
              xAxisSlider
              small
              noPadding
              transparentBackground
            />
          ) : (
            <p>No data about insufficient food consumption</p>
          )}
          <Spacer y={6} />
          {rcsiChartData ? (
            <LineChart
              title="Trend of the number of people using crisis or above crisis food-based coping"
              data={rcsiChartData}
              expandable
              xAxisSlider
              small
              noPadding
              transparentBackground
            />
          ) : (
            <p>No data about crisis or above crisis food-based coping</p>
          )}
        </div>
      ),
    },
  ];

  return FcsFoodSecurityAccordion;
}
