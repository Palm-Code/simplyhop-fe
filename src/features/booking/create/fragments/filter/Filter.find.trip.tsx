"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { FindTripActionEnum, FindTripContext } from "../../context";
import { DatePicker } from "@/core/components/datepicker";
import { useRestGooglePostRouteDirections } from "../../react_query/hooks";
import { useRouter } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import { RIDE_FILTER } from "@/core/enums";
import dayjs from "dayjs";
import { Button } from "@/core/components/button";
import {
  fetchAutocompletePlace,
  getLatLngFromPlaceId,
} from "@/core/utils/map/functions";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { FormPassenger } from "@/core/components/form_passenger";
import { FormRoutes } from "@/core/components/form_routes";
import { storageService } from "@/core/services/storage/indexdb";
import { INDEXDB_STORAGE_NAME } from "@/core/utils/indexdb/constants";
import { UserContext } from "@/core/modules/app/context";
import useGeolocation from "@/core/utils/map/hooks/useGeoLocation";
import { stat } from "fs";

export const FilterFindTrip = () => {
  const router = useRouter();
  const dictionaries = getDictionaries();
  const { state: userState } = React.useContext(UserContext);
  const { state, dispatch } = React.useContext(FindTripContext);
  const { isLg } = useTailwindBreakpoint();
  const { location: userLocation, error: userLocationError } = useGeolocation();

  useRestGooglePostRouteDirections();

  const isOriginFromOffice = !!state.filters.origin.company_office.selected;
  const selectedItemOrigin = state.filters.origin.selected.item;
  const isDestinationFromOffice =
    !!state.filters.destination.company_office.selected;
  const selectedItemDestination = state.filters.destination.selected.item;
  const handleClickOriginRoutes = () => {
    dispatch({
      type: FindTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        origin: {
          ...state.filters.origin,
          page_sheet: {
            ...state.filters.origin.page_sheet,
            is_open: true,
          },
        },
      },
    });
  };

  const handleCloseOriginRoutes = () => {
    dispatch({
      type: FindTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        origin: {
          ...state.filters.origin,
          page_sheet: {
            ...state.filters.origin.page_sheet,
            is_open: false,
          },
          query: !state.filters.origin.selected.item
            ? ""
            : state.filters.origin.selected.item.name,
        },
      },
    });
  };

  const handleQueryOriginRoutes = async (input: string) => {
    dispatch({
      type: FindTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        origin: {
          ...state.filters.origin,
          items: state.filters.origin.company_office.selected
            ? !input.length
              ? userState.profile?.organization?.addresses?.map((item) => {
                  return {
                    id: String(item.id),
                    name: userState.profile?.organization?.name ?? "",
                    description: item.address ?? "",
                  };
                }) ?? []
              : state.filters.origin.items.filter(
                  (item) =>
                    item.name.toLowerCase().includes(input.toLowerCase()) ||
                    item.description
                      ?.toLowerCase()
                      .includes(input.toLowerCase())
                )
            : !input.length
            ? []
            : state.filters.origin.items,
          query: input,
        },
      },
    });
    if (!input.length) return;

    if (state.filters.origin.company_office.selected) return;

    const handleResult = (
      // data: null | google.maps.places.AutocompletePrediction[]
      data: null | { description: string; place_id: string }[]
    ) => {
      if (!!data) {
        dispatch({
          type: FindTripActionEnum.SetFiltersData,
          payload: {
            ...state.filters,
            origin: {
              ...state.filters.origin,
              items: data.map((p) => {
                return {
                  id: p.place_id,
                  name: p.description,
                };
              }),
            },
          },
        });
      }
    };
    await fetchAutocompletePlace(
      input,
      // state.filters.city.selected.lat_lng,
      handleResult
    );
  };

  const handleSelectOriginRoutes = async (data: {
    id: string;
    name: string;
  }) => {
    let lat_lng: null | { lat: number; lng: number } = null;

    if (state.filters.origin.company_office.selected) {
      const selectedOfficeAddress =
        userState.profile?.organization?.addresses.find(
          (item) => String(item.id) === data.id
        );
      if (!selectedOfficeAddress) return;
      lat_lng = {
        lat: selectedOfficeAddress.latitude,
        lng: selectedOfficeAddress.longitude,
      };
    } else {
      try {
        const response = await getLatLngFromPlaceId(data.id);
        lat_lng = {
          lat: response.lat,
          lng: response.lng,
        };
      } catch (err) {
        throw new Error(`Err get lat lng ${err}`);
      }
    }

    await dispatch({
      type: FindTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        origin: {
          ...state.filters.origin,
          page_sheet: {
            ...state.filters.origin,
            is_open: false,
          },
          selected: {
            ...state.filters.origin.selected,
            item: data,
            lat_lng: lat_lng,
          },
          query: !data ? "" : data.name,
        },
        destination: {
          ...state.filters.destination,
          company_office: {
            ...state.filters.destination.company_office,
            selected: isOriginFromOffice ? false : true,
          },
          items: isOriginFromOffice
            ? []
            : userState.profile?.organization?.addresses?.map((item) => {
                return {
                  id: String(item.id),
                  name: userState.profile?.organization?.name ?? "",
                  description: item.address ?? "",
                };
              }) ?? [],
        },
      },
    });
  };

  const handleClickResetLocationOrigin = async () => {
    if (!!userLocationError || !userLocation) return;

    const geocoder = new google.maps.Geocoder();

    try {
      const result = await geocoder.geocode({
        location: { lat: userLocation.lat, lng: userLocation.lng },
      });

      if (result.results && result.results[0]) {
        const place = result.results[0];

        dispatch({
          type: FindTripActionEnum.SetFiltersData,
          payload: {
            ...state.filters,
            origin: {
              ...state.filters.origin,
              page_sheet: {
                ...state.filters.origin,
                is_open: false,
              },
              selected: {
                ...state.filters.origin.selected,
                item: {
                  id: place.place_id,
                  name: place.formatted_address,
                },
                lat_lng: {
                  lat: userLocation.lat,
                  lng: userLocation.lng,
                },
              },
              query: place.formatted_address,
            },
            destination: {
              ...state.filters.destination,
              company_office: {
                ...state.filters.destination.company_office,
                selected: true,
              },
              items:
                userState.profile?.organization?.addresses?.map((item) => {
                  return {
                    id: String(item.id),
                    name: userState.profile?.organization?.name ?? "",
                    description: item.address ?? "",
                  };
                }) ?? [],
            },
          },
        });
      }
    } catch (error) {
      // Fallback ke coordinate string jika reverse geocoding gagal
      const userLocationLatLng = `${userLocation.lat},${userLocation.lng}`;
      dispatch({
        type: FindTripActionEnum.SetFiltersData,
        payload: {
          ...state.filters,
          origin: {
            ...state.filters.origin,
            page_sheet: {
              ...state.filters.origin,
              is_open: false,
            },
            selected: {
              ...state.filters.origin.selected,
              item: {
                id: userLocationLatLng,
                name: userLocationLatLng,
              },
              lat_lng: {
                lat: userLocation.lat,
                lng: userLocation.lng,
              },
            },
            query: userLocationLatLng,
          },
        },
      });
    }
  };

  const handleSwitchLocationOrigin = (checked: boolean) => {
    dispatch({
      type: FindTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        origin: {
          ...state.filters.origin,
          items: checked
            ? userState.profile?.organization?.addresses?.map((item) => {
                return {
                  id: String(item.id),
                  name: userState.profile?.organization?.name ?? "",
                  description: item.address ?? "",
                };
              }) ?? []
            : [],
          company_office: {
            ...state.filters.origin.company_office,
            selected: checked,
          },
        },
      },
    });
  };

  const handleClickDestinationRoutes = () => {
    dispatch({
      type: FindTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        destination: {
          ...state.filters.destination,
          page_sheet: {
            ...state.filters.destination.page_sheet,
            is_open: true,
          },
        },
      },
    });
  };

  const handleCloseDestinationRoutes = () => {
    dispatch({
      type: FindTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        destination: {
          ...state.filters.destination,
          page_sheet: {
            ...state.filters.destination.page_sheet,
            is_open: false,
          },
          query: !state.filters.destination.selected.item
            ? ""
            : state.filters.destination.selected.item.name,
        },
      },
    });
  };

  const handleQueryDestinationRoutes = async (input: string) => {
    dispatch({
      type: FindTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        destination: {
          ...state.filters.destination,
          items: state.filters.destination.company_office.selected
            ? !input.length
              ? userState.profile?.organization?.addresses?.map((item) => {
                  return {
                    id: String(item.id),
                    name: userState.profile?.organization?.name ?? "",
                    description: item.address ?? "",
                  };
                }) ?? []
              : state.filters.destination.items.filter(
                  (item) =>
                    item.name.toLowerCase().includes(input.toLowerCase()) ||
                    item.description
                      ?.toLowerCase()
                      .includes(input.toLowerCase())
                )
            : !input.length
            ? []
            : state.filters.destination.items,
          query: input,
        },
      },
    });
    if (!input.length) return;

    if (state.filters.destination.company_office.selected) return;

    const handleResult = (
      // data: null | google.maps.places.AutocompletePrediction[]
      data: null | { description: string; place_id: string }[]
    ) => {
      if (!!data) {
        dispatch({
          type: FindTripActionEnum.SetFiltersData,
          payload: {
            ...state.filters,
            destination: {
              ...state.filters.destination,
              items: data.map((p) => {
                return {
                  id: p.place_id,
                  name: p.description,
                };
              }),
            },
          },
        });
      }
    };

    await fetchAutocompletePlace(
      input,
      // state.filters.city.selected.lat_lng,
      handleResult
    );
  };

  const handleSelectDestinationRoutes = async (data: {
    id: string;
    name: string;
  }) => {
    let lat_lng: null | { lat: number; lng: number } = null;

    if (state.filters.destination.company_office.selected) {
      const selectedOfficeAddress =
        userState.profile?.organization?.addresses.find(
          (item) => String(item.id) === data.id
        );
      if (!selectedOfficeAddress) return;
      lat_lng = {
        lat: selectedOfficeAddress.latitude,
        lng: selectedOfficeAddress.longitude,
      };
    } else {
      try {
        const response = await getLatLngFromPlaceId(data.id);
        lat_lng = {
          lat: response.lat,
          lng: response.lng,
        };
      } catch (err) {
        throw new Error(`Err get lat lng ${err}`);
      }
    }

    await dispatch({
      type: FindTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        destination: {
          ...state.filters.destination,
          page_sheet: {
            ...state.filters.destination.page_sheet,
            is_open: false,
          },
          selected: {
            ...state.filters.destination.selected,
            item: data,
            lat_lng: lat_lng,
          },
          query: !data ? "" : data.name,
        },
        origin: {
          ...state.filters.origin,
          company_office: {
            ...state.filters.origin.company_office,
            selected: isDestinationFromOffice ? false : true,
          },
          items: isDestinationFromOffice
            ? []
            : userState.profile?.organization?.addresses?.map((item) => {
                return {
                  id: String(item.id),
                  name: userState.profile?.organization?.name ?? "",
                  description: item.address ?? "",
                };
              }) ?? [],
        },
      },
    });
  };

  const handleClickResetLocationDestination = async () => {
    if (!!userLocationError || !userLocation) return;

    const geocoder = new google.maps.Geocoder();

    try {
      const result = await geocoder.geocode({
        location: { lat: userLocation.lat, lng: userLocation.lng },
      });

      if (result.results && result.results[0]) {
        const place = result.results[0];

        dispatch({
          type: FindTripActionEnum.SetFiltersData,
          payload: {
            ...state.filters,
            destination: {
              ...state.filters.destination,
              page_sheet: {
                ...state.filters.destination,
                is_open: false,
              },
              selected: {
                ...state.filters.destination.selected,
                item: {
                  id: place.place_id,
                  name: place.formatted_address,
                },
                lat_lng: {
                  lat: userLocation.lat,
                  lng: userLocation.lng,
                },
              },
              query: place.formatted_address,
            },
            origin: {
              ...state.filters.origin,
              company_office: {
                ...state.filters.origin.company_office,
                selected: true,
              },
              items:
                userState.profile?.organization?.addresses?.map((item) => {
                  return {
                    id: String(item.id),
                    name: userState.profile?.organization?.name ?? "",
                    description: item.address ?? "",
                  };
                }) ?? [],
            },
          },
        });
      }
    } catch (error) {
      // Fallback ke coordinate string jika reverse geocoding gagal
      const userLocationLatLng = `${userLocation.lat},${userLocation.lng}`;
      dispatch({
        type: FindTripActionEnum.SetFiltersData,
        payload: {
          ...state.filters,
          destination: {
            ...state.filters.destination,
            page_sheet: {
              ...state.filters.destination,
              is_open: false,
            },
            selected: {
              ...state.filters.destination.selected,
              item: {
                id: userLocationLatLng,
                name: userLocationLatLng,
              },
              lat_lng: {
                lat: userLocation.lat,
                lng: userLocation.lng,
              },
            },
            query: userLocationLatLng,
          },
        },
      });
    }
  };

  const handleSwitchLocationDestination = (checked: boolean) => {
    dispatch({
      type: FindTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        destination: {
          ...state.filters.destination,
          items: checked
            ? userState.profile?.organization?.addresses?.map((item) => {
                return {
                  id: String(item.id),
                  name: userState.profile?.organization?.name ?? "",
                  description: item.address ?? "",
                };
              }) ?? []
            : [],
          company_office: {
            ...state.filters.destination.company_office,
            selected: checked,
          },
        },
      },
    });
  };

  const handleSelectDate = (dates: Date | Date[]) => {
    dispatch({
      type: FindTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        date: {
          ...state.filters.date,
          selected: dates,
        },
      },
    });
  };

  const handleChangePassenger = (data: { id: string; value: number }[]) => {
    dispatch({
      type: FindTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        passenger: {
          ...state.filters.passenger,
          value: data,
        },
      },
    });
  };

  const handleChangeCarSeat = () => {
    dispatch({
      type: FindTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        passenger: {
          ...state.filters.passenger,
          car_seat: {
            ...state.filters.passenger.car_seat,
            checked: !state.filters.passenger.car_seat.checked,
          },
        },
      },
    });
  };

  const handleSubmitPassenger = (data: {
    car_seat: {
      checked: boolean;
    };
    value: { id: string; value: number }[];
  }) => {
    dispatch({
      type: FindTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        passenger: {
          ...state.filters.passenger,
          car_seat: {
            ...state.filters.passenger.car_seat,
            checked: data.car_seat.checked,
          },
          value: data.value,
        },
      },
    });
  };

  const handleClickSearch = async () => {
    await storageService({
      method: "setItem",
      key: INDEXDB_STORAGE_NAME.FIND_TRIP_ORIGIN_SEARCH_LIST,
      value: !state.filters.origin.saved_items.length
        ? [state.filters.origin.selected.item]
        : [
            state.filters.origin.selected.item,
            ...state.filters.origin.saved_items.filter((_, index) => index < 5),
          ].filter(
            (obj, index, self) =>
              index ===
              self.findIndex((o) => o?.id === obj?.id && o?.name === obj?.name)
          ),
    });
    await storageService({
      method: "setItem",
      key: INDEXDB_STORAGE_NAME.FIND_TRIP_DESTINATION_SEARCH_LIST,
      value: !state.filters.destination.saved_items.length
        ? [state.filters.destination.selected.item]
        : [
            state.filters.destination.selected.item,
            ...state.filters.destination.saved_items.filter(
              (_, index) => index < 5
            ),
          ].filter(
            (obj, index, self) =>
              index ===
              self.findIndex((o) => o?.id === obj?.id && o?.name === obj?.name)
          ),
    });
    let params = "";
    if (state.filters.origin.selected.item) {
      const origin = `&${RIDE_FILTER.ORIGIN}=${state.filters.origin.selected.item.id}`;
      params = params + origin;
    }
    if (state.filters.destination.selected.item) {
      const destination = `&${RIDE_FILTER.DESTINATION}=${state.filters.destination.selected.item.id}`;
      params = params + destination;
    }
    if (state.filters.date.selected) {
      const selectedDates = Array.isArray(state.filters.date.selected)
        ? state.filters.date.selected
        : [state.filters.date.selected];

      if (selectedDates.length > 0) {
        // For multiple dates, we can either pass all dates or just the first one
        // For now, let's pass all dates as comma-separated values
        const dateParams = selectedDates
          .map((dateItem) => dayjs(dateItem).format("YYYY-MM-DD"))
          .join(",");
        const date = `&${RIDE_FILTER.DATE}=${dateParams}`;
        params = params + date;
      }
    }
    if (state.filters.passenger.value) {
      const adult = `&${RIDE_FILTER.ADULT_PASSENGER}=${
        state.filters.passenger.value.find(
          (passengerItem) => passengerItem.id === "adult"
        )?.value ?? 0
      }`;
      params = params + adult;

      const children = `&${RIDE_FILTER.CHILDREN_PASSENGER}=${
        state.filters.passenger.value.find(
          (passengerItem) => passengerItem.id === "children"
        )?.value ?? 0
      }`;
      params = params + children;
    }
    if (state.filters.passenger.car_seat.checked) {
      const carSeat = `&${RIDE_FILTER.CAR_SEAT}=true`;
      params = params + carSeat;
    }

    router.push(AppCollectionURL.private.tripResult(params));
  };

  return (
    <>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem] sm:gap-[1rem]",
          "w-[100vw] lg:w-[calc(100vw-2rem)] container:w-full container:max-w-container",
          "px-[1rem] py-[1rem] sm:px-[1.5rem] sm:py-[1.5rem]",
          "bg-[#FCFCFC] dark:bg-[#292929]",
          "rounded-tr-[1.25rem] rounded-tl-[1.25rem] lg:rounded-[1.25rem]",
          "border border-[#E9E6E6] dark:border-[#464646]"
        )}
        style={{
          boxShadow: "backdrop-filter: blur(20px),0px 0px 25px 0px #9C969640",
        }}
      >
        <h1
          className={clsx(
            "text-[1.125rem] sm:text-[1.5rem] text-[#232323] dark:text-white font-bold"
          )}
        >
          {dictionaries.filter.title}
        </h1>

        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
            "w-full"
          )}
        >
          {/* form */}
          <div
            className={clsx(
              "grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] place-content-start place-items-start gap-[1rem]",
              "w-full",
              "relative"
            )}
          >
            <FormRoutes
              origin={{
                pageSheet: {
                  selected: state.filters.origin.selected.item,
                  items: state.filters.origin.company_office.selected
                    ? state.filters.origin.items
                    : !state.filters.origin.items.length &&
                      !state.filters.origin.query.length
                    ? state.filters.origin.saved_items
                    : state.filters.origin.items,
                  onQuery: (data: string) => handleQueryOriginRoutes(data),
                  onSelect: (data: { id: string; name: string }) =>
                    handleSelectOriginRoutes(data),
                  isOpen: state.filters.origin.page_sheet.is_open,
                  title: dictionaries.filter.form.origin.title,
                  emptyMessage:
                    !state.filters.origin.saved_items.length &&
                    !state.filters.origin.query.length
                      ? dictionaries.filter.form.origin.autocomplete
                          .emptyMessage.no_saved_place
                      : dictionaries.filter.form.origin.autocomplete
                          .emptyMessage.no_result,
                  onClose: handleCloseOriginRoutes,
                  inputProps: {
                    ...dictionaries.filter.form.origin.inputProps,
                  },

                  labelProps: {
                    ...dictionaries.filter.form.origin.labelProps,
                  },
                  resetLocationButton: {
                    ...dictionaries.filter.form.origin.autocomplete
                      .resetLocationButton,
                    show: true,
                    disabled:
                      !!userLocationError ||
                      (state.filters.destination.selected.lat_lng?.lat ===
                        userLocation?.lat &&
                        state.filters.destination.selected.lat_lng?.lng ===
                          userLocation?.lng) ||
                      (!isDestinationFromOffice && !!selectedItemDestination),
                    onClick: handleClickResetLocationOrigin,
                  },
                  locationSwitch: {
                    ...dictionaries.filter.form.origin.autocomplete
                      .locationSwitch,
                    show: true,
                    disabled:
                      !isDestinationFromOffice && !!selectedItemDestination,
                    checked: state.filters.origin.company_office.selected,
                    onChange: handleSwitchLocationOrigin,
                  },
                },
                autocomplete: {
                  emptyMessage:
                    !state.filters.origin.saved_items.length &&
                    !state.filters.origin.query.length
                      ? dictionaries.filter.form.origin.autocomplete
                          .emptyMessage.no_saved_place
                      : dictionaries.filter.form.origin.autocomplete
                          .emptyMessage.no_result,
                  selected: state.filters.origin.selected.item,
                  items: state.filters.origin.company_office.selected
                    ? state.filters.origin.items
                    : !state.filters.origin.items.length
                    ? state.filters.origin.saved_items
                    : state.filters.origin.items,

                  onQuery: (data: string) => handleQueryOriginRoutes(data),
                  onSelect: (data: { id: string; name: string }) =>
                    handleSelectOriginRoutes(data),
                  resetLocationButton: {
                    ...dictionaries.filter.form.origin.autocomplete
                      .resetLocationButton,
                    show: true,
                    disabled:
                      !!userLocationError ||
                      (state.filters.destination.selected.lat_lng?.lat ===
                        userLocation?.lat &&
                        state.filters.destination.selected.lat_lng?.lng ===
                          userLocation?.lng) ||
                      (!isDestinationFromOffice && !!selectedItemDestination),
                    onClick: handleClickResetLocationOrigin,
                  },
                  locationSwitch: {
                    ...dictionaries.filter.form.origin.autocomplete
                      .locationSwitch,
                    show: true,
                    disabled:
                      !isDestinationFromOffice && !!selectedItemDestination,
                    checked: state.filters.origin.company_office.selected,
                    onChange: handleSwitchLocationOrigin,
                  },
                },
                inputProps: {
                  ...dictionaries.filter.form.origin.inputProps,
                  onClick: () => {
                    if (!isLg) {
                      handleClickOriginRoutes();
                    }
                  },
                },
                labelProps: {
                  ...dictionaries.filter.form.origin.labelProps,
                },
              }}
              destination={{
                pageSheet: {
                  emptyMessage:
                    !state.filters.destination.saved_items.length &&
                    !state.filters.destination.query.length
                      ? dictionaries.filter.form.destination.autocomplete
                          .emptyMessage.no_saved_place
                      : dictionaries.filter.form.destination.autocomplete
                          .emptyMessage.no_result,
                  selected: state.filters.destination.selected.item,
                  items: state.filters.destination.company_office.selected
                    ? state.filters.destination.items
                    : !state.filters.destination.items.length
                    ? state.filters.destination.saved_items
                    : state.filters.destination.items,
                  onQuery: (data: string) => handleQueryDestinationRoutes(data),
                  onSelect: (data: { id: string; name: string }) =>
                    handleSelectDestinationRoutes(data),
                  isOpen: state.filters.destination.page_sheet.is_open,
                  title: dictionaries.filter.form.destination.title,
                  onClose: handleCloseDestinationRoutes,
                  inputProps: {
                    ...dictionaries.filter.form.destination.inputProps,
                  },
                  labelProps: {
                    ...dictionaries.filter.form.destination.labelProps,
                  },
                  resetLocationButton: {
                    ...dictionaries.filter.form.destination.autocomplete
                      .resetLocationButton,
                    show: true,
                    disabled:
                      !!userLocationError ||
                      (state.filters.origin.selected.lat_lng?.lat ===
                        userLocation?.lat &&
                        state.filters.origin.selected.lat_lng?.lng ===
                          userLocation?.lng) ||
                      (!isOriginFromOffice && !!selectedItemOrigin),
                    onClick: handleClickResetLocationDestination,
                  },
                  locationSwitch: {
                    ...dictionaries.filter.form.destination.autocomplete
                      .locationSwitch,
                    show: false,
                    disabled: !isOriginFromOffice && !!selectedItemOrigin,
                    checked: state.filters.destination.company_office.selected,
                    onChange: handleSwitchLocationDestination,
                  },
                },
                autocomplete: {
                  emptyMessage:
                    !state.filters.destination.saved_items.length &&
                    !state.filters.destination.query.length
                      ? dictionaries.filter.form.destination.autocomplete
                          .emptyMessage.no_saved_place
                      : dictionaries.filter.form.destination.autocomplete
                          .emptyMessage.no_result,
                  selected: state.filters.destination.selected.item,
                  items: state.filters.destination.company_office.selected
                    ? state.filters.destination.items
                    : !state.filters.destination.items.length
                    ? state.filters.destination.saved_items
                    : state.filters.destination.items,
                  onQuery: (data: string) => handleQueryDestinationRoutes(data),
                  onSelect: (data: { id: string; name: string }) =>
                    handleSelectDestinationRoutes(data),
                  resetLocationButton: {
                    ...dictionaries.filter.form.destination.autocomplete
                      .resetLocationButton,
                    show: true,
                    disabled:
                      !!userLocationError ||
                      (state.filters.origin.selected.lat_lng?.lat ===
                        userLocation?.lat &&
                        state.filters.origin.selected.lat_lng?.lng ===
                          userLocation?.lng) ||
                      (!isOriginFromOffice && !!selectedItemOrigin),
                    onClick: handleClickResetLocationDestination,
                  },
                  locationSwitch: {
                    ...dictionaries.filter.form.destination.autocomplete
                      .locationSwitch,
                    show: true,
                    disabled: !isOriginFromOffice && !!selectedItemOrigin,
                    checked: state.filters.destination.company_office.selected,
                    onChange: handleSwitchLocationDestination,
                  },
                },
                inputProps: {
                  ...dictionaries.filter.form.destination.inputProps,
                  onClick: () => {
                    if (!isLg) {
                      handleClickDestinationRoutes();
                    }
                  },
                },
                labelProps: {
                  ...dictionaries.filter.form.destination.labelProps,
                },
              }}
            />

            <DatePicker
              mode={state.filters.date.mode}
              labelProps={{
                ...dictionaries.filter.form.date.labelProps,
              }}
              maxSelection={5}
              value={state.filters.date.selected}
              onSelect={handleSelectDate}
            />

            <FormPassenger
              labelProps={{
                ...dictionaries.filter.form.passenger.labelProps,
              }}
              detail={{
                title: dictionaries.filter.form.passenger.detail.title,
                carSeat: {
                  input: {
                    ...dictionaries.filter.form.passenger.detail.carSeat.input,
                    checked: state.filters.passenger.car_seat.checked,
                    onChange: handleChangeCarSeat,
                  },
                },
                cta: dictionaries.filter.form.passenger.detail.cta,
                passenger: {
                  items: dictionaries.filter.form.passenger.detail.items.map(
                    (item) => {
                      return {
                        ...item,
                        value:
                          state.filters.passenger.value.find(
                            (passengerItem) => passengerItem.id === item.id
                          )?.value ?? 0,
                      };
                    }
                  ),
                  onChange: handleChangePassenger,
                },
                onSelect: handleSubmitPassenger,
              }}
              maskedValue={dictionaries.filter.form.passenger.maskedValue
                .replaceAll(
                  "{{adult}}",
                  String(
                    state.filters.passenger.value.find(
                      (item) => item.id === "adult"
                    )?.value ?? 0
                  )
                )
                .replaceAll(
                  "{{children}}",
                  String(
                    state.filters.passenger.value.find(
                      (item) => item.id === "children"
                    )?.value ?? 0
                  )
                )}
            />
            <Button
              aria-label={dictionaries.filter.cta.primary.children}
              name={dictionaries.filter.cta.primary.children}
              disabled={
                !state.filters.origin.selected.item ||
                !state.filters.destination.selected.item ||
                !state.filters.date.selected ||
                (Array.isArray(state.filters.date.selected) &&
                  state.filters.date.selected.length === 0) ||
                !state.filters.passenger.value.length
              }
              onClick={handleClickSearch}
            >
              {dictionaries.filter.cta.primary.children}
            </Button>
          </div>

          {/* button */}
        </div>
      </div>
    </>
  );
};
