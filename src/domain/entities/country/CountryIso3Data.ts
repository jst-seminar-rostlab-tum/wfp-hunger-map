import { BalanceOfTradeGraph } from '../charts/BalanceOfTradeGraph';
import { CurrencyExchangeGraph } from '../charts/CurrencyExchangeGraph';
import { InflationGraphs } from '../charts/InflationGraphs';

/**
 * Seems to be empty for every country :/
 */
interface Nutrition {
  wasting: null;
  stunting: null;
  source: string;
}

export interface CountryIso3Data {
  nutrition: Nutrition;
  currencyExchangeGraph: CurrencyExchangeGraph;
  balanceOfTradeGraph: BalanceOfTradeGraph;
  inflationGraphs: InflationGraphs;
}

export type CountryIso3DataRecord = CountryIso3Data & { id: string };
