import { RegionFcsChartData } from '../charts/RegionFcsChartData';
import { CommonRegionProperties } from '../common/CommonRegionProperties';
import { Coordinate } from '../common/Coordinate';
import { RegionFcs } from './RegionFcs';
import { RegionRcsi } from './RegionRcs';

export interface RegionProperties extends CommonRegionProperties {
  fcs: RegionFcs | null;
  centroid: Coordinate;
  fcsGraph: RegionFcsChartData[] | null;
  rcsi: RegionRcsi | null;
}
