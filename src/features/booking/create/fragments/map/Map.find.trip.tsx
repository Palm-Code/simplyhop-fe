"use client";
import {
  GoogleMap,
  useLoadScript,
  Polyline,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useContext, useEffect, useRef, useMemo } from "react";
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
  createMapOptions,
} from "@/core/utils/map/constants";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { ThemeContext } from "@/core/modules/app/context/theme/Theme.context";

export const MapFindTrip = () => {
  const apiKey = ENVIRONMENTS.GOOGLE_MAP_API_KEY;
  const dictionaries = getDictionaries();
  const { state, dispatch } = useContext(FindTripContext);
  const { isLg } = useTailwindBreakpoint();
  const { location: userLocation, error: userLocationError } = useGeolocation();
  const { isDarkMode } = useContext(ThemeContext);

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

  // Memoize map options based on mode and theme
  const mapOptions = useMemo(() => {
    return createMapOptions(state.map.mode, isDarkMode);
  }, [state.map.mode, isDarkMode]);

  // NOTES: set user location
  useEffect(() => {
    // Guard: skip if userLocation is not ready yet and is not error
    if (!userLocation && !userLocationError) return;

    const mapCoordinate = !!state.filters.origin.selected.item
      ? state.filters.origin.selected.lat_lng
      : !!userLocationError
      ? COORDINATE.germany
      : userLocation;

    const mode =
      !!state.filters.origin.selected.item &&
      !!state.filters.destination.selected.item
        ? "route"
        : !!userLocationError
        ? "country"
        : "coordinate";

    // Guard: skip dispatch if value is not changed
    if (
      state.map.mode === mode &&
      state.map.initial_coordinate?.lat === mapCoordinate?.lat &&
      state.map.initial_coordinate?.lng === mapCoordinate?.lng
    ) {
      return;
    }

    dispatch({
      type: FindTripActionEnum.SetMapData,
      payload: {
        ...state.map,
        initial_coordinate: mapCoordinate,
        mode: mode,
        marker: !!state.filters.origin.selected.item
          ? true
          : !!userLocationError
          ? false
          : true,
      },
    });
  }, [
    userLocation?.lat,
    userLocation?.lng,
    userLocationError,
    state.filters.origin.selected.item,
    state.filters.origin.selected.lat_lng,
    state.filters.destination.selected.item,
    state.map.mode,
    state.map.initial_coordinate,
    dispatch,
  ]);

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
      options={mapOptions}
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
            strokeColor: isDarkMode ? "#4CAF50" : "#33CC33",
            strokeOpacity: 0.8,
            strokeWeight: 8,
          }}
        />
      )}
    </GoogleMap>
  );
};
