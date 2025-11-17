"use client";
import {
  GoogleMap,
  useLoadScript,
  Polyline,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useContext, useEffect, useRef } from "react";
import { ENVIRONMENTS } from "@/core/environments";
import { FindTripActionEnum, FindTripContext } from "../../context";
import { MapInfoWindow } from "@/core/components/map_info_window";
import { getDictionaries } from "../../i18n";
import useGeolocation from "@/core/utils/map/hooks/useGeoLocation";
import {
  ROUTE_BOUND_CONSTANTS,
  CONTAINER_STYLE,
  COORDINATE,
  LATITUDE_COORDINATE_MARKER_CORRECTION,
  LIBRARIES,
  MAP_OPTIONS,
} from "@/core/utils/map/constants";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";

export const MapFindTrip = () => {
  const apiKey = ENVIRONMENTS.GOOGLE_MAP_API_KEY;
  const dictionaries = getDictionaries();
  const { state, dispatch } = useContext(FindTripContext);
  const { isLg } = useTailwindBreakpoint();
  const { location: userLocation, error: userLocationError } = useGeolocation();

  if (!apiKey) {
    console.error(
      "🚨 API Key tidak ditemukan! Pastikan sudah diatur di .env.local"
    );
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: LIBRARIES,
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  // NOTES: set user location
  useEffect(() => {
    if (!!userLocation && !userLocationError) {
      const mapCoordinate = !!state.filters.origin.selected.item
        ? state.filters.origin.selected.lat_lng
        : userLocationError
        ? COORDINATE.germany
        : userLocation;
      dispatch({
        type: FindTripActionEnum.SetMapData,
        payload: {
          ...state.map,
          initial_coordinate: mapCoordinate,
          mode: !!state.filters.origin.selected.item
            ? "route"
            : userLocationError
            ? "country"
            : "coordinate",
          marker: !!state.filters.origin.selected.item
            ? true
            : userLocationError
            ? false
            : true,
        },
      });
    }
  }, [userLocation?.lat, userLocation?.lng, userLocationError]);
  // NOTES: readjust map view
  useEffect(() => {
    if (mapRef.current && state.map.mode === "route") {
      const bounds = new window.google.maps.LatLngBounds();
      state.map.polyline_path.forEach((point) => bounds.extend(point));

      mapRef.current.fitBounds(
        bounds,
        isLg ? ROUTE_BOUND_CONSTANTS.desktop : ROUTE_BOUND_CONSTANTS.mobile
      );
    }
  }, [isLoaded, state.map.polyline_path, isLg, state.map.mode]);

  if (!isLoaded) return <div />;

  return (
    <GoogleMap
      mapContainerStyle={CONTAINER_STYLE}
      onLoad={(map) => {
        mapRef.current = map;
      }}
      center={
        state.map.mode === "country" && !!state.map.initial_coordinate
          ? state.map.initial_coordinate
          : state.map.mode === "coordinate" && !!state.map.initial_coordinate
          ? {
              lat:
                state.map.initial_coordinate.lat -
                LATITUDE_COORDINATE_MARKER_CORRECTION,
              lng: state.map.initial_coordinate.lng,
            }
          : undefined
      }
      options={
        state.map.mode === "country"
          ? MAP_OPTIONS.country
          : state.map.mode === "coordinate"
          ? MAP_OPTIONS.coordinate
          : MAP_OPTIONS.route
      }
    >
      {/* User Marker */}
      {!!state.map.initial_coordinate && (
        <Marker
          position={state.map.initial_coordinate}
          icon={{
            ...dictionaries.map.marker.origin.icon,
            scaledSize: new window.google.maps.Size(32, 56),
          }}
        />
      )}
      
      {/* Start Marker */}
      {!!state.filters.origin.selected.lat_lng && state.map.marker && (
        <Marker
          position={state.filters.origin.selected.lat_lng}
          icon={{
            ...dictionaries.map.marker.origin.icon,
            scaledSize: new window.google.maps.Size(32, 56),
          }}
        />
      )}

      {/* Start Info Window */}
      {!!state.filters.origin.selected.item &&
        !!state.filters.origin.selected.lat_lng &&
        state.map.marker && (
          <InfoWindow
            position={state.filters.origin.selected.lat_lng}
            options={{
              headerDisabled: true,
            }}
          >
            <MapInfoWindow
              {...dictionaries.map.info_window.origin}
              description={state.filters.origin.selected.item.name}
            />
          </InfoWindow>
        )}

      {/* Destination Marker */}
      {!!state.filters.destination.selected.lat_lng && state.map.marker && (
        <Marker
          position={state.filters.destination.selected.lat_lng}
          icon={{
            ...dictionaries.map.marker.destination.icon,
            scaledSize: new window.google.maps.Size(32, 56),
          }}
        />
      )}

      {/* Destination InfoWindow */}
      {!!state.filters.destination.selected.item &&
        !!state.filters.destination.selected.lat_lng &&
        state.map.marker && (
          <InfoWindow
            position={state.filters.destination.selected.lat_lng}
            options={{
              headerDisabled: true,
            }}
          >
            <MapInfoWindow
              {...dictionaries.map.info_window.destination}
              description={state.filters.destination.selected.item.name}
            />
          </InfoWindow>
        )}

      {!!state.map.polyline_path.length && state.map.marker && (
        <Polyline
          path={state.map.polyline_path}
          options={{
            strokeColor: "#33CC33",
            strokeOpacity: 0.8,
            strokeWeight: 8,
          }}
        />
      )}
    </GoogleMap>
  );
};
