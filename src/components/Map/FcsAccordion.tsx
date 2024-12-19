import { Spacer } from '@nextui-org/react';

import { PopoverInfo } from '@/components/Legend/PopoverInfo';
import descriptions from '@/domain/constant/dataSources/dataSourceDescriptions';
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
            popoverInfo: <PopoverInfo dataSourceKeys={['fcs']} />,
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
            popoverInfo: <PopoverInfo dataSourceKeys={['fcs', 'rCsi']} />,
            content: (
              <div>
                {fcsChartData ? (
                  <LineChart
                    title="Number of people with insufficient food consumption"
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
                    title="Number of people using crisis or above crisis food-based coping"
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
          {
            title: descriptions.importDependency.title,
            infoIcon: <CustomInfoCircle />,
            popoverInfo: <PopoverInfo dataSourceKeys="importDependency" />,
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
            title: descriptions.currencyExchange.title,
            infoIcon: <CustomInfoCircle />,
            popoverInfo: <PopoverInfo dataSourceKeys="currencyExchange" />,
            content: (
              <div>
                {currencyExchangeChartData ? (
                  <LineChart data={currencyExchangeChartData} small noPadding transparentBackground />
                ) : (
                  <p>No data about currency exchange</p>
                )}
              </div>
            ),
          },
          {
            title: descriptions.balanceOfTrade.title,
            infoIcon: <CustomInfoCircle />,
            popoverInfo: <PopoverInfo dataSourceKeys="balanceOfTrade" />,
            content: (
              <div>
                {balanceOfTradeChartData ? (
                  <LineChart data={balanceOfTradeChartData} small noPadding transparentBackground />
                ) : (
                  <p>No data about balance of trade</p>
                )}
              </div>
            ),
          },
          {
            title: 'Headline and food inflation',
            infoIcon: <CustomInfoCircle />,
            popoverInfo: <PopoverInfo dataSourceKeys={['headlineInflation', 'foodInflation']} />,
            content: (
              <div>
                {headlineAndFoodInflationChartData ? (
                  <LineChart data={headlineAndFoodInflationChartData} small noPadding transparentBackground />
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
