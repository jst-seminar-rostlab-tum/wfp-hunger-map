import React from 'react';

import CustomCard from '@/components/Cards/Card';
import CustomInfoCircle from '@/components/CustomInfoCircle/CustomInfoCircle';
import IpcFoodSecurityAccordionProps from '@/domain/props/IpcFoodSecurityAccordionProps';
import { FcsAccordionOperations } from '@/operations/map/FcsAccordionOperations';
import { cardsWrapperClass } from '@/utils/primitives';

import { ReactComponent as FoodConsumption } from '../../../../public/Images/FoodConsumption.svg';
import { ReactComponent as Population } from '../../../../public/Images/Population.svg';

export default function IpcFoodSecurityAccordion({
  countryData,
  deltaOneMonth,
  deltaThreeMonth,
}: IpcFoodSecurityAccordionProps) {
  const hasNoData: boolean =
    !countryData || !countryData.population || !countryData.fcs || !deltaOneMonth || !deltaThreeMonth;

  return {
    title: 'Food Security',
    infoIcon: <CustomInfoCircle />,
    popoverInfo: FcsAccordionOperations.getFoodSecutriyPopoverInfo(),
    content: !hasNoData ? (
      <div className={cardsWrapperClass}>
        {/* Population Card */}
        <CustomCard
          title="Population"
          content={[
            {
              svgIcon: <Population className="w-full h-full object-contain" />,
              text: countryData?.population ? `${countryData?.population.toFixed(2)} M` : 'N/A',
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
              value: countryData?.fcs ? `${countryData?.fcs.toFixed(2)} M` : 'N/A',
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
    ) : (
      <p>No data about food security</p>
    ),
  };
}
