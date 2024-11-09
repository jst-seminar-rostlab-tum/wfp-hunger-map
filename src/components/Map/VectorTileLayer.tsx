import 'mapbox-gl/dist/mapbox-gl.css';
import 'mapbox-gl-leaflet/leaflet-mapbox-gl';

import { useLeafletContext } from '@react-leaflet/core';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useEffect, useRef } from 'react';

export default function VectorTileLayer() {
  const context = useLeafletContext();
  const mapContainer = useRef();
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

  useEffect(() => {
    const baseMap = new mapboxgl.Map({
      container: mapContainer.current as unknown as string | HTMLElement,
      style: {
        version: 8,
        name: 'HungerMap LIVE',
        metadata: '{metadata}',
        sources: {
          hungermap: {
            url: 'https://cdn.hungermapdata.org/vector-tiles/v4/hungermap.json',
            type: 'vector',
          },
        },
        glyphs: 'https://cdn.hungermapdata.org/vector-tiles/fonts/v1/{fontstack}/{range}.pbf',
        layers: [
          {
            id: 'ocean',
            type: 'background',
            paint: {
              'background-color': 'hsl(175, 45%, 67%)',
            },
          },
          // {
          //   id: 'land',
          //   source: 'hungermap',
          //   'source-layer': 'land',
          //   type: 'fill',
          //   paint: {
          //     'fill-color': 'hsl(192, 100%, 8%)',
          //   },
          // },
          // {
          //   id: 'water',
          //   source: 'hungermap',
          //   'source-layer': 'water',
          //   type: 'fill',
          //   paint: {
          //     'fill-color': 'hsl(195, 100%, 11%)',
          //   },
          // },
          // {
          //   id: 'roads_trunk',
          //   source: 'hungermap',
          //   'source-layer': 'roads_trunk',
          //   type: 'line',
          //   paint: {
          //     'line-color': 'hsl(0, 0%, 28%)',
          //     'line-width': {
          //       stops: [
          //         [4, 0],
          //         [6, 2],
          //       ],
          //       base: 2,
          //     },
          //   },
          // },
          // {
          //   id: 'roads_primary',
          //   source: 'hungermap',
          //   'source-layer': 'roads_primary',
          //   type: 'line',
          //   paint: {
          //     'line-color': 'hsl(0, 0%, 28%)',
          //     'line-width': {
          //       stops: [
          //         [6, 0],
          //         [8, 1],
          //       ],
          //       base: 2,
          //     },
          //   },
          // },
        ],
      },
      interactive: true,
    });

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

    return () => {
      baseMap.remove();
      context.map.off('move');
    };
  }, [context]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%', zIndex: 2 }} />;
}
