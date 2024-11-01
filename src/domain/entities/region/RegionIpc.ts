import { Geometry } from '../common/Geometry';

export interface RegionIpc {
  type: string;
  features: {
    type: string;
    geometry: Geometry;
    properties: {
      area_id: string;
      areaName: string;
      ipcPhase: number;
      ipcValidity: string;
      ipcDate: string;
    };
  }[];
}
