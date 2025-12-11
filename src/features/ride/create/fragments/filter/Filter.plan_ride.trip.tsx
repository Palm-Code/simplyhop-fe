"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { PlanRideTripActionEnum, PlanRideTripContext } from "../../context";
import { DatePicker } from "@/core/components/datepicker";
import {
  useGetVehicleMy,
  useRestGoogleGetDistanceMatrix,
  useRestGooglePostRouteDirections,
} from "../../react_query/hooks";
import { Button } from "@/core/components/button";
import {
  fetchAutocompletePlace,
  getLatLngFromPlaceId,
} from "@/core/utils/map/functions";
import { FormAuto } from "@/core/components/form_auto";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { FormRoutes } from "@/core/components/form_routes";
import { Textfield } from "@/core/components/textfield";
import { MoonLoader } from "@/core/components/moon_loader";
import { UserContext } from "@/core/modules/app/context";
import { storageService } from "@/core/services/storage/indexdb";
import { INDEXDB_STORAGE_NAME } from "@/core/utils/indexdb/constants";
import useGeolocation from "@/core/utils/map/hooks/useGeoLocation";

export const FilterPlanRideTrip = () => {
  const dictionaries = getDictionaries();
  const { state: userState } = React.useContext(UserContext);
  const { state, dispatch } = React.useContext(PlanRideTripContext);
  const { isLg } = useTailwindBreakpoint();
  const { location: userLocation, error: userLocationError } = useGeolocation();

  useGetVehicleMy();
  useRestGooglePostRouteDirections();

  const isOriginCompanyOfficeChecked =
    !!state.filters.origin.company_office.checked;
  const selectedItemOrigin = state.filters.origin.selected.item;
  const isDestinationCompanyOfficeChecked =
    !!state.filters.destination.company_office.checked;
  const selectedItemDestination = state.filters.destination.selected.item;
  const companyOfficeAddreses =
    userState.profile?.organization?.addresses ?? [];
  const companyOfficeItems =
    companyOfficeAddreses?.map((item) => {
      return {
        id: String(item.id),
        name: userState.profile?.organization?.name ?? "",
        description: item.address ?? "",
      };
    }) ?? [];

  const {
    mutateAsync: fetchRestGoogleGetDistanceMatrix,
    isPending: isPendingFetchRestGoogleGetDistanceMatrix,
  } = useRestGoogleGetDistanceMatrix();

  const handleClickAuto = () => {
    dispatch({
      type: PlanRideTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        auto: {
          ...state.filters.auto,
          bottom_sheet: {
            ...state.filters.auto.bottom_sheet,
            is_open: true,
          },
        },
      },
    });
  };

  const handleCloseAuto = () => {
    dispatch({
      type: PlanRideTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        auto: {
          ...state.filters.auto,
          bottom_sheet: {
            ...state.filters.auto.bottom_sheet,
            is_open: false,
          },
        },
      },
    });
  };

  const handleQueryAuto = async (input: string) => {
    dispatch({
      type: PlanRideTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        auto: {
          ...state.filters.auto,
          query: input,
        },
      },
    });
  };

  const handleSelectAuto = async (data: { id: string; name: string }) => {
    dispatch({
      type: PlanRideTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        auto: {
          ...state.filters.auto,
          selected: data,
        },
      },
    });
  };

  const handleClickOriginRoutes = () => {
    dispatch({
      type: PlanRideTripActionEnum.SetFiltersData,
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
      type: PlanRideTripActionEnum.SetFiltersData,
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
      type: PlanRideTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        origin: {
          ...state.filters.origin,
          items: isOriginCompanyOfficeChecked
            ? !input.length
              ? companyOfficeItems
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

    if (isOriginCompanyOfficeChecked) return;

    const handleResult = (
      // data: null | google.maps.places.AutocompletePrediction[]
      data: null | { description: string; place_id: string }[]
    ) => {
      if (!!data) {
        dispatch({
          type: PlanRideTripActionEnum.SetFiltersData,
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

    if (isOriginCompanyOfficeChecked) {
      const selectedOfficeAddress = companyOfficeAddreses.find(
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

    dispatch({
      type: PlanRideTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        origin: {
          ...state.filters.origin,
          selected: {
            ...state.filters.origin.selected,
            item: data,
            lat_lng: lat_lng,
          },
          page_sheet: {
            ...state.filters.origin.page_sheet,
            is_open: false,
          },
          query: !data ? "" : data.name,
        },
        destination: {
          ...state.filters.destination,
          company_office: {
            ...state.filters.destination.company_office,
            checked: isOriginCompanyOfficeChecked ? false : true,
          },
          items: isOriginCompanyOfficeChecked ? [] : companyOfficeItems,
        },
      },
    });
  };

  const handleClickUseUserLocationOrigin = async () => {
    if (!!userLocationError || !userLocation) return;

    const geocoder = new google.maps.Geocoder();

    try {
      const result = await geocoder.geocode({
        location: { lat: userLocation.lat, lng: userLocation.lng },
      });

      if (result.results && result.results[0]) {
        const place = result.results[0];

        dispatch({
          type: PlanRideTripActionEnum.SetFiltersData,
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
                checked: true,
              },
              items: companyOfficeItems,
            },
          },
        });
      }
    } catch (error) {
      // Fallback ke coordinate string jika reverse geocoding gagal
      const userLocationLatLng = `${userLocation.lat},${userLocation.lng}`;
      dispatch({
        type: PlanRideTripActionEnum.SetFiltersData,
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
      type: PlanRideTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        origin: {
          ...state.filters.origin,
          items: checked ? companyOfficeItems : [],
          company_office: {
            ...state.filters.origin.company_office,
            checked: checked,
          },
        },
      },
    });
  };

  const handleClickDestinationRoutes = () => {
    dispatch({
      type: PlanRideTripActionEnum.SetFiltersData,
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
      type: PlanRideTripActionEnum.SetFiltersData,
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
      type: PlanRideTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        destination: {
          ...state.filters.destination,
          items: isDestinationCompanyOfficeChecked
            ? !input.length
              ? companyOfficeItems
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

    if (isDestinationCompanyOfficeChecked) return;

    const handleResult = (
      // data: null | google.maps.places.AutocompletePrediction[]
      data: null | { description: string; place_id: string }[]
    ) => {
      if (!!data) {
        dispatch({
          type: PlanRideTripActionEnum.SetFiltersData,
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

    if (isDestinationCompanyOfficeChecked) {
      const selectedOfficeAddress = companyOfficeAddreses.find(
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

    dispatch({
      type: PlanRideTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        destination: {
          ...state.filters.destination,
          selected: {
            ...state.filters.destination.selected,
            item: data,
            lat_lng: lat_lng,
          },
          page_sheet: {
            ...state.filters.origin.page_sheet,
            is_open: false,
          },
          query: !data ? "" : data.name,
        },
        origin: {
          ...state.filters.origin,
          company_office: {
            ...state.filters.origin.company_office,
            checked: isDestinationCompanyOfficeChecked ? false : true,
          },
          items: isDestinationCompanyOfficeChecked ? [] : companyOfficeItems,
        },
      },
    });
  };

  const handleClickUseUserLocationDestination = async () => {
    if (!!userLocationError || !userLocation) return;

    const geocoder = new google.maps.Geocoder();

    try {
      const result = await geocoder.geocode({
        location: { lat: userLocation.lat, lng: userLocation.lng },
      });

      if (result.results && result.results[0]) {
        const place = result.results[0];

        dispatch({
          type: PlanRideTripActionEnum.SetFiltersData,
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
                checked: true,
              },
              items: companyOfficeItems,
            },
          },
        });
      }
    } catch (error) {
      // Fallback ke coordinate string jika reverse geocoding gagal
      const userLocationLatLng = `${userLocation.lat},${userLocation.lng}`;
      dispatch({
        type: PlanRideTripActionEnum.SetFiltersData,
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
      type: PlanRideTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        destination: {
          ...state.filters.destination,
          items: checked ? companyOfficeItems : [],
          company_office: {
            ...state.filters.destination.company_office,
            checked: checked,
          },
        },
      },
    });
  };

  const handleSelectDate = (date: Date | Date[]) => {
    dispatch({
      type: PlanRideTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        date: {
          selected: date,
        },
      },
    });
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          plan: {
            ...state.detail.form.plan,
            date: {
              ...state.detail.form.plan.date,
              selected: date,
            },
          },
        },
      },
    });
  };

  const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: PlanRideTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        time: {
          ...state.filters.time,
          value: e.currentTarget.value,
        },
      },
    });
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          plan: {
            ...state.detail.form.plan,
            time: {
              value: e.currentTarget.value,
            },
          },
        },
      },
    });
  };

  const handleClickSearch = async () => {
    await storageService({
      method: "setItem",
      key: INDEXDB_STORAGE_NAME.PLAN_RIDE_TRIP_ORIGIN_SEARCH_LIST,
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
      key: INDEXDB_STORAGE_NAME.PLAN_RIDE_TRIP_DESTINATION_SEARCH_LIST,
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
    const data = await fetchRestGoogleGetDistanceMatrix();
    if (!data) return;
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        is_open: true,
        distance_matrix: data,
      },
    });
  };

  const isSubmitDisabled =
    !state.filters.auto.selected ||
    !state.filters.origin.selected.item ||
    !state.filters.destination.selected.item ||
    !state.filters.date.selected ||
    !state.filters.time.value.length ||
    isPendingFetchRestGoogleGetDistanceMatrix;

  const isSubmitLoading = isPendingFetchRestGoogleGetDistanceMatrix;

  return (
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
      <div
        className={clsx(
          "grid grid-cols-1 lg:grid-cols-[1fr_397px] items-center content-center justify-start justify-items-start",
          "w-full",
          "gap-[1rem]"
        )}
      >
        <h1
          className={clsx(
            "text-[1.125rem] sm:text-[1.5rem] text-[#232323] dark:text-white font-bold"
          )}
        >
          {dictionaries.filter.title}
        </h1>

        <FormAuto
          bottomSheet={{
            selected: state.filters.auto.selected,
            items: state.filters.auto.items,
            onQuery: (data: string) => handleQueryAuto(data),
            onSelect: (data: { id: string; name: string }) =>
              handleSelectAuto(data),
            isOpen: state.filters.auto.bottom_sheet.is_open,
            title: dictionaries.filter.form.auto.title,
            onClose: handleCloseAuto,
            inputProps: {
              ...dictionaries.filter.form.auto.inputProps,
            },
            labelProps: {
              ...dictionaries.filter.form.auto.labelProps,
            },
          }}
          disabled={!userState.profile?.is_able_to_ride}
          inputProps={{
            ...dictionaries.filter.form.auto.inputProps,
            onClick: () => {
              if (!isLg) {
                handleClickAuto();
              }
            },
          }}
          labelProps={{
            ...dictionaries.filter.form.auto.labelProps,
          }}
          selected={state.filters.auto.selected}
          items={state.filters.auto.items.filter((item) =>
            item.name
              .toLowerCase()
              .includes(state.filters.auto.query.toLowerCase())
          )}
          debounceQuery
          onQuery={handleQueryAuto}
          onSelect={handleSelectAuto}
        />
      </div>

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
            "w-full"
          )}
        >
          <FormRoutes
            origin={{
              pageSheet: {
                selected: state.filters.origin.selected.item,
                items: isOriginCompanyOfficeChecked
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
                    ? dictionaries.filter.form.origin.autocomplete.emptyMessage
                        .no_saved_place
                    : dictionaries.filter.form.origin.autocomplete.emptyMessage
                        .no_result,
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
                    (!isDestinationCompanyOfficeChecked &&
                      !!selectedItemDestination),
                  onClick: handleClickUseUserLocationOrigin,
                },
                locationSwitch: {
                  ...dictionaries.filter.form.origin.autocomplete
                    .locationSwitch,
                  show: true,
                  disabled:
                    !isDestinationCompanyOfficeChecked &&
                    !!selectedItemDestination,
                  checked: isOriginCompanyOfficeChecked,
                  onChange: handleSwitchLocationOrigin,
                },
              },
              autocomplete: {
                emptyMessage:
                  !state.filters.origin.saved_items.length &&
                  !state.filters.origin.query.length
                    ? dictionaries.filter.form.origin.autocomplete.emptyMessage
                        .no_saved_place
                    : dictionaries.filter.form.origin.autocomplete.emptyMessage
                        .no_result,
                selected: state.filters.origin.selected.item,
                items: isOriginCompanyOfficeChecked
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
                    (!isDestinationCompanyOfficeChecked &&
                      !!selectedItemDestination),
                  onClick: handleClickUseUserLocationOrigin,
                },
                locationSwitch: {
                  ...dictionaries.filter.form.origin.autocomplete
                    .locationSwitch,
                  show: true,
                  disabled:
                    !isDestinationCompanyOfficeChecked &&
                    !!selectedItemDestination,
                  checked: isOriginCompanyOfficeChecked,
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
                items: isDestinationCompanyOfficeChecked
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
                    (!isOriginCompanyOfficeChecked && !!selectedItemOrigin),
                  onClick: handleClickUseUserLocationDestination,
                },
                locationSwitch: {
                  ...dictionaries.filter.form.destination.autocomplete
                    .locationSwitch,
                  show: false,
                  disabled:
                    !isOriginCompanyOfficeChecked && !!selectedItemOrigin,
                  checked: isDestinationCompanyOfficeChecked,
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
                items: isDestinationCompanyOfficeChecked
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
                    (!isOriginCompanyOfficeChecked && !!selectedItemOrigin),
                  onClick: handleClickUseUserLocationDestination,
                },
                locationSwitch: {
                  ...dictionaries.filter.form.destination.autocomplete
                    .locationSwitch,
                  show: true,
                  disabled:
                    !isOriginCompanyOfficeChecked && !!selectedItemOrigin,
                  checked: isDestinationCompanyOfficeChecked,
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
            mode="multiple"
            labelProps={{
              ...dictionaries.filter.form.date.labelProps,
            }}
            maxSelection={5}
            disabled={!userState.profile?.is_able_to_ride}
            value={state.filters.date.selected}
            onSelect={handleSelectDate}
          />

          <Textfield
            labelProps={{
              ...dictionaries.filter.form.time.labelProps,
            }}
            inputProps={{
              ...dictionaries.filter.form.time.inputProps,
              disabled: !userState.profile?.is_able_to_ride,
              type: "time",
              value: state.filters.time.value,
              onChange: handleChangeTime,
            }}
            disabled={!userState.profile?.is_able_to_ride}
          />

          <Button
            aria-label={dictionaries.filter.cta.primary.children}
            name={dictionaries.filter.cta.primary.children}
            variant="tertiary"
            disabled={isSubmitDisabled}
            isLoading={isSubmitLoading}
            onClick={handleClickSearch}
          >
            {isSubmitLoading && <MoonLoader size={20} color={"white"} />}
            {dictionaries.filter.cta.primary.children}
          </Button>
        </div>

        {/* button */}
      </div>
    </div>
  );
};
