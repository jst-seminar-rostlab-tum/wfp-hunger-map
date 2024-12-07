import { FcsChartData } from '../charts/FcsChartData';
import { RcsiChartData } from '../charts/RcsiChartData';

export interface CountryData {
  fcs: number;
  fcsMinus1: number;
  fcsMinus3: number;
  importDependency: number;
  population: number;
  populationSource: string;
  rcsiGraph: RcsiChartData[];
  fcsGraph: FcsChartData[];
}

export type CountryDataRecord = CountryData & { id: string };
