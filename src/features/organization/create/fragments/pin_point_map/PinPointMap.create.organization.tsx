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
import { PlaceAutocomplete } from "../../components/place_autocomplete";
import { ResetLocationButton } from "../../components/reset_location_button";
import { AddressInfoBox } from "../../components/address_info_box";
import { Button } from "@/core/components/button";

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

    // Get place information using Geocoding API
    try {
      const geocoder = new google.maps.Geocoder();
      const result = await geocoder.geocode({ location: newCoordinate });

      if (result.results && result.results[0]) {
        const place = result.results[0];

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

        const name = fullStreet;
        const description = [zipcode, city, country].filter(Boolean).join(", ");

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
                  name: name,
                  description: description,
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
    } catch {
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
      // setAddressInfo(null);
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

  // Handle place selection from autocomplete
  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    if (!place.geometry?.location) return;

    const newCoordinate = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };

    setHasMovedFromInitial(true);

    // Parse address components
    const addressComponents = place.address_components || [];

    // Street: route or formatted_address as fallback
    const route =
      addressComponents.find((c) => c.types.includes("route"))?.long_name || "";
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
      fullStreet = (place.formatted_address || "").split(",")[0].trim();
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
      addressComponents.find((c) => c.types.includes("locality"))?.long_name ||
      "";

    // Country
    const country =
      addressComponents.find((c) => c.types.includes("country"))?.long_name ||
      "";

    const name = fullStreet;
    const description = [zipcode, city, country].filter(Boolean).join(", ");

    // Update context with new location
    dispatch({
      type: CreateOrganizationActionEnum.SetPinPointData,
      payload: {
        ...state.pin_point,
        location: {
          ...state.pin_point.location,
          selected: {
            item: {
              id: place.place_id || "",
              name: name || "",
              description: description,
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

    // Center map on new location
    if (mapRef.current) {
      mapRef.current.panTo(newCoordinate);
      mapRef.current.setZoom(17);
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
      !state.pin_point.location.selected.item
      // &&
      // !addressInfo
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

          const name = fullStreet;
          const description = [zipcode, city, country]
            .filter(Boolean)
            .join(", ");

          // Update context with new location
          dispatch({
            type: CreateOrganizationActionEnum.SetPinPointData,
            payload: {
              ...state.pin_point,
              location: {
                ...state.pin_point.location,
                selected: {
                  item: {
                    id: place.place_id || "",
                    name: name || "",
                    description: description,
                  },
                  lat_lng: {
                    lat: userLocation.lat,
                    lng: userLocation.lng,
                  },
                },
              },
              map: {
                ...state.pin_point.map,
                initial_coordinate: {
                  lat: userLocation.lat,
                  lng: userLocation.lng,
                },
                mode: "coordinate",
              },
            },
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
    // addressInfo,
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

  const handleClickSave = () => {
    const id = state.pin_point.index;
    if (id === null) return;

    dispatch({
      type: CreateOrganizationActionEnum.SetCompanyOfficeData,
      payload: {
        ...state.company_office,
        form: state.company_office.form.map((form, formIndex) => {
          return {
            ...form,
            pin_point: {
              ...form.pin_point,
              value:
                formIndex === id
                  ? {
                      lat: state.pin_point.location.selected.lat_lng?.lat ?? 0,
                      lng: state.pin_point.location.selected.lat_lng?.lng ?? 0,
                      location_1:
                        state.pin_point.location.selected.item?.name ?? "",
                      location_2:
                        state.pin_point.location.selected.item?.description ??
                        "",
                    }
                  : form.pin_point.value,
            },
          };
        }),
      },
    });
    dispatch({
      type: CreateOrganizationActionEnum.SetPinPointData,
      payload: {
        is_open: false,
        index: null,
        location: {
          selected: {
            item: null,
            lat_lng: null,
          },
          items: [],
          query: "",
        },
        map: {
          marker: false,
          initial_coordinate: null,
          mode: "country",
        },
      },
    });
  };

  return (
    <div className={clsx("flex flex-col gap-4", "w-full")}>
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

        {/* Address Info Box - Overlay below map */}
        {/* {(addressInfo || (hasMovedFromInitial && userLocation)) && ( */}
        {(state.pin_point.location.selected.item ||
          (hasMovedFromInitial && userLocation)) && (
          <div
            className={clsx(
              "absolute bottom-3 left-0 right-0 z-10",
              "grid grid-cols-1 place-content-start place-items-start gap-2",
              "w-full",
              "px-3"
            )}
          >
            {hasMovedFromInitial && userLocation && (
              <ResetLocationButton onClick={handleResetToUserLocation} />
            )}

            {state.pin_point.location.selected.item && (
              <AddressInfoBox
                name={state.pin_point.location.selected.item.name}
                description={state.pin_point.location.selected.item.description}
              />
            )}
          </div>
        )}
      </div>

      {/* Place Autocomplete Search */}
      <PlaceAutocomplete
        onPlaceSelect={handlePlaceSelect}
        isLoaded={isLoaded}
      />

      <Button
        aria-label={dictionaries.cta.save.children}
        name={dictionaries.cta.save.children}
        className={clsx("py-3!")}
        onClick={handleClickSave}
      >
        {dictionaries.pin_point.cta.save.children}
      </Button>
    </div>
  );
};
