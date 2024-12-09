import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';

import { CountryFcsData } from '@/domain/entities/country/CountryFcsData.ts';
import { CountryMapData } from '@/domain/entities/country/CountryMapData.ts';
import { inactiveCountryOverlayStyling } from '@/styles/MapColors';

class FcsChoroplethOperations {
  static async handleCountryClick(
    feature: Feature<Geometry, GeoJsonProperties>,
    setSelectedCountryId: (countryId: number) => void
  ) {
    setSelectedCountryId(feature.properties?.adm0_id);
  }

  static checkIfActive(feature: CountryMapData, fcsData: Record<string, CountryFcsData>): boolean {
    return (
      feature.properties?.interactive === true &&
      fcsData[feature.properties.adm0_id]?.fcs !== null &&
      fcsData[feature.properties.adm0_id]?.fcs !== undefined
    );
  }

  static onEachFeature(
    feature: Feature<Geometry, GeoJsonProperties>,
    layer: L.Layer,
    setSelectedCountryId: (countryId: number) => void,
    fcsData: Record<string, CountryFcsData>
  ) {
    const pathLayer = layer as L.Path;

    pathLayer.on({
      click: async () => {
        if (this.checkIfActive(feature as CountryMapData, fcsData)) {
          FcsChoroplethOperations.handleCountryClick(feature, setSelectedCountryId);
        }
      },
      mouseover: () => {
        if (this.checkIfActive(feature as CountryMapData, fcsData)) {
          pathLayer.setStyle({ fillOpacity: 0.3, fillColor: 'hsl(var(--nextui-countryHover))' });
        }
      },
      mouseout: () => {
        if (this.checkIfActive(feature as CountryMapData, fcsData)) {
          pathLayer.setStyle({ fillOpacity: 0 });
        }
      },
    });
  }

  static countryStyle(
    feature: Feature<Geometry, GeoJsonProperties>,
    isDark: boolean,
    fcsData: Record<string, CountryFcsData>
  ): L.PathOptions {
    return this.checkIfActive(feature as CountryMapData, fcsData)
      ? {
          color: undefined,
          fillOpacity: 0,
        }
      : inactiveCountryOverlayStyling(isDark);
  }
}

export default FcsChoroplethOperations;
