import { Geometry } from './common/Geometry';

export interface DisputedAreas {
  type: string;
  features: {
    type: string;
    geometry: Geometry;
    properties: {
      Code: number;
      CodeISO3166_1A2: unknown;
      CodeISO3166_1A3: string;
      DataSource: string;
      DisputedArea: boolean;
      CreateDate: string;
      Name: string;
    };
  }[];
}
