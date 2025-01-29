import CustomCard from '@/components/Cards/Card';
import { ContinuousChart } from '@/components/Charts/ContinuousChart';
import CustomInfoCircle from '@/components/CustomInfoCircle/CustomInfoCircle';
import { DataSourcePopover } from '@/components/Legend/DataSourcePopover';
import descriptions from '@/domain/constant/dataSources/dataSourceDescriptions';
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
        title: descriptions.importDependency.title,
        infoIcon: <CustomInfoCircle />,
        popoverInfo: <DataSourcePopover dataSourceKeys="importDependency" />,
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
        title: descriptions.currencyExchange.title,
        infoIcon: <CustomInfoCircle />,
        popoverInfo: <DataSourcePopover dataSourceKeys="currencyExchange" />,
        content: (
          <div>
            {currencyExchangeChartData ? (
              <ContinuousChart data={currencyExchangeChartData} small noPadding transparentBackground />
            ) : (
              <p>No data about currency exchange available</p>
            )}
          </div>
        ),
      },
      {
        title: descriptions.balanceOfTrade.title,
        infoIcon: <CustomInfoCircle />,
        popoverInfo: <DataSourcePopover dataSourceKeys="balanceOfTrade" />,
        content: (
          <div>
            {balanceOfTradeChartData ? (
              <ContinuousChart data={balanceOfTradeChartData} small noPadding transparentBackground simplifyTooltip />
            ) : (
              <p>No data about balance of trade available</p>
            )}
          </div>
        ),
      },
      {
        title: 'Headline and Food Inflation',
        infoIcon: <CustomInfoCircle />,
        popoverInfo: <DataSourcePopover dataSourceKeys={['headlineInflation', 'foodInflation']} />,
        content: (
          <div>
            {headlineAndFoodInflationChartData ? (
              <ContinuousChart
                data={headlineAndFoodInflationChartData}
                small
                noPadding
                transparentBackground
                simplifyTooltip
              />
            ) : (
              <p>No data about headline and food inflation available</p>
            )}
          </div>
        ),
      },
    ];
  }
}
