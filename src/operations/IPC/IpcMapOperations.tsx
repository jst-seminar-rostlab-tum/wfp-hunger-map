import { CountryIpcData } from '@/domain/entities/country/CountryIpcData';
import { CountryMapData, CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';

export class IPCMapOperations {
  static fillIpcMap = (ipcPopulation: number | null): string => {
    if (ipcPopulation === null) return 'none';
    if (ipcPopulation < 0.1) return '#F6D1C1';
    if (ipcPopulation < 0.5) return '#FC9B7D';
    if (ipcPopulation < 1.0) return '#FB7453';
    if (ipcPopulation < 3.0) return '#F24634';
    if (ipcPopulation < 5.0) return '#D11F26';
    if (ipcPopulation < 10) return '#AE151B';
    return '#710013';
  };

  static generateColorMap = (ipcData: CountryIpcData[], mapData: CountryMapDataWrapper) => {
    const ipcDataById: Record<string, CountryIpcData> = {};
    ipcData.forEach((d) => {
      ipcDataById[d.adm0_code] = d;
    });
    const colorMap: Record<string, string> = {};
    mapData.features.forEach((feature: CountryMapData) => {
      const ipcDataForFeature = ipcDataById[feature.properties.adm0_id];

      if (ipcDataForFeature) {
        const countryName = feature.properties.adm0_name;
        const { ipcPopulation } = feature.properties;

        colorMap[countryName] = IPCMapOperations.fillIpcMap(ipcPopulation!);
      }
    });

    return colorMap;
  };

  static findIpcData = (countryName: string, ipcData: CountryIpcData[]): CountryIpcData => {
    return ipcData.find((currentCountry: CountryIpcData) => currentCountry.adm0_name === countryName)!;
  };
}
