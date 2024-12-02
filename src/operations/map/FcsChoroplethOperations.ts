import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';

import { MapColorsType } from '@/domain/entities/map/MapColorsType';
import { getColors } from '@/styles/MapColors';

class FcsChoroplethOperations {
  static async handleCountryClick(
    feature: Feature<Geometry, GeoJsonProperties>,
    setSelectedCountryId: (countryId: number) => void
  ) {
    setSelectedCountryId(feature.properties?.adm0_id);
  }

  static onEachFeature(
    feature: Feature<Geometry, GeoJsonProperties>,
    layer: L.Layer,
    setSelectedCountryId: (countryId: number) => void,
    isDark: boolean
  ) {
    const pathLayer = layer as L.Path;
    const mapColors: MapColorsType = getColors(isDark);

    pathLayer.on({
      click: async () => {
        FcsChoroplethOperations.handleCountryClick(feature, setSelectedCountryId);
      },
      mouseover: () => {
        pathLayer.setStyle({ fillOpacity: 0.3, fillColor: mapColors.outline });
      },
      mouseout: () => {
        pathLayer.setStyle({ fillOpacity: 0 });
      },
    });
  }

  static countryStyle: L.PathOptions = {
    color: undefined,
    fillOpacity: 0,
  };
}

export default FcsChoroplethOperations;
