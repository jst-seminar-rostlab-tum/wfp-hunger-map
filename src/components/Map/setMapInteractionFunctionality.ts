import mapboxgl from 'mapbox-gl';

import { CountryMapData } from '@/domain/entities/country/CountryMapData.ts';

export const setMapInteractionFunctionality = (baseMap: mapboxgl.Map) => {
  let hoveredPolygonId: string | number | undefined;

  baseMap.on('mousemove', 'country-fills', (e) => {
    if (e.features && e.features.length > 0 && (e.features[0] as unknown as CountryMapData).properties.interactive) {
      if (hoveredPolygonId) {
        baseMap.setFeatureState({ source: 'countries', id: hoveredPolygonId }, { hover: false });
      }
      hoveredPolygonId = e.features[0].id;
      if (hoveredPolygonId) {
        baseMap.setFeatureState({ source: 'countries', id: hoveredPolygonId }, { hover: true });
      }
    }
  });

  baseMap.on('mouseleave', 'country-fills', () => {
    if (hoveredPolygonId) {
      baseMap.setFeatureState({ source: 'countries', id: hoveredPolygonId }, { hover: false });
    }
    hoveredPolygonId = undefined;
  });

  let isDragging = false;
  baseMap.on('mousedown', () => {
    isDragging = false;
  });

  baseMap.on('mousemove', () => {
    isDragging = true;
  });

  baseMap.on('mouseup', 'country-fills', (e) => {
    if (!isDragging && e.features && (e.features[0] as unknown as CountryMapData).properties.interactive) {
      alert(`You clicked on ${(e.features[0] as unknown as CountryMapData).properties.adm0_name}`);
    }
  });
};
