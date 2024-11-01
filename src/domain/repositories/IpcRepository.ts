import { CountryIpcData } from '../entities/country/CountryIpcData';

export interface IpcRepository {
  getIpcData(): Promise<CountryIpcData[]>;
}
