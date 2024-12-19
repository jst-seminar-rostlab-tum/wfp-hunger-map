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

export class IpcFoodSecurityAccordionOperations {
  static getFoodSecurityAccordionItems(
    countryData: CountryData | undefined,
    deltaOneMonth: number | null,
    deltaThreeMonth: number | null
  ) {
    const hasNoData =
      !countryData || !countryData.population || !countryData.fcs || deltaOneMonth === null || deltaThreeMonth === null;

    if (hasNoData) {
      return {
        title: 'Food Security',
        infoIcon: <CustomInfoCircle />,
        popoverInfo: FcsAccordionOperations.getFoodSecutriyPopoverInfo(),
        content: <p>No data about food security</p>,
      };
    }

    return {
      title: 'Food Security',
      infoIcon: <CustomInfoCircle />,
      popoverInfo: FcsAccordionOperations.getFoodSecutriyPopoverInfo(),
      content: (
        <div className={cardsWrapperClass}>
          <CustomCard
            title="Population"
            content={[
              {
                svgIcon: <Population className="w-full h-full object-contain" />,
                text: countryData.population ? `${countryData.population.toFixed(2)} M` : 'N/A',
                altText: 'Population Icon',
                textClass: 'text-base',
              },
            ]}
          />
          <CustomCard
            content={[
              {
                svgIcon: <FoodConsumption className="w-[50px] h-[50px] object-contain" />,
                text: 'Population with insufficient food consumption',
                value: countryData.fcs ? `${countryData.fcs.toFixed(2)} M` : 'N/A',
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
      ),
    };
  }

  static getNutritionAccordionItems(countryIso3Data: CountryIso3Data | undefined) {
    const nutritionData = FcsAccordionOperations.getNutritionData(countryIso3Data);

    if (!nutritionData || (nutritionData.Acute == null && nutritionData.Chronic == null)) {
      return {
        title: 'Nutrition',
        infoIcon: <CustomInfoCircle />,
        content: <p>No data about Nutrition is available</p>,
      };
    }

    return {
      title: 'Nutrition',
      infoIcon: <CustomInfoCircle />,
      content: (
        <div className={cardsWrapperClass}>
          {nutritionData.Acute != null && (
            <CustomCard
              title="Acute Nutrition"
              content={[
                {
                  svgIcon: <Nutrition className="w-[50px] h-[50px] object-contain" />,
                  text: (
                    <NutritionAccordionText nutritionValue={`${nutritionData.Acute} %`} text="of children (under 5)" />
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
                  svgIcon: <Nutrition className="w-[40px] h-[40px] object-contain" />,
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
      ),
    };
  }
}
