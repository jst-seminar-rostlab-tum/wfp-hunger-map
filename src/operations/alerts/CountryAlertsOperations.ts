import * as turf from '@turf/turf';
import { MultiPolygon, Polygon } from 'geojson';
import L from 'leaflet';

import { CountryAlert } from '@/domain/entities/alerts/CountryAlert';
import { CountryMapData, CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';
import { CountryAlertType } from '@/domain/enums/CountryAlertType';

export default class CountryAlertsOperations {
  // starting radius in km for the point generation around the country center for each country alert type
  private static STARTING_RADIUS_KM = 100;

  // decrease radius in km for each iteration to find a point inside the country boundaries
  private static RADIUS_DECREASE_KM = 10;

  private static bearingsLookup: Record<CountryAlertType, number> | null = null;

  // generate the angles(bearings) for each alert type around the country center
  private static getBearingsLookup(): Record<CountryAlertType, number> {
    if (!this.bearingsLookup) {
      const alertsCount = Object.keys(CountryAlertType).length;
      this.bearingsLookup = Object.values(CountryAlertType).reduce(
        (acc, type, index) => ({
          ...acc,
          [type]: (360 * index) / alertsCount - 180, // Calculate bearing in degrees (-180 to 180)
        }),
        {} as Record<CountryAlertType, number>
      );
    }
    return this.bearingsLookup;
  }

  private static getRandomAroundCenter(country: CountryMapData, type: CountryAlertType): L.LatLngExpression {
    const countryGeometry = country.geometry as Polygon | MultiPolygon;
    const center = [country.properties.centroid.longitude, country.properties.centroid.latitude];

    const bearing = this.getBearingsLookup()[type];

    // Start with the STARTING_RADIUS_KM and decrease each iteration till the point is in the country boundary
    for (let distance = this.STARTING_RADIUS_KM; distance > 0; distance -= this.RADIUS_DECREASE_KM) {
      // Use turf.destination to calculate new point considering Earth's curvature
      const point = turf.destination(center, distance, bearing, { units: 'kilometers' });

      // Check if point is inside country boundaries
      const isInside = turf.booleanPointInPolygon(point, countryGeometry);

      if (isInside) {
        // found point inside country boundaries
        return [point.geometry.coordinates[1], point.geometry.coordinates[0]];
      }
    }
    return [center[1], center[0]];
  }

  static getFromMapData(countries: CountryMapDataWrapper): CountryAlert[] {
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
            position: this.getRandomAroundCenter(country, CountryAlertType.FATALITY),
          });
        }

        if (alerts.climateWet) {
          result.push({
            type: CountryAlertType.CLIMATE_WET,
            position: this.getRandomAroundCenter(country, CountryAlertType.CLIMATE_WET),
          });
        }

        if (alerts.climateDry) {
          result.push({
            type: CountryAlertType.CLIMATE_DRY,
            position: this.getRandomAroundCenter(country, CountryAlertType.CLIMATE_DRY),
          });
        }
      });
    return result;
  }
}