import React from 'react';

import CustomCard from '@/components/Cards/Card';
import CustomInfoCircle from '@/components/CustomInfoCircle/CustomInfoCircle';
import { CountryData } from '@/domain/entities/country/CountryData';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data';
import { cardsWrapperClass } from '@/utils/primitives';

import { ReactComponent as FoodConsumption } from '../../../public/Images/FoodConsumption.svg';
import { ReactComponent as Nutrition } from '../../../public/Images/Nutrition.svg';
import { ReactComponent as Population } from '../../../public/Images/Population.svg';
import { FcsAccordionOperations } from './FcsAccordionOperations';

export const IpcFoodSecurityAccordionOperations = {
  getFoodSecurityAccordionItems: (
    countryData: CountryData | undefined,
    deltaOneMonth: number | null,
    deltaThreeMonth: number | null
  ) => {
    const hasNoData: boolean =
      !countryData || !countryData.population || !countryData.fcs || !deltaOneMonth || !deltaThreeMonth;

    return {
      title: 'Food Security',
      infoIcon: <CustomInfoCircle />,
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
          {/* Food Consumption Card */}
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
                    timeText: '3 Months ago',
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
  },
  getNutritionAccordion: (countryIso3Data: CountryIso3Data | undefined) => {
    return {
      title: 'Nutrition',
      infoIcon: <CustomInfoCircle />,
      content: (
        <div className={cardsWrapperClass}>
          {/* Acute Nutrition Card */}
          <CustomCard
            title="Acute Nutrition"
            content={[
              {
                svgIcon: <Nutrition />,
                text: FcsAccordionOperations.getNutritionData(countryIso3Data)?.Acute ? (
                  <>
                    <span className="text-xl">{`${FcsAccordionOperations.getNutritionData(countryIso3Data)?.Acute} %`}</span>
                    <span className="text-sm text-gray-400 ml-1">of children (under 5)</span>
                  </>
                ) : (
                  'N/A'
                ),
                altText: 'Acute Nutrition Icon',
                textClass: 'text-base',
              },
            ]}
          />
          {/* Chronic Nutrition Card */}
          <CustomCard
            title="Chronic Nutrition"
            content={[
              {
                svgIcon: <Nutrition className="w-[70px] h-[60px] object-contain" />,
                text: FcsAccordionOperations.getNutritionData(countryIso3Data)?.Chronic ? (
                  <>
                    <span className="text-xl">{`${FcsAccordionOperations.getNutritionData(countryIso3Data)?.Chronic} %`}</span>
                    <span className="text-sm text-gray-400 ml-1">of children (under 5)</span>
                  </>
                ) : (
                  'N/A'
                ),
                altText: 'Chronic Nutrition Icon',
                textClass: 'text-base',
              },
            ]}
          />
        </div>
      ),
    };
  },
};
