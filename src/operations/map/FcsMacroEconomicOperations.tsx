import CustomCard from '@/components/Cards/Card';
import { LineChart } from '@/components/Charts/LineChart';
import CustomInfoCircle from '@/components/CustomInfoCircle/CustomInfoCircle';
import { CountryData } from '@/domain/entities/country/CountryData';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data';
import { cardsWrapperClass } from '@/utils/primitives';

import { ReactComponent as Import } from '../../../public/Images/Import.svg';
import { FcsAccordionOperations } from './FcsAccordionOperations';

export class FcsMacroEconomicOperations {
  static getMacroEconomicAccordionItems(
    countryData: CountryData | undefined,
    countryIso3Data: CountryIso3Data | undefined
  ) {
    const currencyExchangeChartData = FcsAccordionOperations.getCurrencyExchangeChartData(countryIso3Data);
    const balanceOfTradeChartData = FcsAccordionOperations.getBalanceOfTradeChartData(countryIso3Data);
    const headlineAndFoodInflationChartData =
      FcsAccordionOperations.getHeadlineAndFoodInflationChartData(countryIso3Data);

    return [
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
                  text: countryData?.importDependency
                    ? `${countryData.importDependency.toFixed(1)}% of Cereals`
                    : 'N/A',
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
              <LineChart data={currencyExchangeChartData} small noPadding transparentBackground />
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
        popoverInfo: FcsAccordionOperations.getHeadlineAndFoodInflationPopoverInfo(),
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
    ];
  }
}
