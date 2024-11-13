import { CountryIpcData } from '@/domain/entities/country/CountryIpcData';

export class IPCMapOperations {
  static fillIpc = (ipcPopulation: number | null): string => {
    if (ipcPopulation === null) return 'none';
    if (ipcPopulation < 0.1) return '#F6D1C1';
    if (ipcPopulation < 0.5) return '#FC9B7D';
    if (ipcPopulation < 1.0) return '#FB7453';
    if (ipcPopulation < 3.0) return '#F24634';
    if (ipcPopulation < 5.0) return '#D11F26';
    if (ipcPopulation < 10) return '#AE151B';
    return '#710013';
  };

  static generateColorMap = (ipcData: CountryIpcData[]) => {
    // TODO must be modified it does not depend on phase_4_plus_percent it depend on ipcPopulation which found in countries
    const colorMap: Record<string, string> = {};
    ipcData.forEach((data) => {
      const countryName = data.adm0_name;
      const ipcPopulation = data.phase_4_plus_percent;
      colorMap[countryName] = IPCMapOperations.fillIpc(ipcPopulation);
    });
    return colorMap;
  };
}
