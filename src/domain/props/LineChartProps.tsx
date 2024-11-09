import { BalanceOfTradeGraph } from '@/domain/entities/charts/BalanceOfTradeGraph.ts';
import { CurrencyExchangeGraph } from '@/domain/entities/charts/CurrencyExchangeGraph.ts';
import { FcsChartData } from '@/domain/entities/charts/FcsChartData.ts';
import { InflationGraphs } from '@/domain/entities/charts/InflationGraphs.ts';
import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';
import { RcsiChartData } from '@/domain/entities/charts/RcsiChartData.ts';
import { RegionFcsChartData } from '@/domain/entities/charts/RegionFcsChartData.ts';

export default interface LineChartProps {
  title?: string;
  description?: string;
  expandable?: boolean;
  data:
    | LineChartData
    | BalanceOfTradeGraph
    | CurrencyExchangeGraph
    | InflationGraphs
    | FcsChartData
    | RcsiChartData
    | RegionFcsChartData;
}
