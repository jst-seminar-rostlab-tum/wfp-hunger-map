import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';

import container from '@/container';
import { CountryData } from '@/domain/entities/country/CountryData';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data';
import { MapColorsType } from '@/domain/entities/map/MapColorsType';
import { AlertType } from '@/domain/enums/AlertType';
import CountryRepository from '@/domain/repositories/CountryRepository';
import { getColors } from '@/styles/MapColors';

class FcsChoroplethOperations {
  static async handleCountryClick(
    feature: Feature<Geometry, GeoJsonProperties>,
    selectedAlert: AlertType | null,
    setSelectedCountryId: (countryId: number) => void,
    setLoading: (loading: boolean) => void,
    setRegionData: (data: FeatureCollection<Geometry, GeoJsonProperties> | undefined) => void,
    setCountryData: (data: CountryData | undefined) => void,
    setCountryIso3Data: (data: CountryIso3Data | undefined) => void,
    setSelectedMapVisibility: (visibility: boolean) => void,
    toggleAlert: (alertType: AlertType) => void
  ) {
    setSelectedCountryId(feature.properties?.adm0_id);
    setSelectedMapVisibility(false);
    if (selectedAlert) {
      toggleAlert(selectedAlert);
    }
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
    selectedAlert: AlertType | null,
    setSelectedCountryId: (countryId: number) => void,
    setLoading: (loading: boolean) => void,
    setRegionData: (data: FeatureCollection<Geometry, GeoJsonProperties> | undefined) => void,
    setCountryData: (data: CountryData | undefined) => void,
    setCountryIso3Data: (data: CountryIso3Data | undefined) => void,
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
          setLoading,
          setRegionData,
          setCountryData,
          setCountryIso3Data,
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
