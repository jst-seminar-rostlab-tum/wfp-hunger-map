import { Spacer } from '@nextui-org/react';

import CustomCard from '@/components/Cards/Card';
import { LineChart } from '@/components/Charts/LineChart';
import CustomInfoCircle from '@/components/CustomInfoCircle/CustomInfoCircle';
import { CountryData } from '@/domain/entities/country/CountryData';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data';
import { cardsWrapperClass } from '@/utils/primitives';

import { ReactComponent as FoodConsumption } from '../../../public/Images/FoodConsumption.svg';
import { ReactComponent as Nutrition } from '../../../public/Images/Nutrition.svg';
import { ReactComponent as Population } from '../../../public/Images/Population.svg';
import { FcsAccordionOperations } from './FcsAccordionOperations';
import NutritionAccordionText from './NutritionAccordionText';

export class FcsFoodSecurityOperations {
  static getFcsFoodSecurityAccordionItems(
    countryData: CountryData | undefined,
    countryIso3Data: CountryIso3Data | undefined
  ) {
    const deltaOneMonth = countryData?.fcsMinus1 ? countryData.fcs - countryData.fcsMinus1 : null;
    const deltaThreeMonth = countryData?.fcsMinus3 ? countryData.fcs - countryData.fcsMinus3 : null;
    const fcsChartData = FcsAccordionOperations.getFcsChartData(countryData);
    const rcsiChartData = FcsAccordionOperations.getRcsiChartData(countryData);
    const nutritionData = FcsAccordionOperations.getNutritionData(countryIso3Data);
    return [
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
                  svgIcon: <FoodConsumption className="w-[50px] h-[50px] object-contain" />,
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
                      imageSrc:
                        deltaThreeMonth && deltaThreeMonth > 0 ? '/Images/ArrowUp.svg' : '/Images/ArrowDown.svg',
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
      },
      {
        title: 'Nutrition',
        infoIcon: <CustomInfoCircle />,
        popoverInfo: FcsAccordionOperations.getFoodSecutriyPopoverInfo(),
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
            <p>No data about Nutrition is available</p>
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
  }
}
