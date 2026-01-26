"use client";
import { RIDE_FILTER } from "@/core/enums";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { ResultTripContext } from "./Result.trip.context";
import {
  getLatLngFromPlaceId,
  getPlaceNameFromPlaceId,
} from "@/core/utils/map/functions";
import { ResultTripActionEnum } from "./Result.trip.types";
import { ENVIRONMENTS } from "@/core/environments";
import { useLoadScript } from "@react-google-maps/api";
import { LIBRARIES } from "@/core/utils/map/constants";
import { getDictionaries } from "../i18n";
import { INDEXDB_STORAGE_NAME } from "@/core/utils/indexdb/constants";
import { storageService } from "@/core/services/storage/indexdb";
import { UserContext } from "@/core/modules/app/context";

export const useRideFilterResultTrip = () => {
  const apiKey = ENVIRONMENTS.GOOGLE_MAP_API_KEY;
  const dictionaries = getDictionaries();
  const searchParams = useSearchParams();
  const originId = searchParams.get(RIDE_FILTER.ORIGIN);
  const destinationId = searchParams.get(RIDE_FILTER.DESTINATION);
  const date = searchParams.get(RIDE_FILTER.DATE);
  const adult = searchParams.get(RIDE_FILTER.ADULT_PASSENGER);
  const children = searchParams.get(RIDE_FILTER.CHILDREN_PASSENGER);
  const carSeat = searchParams.get(RIDE_FILTER.CAR_SEAT);

  const { state, dispatch } = React.useContext(ResultTripContext);
  const { state: userState } = React.useContext(UserContext);
  const companyOfficeAddreses =
    userState.profile?.organization?.addresses ?? [];
  const companyOfficeItems =
    companyOfficeAddreses?.map((item) => {
      return {
        id: String(item.id),
        name: item.name ?? "",
        description: item.address ?? "",
      };
    }) ?? [];
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: LIBRARIES,
  });

  const setOriginRoutesFromParams = async (data: { id: string }) => {
    let lat_lng: null | { lat: number; lng: number } = null;
    let name: string = "";
    try {
      const response = await getLatLngFromPlaceId(data.id);
      lat_lng = {
        lat: response.lat,
        lng: response.lng,
      };
    } catch (err) {
      throw new Error(`Err get lat lng ${err}`);
    }

    try {
      const response = await getPlaceNameFromPlaceId(data.id);
      name = response.name;
    } catch (err) {
      throw new Error(`Err get lat lng ${err}`);
    }

    return {
      data: {
        id: data.id,
        name: name,
      },
      lat_lng: lat_lng,
    };
  };

  const setDestinationRoutesFromParams = async (data: { id: string }) => {
    let lat_lng: null | { lat: number; lng: number } = null;
    let name: string = "";
    try {
      const response = await getLatLngFromPlaceId(data.id);
      lat_lng = {
        lat: response.lat,
        lng: response.lng,
      };
    } catch (err) {
      throw new Error(`Err get lat lng ${err}`);
    }

    try {
      const response = await getPlaceNameFromPlaceId(data.id);
      name = response.name;
    } catch (err) {
      throw new Error(`Err get lat lng ${err}`);
    }

    return {
      data: {
        id: data.id,
        name: name,
      },
      lat_lng: lat_lng,
    };
  };

  const setDefaultData = async () => {
    const findTripOriginStorage = await storageService<
      null | { id: string; name: string }[]
    >({
      method: "getItem",
      key: INDEXDB_STORAGE_NAME.FIND_TRIP_ORIGIN_SEARCH_LIST,
    });

    const findTripDestinationStorage = await storageService<
      null | { id: string; name: string }[]
    >({
      method: "getItem",
      key: INDEXDB_STORAGE_NAME.FIND_TRIP_DESTINATION_SEARCH_LIST,
    });
    let originData: null | { id: string; name: string } = null;
    let originLatLng: null | { lat: number; lng: number } = null;
    let isOriginCompanyAddress: boolean = false;

    let destinationData: null | { id: string; name: string } = null;
    let destinationLatLng: null | { lat: number; lng: number } = null;
    let isDestinationCompanyAddress: boolean = false;

    let dateData: Date[] = [];

    let adultData: null | number = null;
    let childrenData: null | number = null;

    let carSeatData: boolean = false;

    if (originId) {
      const isCompanyAddressId = !isNaN(parseInt(originId));
      if (isCompanyAddressId) {
        const selectedCompanyAddress = companyOfficeAddreses.find(
          (item) => String(item.id) === originId,
        );
        if (!!selectedCompanyAddress) {
          isOriginCompanyAddress = true;
          originData = {
            id: String(selectedCompanyAddress.id),
            name: selectedCompanyAddress.name ?? "",
          };
          originLatLng = {
            lat: selectedCompanyAddress.latitude,
            lng: selectedCompanyAddress.longitude,
          };
        }
      } else {
        const { data, lat_lng } = await setOriginRoutesFromParams({
          id: originId,
        });
        if (!!data && !!lat_lng) {
          originData = data;
          originLatLng = lat_lng;
        }
      }
    }

    if (destinationId) {
      const isCompanyAddressId = !isNaN(parseInt(destinationId));
      if (isCompanyAddressId) {
        const selectedCompanyAddress = companyOfficeAddreses.find(
          (item) => String(item.id) === destinationId,
        );
        if (!!selectedCompanyAddress) {
          isDestinationCompanyAddress = true;
          destinationData = {
            id: String(selectedCompanyAddress.id),
            name: selectedCompanyAddress.name ?? "",
          };
          destinationLatLng = {
            lat: selectedCompanyAddress.latitude,
            lng: selectedCompanyAddress.longitude,
          };
        }
      } else {
        const { data, lat_lng } = await setDestinationRoutesFromParams({
          id: destinationId,
        });
        if (!!data && !!lat_lng) {
          destinationData = data;
          destinationLatLng = lat_lng;
        }
      }
    }

    if (date) {
      // Parse multiple dates from comma-separated string
      const dateStrings = date.split(",").map((d) => d.trim());
      dateData = dateStrings
        .map((dateStr) => {
          const parsedDate = new Date(dateStr);
          return isNaN(parsedDate.getTime()) ? null : parsedDate;
        })
        .filter(Boolean) as Date[];

      // If no valid dates parsed, default to today
      if (dateData.length === 0) {
        dateData = [new Date()];
      }
    } else {
      // Default to today if no date parameter
      dateData = [new Date()];
    }

    if (adult) {
      adultData = Number(adult);
    }

    if (children) {
      childrenData = Number(children);
    }

    if (carSeat) {
      carSeatData = true;
    }

    if (!!originData && !!destinationData) {
      dispatch({
        type: ResultTripActionEnum.SetFiltersData,
        payload: {
          ...state.filters,

          origin: {
            ...state.filters.origin,
            selected: {
              ...state.filters.origin.selected,
              item: originData,
              lat_lng: originLatLng,
            },
            saved_items: !findTripOriginStorage.data
              ? []
              : findTripOriginStorage.data,
            items: isOriginCompanyAddress
              ? companyOfficeItems.filter(
                  (item) => item.id !== destinationData?.id,
                )
              : state.filters.origin.items,
            company_office: {
              ...state.filters.origin.company_office,
              checked: isOriginCompanyAddress,
            },
          },
          destination: {
            ...state.filters.destination,
            selected: {
              ...state.filters.destination.selected,
              item: destinationData,
              lat_lng: destinationLatLng,
            },
            saved_items: !findTripDestinationStorage.data
              ? []
              : findTripDestinationStorage.data,
            items: isDestinationCompanyAddress
              ? companyOfficeItems.filter((item) => item.id !== originData?.id)
              : state.filters.destination.items,
            company_office: {
              ...state.filters.destination.company_office,
              checked: isDestinationCompanyAddress,
            },
          },
          date: {
            mode: dateData.length > 1 ? "multiple" : "single",
            selected: dateData.length === 1 ? dateData[0] : dateData,
          },

          passenger: {
            ...state.filters.passenger,
            value: dictionaries.filter.form.passenger.detail.items.map(
              (item) => {
                return {
                  ...item,
                  value:
                    item.id === "adult"
                      ? (adultData ?? 0)
                      : item.id === "children"
                        ? (childrenData ?? 0)
                        : 0,
                };
              },
            ),
            car_seat: {
              ...state.filters.passenger.car_seat,
              checked: carSeatData,
            },
          },
        },
      });
    }
  };

  React.useEffect(() => {
    if (!isLoaded || !window.google) return;

    // Wait for user profile to be loaded if we need company addresses
    const needsCompanyAddresses =
      (originId && !isNaN(parseInt(originId))) ||
      (destinationId && !isNaN(parseInt(destinationId)));

    if (
      needsCompanyAddresses &&
      (!userState.profile || !companyOfficeAddreses.length)
    ) {
      return;
    }

    setDefaultData();
  }, [
    isLoaded,
    userState.profile,
    companyOfficeAddreses.length,
    originId,
    destinationId,
  ]);
};
