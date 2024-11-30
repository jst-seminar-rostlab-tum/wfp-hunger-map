import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';

import { MapColorsType } from '@/domain/entities/map/MapColorsType';
import { AlertType } from '@/domain/enums/AlertType';
import { getColors } from '@/styles/MapColors';

class FcsChoroplethOperations {
  static async handleCountryClick(
    feature: Feature<Geometry, GeoJsonProperties>,
    selectedAlert: AlertType | null,
    setSelectedCountryId: (countryId: number) => void,
    setSelectedMapVisibility: (visibility: boolean) => void,
    toggleAlert: (alertType: AlertType) => void
  ) {
    setSelectedCountryId(feature.properties?.adm0_id);
    if (selectedAlert) {
      toggleAlert(selectedAlert);
    }
  }

  static onEachFeature(
    feature: Feature<Geometry, GeoJsonProperties>,
    layer: L.Layer,
    selectedAlert: AlertType | null,
    setSelectedCountryId: (countryId: number) => void,
    setSelectedMapVisibility: (visibility: boolean) => void,
    toggleAlert: (alertType: AlertType) => void,
    isDark: boolean
  ) {
    const pathLayer = layer as L.Path;
    const mapColors: MapColorsType = getColors(isDark);

    pathLayer.on({
      click: async () => {
        FcsChoroplethOperations.handleCountryClick(
          feature,
          selectedAlert,
          setSelectedCountryId,
          setSelectedMapVisibility,
          toggleAlert
        );
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
