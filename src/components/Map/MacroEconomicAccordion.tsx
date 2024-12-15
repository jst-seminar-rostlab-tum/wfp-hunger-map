import FcsAccordionProps from '@/domain/props/FcsAccordionProps';
import { FcsAccordionOperations } from '@/operations/map/FcsAccordionOperations';
import { cardsWrapperClass } from '@/utils/primitives';

import { ReactComponent as Import } from '../../../public/Images/Import.svg';
import CustomCard from '../Cards/Card';
import { LineChart } from '../Charts/LineChart';
import CustomInfoCircle from '../CustomInfoCircle/CustomInfoCircle';

export default function MacroEconomicAccordion({ countryData, countryIso3Data }: FcsAccordionProps) {
  const currencyExchangeChartData = FcsAccordionOperations.getCurrencyExchangeChartData(countryIso3Data);
  const balanceOfTradeChartData = FcsAccordionOperations.getBalanceOfTradeChartData(countryIso3Data);
  const headlineAndFoodInflationChartData =
    FcsAccordionOperations.getHeadlineAndFoodInflationChartData(countryIso3Data);

  const macroEconomicAccordion = [
    {
      title: 'Macroeconomic',
      infoIcon: <CustomInfoCircle />,
      popoverInfo: FcsAccordionOperations.getMacroEconomicPopoverInfo(),
      content: (
        <div className={cardsWrapperClass}>
          <CustomCard
            title="Import Dependency"
            content={[
              {
                svgIcon: <Import />,
                text: countryData?.importDependency ? `${countryData.importDependency.toFixed(1)}% of Cereals` : 'N/A',
                altText: 'Import Dependency Icon',
                textClass: 'text-base',
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
            <LineChart data={currencyExchangeChartData} expandable xAxisSlider small noPadding transparentBackground />
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
            <LineChart data={balanceOfTradeChartData} expandable xAxisSlider small noPadding transparentBackground />
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
  ];

  return macroEconomicAccordion;
}
