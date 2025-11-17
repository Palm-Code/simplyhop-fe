"use client";
import * as React from "react";
import clsx from "clsx";
import { ResultTripActionEnum, ResultTripContext } from "../../context";
import SVGIcon from "@/core/icons";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import {
  VehicleFilterList,
  VehicleFilterListProps,
} from "@/core/components/vehicle_filter_list";
import { Divider } from "@/core/components/divider";
import { Button } from "@/core/components/button";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { PAGINATION } from "@/core/utils/pagination/contants";

export const VehicleFilters = () => {
  const dictionaries = getDictionaries();
  const globalDictionaries = getGlobalDictionaries();
  const { state, dispatch } = React.useContext(ResultTripContext);
  const { isLg } = useTailwindBreakpoint();

  const handleClose = () => {
    dispatch({
      type: ResultTripActionEnum.SetVehicleFiltersData,
      payload: {
        ...state.vehicle_filters,
        is_open: false,
      },
    });
  };

  const setMultipleCheckboxPayload = (
    data: { id: string; name: string }[],
    value: { id: string; name: string },
    type: string
  ) => {
    const dataIds = data.map((item) => item.id);
    let result = [];
    if (type === "single") {
      result = [value];
    } else {
      result = dataIds.includes(value.id)
        ? data.filter((item) => item.id !== value.id)
        : [...data, value];
    }
    return result;
  };

  const handleSelectLuggage = (data: {
    id: string;
    name: string;
    type: string;
  }) => {
    const selected = setMultipleCheckboxPayload(
      state.vehicle_filters.luggage.selected,
      { id: data.id, name: data.name },
      data.type
    );
    dispatch({
      type: ResultTripActionEnum.SetVehicleFiltersData,
      payload: {
        ...state.vehicle_filters,
        luggage: {
          ...state.vehicle_filters.luggage,
          selected: selected,
        },
      },
    });
  };

  const handleSelectSmoker = (data: {
    id: string;
    name: string;
    type: string;
  }) => {
    const selected = setMultipleCheckboxPayload(
      state.vehicle_filters.smoker.selected,
      { id: data.id, name: data.name },
      data.type
    );
    dispatch({
      type: ResultTripActionEnum.SetVehicleFiltersData,
      payload: {
        ...state.vehicle_filters,
        smoker: {
          ...state.vehicle_filters.smoker,
          selected: selected,
        },
      },
    });
  };

  const handleSelectMusic = (data: {
    id: string;
    name: string;
    type: string;
  }) => {
    const selected = setMultipleCheckboxPayload(
      state.vehicle_filters.music.selected,
      { id: data.id, name: data.name },
      data.type
    );
    dispatch({
      type: ResultTripActionEnum.SetVehicleFiltersData,
      payload: {
        ...state.vehicle_filters,
        music: {
          ...state.vehicle_filters.music,
          selected: selected,
        },
      },
    });
  };

  const handleSelectPets = (data: {
    id: string;
    name: string;
    type: string;
  }) => {
    const selected = setMultipleCheckboxPayload(
      state.vehicle_filters.pets.selected,
      { id: data.id, name: data.name },
      data.type
    );
    dispatch({
      type: ResultTripActionEnum.SetVehicleFiltersData,
      payload: {
        ...state.vehicle_filters,
        pets: {
          ...state.vehicle_filters.pets,
          selected: selected,
        },
      },
    });
  };

  const handleSelectDriverGender = (data: {
    id: string;
    name: string;
    type: string;
  }) => {
    const selected = setMultipleCheckboxPayload(
      state.vehicle_filters.driver_gender.selected,
      { id: data.id, name: data.name },
      data.type
    );
    dispatch({
      type: ResultTripActionEnum.SetVehicleFiltersData,
      payload: {
        ...state.vehicle_filters,
        driver_gender: {
          ...state.vehicle_filters.driver_gender,
          selected: selected,
        },
      },
    });
  };

  const handleSelectShift = (data: {
    id: string;
    name: string;
    type: string;
  }) => {
    const selected = setMultipleCheckboxPayload(
      state.vehicle_filters.shift.selected,
      { id: data.id, name: data.name },
      data.type
    );
    dispatch({
      type: ResultTripActionEnum.SetVehicleFiltersData,
      payload: {
        ...state.vehicle_filters,
        shift: {
          ...state.vehicle_filters.shift,
          selected: selected,
        },
      },
    });
  };

  const handleClickReset = () => {
    dispatch({
      type: ResultTripActionEnum.SetVehicleFiltersData,
      payload: {
        ...state.vehicle_filters,
        luggage: {
          ...state.vehicle_filters.luggage,
          selected: [],
        },
        smoker: {
          ...state.vehicle_filters.smoker,
          selected: [],
        },
        music: {
          ...state.vehicle_filters.music,
          selected: [],
        },
        pets: {
          ...state.vehicle_filters.pets,
          selected: [],
        },
        driver_gender: {
          ...state.vehicle_filters.driver_gender,
          selected: [],
        },
        shift: {
          ...state.vehicle_filters.shift,
          selected: [],
        },
      },
    });
  };

  const handleClickApply = () => {
    dispatch({
      type: ResultTripActionEnum.SetRidesData,
      payload: {
        ...state.rides,
        data: [],
        pagination: {
          ...state.rides.pagination,
          current: PAGINATION.NUMBER,
          last: null,
        },
      },
    });
    dispatch({
      type: ResultTripActionEnum.SetVehicleFiltersData,
      payload: {
        ...state.vehicle_filters,
        is_open: false,
      },
    });
    dispatch({
      type: ResultTripActionEnum.SetAdvancedFilterData,
      payload: {
        ...state.advanced_filter,
        luggage: {
          ...state.advanced_filter.luggage,
          selected: state.vehicle_filters.luggage.selected,
        },
        smoker: {
          ...state.advanced_filter.smoker,
          selected: state.vehicle_filters.smoker.selected,
        },
        music: {
          ...state.advanced_filter.music,
          selected: state.vehicle_filters.music.selected,
        },
        pets: {
          ...state.advanced_filter.pets,
          selected: state.vehicle_filters.pets.selected,
        },
        driver_gender: {
          ...state.advanced_filter.driver_gender,
          selected: state.vehicle_filters.driver_gender.selected,
        },
        shift: {
          ...state.advanced_filter.shift,
          selected: state.vehicle_filters.shift.selected,
        },
      },
    });
  };
  return (
    <AdaptiveModal
      variant={isLg ? "modal" : "bottom_sheet"}
      className={clsx(
        "!max-w-[524px]",
        "h-fit",
        "!rounded-[0.625rem]",
        "overflow-auto",
        "!px-[0rem] !py-[0rem]"
      )}
      open={state.vehicle_filters.is_open}
      onClose={handleClose}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[2rem]",
          "w-full",
          "px-[1rem] py-[1rem] lg:px-[2rem] lg:py-[2rem]"
        )}
      >
        {/* header */}
        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-between justify-items-start",
            "w-full"
          )}
        >
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem] lg:gap-[1rem]",
              "w-full"
            )}
          >
            <button
              aria-label={"schließen"}
              name={"schließen"}
              className={clsx("cursor-pointer")}
              onClick={handleClose}
            >
              <SVGIcon
                name="X"
                className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#5B5B5B]")}
              />
            </button>
            <h2
              className={clsx(
                "text-[#292929] text-[1.125rem] lg:text-[1.5rem] font-bold"
              )}
            >
              {dictionaries.vehicle_filters.title}
            </h2>
          </div>

          <button
            aria-label={dictionaries.vehicle_filters.cta.reset.children}
            name={dictionaries.vehicle_filters.cta.reset.children}
            className={clsx(
              "cursor-pointer",
              "px-[1rem] py-[1rem]",
              "text-[#33CC33] text-[0.75rem] lg:text-[1rem] font-medium"
            )}
            onClick={handleClickReset}
          >
            {dictionaries.vehicle_filters.cta.reset.children}
          </button>
        </div>

        {/* body */}
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[1.5rem]",
            "w-full max-h-[300px]",
            "overflow-auto"
          )}
        >
          <VehicleFilterList
            {...(dictionaries.vehicle_filters
              .luggage as VehicleFilterListProps)}
            items={globalDictionaries.vehicle.luggage.filter.option.items}
            selected={state.vehicle_filters.luggage.selected}
            onSelect={(data) =>
              handleSelectLuggage({
                ...data,
                type: dictionaries.vehicle_filters.luggage.variant,
              })
            }
          />
          <Divider />
          <VehicleFilterList
            {...(dictionaries.vehicle_filters.smoker as VehicleFilterListProps)}
            items={globalDictionaries.vehicle.smoking.type.options.items}
            selected={state.vehicle_filters.smoker.selected}
            onSelect={(data) =>
              handleSelectSmoker({
                ...data,
                type: dictionaries.vehicle_filters.smoker.variant,
              })
            }
          />
          <Divider />
          <VehicleFilterList
            {...(dictionaries.vehicle_filters.music as VehicleFilterListProps)}
            items={globalDictionaries.vehicle.music.type.options.items}
            selected={state.vehicle_filters.music.selected}
            onSelect={(data) =>
              handleSelectMusic({
                ...data,
                type: dictionaries.vehicle_filters.music.variant,
              })
            }
          />
          <Divider />
          <VehicleFilterList
            {...(dictionaries.vehicle_filters.pets as VehicleFilterListProps)}
            items={globalDictionaries.vehicle.pets.type.options.items}
            selected={state.vehicle_filters.pets.selected}
            onSelect={(data) =>
              handleSelectPets({
                ...data,
                type: dictionaries.vehicle_filters.pets.variant,
              })
            }
          />
          <Divider />
          <VehicleFilterList
            {...(dictionaries.vehicle_filters
              .driver_gender as VehicleFilterListProps)}
            items={globalDictionaries.vehicle.driver_gender.type.options.items}
            selected={state.vehicle_filters.driver_gender.selected}
            onSelect={(data) =>
              handleSelectDriverGender({
                ...data,
                type: dictionaries.vehicle_filters.driver_gender.variant,
              })
            }
          />
          <Divider />
          <VehicleFilterList
            {...(dictionaries.vehicle_filters.shift as VehicleFilterListProps)}
            items={state.vehicle_filters.shift.items}
            selected={state.vehicle_filters.shift.selected}
            onSelect={(data) =>
              handleSelectShift({
                ...data,
                type: dictionaries.vehicle_filters.shift.variant,
              })
            }
          />
        </div>

        {/* cta */}

        <Button
          aria-label={dictionaries.vehicle_filters.cta.apply.children}
          name={dictionaries.vehicle_filters.cta.apply.children}
          onClick={handleClickApply}
        >
          {dictionaries.vehicle_filters.cta.apply.children}
        </Button>
      </div>
    </AdaptiveModal>
  );
};
