import { HazardSeverity } from '@/domain/enums/HazardSeverity';
import { HazardType } from '@/domain/enums/HazardType';

export interface Hazard {
  Id: number;
  type: HazardType;
  severity_id: HazardSeverity;
  hazard_name: string;
  latitude: number;
  longitude: number;
  create_date: string;
  last_update: string;
}
