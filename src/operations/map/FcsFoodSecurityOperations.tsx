import { Spacer } from '@nextui-org/react';

import CustomCard from '@/components/Cards/Card';
import { ContinuousChart } from '@/components/Charts/ContinuousChart';
import CustomInfoCircle from '@/components/CustomInfoCircle/CustomInfoCircle';
import { DataSourcePopover } from '@/components/Legend/DataSourcePopover';
import descriptions from '@/domain/constant/dataSources/dataSourceDescriptions';
import { CountryData } from '@/domain/entities/country/CountryData';
import { CountryForecastData } from '@/domain/entities/country/CountryForecastData';
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
    countryForecastData: CountryForecastData | undefined,
    countryIso3Data: CountryIso3Data | undefined
  ) {
    const deltaOneMonth = countryData?.fcsMinus1 ? countryData.fcs - countryData.fcsMinus1 : null;
    const deltaThreeMonth = countryData?.fcsMinus3 ? countryData.fcs - countryData.fcsMinus3 : null;
    const fcsChartData = FcsAccordionOperations.getFcsChartData(countryData, countryForecastData);
    const rcsiChartData = FcsAccordionOperations.getRcsiChartData(countryData, countryForecastData);
    const nutritionData = FcsAccordionOperations.getNutritionData(countryIso3Data);
    return [
      {
        title: 'Current Food Security',
        infoIcon: <CustomInfoCircle />,
        popoverInfo: <DataSourcePopover dataSourceKeys={['population', 'fcs']} />,
        content: (
          <div className={cardsWrapperClass}>
            <CustomCard
              title={descriptions.population.title}
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
                  text: descriptions.fcs.legendTitle,
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
        title: 'Malnutrition',
        infoIcon: <CustomInfoCircle />,
        popoverInfo: <DataSourcePopover dataSourceKeys={['malnutritionAcute', 'malnutritionChronic']} />,
        content:
          nutritionData && (nutritionData.Acute != null || nutritionData.Chronic != null) ? (
            <div className={cardsWrapperClass}>
              {nutritionData.Acute != null && (
                <CustomCard
                  title={descriptions.malnutritionAcute.legendTitle}
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
                  title={descriptions.malnutritionChronic.legendTitle}
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
      },
      {
        title: 'Food Security Trends',
        infoIcon: <CustomInfoCircle />,
        popoverInfo: <DataSourcePopover dataSourceKeys={['fcs', 'rCsi']} />,
        content: (
          <div>
            {fcsChartData ? (
              <ContinuousChart
                title={descriptions.fcs.title}
                data={fcsChartData}
                small
                noPadding
                transparentBackground
              />
            ) : (
              <p>No data about food consumption available</p>
            )}
            <Spacer y={6} />
            {rcsiChartData ? (
              <ContinuousChart
                title={descriptions.rCsi.title}
                data={rcsiChartData}
                small
                noPadding
                transparentBackground
              />
            ) : (
              <p>No data about food-based coping available</p>
            )}
          </div>
        ),
      },
    ];
  }
}
