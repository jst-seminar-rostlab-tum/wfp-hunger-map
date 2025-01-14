import 'leaflet/dist/leaflet.css';

import { Feature, GeoJSON, Geometry } from 'geojson';
import L, { Map as LeafletMap } from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import { GeoJSON as LeafletGeoJSON, MapContainer, Pane, SVGOverlay, TileLayer } from 'react-leaflet';

import BackToGlobalButton from '@/components/Map/BackToGlobalButton';
import {
  countryBaseStyle,
  countryBorderStyle,
  disputedAreaStyle,
  MAP_MAX_ZOOM,
  MAP_MIN_ZOOM,
  oceanBounds,
  SELECTED_COUNTRY_ZOOM_THRESHOLD,
} from '@/domain/constant/map/Map';
import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { useSelectedMap } from '@/domain/contexts/SelectedMapContext';
import { useSidebar } from '@/domain/contexts/SidebarContext';
import { CountryMapData, CountryProps } from '@/domain/entities/country/CountryMapData.ts';
import { GlobalInsight } from '@/domain/enums/GlobalInsight';
import { MapProps } from '@/domain/props/MapProps';
import { MapOperations } from '@/operations/map/MapOperations';

import { AlertContainer } from './Alerts/AlertContainer';
import FcsChoropleth from './FcsMap/FcsChoropleth';
import IpcChoropleth from './IpcMap/IpcChoropleth';
import NutritionChoropleth from './NutritionMap/NutritionChoropleth';
import ZoomControl from './ZoomControl';

export default function Map({ countries, disputedAreas, fcsData, alertData }: MapProps) {
  const mapRef = useRef<LeafletMap | null>(null);
  const { selectedMapType } = useSelectedMap();
  const { selectedCountryId, setSelectedCountryId } = useSelectedCountryId();
  const { closeSidebar } = useSidebar();
  const [renderer] = useState(new L.SVG({ padding: 0.5 }));

  const [regionLabelTooltips, setRegionLabelTooltips] = useState<L.Tooltip[]>([]);

  const onZoomThresholdReached = () => {
    setSelectedCountryId(null);
  };

  useEffect(() => {
    if (selectedCountryId) {
      closeSidebar();

      const selectedCountryData: CountryMapData | undefined = countries.features.find(
        (country) => country.properties.adm0_id === selectedCountryId
      );
      if (selectedCountryData) {
        window.gtag('event', `${selectedCountryData.properties.iso3}_country_selected`, {
          selectedMap: selectedMapType,
        });
        window.gtag('event', `${selectedCountryData.properties.iso3} _${selectedMapType}_countrymap_selected`);
        mapRef.current?.fitBounds(L.geoJSON(selectedCountryData as GeoJSON).getBounds(), { animate: true });
      }
    }

    if (mapRef.current) {
      regionLabelTooltips.forEach((tooltip) => {
        tooltip.removeFrom(mapRef.current as L.Map);
      });
      setRegionLabelTooltips([]);
    }
  }, [selectedCountryId, selectedMapType]);

  const onDataUnavailable = () => {
    // timeout to make sure that the zoom in animation has ended
    setTimeout(() => {
      setSelectedCountryId(null);
      mapRef.current?.zoomOut(4, { animate: true });
    }, 300);
  };

  return (
    <MapContainer
      ref={mapRef}
      center={[21.505, -0.09]}
      zoom={3}
      renderer={renderer}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
      minZoom={MAP_MIN_ZOOM}
      maxZoom={MAP_MAX_ZOOM}
      maxBoundsViscosity={1.0}
      zoomControl={false}
      style={{ height: '100%', width: '100%', zIndex: 1 }}
    >
      <AlertContainer countries={countries} alertData={alertData} />
      <ZoomControl threshold={SELECTED_COUNTRY_ZOOM_THRESHOLD} callback={onZoomThresholdReached} />
      <BackToGlobalButton />

      <Pane name="ocean" style={{ zIndex: 0 }}>
        <SVGOverlay bounds={oceanBounds}>
          <rect width="100%" height="100%" fill="hsl(var(--nextui-ocean))" />
        </SVGOverlay>
      </Pane>
      <Pane name="countries_base" style={{ zIndex: 1 }}>
        <LeafletGeoJSON
          interactive={false}
          data={MapOperations.convertCountriesToFeatureCollection(countries.features)}
          style={countryBaseStyle}
        />
      </Pane>
      {selectedMapType === GlobalInsight.FOOD && countries.features && (
        <>
          {countries.features.map((country) => (
            <FcsChoropleth
              key={country.properties.adm0_id}
              countryId={country.properties.adm0_id}
              data={{ type: 'FeatureCollection', features: [country as Feature<Geometry, CountryProps>] }}
              fcsData={fcsData}
              setRegionLabelTooltips={setRegionLabelTooltips}
              onDataUnavailable={onDataUnavailable}
            />
          ))}
          {!selectedCountryId && (
            <Pane name="fcs_raster" style={{ zIndex: 2 }}>
              <TileLayer url="https://static.hungermapdata.org/proteus_tiles/{z}/{x}/{y}.png" tms />
            </Pane>
          )}
        </>
      )}

      {selectedMapType === GlobalInsight.NUTRITION &&
        countries.features.map((country) => (
          <NutritionChoropleth
            countryId={country.properties.adm0_id}
            data={{ type: 'FeatureCollection', features: [country as Feature<Geometry, CountryProps>] }}
            setRegionLabelTooltips={setRegionLabelTooltips}
            onDataUnavailable={onDataUnavailable}
          />
        ))}

      {selectedMapType === GlobalInsight.VEGETATION && (
        <Pane name="vegetation_raster" style={{ zIndex: 2 }}>
          <TileLayer url="https://dev.api.earthobservation.vam.wfp.org/tiles/latest/viq_dekad/{z}/{x}/{y}.png" />
        </Pane>
      )}

      {selectedMapType === GlobalInsight.RAINFALL && (
        <Pane name="vegetation_raster" style={{ zIndex: 2 }}>
          <TileLayer url="https://dev.api.earthobservation.vam.wfp.org/tiles/latest/r3q_dekad/{z}/{x}/{y}.png" />
        </Pane>
      )}

      {selectedMapType === GlobalInsight.IPC && (
        <IpcChoropleth countries={countries} onDataUnavailable={onDataUnavailable} />
      )}

      <Pane name="countries_border" style={{ zIndex: 3 }}>
        <LeafletGeoJSON
          data={MapOperations.convertCountriesToFeatureCollection(countries.features)}
          style={countryBorderStyle}
        />
      </Pane>
      <Pane name="disputed_areas" style={{ zIndex: 4 }}>
        <LeafletGeoJSON
          data={MapOperations.convertCountriesToFeatureCollection(disputedAreas.features)}
          style={disputedAreaStyle}
        />
      </Pane>
    </MapContainer>
  );
}
