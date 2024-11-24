import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';

import container from '@/container';
import { CountryMimiData } from '@/domain/entities/country/CountryMimiData';
import CountryRepository from '@/domain/repositories/CountryRepository';
import { GlobalDataRepository } from '@/domain/repositories/GlobalDataRepository';

class NutritionChoroplethOperations {
  static getFillColor(dataType: string): string {
    switch (dataType) {
      case 'actual':
        return '#FFB74D';
      case 'predicted':
        return '#E3F2FD';
      default:
        return '#52525b';
    }
  }

  static async fetchAndSetCountryStyles(setCountryStyles: (styles: { [key: number]: L.PathOptions }) => void) {
    const global = await container.resolve<GlobalDataRepository>('GlobalDataRepository').getNutritionData();
    if (global && Array.isArray(global.body)) {
      const styles = global.body.reduce(
        (acc, item) => {
          acc[item.adm0_code] = {
            color: '#fff',
            weight: 1,
            fillOpacity: 0.5,
            fillColor: NutritionChoroplethOperations.getFillColor(item.data_type),
          };
          return acc;
        },
        {} as { [key: number]: L.PathOptions }
      );

      setCountryStyles(styles);
    }
  }

  static async handleCountryClick(
    feature: Feature<Geometry, GeoJsonProperties>,
    bounds: L.LatLngBounds,
    map: L.Map,
    setSelectedCountryId: (id?: number) => void,
    setRegionData: (data: FeatureCollection<Geometry, GeoJsonProperties> | undefined) => void,
    setRegionNutritionData: (data: CountryMimiData) => void
  ) {
    map.fitBounds(bounds);
    setSelectedCountryId(feature.properties?.adm0_id);
    if (feature.properties?.adm0_id) {
      const countryRepository = container.resolve<CountryRepository>('CountryRepository');
      const newRegionData = await countryRepository.getRegionData(feature.properties.adm0_id);
      const regionNutrition = await countryRepository.getRegionNutritionData(feature.properties.adm0_id);
      if (newRegionData && newRegionData.features) {
        setRegionData({
          type: 'FeatureCollection',
          features: newRegionData.features as Feature<Geometry, GeoJsonProperties>[],
        });
        setRegionNutritionData(regionNutrition);
      }
    }
  }

  static onEachFeature(
    feature: Feature<Geometry, GeoJsonProperties>,
    layer: L.Layer,
    map: L.Map,
    setSelectedCountryId: (countryId?: number) => void,
    setRegionData: (data: FeatureCollection<Geometry, GeoJsonProperties> | undefined) => void,
    setRegionNutritionData: (data: CountryMimiData) => void,
    countryStyles: { [key: number]: L.PathOptions }
  ) {
    const pathLayer = layer as L.Path;
    const featureStyle = countryStyles[feature.properties?.adm0_id];
    if (featureStyle) {
      pathLayer.setStyle(featureStyle);
    }
    pathLayer.on({
      click: async () => {
        const bounds = (layer as L.GeoJSON).getBounds();
        NutritionChoroplethOperations.handleCountryClick(
          feature,
          bounds,
          map,
          setSelectedCountryId,
          setRegionData,
          setRegionNutritionData
        );
      },
    });
  }

  static countryStyle: L.PathOptions = {
    color: undefined,
    fillOpacity: 0,
  };
}

export default NutritionChoroplethOperations;
