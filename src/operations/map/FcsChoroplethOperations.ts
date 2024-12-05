import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';

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
    setSelectedCountryId: (countryId: number) => void
  ) {
    const pathLayer = layer as L.Path;

    pathLayer.on({
      click: async () => {
        FcsChoroplethOperations.handleCountryClick(feature, setSelectedCountryId);
      },
      mouseover: () => {
        pathLayer.setStyle({ fillOpacity: 0.3, fillColor: 'hsl(var(--nextui-countryHover))' });
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
