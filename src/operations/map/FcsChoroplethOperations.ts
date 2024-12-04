import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';

import { CountryFcsData } from '@/domain/entities/country/CountryFcsData.ts';
import { MapColorsType } from '@/domain/entities/map/MapColorsType';
import { getColors } from '@/styles/MapColors';

class FcsChoroplethOperations {
  static async handleCountryClick(
    feature: Feature<Geometry, GeoJsonProperties>,
    setSelectedCountryId: (countryId: number) => void
  ) {
    setSelectedCountryId(feature.properties?.adm0_id);
  }

  static checkIfActive(feature: Feature, fcsData: Record<string, CountryFcsData>): boolean {
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
    isDark: boolean,
    fcsData: Record<string, CountryFcsData>
  ) {
    const pathLayer = layer as L.Path;
    const mapColors: MapColorsType = getColors(isDark);

    pathLayer.on({
      click: async () => {
        if (this.checkIfActive(feature, fcsData)) {
          FcsChoroplethOperations.handleCountryClick(feature, setSelectedCountryId);
        }
      },
      mouseover: () => {
        if (this.checkIfActive(feature, fcsData)) {
          pathLayer.setStyle({ fillOpacity: 0.3, fillColor: mapColors.outline });
        }
      },
      mouseout: () => {
        if (this.checkIfActive(feature, fcsData)) {
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
    return this.checkIfActive(feature, fcsData)
      ? {
          color: undefined,
          fillOpacity: 0,
        }
      : {
          color: getColors(isDark).inactiveCountriesOverlay,
          fillOpacity: 0.5,
          stroke: false,
        };
  }
}

export default FcsChoroplethOperations;
