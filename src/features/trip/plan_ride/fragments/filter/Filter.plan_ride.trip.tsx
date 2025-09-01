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

export const FilterPlanRideTrip = () => {
  const dictionaries = getDictionaries();
  const { state: userState } = React.useContext(UserContext);

  const { state, dispatch } = React.useContext(PlanRideTripContext);
  const { isLg } = useTailwindBreakpoint();
  useGetVehicleMy();

  useRestGooglePostRouteDirections();

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
          items: !input.length ? [] : state.filters.origin.items,
          query: input,
        },
      },
    });
    if (!input.length) return;

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
    try {
      const response = await getLatLngFromPlaceId(data.id);
      lat_lng = {
        lat: response.lat,
        lng: response.lng,
      };
    } catch (err) {
      throw new Error(`Err get lat lng ${err}`);
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
          items: !input.length ? [] : state.filters.destination.items,
          query: input,
        },
      },
    });
    if (!input.length) return;

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
    try {
      const response = await getLatLngFromPlaceId(data.id);
      lat_lng = {
        lat: response.lat,
        lng: response.lng,
      };
    } catch (err) {
      throw new Error(`Err get lat lng ${err}`);
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
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem] sm:gap-[2rem]",
        "w-[100vw] lg:w-[calc(100vw-2rem)] container:w-full container:max-w-container",
        "px-[1rem] py-[1rem] sm:px-[3rem] sm:py-[3rem]",
        "bg-[#FFFFFF]",
        "rounded-tr-[1.25rem] rounded-tl-[1.25rem] lg:rounded-[1.25rem]",
        "border border-[#D3E7CE]"
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
            "text-[1.125rem] sm:text-[2rem] text-[#292929] font-bold"
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
            "grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] place-content-start place-items-start gap-[1rem]",
            "w-full"
          )}
        >
          <FormRoutes
            disabled={!userState.profile?.is_able_to_ride}
            origin={{
              pageSheet: {
                emptyMessage:
                  !state.filters.origin.saved_items.length &&
                  !state.filters.origin.query.length
                    ? dictionaries.filter.form.origin.autocomplete.emptyMessage
                        .no_saved_place
                    : dictionaries.filter.form.origin.autocomplete.emptyMessage
                        .no_result,
                selected: state.filters.origin.selected.item,
                items: !state.filters.origin.items.length
                  ? state.filters.origin.saved_items
                  : state.filters.origin.items,
                onQuery: (data: string) => handleQueryOriginRoutes(data),
                onSelect: (data: { id: string; name: string }) =>
                  handleSelectOriginRoutes(data),
                isOpen: state.filters.origin.page_sheet.is_open,
                title: dictionaries.filter.form.origin.title,
                onClose: handleCloseOriginRoutes,
                inputProps: {
                  ...dictionaries.filter.form.origin.inputProps,
                },
                labelProps: {
                  ...dictionaries.filter.form.origin.labelProps,
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
                disabled: !userState.profile?.is_able_to_ride,
                items: !state.filters.origin.items.length
                  ? state.filters.origin.saved_items
                  : state.filters.origin.items,
                onQuery: (data: string) => handleQueryOriginRoutes(data),
                onSelect: (data: { id: string; name: string }) =>
                  handleSelectOriginRoutes(data),
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
                items: !state.filters.destination.items.length
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
                disabled: !userState.profile?.is_able_to_ride,
                items: !state.filters.destination.items.length
                  ? state.filters.destination.saved_items
                  : state.filters.destination.items,
                onQuery: (data: string) => handleQueryDestinationRoutes(data),
                onSelect: (data: { id: string; name: string }) =>
                  handleSelectDestinationRoutes(data),
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
        </div>

        {/* button */}
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
    </div>
  );
};
