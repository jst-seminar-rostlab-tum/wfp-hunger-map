import { RegionFcsChartData } from '../charts/RegionFcsChartData';
import { CommonRegionProperties } from '../common/CommonRegionProperties';
import { Coordinate } from '../common/Coordinate';
import { RegionFcs } from './RegionFcs';
import { RegionRcsi } from './RegionRcs';

export interface RegionProperties extends CommonRegionProperties {
  fcs: RegionFcs;
  centroid: Coordinate;
  fcsGraph: RegionFcsChartData[]; // seems to be unsused in current implementation, but this is the biggest chunk of the data
  rcsi: RegionRcsi; // also not shown
}
