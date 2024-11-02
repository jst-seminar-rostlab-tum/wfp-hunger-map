export interface Hazard {
  Id: number;
  type: string;
  severity_id: string;
  hazard_name: string;
  latitude: number;
  longitude: number;
  create_date: string;
  last_update: string;
}
