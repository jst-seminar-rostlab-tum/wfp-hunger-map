import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';

import container from '@/container';
import { CountryData } from '@/domain/entities/country/CountryData';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data';
import CountryRepository from '@/domain/repositories/CountryRepository';

class FcsChoroplethOperations {
  static async handleCountryClick(
    feature: Feature<Geometry, GeoJsonProperties>,
    bounds: L.LatLngBounds,
    map: L.Map,
    setSelectedCountryId: (id?: number) => void,
    setLoading: (loading: boolean) => void,
    setRegionData: (data: FeatureCollection<Geometry, GeoJsonProperties> | undefined) => void,
    setCountryData: (data: CountryData | undefined) => void,
    setCountryIso3Data: (data: CountryIso3Data | undefined) => void
  ) {
    map.fitBounds(bounds);
    setSelectedCountryId(feature.properties?.adm0_id);
    setLoading(true);
    if (feature.properties?.adm0_id) {
      const countryRepository = container.resolve<CountryRepository>('CountryRepository');
      try {
        const newRegionData = await countryRepository.getRegionData(feature.properties.adm0_id);
        if (newRegionData && newRegionData.features) {
          setRegionData({
            type: 'FeatureCollection',
            features: newRegionData.features as Feature<Geometry, GeoJsonProperties>[],
          });
        }
        const newCountryData = await countryRepository.getCountryData(feature.properties.adm0_id);
        setCountryData(newCountryData);
        const newCountryIso3Data = await countryRepository.getCountryIso3Data(feature.properties.iso3);
        setCountryIso3Data(newCountryIso3Data);
        setLoading(false);
      } catch {
        // Do nothing
      }
    }
  }

  static onEachFeature(
    feature: Feature<Geometry, GeoJsonProperties>,
    layer: L.Layer,
    map: L.Map,
    setSelectedCountryId: (countryId?: number) => void,
    setLoading: (loading: boolean) => void,
    setRegionData: (data: FeatureCollection<Geometry, GeoJsonProperties> | undefined) => void,
    setCountryData: (data: CountryData | undefined) => void,
    setCountryIso3Data: (data: CountryIso3Data | undefined) => void
  ) {
    const pathLayer = layer as L.Path;

    pathLayer.on({
      click: async () => {
        const bounds = (layer as L.GeoJSON).getBounds();
        FcsChoroplethOperations.handleCountryClick(
          feature,
          bounds,
          map,
          setSelectedCountryId,
          setLoading,
          setRegionData,
          setCountryData,
          setCountryIso3Data
        );
      },
    });
  }
}

export default FcsChoroplethOperations;
