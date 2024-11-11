import { LeafletContextInterface } from '@react-leaflet/core';
import mapboxgl from 'mapbox-gl';
import { RefObject } from 'react';

export const setGeneralMapBehavior = (
  baseMap: mapboxgl.Map,
  mapContainer: RefObject<HTMLDivElement>,
  context: LeafletContextInterface
) => {
  baseMap.dragRotate.disable();

  const syncZoom = () => {
    baseMap.setZoom(context.map.getZoom() - 1);
    baseMap.setMaxZoom(context.map.getMaxZoom() - 1);
    baseMap.setMinZoom(context.map.getMinZoom() - 1);
  };

  const container = context.layerContainer || context.map;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const leafletMap = container.getContainer();
  leafletMap.appendChild(mapContainer.current);

  baseMap.setZoom(context.map.getZoom());
  baseMap.setMaxZoom(context.map.getMaxZoom() - 1);
  baseMap.setMinZoom(context.map.getMinZoom() - 1);

  const { lat, lng } = context.map.getCenter();
  baseMap.setCenter([lng, lat]);
  baseMap.setZoom(context.map.getZoom() - 1);

  context.map.on('move', () => {
    const { lat: moveLat, lng: moveLng } = context.map.getCenter();
    baseMap.setCenter([moveLng, moveLat]);
    syncZoom();
  });

  context.map.on('zoom', () => {
    const { lat: zoomLat, lng: zoomLng } = context.map.getCenter();
    baseMap.setCenter([zoomLng, zoomLat]);
    syncZoom();
  });

  context.map.on('movestart', () => {
    const { lat: moveStartLat, lng: moveStartLng } = context.map.getCenter();
    baseMap.setCenter([moveStartLng, moveStartLat]);
    syncZoom();
  });

  context.map.on('zoomstart', () => {
    syncZoom();
  });

  context.map.on('moveend', () => {
    const { lat: moveEndLat, lng: moveEndLng } = context.map.getCenter();
    baseMap.setCenter([moveEndLng, moveEndLat]);
    syncZoom();
  });

  context.map.on('zoomend', () => {
    const { lat: zoomEndLat, lng: zoomEndLng } = context.map.getCenter();
    baseMap.setCenter([zoomEndLng, zoomEndLat]);
    syncZoom();
  });
};
