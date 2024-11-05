import { Feature } from './common/Feature';

export interface DisputedAreas {
  type: string;
  features: Feature<{
    Code: number;
    CodeISO3166_1A2: unknown;
    CodeISO3166_1A3: string;
    DataSource: string;
    DisputedArea: boolean;
    CreateDate: string;
    Name: string;
  }>[];
}
