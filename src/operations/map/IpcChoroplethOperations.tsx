import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';
import { createRoot } from 'react-dom/client';

import CountryHoverPopover from '@/components/CountryHoverPopover/CountryHoverPopover';
import { CountryIpcData } from '@/domain/entities/country/CountryIpcData';
import { CountryMapData, CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';
import { IpcPhases } from '@/domain/enums/IpcPhases';
import { inactiveCountryOverlayStyling } from '@/styles/MapColors.ts';

export class IpcChoroplethOperations {
  /**
   * Returns the style for a global country feature based on IPC data.
   *
   * @param feature - The map feature representing a country.
   * @param adm0code - The country’s administrative code.
   * @param ipcData - An array of IPC data for countries.
   * @param isDark - A boolean indicating whether the dark mode styling should be applied.
   *
   * @returns A style object for the country, including color, border weight, fill opacity,
   *          and fill color based on IPC data, or inactive country styling if no IPC data is available.
   */
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

  /**
   * Returns a color based on the given IPC population value.
   *
   * @param ipcPopulation - The IPC population percentage (0 to 100), where lower values
   *                        represent better conditions and higher values indicate greater
   *                        food insecurity.
   * @returns A color code representing the IPC population range.
   */
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

  /**
   * Returns the style for a country based on its IPC phase.
   *
   * @param feature - The map feature representing a country, which includes IPC phase data.
   * @returns An object containing style properties for the country, including color,
   *          border weight, fill opacity, and the fill color based on the IPC phase.
   */
  static ipcCountryStyle = (feature: Feature<Geometry, GeoJsonProperties> | undefined) => ({
    color: 'hsl(var(--nextui-countryBorders))',
    weight: 1,
    fillOpacity: 1,
    fillColor: IpcChoroplethOperations.fillCountryIpc(feature?.properties?.ipcPhase),
  });

  /**
   * Returns a color based on the given IPC phase.
   *
   * @param phase - The IPC phase number (1-6) that determines the color.
   * @returns A color code representing the IPC phase.
   */
  static fillCountryIpc = (phase: number) => {
    if (phase === null) return 'hsl(var(--nextui-notAnalyzed))';
    if (phase === 1) return '#D1FAD1';
    if (phase === 2) return '#FAE834';
    if (phase === 3) return '#E88519';
    if (phase === 4) return '#CD1919';
    if (phase === 5) return '#731919';
    if (phase === 6) return '#353F42';
    return 'hsl(var(--nextui-notAnalyzed))';
  };

  /**
   * Adds IPC data to map features based on their region IDs.
   *
   * @param ipcData - List of IPC data, each linked to a region by its adm0_code.
   * @param mapData - Map data containing geographic features with region IDs (adm0_id).
   *
   * @returns A GeoJSON FeatureCollection with updated map features that include IPC data.
   */
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

  /**
   * Initialize the country layer
   * @param feature - GeoJSON feature object
   * @param layer - Leaflet layer object
   * @param ipcData - Array of country IPC data objects
   * @param setSelectedCountryId - Function to set the selected country id
   * @param selectedCountryId - The currently selected country id
   */
  static initializeCountryLayer(
    feature: Feature<Geometry, GeoJsonProperties>,
    layer: L.Layer,
    ipcData: CountryIpcData[],
    setSelectedCountryId: (id: number | null) => void,
    selectedCountryId: number
  ) {
    // Check if the country is active
    if (this.checkIfActive(feature as CountryMapData, ipcData)) {
      // to handle tooltip for regions with Not Analyzed Data in country view
      if (feature.properties?.adm0_id === selectedCountryId) {
        IpcChoroplethOperations.initializeRegionLayer(feature, layer);
      }

      // Attach events to the layer
      this.attachEvents(feature, layer, setSelectedCountryId, selectedCountryId, ipcData);
    }
  }

  /**
   * Attach events to the layer
   * @param feature - GeoJSON feature object
   * @param layer - Leaflet layer object
   * @param setSelectedCountryId - Function to set the selected country id
   * @param selectedCountryId - The currently selected country id
   * @param ipcData - Array of country IPC data objects
   */
  static attachEvents(
    feature: Feature<Geometry, GeoJsonProperties>,
    layer: L.Layer,
    setSelectedCountryId: (id: number | null) => void,
    selectedCountryId: number,
    ipcData: CountryIpcData[]
  ) {
    const pathLayer = layer as L.Path;
    const originalStyle = { ...pathLayer.options };

    layer.on({
      click: () => {
        setSelectedCountryId(feature?.properties?.adm0_id);
        document.getElementsByClassName('leaflet-container').item(0)?.classList.remove('interactive');
      },
      mouseover: () => {
        if (feature.properties?.adm0_id !== selectedCountryId) {
          pathLayer.setStyle({ ...originalStyle, fillOpacity: 0.6 });
        } else {
          pathLayer.setStyle({
            ...originalStyle,
            fillColor: 'hsl(var(--nextui-ipcHoverRegion))',
          });
        }

        document.getElementsByClassName('leaflet-container').item(0)?.classList.add('interactive');

        this.createTooltip(feature, layer, ipcData);
      },

      mouseout: () => {
        // Restore the original layer style
        pathLayer.setStyle(originalStyle);
        document.getElementsByClassName('leaflet-container').item(0)?.classList.remove('interactive');
        pathLayer.unbindTooltip();
      },
    });
  }

  /**
   * Checks if a country feature is active based on IPC data.
   * @param feature - The country map data feature to check.
   * @param ipcData - An array of country IPC data objects.
   * @returns A boolean indicating if the feature is active.
   */
  static checkIfActive(feature: CountryMapData, ipcData: CountryIpcData[]): boolean {
    // Create a lookup table for IPC data by feature's adm0_code
    const ipcDataById = Object.fromEntries(ipcData.map((data: CountryIpcData) => [data.adm0_code, data]));

    // Check if IPC data exists for the feature
    return ipcDataById[feature.properties.adm0_id] !== undefined;
  }

  /**
   * Create a tooltip for a country feature with IPC data.
   * @param feature - The country map data feature to create a tooltip for.
   * @param layer - The Leaflet layer object to bind the tooltip to.
   * @param ipcData - An array of country IPC data objects.
   */
  static createTooltip(feature: Feature<Geometry, GeoJsonProperties>, layer: L.Layer, ipcData: CountryIpcData[]) {
    const countryName = feature?.properties?.adm0_name;
    const selectedCountryData = this.findIpcData(countryName, ipcData);

    // Get the IPC data for the country
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

    // Bind the tooltip to the layer
    layer.bindTooltip(tooltipContainer, { className: 'leaflet-tooltip', sticky: true, direction: 'top' }).openTooltip();
  }

  /**
   * Initializes the region layer by creating a tooltip and attaching events.
   * @param feature - GeoJSON feature object representing the region
   * @param layer - Leaflet layer object to which the tooltip and events are bound
   */
  static initializeRegionLayer(feature: Feature<Geometry, GeoJsonProperties>, layer: L.Layer) {
    IpcChoroplethOperations.attachEventsRegion(feature, layer);
  }

  /**
   * Attach mouseover and mouseout events to the region layer
   * @param feature - GeoJSON feature object
   * @param layer - Leaflet layer object
   */
  static attachEventsRegion(feature: Feature<Geometry, GeoJsonProperties>, layer: L.Layer) {
    const pathLayer = layer as L.Path;
    const originalStyle = { ...pathLayer.options };

    layer.on({
      mouseover: () => {
        if (feature?.properties?.ipcPhase) {
          pathLayer.setStyle({ ...originalStyle, fillOpacity: 0.6 });
        } else {
          pathLayer.setStyle({
            ...originalStyle,
            fillColor: 'hsl(var(--nextui-ipcHoverRegion))',
          });
        }
        IpcChoroplethOperations.createPhaseTooltip(feature, layer);
      },
      // Restore the original layer style
      mouseout: () => {
        pathLayer.setStyle(originalStyle);
        pathLayer.unbindTooltip();
      },
    });
  }

  /**
   * Creates a tooltip for the IPC phase of a region.
   * @param feature - GeoJSON feature object
   * @param layer - Leaflet layer object
   */
  static createPhaseTooltip(feature: Feature<Geometry, GeoJsonProperties>, layer: L.Layer) {
    const tooltipContainer = document.createElement('div');
    const root = createRoot(tooltipContainer);

    root.render(
      <div className="p-3 bg-background text-foreground rounded-medium z-50">
        <h1 className="text-sm font-semibold">{IpcChoroplethOperations.getPhaseText(feature?.properties?.ipcPhase)}</h1>
      </div>
    );

    // Bind the tooltip to the layer
    layer
      .bindTooltip(tooltipContainer, {
        className: 'leaflet-tooltip',
        sticky: true,
      })
      .openTooltip();
  }

  /**
   * Get the IPC phase text given the phase number.
   * @param phaseNumber - The phase number (1-5)
   * @returns - The IPC phase text
   */
  static getPhaseText(phaseNumber: number): string {
    switch (phaseNumber) {
      case 1:
        return IpcPhases.PHASE_1;
      case 2:
        return IpcPhases.PHASE_2;
      case 3:
        return IpcPhases.PHASE_3;
      case 4:
        return IpcPhases.PHASE_4;
      case 5:
        return IpcPhases.PHASE_5;
      default:
        return 'Not Analyzed Data';
    }
  }
}
