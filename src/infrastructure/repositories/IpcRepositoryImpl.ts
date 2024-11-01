import { CountryIpcData, IpcDataWrapper } from '@/domain/entities/country/CountryIpcData';
import { IpcRepository } from '@/domain/repositories/IpcRepository';

export default class IpcRepositoryImpl implements IpcRepository {
  async getIpcData(): Promise<CountryIpcData[]> {
    const response = await fetch(`https://api.hungermapdata.org/v2/ipc.json`);
    const data: IpcDataWrapper = await response.json();
    return data.body;
  }
}
