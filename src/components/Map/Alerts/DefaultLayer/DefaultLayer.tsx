import { useLeafletContext } from '@react-leaflet/core';
import L, { LatLng } from 'leaflet';
import React from 'react';

import LegendContainer from '@/components/Legend/LegendContainer';
import { DefaultAlertType } from '@/domain/enums/DefaultAlertType';
import { DefaultLayerProps } from '@/domain/props/DefaultLayerProps';
import ConflictOperations from '@/operations/alerts/ConflictOperations';

import { PulsingAlertMarker } from './PulsingAlertMarker';

export function DefaultLayer({ countries }: DefaultLayerProps) {
  const { map } = useLeafletContext();

  const getMarkerPositionOffset = (latitude: number, longitude: number, type: DefaultAlertType): LatLng => {
    const alertsCount = Object.keys(DefaultAlertType).length;
    const alertIndex = Object.values(DefaultAlertType).indexOf(type);

    const RADIUS = 3; // Base radius for marker circle
    const angle = (2 * Math.PI * alertIndex) / alertsCount;
    const xOffset = RADIUS * Math.cos(angle);
    const yOffset = RADIUS * Math.sin(angle);

    const point = map.latLngToContainerPoint([latitude, longitude]);
    const newPoint = L.point([point.x + xOffset, point.y + yOffset]);

    return map.containerPointToLatLng(newPoint);
  };

  return (
    <>
      <div className="absolute bottom-6 right-8 z-9999">
        <LegendContainer loading={!countries} items={ConflictOperations.generateConflictLegend()} />
      </div>
      {countries &&
        countries.features.map((country) => {
          const { alerts } = country.properties;

          return (
            <React.Fragment key={country.properties.adm0_id || country.properties.centroid.toString()}>
              {alerts.conflict && (
                <PulsingAlertMarker
                  key={`conflict${country.properties.centroid.toString()}`}
                  color="bg-fatalityAlert"
                  position={getMarkerPositionOffset(
                    country.properties.centroid.latitude,
                    country.properties.centroid.longitude,
                    DefaultAlertType.FATALITY
                  )}
                />
              )}
              {alerts.climateWet && (
                <PulsingAlertMarker
                  key={`climateWet${country.properties.centroid.toString()}`}
                  color="bg-climateWetAlert"
                  position={getMarkerPositionOffset(
                    country.properties.centroid.latitude,
                    country.properties.centroid.longitude,
                    DefaultAlertType.CLIMATE_WET
                  )}
                />
              )}
              {alerts.climateDry && (
                <PulsingAlertMarker
                  key={`climateDry${country.properties.centroid.toString()}`}
                  color="bg-climateDryAlert"
                  position={getMarkerPositionOffset(
                    country.properties.centroid.latitude,
                    country.properties.centroid.longitude,
                    DefaultAlertType.CLIMATE_DRY
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
    </>
  );
}
