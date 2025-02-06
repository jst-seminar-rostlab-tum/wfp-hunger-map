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
import { useMediaQuery } from '@/utils/resolution.ts';

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
    const isMobile = useMediaQuery('(max-width: 700px)');
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
                  textClass: isMobile ? 'text-base' : 'text-sm',
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
                simplifyTooltip
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
                simplifyTooltip
              />
            ) : (
              <p>No data about food-based coping available</p>
            )}
          </div>
        ),
      },
    ];
  }

  static createMockData(countryData?: CountryData, rising = true): CountryForecastData {
    const mockForecastData: CountryForecastData = {
      fcsGraph: [],
      rcsiGraph: [],
    };
    if (!countryData) return mockForecastData;
    const date = new Date(countryData.fcsGraph[countryData.fcsGraph.length - 1].x);
    let { fcs } = countryData.fcsGraph[countryData.fcsGraph.length - 1];
    let { rcsi } = countryData.rcsiGraph[countryData.rcsiGraph.length - 1];
    for (let i = 0; i < 90; i += 1) {
      const rand = Math.random();
      let newFcs;
      if (rand < 0.3) {
        newFcs = fcs * (rising ? 1.003 : 0.98);
      } else if (rand < 0.6) {
        newFcs = fcs * (rising ? 1.006 : 0.995);
      } else if (rand < 0.8) {
        newFcs = fcs * (rising ? 0.998 : 1.003);
      } else {
        newFcs = fcs * (rising ? 0.995 : 1.006);
      }
      mockForecastData.fcsGraph.push({
        fcs: newFcs,
        fcsHigh: newFcs,
        fcsLow: newFcs,
        x: date.toISOString().split('T')[0],
      });
      fcs = newFcs;

      if (rcsi) {
        const randRcsi = Math.random();
        let newRcsi;
        if (randRcsi < 0.25) {
          newRcsi = rcsi * (rising ? 1.003 : 0.98);
        } else if (randRcsi < 0.5) {
          newRcsi = rcsi * (rising ? 1.006 : 0.995);
        } else if (randRcsi < 0.75) {
          newRcsi = rcsi * (rising ? 0.998 : 1.003);
        } else {
          newRcsi = rcsi * (rising ? 0.995 : 1.006);
        }
        mockForecastData.rcsiGraph.push({
          rcsi: newRcsi,
          rcsiHigh: newRcsi,
          rcsiLow: newRcsi,
          x: date.toISOString().split('T')[0],
        });
        rcsi = newRcsi;
      }

      date.setDate(date.getDate() + 1);
    }
    return mockForecastData;
  }
}
