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
import NutritionAccordionText from './NutritionAccordionText';

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
          {/* Food Consumption Card */}
          <CustomCard
            content={[
              {
                svgIcon: <FoodConsumption className="w-[50px] h-[50px] object-contain" />,
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
    const nutritionData = FcsAccordionOperations.getNutritionData(countryIso3Data);

    return {
      title: 'Nutrition',
      infoIcon: <CustomInfoCircle />,
      content:
        nutritionData && (nutritionData.Acute != null || nutritionData.Chronic != null) ? (
          <div className={cardsWrapperClass}>
            {nutritionData.Acute != null && (
              <CustomCard
                title="Acute Nutrition"
                content={[
                  {
                    svgIcon: <Nutrition className="w-[50px] h-[50px] object-contain" />,
                    text: (
                      <NutritionAccordionText
                        nutritionValue={`${nutritionData.Acute} %`}
                        text="of children (under 5)"
                      />
                    ),
                  },
                ]}
              />
            )}
            {nutritionData.Chronic != null && (
              <CustomCard
                title="Chronic Nutrition"
                content={[
                  {
                    svgIcon: <Nutrition className="w-[50px] h-[50px] object-contain" />,
                    text: (
                      <NutritionAccordionText
                        nutritionValue={`${nutritionData.Chronic} %`}
                        text="of children (under 5)"
                      />
                    ),
                  },
                ]}
              />
            )}
          </div>
        ) : (
          <p>No data about Nutrition is available</p>
        ),
    };
  },
};
