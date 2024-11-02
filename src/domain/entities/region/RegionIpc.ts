import { Feature } from '../common/Feature';

export interface RegionIpc {
  type: string;
  features: Feature<{
    area_id: string;
    areaName: string;
    ipcPhase: number;
    ipcValidity: string;
    ipcDate: string;
  }>[];
}
