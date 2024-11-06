import { FcsChartData } from '../charts/FcsChartData';
import { RcsiChartData } from '../charts/RcsiChartData';
import { CountryNews } from './CountryNews';

export interface CountryData {
  fcs: number;
  fcsMinus1: number;
  fcsMinus3: number;
  importDependency: number;
  population: number;
  populationSource: string;
  rcsiGraph: RcsiChartData[];
  fcsGraph: FcsChartData[];
  news: CountryNews[];
}
