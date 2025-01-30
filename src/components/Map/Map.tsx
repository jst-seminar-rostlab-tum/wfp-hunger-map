import 'leaflet/dist/leaflet.css';

import { Feature, Geometry } from 'geojson';
import L, { Map as LeafletMap } from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import { GeoJSON as LeafletGeoJSON, MapContainer, Pane, SVGOverlay, TileLayer } from 'react-leaflet';

import BackToGlobalButton from '@/components/Map/BackToGlobalButton';
import ShareButton from '@/components/ShareButton/ShareButton';
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
import { CountryProps } from '@/domain/entities/country/CountryMapData.ts';
import { GlobalInsight } from '@/domain/enums/GlobalInsight';
import { MapProps } from '@/domain/props/MapProps';
import { MapOperations } from '@/operations/map/MapOperations';

import { AlertContainer } from './Alerts/AlertContainer';
import FcsChoropleth from './FcsMap/FcsChoropleth';
import IpcChoropleth from './IpcMap/IpcChoropleth';
import NutritionChoropleth from './NutritionMap/NutritionChoropleth';
import ZoomControl from './ZoomControl';

/**
 * Main map component containing the layers of the leaflet map
 * @param countries A FeatureCollection containing country-level geographic data used for the base shapes and other things
 * @param disputedAreas FeatureCollection of disputed territories
 * @param fcsData Food security data used for choropleth
 * @param alertData Alert-related data for display within the map
 * @constructor
 */
export default function Map({ countries, disputedAreas, fcsData, alertData }: MapProps) {
  const mapRef = useRef<LeafletMap | null>(null);
  const { selectedMapType, setSelectedMapType } = useSelectedMap();
  const { selectedCountryId, setSelectedCountryId } = useSelectedCountryId();
  const [renderer] = useState(new L.SVG({ padding: 0.5 }));

  const onZoomThresholdReached = () => {
    setSelectedCountryId(null);
  };

  const onDataUnavailable = () => {
    // timeout to make sure that the zoom in animation has ended
    setTimeout(() => {
      setSelectedCountryId(null);
      mapRef.current?.zoomOut(4, { animate: true });
    }, 300);
  };

  useEffect(() => {
    if (selectedMapType === GlobalInsight.RAINFALL || selectedMapType === GlobalInsight.VEGETATION) {
      setSelectedCountryId(null);
      mapRef.current?.zoomOut(4, { animate: true });
    }
    setSelectedMapType(selectedMapType);
  }, [selectedMapType]);

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
      <ZoomControl
        threshold={SELECTED_COUNTRY_ZOOM_THRESHOLD}
        callback={onZoomThresholdReached}
        countries={countries}
      />
      <BackToGlobalButton />

      {/* Ocean */}
      <Pane name="ocean" style={{ zIndex: 0 }}>
        <SVGOverlay bounds={oceanBounds}>
          <rect width="100%" height="100%" fill="hsl(var(--nextui-ocean))" />
        </SVGOverlay>
      </Pane>

      {/* Countries */}
      <LeafletGeoJSON
        interactive={false}
        data={MapOperations.convertCountriesToFeatureCollection(countries.features)}
        style={countryBaseStyle}
      />

      {/* Country borders */}
      <LeafletGeoJSON
        data={MapOperations.convertCountriesToFeatureCollection(countries.features)}
        style={countryBorderStyle}
      />

      {/* Disputed areas */}
      <LeafletGeoJSON
        data={MapOperations.convertCountriesToFeatureCollection(disputedAreas.features)}
        style={disputedAreaStyle}
      />
      {selectedMapType === GlobalInsight.FOOD && countries.features && (
        <>
          {countries.features.map((country) => (
            <FcsChoropleth
              key={country.properties.adm0_id}
              countryId={country.properties.adm0_id}
              data={{ type: 'FeatureCollection', features: [country as Feature<Geometry, CountryProps>] }}
              fcsData={fcsData}
              onDataUnavailable={onDataUnavailable}
            />
          ))}
          {!selectedCountryId && (
            <Pane name="fcs_raster" style={{ zIndex: 401 }}>
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
            onDataUnavailable={onDataUnavailable}
          />
        ))}

      {selectedMapType === GlobalInsight.VEGETATION && (
        <Pane name="vegetation_raster" style={{ zIndex: 401 }}>
          <TileLayer url="https://dev.api.earthobservation.vam.wfp.org/tiles/latest/viq_dekad/{z}/{x}/{y}.png" />
        </Pane>
      )}

      {selectedMapType === GlobalInsight.RAINFALL && (
        <Pane name="vegetation_raster" style={{ zIndex: 401 }}>
          <TileLayer url="https://dev.api.earthobservation.vam.wfp.org/tiles/latest/r3q_dekad/{z}/{x}/{y}.png" />
        </Pane>
      )}

      {selectedMapType === GlobalInsight.IPC && (
        <IpcChoropleth countries={countries} onDataUnavailable={onDataUnavailable} />
      )}
      <div className="absolute right-[75px] top-[20px] z-[9999]">
        <ShareButton text="World Food Programme Hunger Map" />
      </div>
    </MapContainer>
  );
}
