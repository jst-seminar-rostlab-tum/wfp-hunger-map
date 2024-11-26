import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';
import { createRoot } from 'react-dom/client';

import CountryHoverPopover from '@/components/CountryHoverPopover/CountryHoverPopover';
import container from '@/container';
import { CountryData } from '@/domain/entities/country/CountryData';
import { CountryIpcData } from '@/domain/entities/country/CountryIpcData';
import { CountryMapData, CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';
import CountryRepository from '@/domain/repositories/CountryRepository';

export class IpcChoroplethOperations {
  static ipcGlobalStyle = (feature: Feature<Geometry, GeoJsonProperties> | undefined) => ({
    color: '#000',
    weight: 0.5,
    fillOpacity: 1,
    fillColor: IpcChoroplethOperations.fillGlobalIpc(feature?.properties?.ipcPopulation),
  });

  static fillGlobalIpc = (ipcPopulation: number | null) => {
    if (ipcPopulation === null) return 'none';
    if (ipcPopulation < 0.1) return '#F6D1C1';
    if (ipcPopulation < 0.5) return '#FC9B7D';
    if (ipcPopulation < 1.0) return '#FB7453';
    if (ipcPopulation < 3.0) return '#F24634';
    if (ipcPopulation < 5.0) return '#D11F26';
    if (ipcPopulation < 10) return '#AE151B';
    return '#710013';
  };

  static ipcCountryStyle = (feature: Feature<Geometry, GeoJsonProperties> | undefined) => ({
    color: '#fff',
    opacity: 0.8,
    weight: 0.5,
    fillOpacity: 1,
    fillColor: IpcChoroplethOperations.fillCountryIpc(feature?.properties?.ipcPhase),
  });

  static fillCountryIpc = (phase: number) => {
    if (phase === null) return 'RGBA(58, 66, 68, 0.7)';
    if (phase === 1) return '#D1FAD1';
    if (phase === 2) return '#FAE834';
    if (phase === 3) return '#E88519';
    if (phase === 4) return '#CD1919';
    if (phase === 5) return '#731919';
    if (phase === 6) return '#353F42';
    return 'RGBA(58, 66, 68, 0.7)';
  };

  static generateColorMap = (ipcData: CountryIpcData[], mapData: CountryMapDataWrapper) => {
    const ipcDataById = Object.fromEntries(ipcData.map((data: CountryIpcData) => [data.adm0_code, data]));

    const filteredFeatures = mapData.features.filter(
      (feature: CountryMapData) => ipcDataById[feature.properties.adm0_id]
    );

    const updatedFeatures = filteredFeatures.map((feature: CountryMapData) => ({
      ...feature,
      properties: {
        ...feature.properties,
        ipcData: ipcDataById[feature.properties.adm0_id],
      },
    }));

    return { type: 'FeatureCollection', features: updatedFeatures as Feature<Geometry, GeoJsonProperties>[] };
  };

  static findIpcData = (countryName: string, ipcData: CountryIpcData[]): CountryIpcData | null => {
    return ipcData.find((currentCountry: CountryIpcData) => currentCountry.adm0_name === countryName) || null;
  };

  static async onCountryClick(
    feature: Feature<Geometry, GeoJsonProperties>,
    setIpcRegionData: (data: FeatureCollection<Geometry, GeoJsonProperties> | undefined) => void,
    setCountryData: (data: CountryData) => void,
    map: L.Map
  ) {
    const bounds = L.geoJSON(feature).getBounds();
    map.fitBounds(bounds);

    const countryRepository = container.resolve<CountryRepository>('CountryRepository');
    const [countryData, regionIpcData] = await Promise.all([
      countryRepository.getCountryData(feature?.properties?.adm0_id),
      countryRepository.getRegionIpcData(feature?.properties?.adm0_id),
    ]);

    setIpcRegionData({
      type: 'FeatureCollection',
      features: regionIpcData?.features as Feature<Geometry, GeoJsonProperties>[],
    });

    setCountryData(countryData);
  }

  static initializeCountryLayer(
    feature: Feature<Geometry, GeoJsonProperties>,
    layer: L.Layer,
    ipcData: CountryIpcData[],
    setSelectedCountryId: (id: number | null) => void,
    setIpcRegionData: (data: FeatureCollection<Geometry, GeoJsonProperties> | undefined) => void,
    setCountryData: (countryData: CountryData) => void,
    map: L.Map,
    resetAlert: () => void
  ) {
    this.createTooltip(feature, layer, ipcData);
    this.attachEvents(feature, layer, setSelectedCountryId, setIpcRegionData, setCountryData, map, resetAlert);
  }

  static attachEvents(
    feature: Feature<Geometry, GeoJsonProperties>,
    layer: L.Layer,
    setSelectedCountryId: (id: number | null) => void,
    setIpcRegionData: (data: FeatureCollection<Geometry, GeoJsonProperties> | undefined) => void,
    setCountryData: (countryData: CountryData) => void,
    map: L.Map,
    resetAlert: () => void
  ) {
    const pathLayer = layer as L.Path;
    const originalStyle = { ...pathLayer.options };

    layer.on({
      click: () => {
        setIpcRegionData(undefined);
        setSelectedCountryId(feature?.properties?.adm0_id);
        this.onCountryClick(feature, setIpcRegionData, setCountryData, map);
        resetAlert();
      },
      mouseover: () => {
        pathLayer.setStyle({ ...originalStyle, fillOpacity: 0.7 });
        pathLayer.openTooltip();
      },
      mouseout: () => {
        pathLayer.setStyle(originalStyle);
        pathLayer.closeTooltip();
      },
    });
  }

  static createTooltip(feature: Feature<Geometry, GeoJsonProperties>, layer: L.Layer, ipcData: CountryIpcData[]) {
    const countryName = feature?.properties?.adm0_name;
    const selectedCountryData = this.findIpcData(countryName, ipcData);

    const dateOfAnalysis = selectedCountryData?.date_of_analysis || 'N/A';
    const analysisPeriod = selectedCountryData?.analysis_period || 'N/A';
    const ipcPercent = selectedCountryData?.ipc_percent ?? 0;
    const ipcPopNmbr = selectedCountryData?.ipc_popnmbr ?? 0;
    const formattedPopNum = ipcPopNmbr.toLocaleString('en-US', { useGrouping: true });

    const tooltipContainer = document.createElement('div');
    const root = createRoot(tooltipContainer);

    root.render(
      <CountryHoverPopover
        header={countryName}
        details={
          <>
            Date of analysis: {dateOfAnalysis}
            <br />
            Validity period: {analysisPeriod}
          </>
        }
        summary={
          <>
            <span className="font-bold text-danger text-base">{formattedPopNum}</span> people in IPC/CH Phase 3 and
            above
            <br />(<span className="font-bold text-danger text-base">{ipcPercent}%</span> of people in the analyzed
            areas)
          </>
        }
      />
    );

    layer.bindTooltip(tooltipContainer, { className: 'leaflet-tooltip', sticky: true, direction: 'top' });
  }
}
