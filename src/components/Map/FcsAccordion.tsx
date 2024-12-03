import { Spacer } from '@nextui-org/react';

import FcsAccordionProps from '@/domain/props/FcsAccordionProps';
import { FcsAccordionOperations } from '@/operations/map/FcsAccordionOperations';
import { cardsWrapperClass } from '@/utils/primitives';

import { ReactComponent as FoodConsumption } from '../../../public/Images/FoodConsumption.svg';
import { ReactComponent as Import } from '../../../public/Images/Import.svg';
import { ReactComponent as Population } from '../../../public/Images/Population.svg';
import AccordionContainer from '../Accordions/AccordionContainer';
import CustomCard from '../Cards/Card';
import { LineChart } from '../Charts/LineChart';
import CustomInfoCircle from '../CustomInfoCircle/CustomInfoCircle';

export default function FcsAccordion({ countryData, loading, countryIso3Data, countryName }: FcsAccordionProps) {
  const deltaOneMonth = countryData?.fcsMinus1 ? countryData.fcs - countryData.fcsMinus1 : null;
  const deltaThreeMonth = countryData?.fcsMinus3 ? countryData.fcs - countryData.fcsMinus3 : null;
  const fcsChartData = FcsAccordionOperations.getFcsChartData(countryData);
  const rcsiChartData = FcsAccordionOperations.getRcsiChartData(countryData);
  const currencyExchangeChartData = FcsAccordionOperations.getCurrencyExchangeChartData(countryIso3Data);
  const balanceOfTradeChartData = FcsAccordionOperations.getBalanceOfTradeChartData(countryIso3Data);
  const headlineAndFoodInflationChartData =
    FcsAccordionOperations.getHeadlineAndFoodInflationChartData(countryIso3Data);
  return (
    <div className="absolute w-[350px] left-[108px] top-4 z-9999">
      <AccordionContainer
        loading={loading}
        title={countryName ?? undefined}
        accordionModalActive
        maxWidth={600}
        items={[
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
                      svgIcon: <Population className="w-full h-full object-contain" />,
                      text: countryData?.population ? `${countryData.population.toFixed(2)} M` : 'N/A',
                      altText: 'Population Icon',
                    },
                  ]}
                />
                <CustomCard
                  title="People with insufficient food consumption"
                  content={[
                    {
                      svgIcon: <FoodConsumption className="w-full h-full object-contain" />,
                      text: countryData?.fcs ? `${countryData.fcs.toFixed(2)} M` : 'N/A',
                      altText: 'Food Consumption Icon',
                    },
                    {
                      imageSrc: deltaOneMonth && deltaOneMonth > 0 ? '/Images/ArrowUp.svg' : '/Images/ArrowDown.svg',
                      text: deltaOneMonth ? `${deltaOneMonth.toFixed(2)} M` : 'N/A',
                      timeText: '1 Month ago',
                      altText: 'Icon',
                    },
                    {
                      imageSrc:
                        deltaThreeMonth && deltaThreeMonth > 0 ? '/Images/ArrowUp.svg' : '/Images/ArrowDown.svg',
                      text: deltaThreeMonth ? `${deltaThreeMonth.toFixed(2)} M` : 'N/A',
                      timeText: '3 Month ago',
                      altText: 'Other Icon',
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
          {
            title: 'Macro-economic',
            infoIcon: <CustomInfoCircle />,
            popoverInfo: FcsAccordionOperations.getMacroEconomicPopoverInfo(),
            content: (
              <div className={cardsWrapperClass}>
                <CustomCard
                  title="Import Dependency"
                  content={[
                    {
                      svgIcon: <Import className="w-full h-full object-contain" />,
                      text: countryData?.importDependency
                        ? `${countryData.importDependency.toFixed(1)}% of Cereals`
                        : 'N/A',
                      altText: 'Import Dependency Icon',
                    },
                  ]}
                />
              </div>
            ),
          },
          {
            title: 'Currency Exchange',
            infoIcon: <CustomInfoCircle />,
            popoverInfo: FcsAccordionOperations.getCurrencyExchangePopoverInfo(),
            content: (
              <div>
                {currencyExchangeChartData ? (
                  <LineChart
                    data={currencyExchangeChartData}
                    expandable
                    xAxisSlider
                    small
                    noPadding
                    transparentBackground
                  />
                ) : (
                  <p>No data about currency exchange</p>
                )}
              </div>
            ),
          },
          {
            title: 'Balance of Trade',
            infoIcon: <CustomInfoCircle />,
            popoverInfo: FcsAccordionOperations.getBalanceOfTradePopoverInfo(),
            content: (
              <div>
                {balanceOfTradeChartData ? (
                  <LineChart
                    data={balanceOfTradeChartData}
                    expandable
                    xAxisSlider
                    small
                    noPadding
                    transparentBackground
                  />
                ) : (
                  <p>No data about balance of trade</p>
                )}
              </div>
            ),
          },
          {
            title: 'Headline and food inflation',
            infoIcon: <CustomInfoCircle />,
            popoverInfo: FcsAccordionOperations.getHeadlineAndFoodInflationPopoverInfo(),
            content: (
              <div>
                {headlineAndFoodInflationChartData ? (
                  <LineChart
                    data={headlineAndFoodInflationChartData}
                    expandable
                    xAxisSlider
                    barChartSwitch
                    small
                    noPadding
                    transparentBackground
                  />
                ) : (
                  <p>No data about headline and food inflation</p>
                )}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
