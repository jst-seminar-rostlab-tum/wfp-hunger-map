import L, { LatLngExpression, Map } from 'leaflet';

import { CountryAlert } from '@/domain/entities/alerts/CountryAlert';
import { CountryMapData, CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';
import { CountryAlertType } from '@/domain/enums/CountryAlertType';

export default class CountryAlertsOperations {
  static RADIUS = 3; // Base radius for marker circle

  static getFromMapData(countries: CountryMapDataWrapper, map: Map): CountryAlert[] {
    const result: CountryAlert[] = [];

    countries.features
      .filter(
        (country) =>
          country.properties.alerts.conflict ||
          country.properties.alerts.climateWet ||
          country.properties.alerts.climateDry
      )
      .forEach((country) => {
        const { alerts } = country.properties;

        if (alerts.conflict) {
          result.push({
            type: CountryAlertType.FATALITY,
            position: this.getMarkerPositionOffset(map, country, CountryAlertType.FATALITY),
          });
        }

        if (alerts.climateWet) {
          result.push({
            type: CountryAlertType.CLIMATE_WET,
            position: this.getMarkerPositionOffset(map, country, CountryAlertType.CLIMATE_WET),
          });
        }

        if (alerts.climateDry) {
          result.push({
            type: CountryAlertType.CLIMATE_DRY,
            position: this.getMarkerPositionOffset(map, country, CountryAlertType.CLIMATE_DRY),
          });
        }
      });
    return result;
  }

  private static getMarkerPositionOffset(map: Map, country: CountryMapData, type: CountryAlertType): LatLngExpression {
    const centerLatitude = country.properties.centroid.latitude;
    const centerLongitude = country.properties.centroid.longitude;
    const alertsCount = Object.keys(CountryAlertType).length;
    const alertIndex = Object.values(CountryAlertType).indexOf(type);

    const angle = (2 * Math.PI * alertIndex) / alertsCount;
    const xOffset = this.RADIUS * Math.cos(angle);
    const yOffset = this.RADIUS * Math.sin(angle);

    const point = map.latLngToContainerPoint([centerLatitude, centerLongitude]);
    const newPoint = L.point([point.x + xOffset, point.y + yOffset]);

    return map.containerPointToLatLng(newPoint);
  }
}
