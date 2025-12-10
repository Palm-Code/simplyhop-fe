"use client";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useContext, useEffect, useRef, useMemo, useState } from "react";
import { ENVIRONMENTS } from "@/core/environments";
import {
  CreateOrganizationActionEnum,
  CreateOrganizationContext,
} from "../../context";
import { getDictionaries } from "../../i18n";
import useGeolocation from "@/core/utils/map/hooks/useGeoLocation";
import {
  ROUTE_BOUND_CONSTANTS,
  COORDINATE,
  LIBRARIES,
  createMapOptions,
  PIN_POINT_MAP_CONTAINER_STYLE,
} from "@/core/utils/map/constants";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { ThemeContext } from "@/core/modules/app/context/theme/Theme.context";
import clsx from "clsx";
import SVGIcon from "@/core/icons";

export const PinPointMapCreateOrganization = () => {
  const apiKey = ENVIRONMENTS.GOOGLE_MAP_API_KEY;
  const dictionaries = getDictionaries();
  const { state, dispatch } = useContext(CreateOrganizationContext);
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
  const [hasMovedFromInitial, setHasMovedFromInitial] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const [addressInfo, setAddressInfo] = useState<{
    street: string;
    zipcode: string;
    city: string;
    country: string;
  } | null>(null);

  // Memoize map options based on mode and theme
  const mapOptions = useMemo(() => {
    return createMapOptions(state.pin_point.map.mode, isDarkMode);
  }, [state.pin_point.map.mode, isDarkMode]);

  // Handle marker drag end
  const handleMarkerDragEnd = async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;

    const newLat = e.latLng.lat();
    const newLng = e.latLng.lng();
    const newCoordinate = { lat: newLat, lng: newLng };

    setHasMovedFromInitial(true);
    console.log("📍 New Coordinates:", newCoordinate);

    // Get place information using Geocoding API
    try {
      const geocoder = new google.maps.Geocoder();
      const result = await geocoder.geocode({ location: newCoordinate });

      if (result.results && result.results[0]) {
        const place = result.results[0];
        console.log("📍 Place Info:", {
          formatted_address: place.formatted_address,
          place_id: place.place_id,
          address_components: place.address_components,
        });

        // Parse address components
        const addressComponents = place.address_components;

        // Street: route or formatted_address as fallback
        const route =
          addressComponents.find((c) => c.types.includes("route"))?.long_name ||
          "";
        const streetNumber =
          addressComponents.find((c) => c.types.includes("street_number"))
            ?.long_name || "";
        const sublocality =
          addressComponents.find(
            (c) =>
              c.types.includes("sublocality_level_1") ||
              c.types.includes("sublocality")
          )?.long_name || "";

        // Build street name with priority: route + number > sublocality > formatted_address
        let fullStreet = "";
        if (route) {
          fullStreet = streetNumber ? `${route} ${streetNumber}` : route;
        } else if (sublocality) {
          fullStreet = sublocality;
        } else {
          // Use formatted_address as fallback for street name
          fullStreet = place.formatted_address.split(",")[0].trim();
        }

        // Zipcode: postal_code (optional)
        const zipcode =
          addressComponents.find((c) => c.types.includes("postal_code"))
            ?.long_name || "";

        // City: administrative_area_level_2 (Kota/Kabupaten) or locality
        const city =
          addressComponents.find((c) =>
            c.types.includes("administrative_area_level_2")
          )?.long_name ||
          addressComponents.find((c) => c.types.includes("locality"))
            ?.long_name ||
          "";

        // Country
        const country =
          addressComponents.find((c) => c.types.includes("country"))
            ?.long_name || "";

        setAddressInfo({
          street: fullStreet,
          zipcode,
          city,
          country,
        });

        // Update context with new location
        dispatch({
          type: CreateOrganizationActionEnum.SetPinPointData,
          payload: {
            ...state.pin_point,
            location: {
              ...state.pin_point.location,
              selected: {
                item: {
                  id: place.place_id,
                  name: place.formatted_address,
                },
                lat_lng: newCoordinate,
              },
            },
            map: {
              ...state.pin_point.map,
              initial_coordinate: newCoordinate,
            },
          },
        });
      }
    } catch (error) {
      console.error("Error getting place info:", error);
      // Update coordinate only if geocoding fails
      dispatch({
        type: CreateOrganizationActionEnum.SetPinPointData,
        payload: {
          ...state.pin_point,
          location: {
            ...state.pin_point.location,
            selected: {
              ...state.pin_point.location.selected,
              lat_lng: newCoordinate,
            },
          },
          map: {
            ...state.pin_point.map,
            initial_coordinate: newCoordinate,
          },
        },
      });
    }
  };

  // Handle reset to user location
  const handleResetToUserLocation = () => {
    if (userLocation) {
      setHasMovedFromInitial(false);
      setAddressInfo(null);
      dispatch({
        type: CreateOrganizationActionEnum.SetPinPointData,
        payload: {
          ...state.pin_point,
          location: {
            ...state.pin_point.location,
            selected: {
              item: null,
              lat_lng: null,
            },
          },
          map: {
            ...state.pin_point.map,
            initial_coordinate: userLocation,
            mode: "coordinate",
            marker: true,
          },
        },
      });
    }
  };

  // NOTES: set user location
  useEffect(() => {
    if (!!userLocation && !userLocationError) {
      const mapCoordinate = !!state.pin_point.location.selected.item
        ? state.pin_point.location.selected.lat_lng
        : userLocationError
        ? COORDINATE.germany
        : userLocation;
      dispatch({
        type: CreateOrganizationActionEnum.SetPinPointData,
        payload: {
          ...state.pin_point,
          map: {
            ...state.pin_point.map,
            initial_coordinate: mapCoordinate,
            mode: !!state.pin_point.location.selected.item
              ? "route"
              : userLocationError
              ? "country"
              : "coordinate",
            marker: !!state.pin_point.location.selected.item
              ? true
              : userLocationError
              ? false
              : true,
          },
        },
      });
    }
  }, [userLocation?.lat, userLocation?.lng, userLocationError]);

  // NOTES: Get address info for initial user location (only after map is ready)
  useEffect(() => {
    if (
      isMapReady &&
      isLoaded &&
      userLocation &&
      !userLocationError &&
      !state.pin_point.location.selected.item &&
      !addressInfo
    ) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: userLocation }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const place = results[0];

          const addressComponents = place.address_components;

          // Street: route or formatted_address as fallback
          const route =
            addressComponents.find((c) => c.types.includes("route"))
              ?.long_name || "";
          const streetNumber =
            addressComponents.find((c) => c.types.includes("street_number"))
              ?.long_name || "";
          const sublocality =
            addressComponents.find(
              (c) =>
                c.types.includes("sublocality_level_1") ||
                c.types.includes("sublocality")
            )?.long_name || "";

          // Build street name with priority: route + number > sublocality > formatted_address
          let fullStreet = "";
          if (route) {
            fullStreet = streetNumber ? `${route} ${streetNumber}` : route;
          } else if (sublocality) {
            fullStreet = sublocality;
          } else {
            // Use formatted_address as fallback for street name
            fullStreet = place.formatted_address.split(",")[0].trim();
          }

          // Zipcode: postal_code (optional)
          const zipcode =
            addressComponents.find((c) => c.types.includes("postal_code"))
              ?.long_name || "";

          // City: administrative_area_level_2 (Kota/Kabupaten) or locality
          const city =
            addressComponents.find((c) =>
              c.types.includes("administrative_area_level_2")
            )?.long_name ||
            addressComponents.find((c) => c.types.includes("locality"))
              ?.long_name ||
            "";

          // Country
          const country =
            addressComponents.find((c) => c.types.includes("country"))
              ?.long_name || "";

          setAddressInfo({
            street: fullStreet,
            zipcode,
            city,
            country,
          });
        }
      });
    }
  }, [
    isMapReady,
    isLoaded,
    userLocation,
    userLocationError,
    state.pin_point.location.selected.item,
    addressInfo,
  ]);

  // NOTES: readjust map view
  useEffect(() => {
    if (mapRef.current && state.pin_point.map.mode === "route") {
      const bounds = new window.google.maps.LatLngBounds();

      mapRef.current.fitBounds(
        bounds,
        isLg ? ROUTE_BOUND_CONSTANTS.desktop : ROUTE_BOUND_CONSTANTS.mobile
      );
    }
  }, [isLoaded, isLg, state.pin_point.map.mode]);

  if (!isLoaded) return <div />;

  return (
    <div className={clsx("relative", "w-full")}>
      <GoogleMap
        mapContainerStyle={PIN_POINT_MAP_CONTAINER_STYLE}
        onLoad={(map) => {
          mapRef.current = map;
          setIsMapReady(true);
        }}
        center={
          state.pin_point.map.mode === "country" &&
          !!state.pin_point.map.initial_coordinate
            ? state.pin_point.map.initial_coordinate
            : state.pin_point.map.mode === "coordinate" &&
              !!state.pin_point.map.initial_coordinate
            ? state.pin_point.map.initial_coordinate
            : undefined
        }
        options={mapOptions}
      >
        {/* User Marker */}
        {(!!state.pin_point.location.selected.lat_lng ||
          !!state.pin_point.map.initial_coordinate) && (
          <Marker
            position={
              state.pin_point.location.selected.lat_lng ||
              state.pin_point.map.initial_coordinate!
            }
            icon={{
              ...dictionaries.pin_point.map.marker.origin.icon,
              scaledSize: new window.google.maps.Size(32, 56),
            }}
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
          />
        )}
      </GoogleMap>

      {/* Reset Button - Overlay on top of map */}
      {hasMovedFromInitial && userLocation && (
        <button
          onClick={handleResetToUserLocation}
          className={clsx(
            "absolute top-4 left-4 z-10",
            "flex items-center gap-2",
            "px-3 py-2",
            "bg-white dark:bg-[#232323]",
            "border border-[#E2E2E2] dark:border-[#464646]",
            "rounded-lg",
            "shadow-md",
            "text-[0.875rem] font-medium",
            "text-[#249124] dark:text-[#33CC33]",
            "hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A]",
            "transition-colors cursor-pointer"
          )}
        >
          <SVGIcon
            name="Navigation"
            className={clsx("w-4 h-4", "text-[#249124] dark:text-[#33CC33]")}
          />
          Aktuellen Standort verwenden
        </button>
      )}

      {/* Address Info Box - Overlay below map */}
      {addressInfo && (
        <div
          className={clsx(
            "absolute bottom-4 left-4 right-4 z-10",
            "flex items-start gap-3",
            "px-4 py-3",
            "bg-white dark:bg-[#232323]",
            "border border-[#E2E2E2] dark:border-[#464646]",
            "rounded-lg",
            "shadow-md"
          )}
        >
          <SVGIcon
            name="MapPin"
            className={clsx(
              "w-5 h-5 mt-0.5",
              "text-[#249124] dark:text-[#33CC33]"
            )}
          />
          <div className={clsx("flex flex-col gap-1")}>
            <p
              className={clsx(
                "text-[0.9375rem] font-semibold",
                "text-[#232323] dark:text-white"
              )}
            >
              {addressInfo.street}
            </p>
            <p
              className={clsx(
                "text-[0.8125rem] font-normal",
                "text-[#606060] dark:text-[#C3C3C3]"
              )}
            >
              {[addressInfo.zipcode, addressInfo.city, addressInfo.country]
                .filter(Boolean)
                .join(", ")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
