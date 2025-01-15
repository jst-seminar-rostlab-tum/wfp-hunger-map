import React from 'react';

import CustomCard from '@/components/Cards/Card';
import CustomInfoCircle from '@/components/CustomInfoCircle/CustomInfoCircle';
import { DataSourcePopover } from '@/components/Legend/DataSourcePopover';
import descriptions from '@/domain/constant/dataSources/dataSourceDescriptions';
import { CountryData } from '@/domain/entities/country/CountryData';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data';
import { cardsWrapperClass } from '@/utils/primitives';

import { ReactComponent as FoodConsumption } from '../../../public/Images/FoodConsumption.svg';
import { ReactComponent as Nutrition } from '../../../public/Images/Nutrition.svg';
import { ReactComponent as Population } from '../../../public/Images/Population.svg';
import { FcsAccordionOperations } from './FcsAccordionOperations';
import NutritionAccordionText from './NutritionAccordionText';

export class IpcFoodSecurityAccordionOperations {
  /**
   * Generates the content for the food security accordion based on the provided country data and delta values.
   *
   * @param {CountryData | undefined} countryData - The data for the selected country, which includes food security information.
   * @param {number | null} deltaOneMonth - The change in food security over the last month.
   * @param {number | null} deltaThreeMonth - The change in food security over the last three months.
   * @returns {AccordionItemProps} An array of accordion items.
   */
  static getFoodSecurityAccordionItems(
    countryData: CountryData | undefined,
    deltaOneMonth: number | null,
    deltaThreeMonth: number | null
  ) {
    const hasData =
      countryData && countryData.population && countryData.fcs && deltaOneMonth !== null && deltaThreeMonth !== null;

    return {
      title: 'Food Security',
      infoIcon: <CustomInfoCircle />,
      popoverInfo: <DataSourcePopover dataSourceKeys={['population', 'fcs']} />,
      content: hasData ? (
        <div className={cardsWrapperClass}>
          {/* A card with the population of the country */}
          <CustomCard
            title={descriptions.population.title}
            content={[
              {
                svgIcon: <Population className="w-full h-full object-contain" />,
                text: countryData.population ? `${countryData.population.toFixed(2)} M` : 'N/A',
                altText: 'Population Icon',
                textClass: 'text-base',
              },
            ]}
          />
          {/* A card with the food security data */}
          <CustomCard
            content={[
              {
                svgIcon: <FoodConsumption className="w-[50px] h-[50px] object-contain" />,
                text: descriptions.fcs.legendTitle,
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
      ) : (
        <p>No data about food security available</p>
      ),
    };
  }

  /**
   * Returns an array of accordion items containing nutrition data for a given country.
   * @param {CountryIso3Data | undefined} countryIso3Data - The country data.
   * @returns {AccordionItemProps} An array of accordion items.
   */
  static getNutritionAccordionItems(countryIso3Data: CountryIso3Data | undefined) {
    const nutritionData = FcsAccordionOperations.getNutritionData(countryIso3Data);
    const hasData = nutritionData && !(nutritionData.Acute == null && nutritionData.Chronic == null);

    return {
      title: 'Malnutrition',
      infoIcon: <CustomInfoCircle />,
      popoverInfo: <DataSourcePopover dataSourceKeys={['malnutritionChronic', 'malnutritionAcute']} />,
      content: hasData ? (
        <div className={cardsWrapperClass}>
          {nutritionData.Acute != null && (
            <CustomCard
              title={descriptions.malnutritionAcute.legendTitle}
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
              title={descriptions.malnutritionAcute.legendTitle}
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
      ) : (
        <p>No data about malnutrition available</p>
      ),
    };
  }
}
