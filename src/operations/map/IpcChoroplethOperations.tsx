import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';
import { createRoot } from 'react-dom/client';

import CountryHoverPopover from '@/components/CountryHoverPopover/CountryHoverPopover';
import { CountryIpcData } from '@/domain/entities/country/CountryIpcData';
import { CountryMapData, CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';
import { inactiveCountryOverlayStyling } from '@/styles/MapColors.ts';

export class IpcChoroplethOperations {
  static ipcGlobalStyle = (
    feature: Feature<Geometry, GeoJsonProperties>,
    adm0code: number,
    ipcData: CountryIpcData[],
    isDark: boolean
  ) => {
    const country = ipcData.find((c) => parseInt(c.adm0_code, 10) === adm0code); // TODO refactor this, this is crazy inefficient, there should never be such an expensive calculation in a render method
    return feature.properties?.ipcData
      ? {
          color: '#000',
          weight: 0.5,
          fillOpacity: 1,
          fillColor: IpcChoroplethOperations.fillGlobalIpc(country?.ipc_popnmbr ? country.ipc_popnmbr / 1000000 : null),
        }
      : inactiveCountryOverlayStyling(isDark);
  };

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
    color: 'hsl(var(--nextui-countryBorders))',
    weight: 1,
    fillOpacity: 1,
    fillColor: IpcChoroplethOperations.fillCountryIpc(feature?.properties?.ipcPhase),
  });

  static fillCountryIpc = (phase: number) => {
    if (phase === null) return 'hsl(var(--nextui-notAnalyzed), 0.6)';
    if (phase === 1) return '#D1FAD1';
    if (phase === 2) return '#FAE834';
    if (phase === 3) return '#E88519';
    if (phase === 4) return '#CD1919';
    if (phase === 5) return '#731919';
    if (phase === 6) return '#353F42';
    return 'hsl(var(--nextui-notAnalyzed), 0.6)';
  };

  static generateColorMap = (ipcData: CountryIpcData[], mapData: CountryMapDataWrapper) => {
    const ipcDataById = Object.fromEntries(ipcData.map((data: CountryIpcData) => [data.adm0_code, data]));

    const updatedFeatures = mapData.features.map((feature: CountryMapData) => ({
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

  static initializeCountryLayer(
    feature: Feature<Geometry, GeoJsonProperties>,
    layer: L.Layer,
    ipcData: CountryIpcData[],
    setSelectedCountryId: (id: number | null) => void
  ) {
    if (this.checkIfActive(feature as CountryMapData, ipcData)) {
      this.createTooltip(feature, layer, ipcData);
      this.attachEvents(feature, layer, setSelectedCountryId);
    }
  }

  static attachEvents(
    feature: Feature<Geometry, GeoJsonProperties>,
    layer: L.Layer,
    setSelectedCountryId: (id: number | null) => void
  ) {
    const pathLayer = layer as L.Path;
    const originalStyle = { ...pathLayer.options };

    layer.on({
      click: () => {
        setSelectedCountryId(feature?.properties?.adm0_id);
        document.getElementsByClassName('leaflet-container').item(0)?.classList.remove('interactive');
      },
      mouseover: () => {
        pathLayer.setStyle({ ...originalStyle, fillOpacity: 0.7 });
        document.getElementsByClassName('leaflet-container').item(0)?.classList.add('interactive');

        pathLayer.openTooltip();
      },
      mouseout: () => {
        pathLayer.setStyle(originalStyle);
        document.getElementsByClassName('leaflet-container').item(0)?.classList.remove('interactive');

        pathLayer.closeTooltip();
      },
    });
  }

  static checkIfActive(feature: CountryMapData, ipcData: CountryIpcData[]): boolean {
    const ipcDataById = Object.fromEntries(ipcData.map((data: CountryIpcData) => [data.adm0_code, data]));
    return ipcDataById[feature.properties.adm0_id] !== undefined;
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
            <br />(<span className="font-bold text-danger text-base">{ipcPercent}%</span>
            of people in the analyzed areas)
          </>
        }
      />
    );

    layer.bindTooltip(tooltipContainer, { className: 'leaflet-tooltip', sticky: true, direction: 'top' });
  }

  static attachEventsRegion(feature: Feature<Geometry, GeoJsonProperties>, layer: L.Layer) {
    const pathLayer = layer as L.Path;
    const originalStyle = { ...pathLayer.options };
    layer.on({
      mouseover: () => {
        pathLayer.setStyle({ ...originalStyle, fillOpacity: 0.7 });
      },
      mouseout: () => {
        pathLayer.setStyle(originalStyle);
      },
    });
  }
}
