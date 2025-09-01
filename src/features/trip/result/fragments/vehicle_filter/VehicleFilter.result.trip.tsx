"use client";
import * as React from "react";
import clsx from "clsx";
import { CarFacilityFilterCounterBadge } from "@/core/components/car_facility_filter_counter_badge";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import {
  CarFacilityFilterDropdown,
  CarFacilityFilterDropdownProps,
} from "@/core/components/car_facility_filter_dropdown";
import { ResultTripActionEnum, ResultTripContext } from "../../context";
import { CarSortDropdown } from "@/core/components/car_sort_dropdown";
import { PAGINATION } from "@/core/utils/pagination/contants";

export const VehicleFilterResulTrip = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(ResultTripContext);
  const globalDictionaries = getGlobalDictionaries();

  React.useEffect(() => {
    dispatch({
      type: ResultTripActionEnum.SetAdvancedFilterData,
      payload: {
        ...state.advanced_filter,
        sort: {
          ...state.advanced_filter.sort,
          selected:
            dictionaries.advanced_filter.sort.option.items.find(
              (item) => item.id === "average_distance"
            ) ?? null,
        },
      },
    });
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
  }, [dictionaries.advanced_filter.sort.option.items]);

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
      state.advanced_filter.luggage.selected,
      { id: data.id, name: data.name },
      data.type
    );
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
      type: ResultTripActionEnum.SetAdvancedFilterData,
      payload: {
        ...state.advanced_filter,
        luggage: {
          ...state.advanced_filter.luggage,
          selected: selected,
        },
      },
    });
  };

  const handleResetLuggage = () => {
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
      type: ResultTripActionEnum.SetAdvancedFilterData,
      payload: {
        ...state.advanced_filter,
        luggage: {
          ...state.advanced_filter.luggage,
          selected: [],
        },
      },
    });
  };

  const handleSelectSmoker = (data: {
    id: string;
    name: string;
    type: string;
  }) => {
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
    const selected = setMultipleCheckboxPayload(
      state.advanced_filter.smoker.selected,
      { id: data.id, name: data.name },
      data.type
    );
    dispatch({
      type: ResultTripActionEnum.SetAdvancedFilterData,
      payload: {
        ...state.advanced_filter,
        smoker: {
          ...state.advanced_filter.smoker,
          selected: selected,
        },
      },
    });
  };

  const handleResetSmoker = () => {
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
      type: ResultTripActionEnum.SetAdvancedFilterData,
      payload: {
        ...state.advanced_filter,
        smoker: {
          ...state.advanced_filter.smoker,
          selected: [],
        },
      },
    });
  };

  const handleSelectMusic = (data: {
    id: string;
    name: string;
    type: string;
  }) => {
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
    const selected = setMultipleCheckboxPayload(
      state.advanced_filter.music.selected,
      { id: data.id, name: data.name },
      data.type
    );
    dispatch({
      type: ResultTripActionEnum.SetAdvancedFilterData,
      payload: {
        ...state.advanced_filter,
        music: {
          ...state.advanced_filter.music,
          selected: selected,
        },
      },
    });
  };

  const handleResetMusic = () => {
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
      type: ResultTripActionEnum.SetAdvancedFilterData,
      payload: {
        ...state.advanced_filter,
        music: {
          ...state.advanced_filter.music,
          selected: [],
        },
      },
    });
  };

  const handleSelectPets = (data: {
    id: string;
    name: string;
    type: string;
  }) => {
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
    const selected = setMultipleCheckboxPayload(
      state.advanced_filter.pets.selected,
      { id: data.id, name: data.name },
      data.type
    );
    dispatch({
      type: ResultTripActionEnum.SetAdvancedFilterData,
      payload: {
        ...state.advanced_filter,
        pets: {
          ...state.advanced_filter.pets,
          selected: selected,
        },
      },
    });
  };

  const handleResetPets = () => {
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
      type: ResultTripActionEnum.SetAdvancedFilterData,
      payload: {
        ...state.advanced_filter,
        pets: {
          ...state.advanced_filter.pets,
          selected: [],
        },
      },
    });
  };

  const handleSelectDriverGender = (data: {
    id: string;
    name: string;
    type: string;
  }) => {
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
    const selected = setMultipleCheckboxPayload(
      state.advanced_filter.driver_gender.selected,
      { id: data.id, name: data.name },
      data.type
    );
    dispatch({
      type: ResultTripActionEnum.SetAdvancedFilterData,
      payload: {
        ...state.advanced_filter,
        driver_gender: {
          ...state.advanced_filter.driver_gender,
          selected: selected,
        },
      },
    });
  };

  const handleResetDriverGender = () => {
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
      type: ResultTripActionEnum.SetAdvancedFilterData,
      payload: {
        ...state.advanced_filter,
        driver_gender: {
          ...state.advanced_filter.driver_gender,
          selected: [],
        },
      },
    });
  };

  const handleSelectShift = (data: {
    id: string;
    name: string;
    type: string;
  }) => {
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
    const selected = setMultipleCheckboxPayload(
      state.advanced_filter.shift.selected,
      { id: data.id, name: data.name },
      data.type
    );
    dispatch({
      type: ResultTripActionEnum.SetAdvancedFilterData,
      payload: {
        ...state.advanced_filter,
        shift: {
          ...state.advanced_filter.shift,
          selected: selected,
        },
      },
    });
  };

  const handleResetShift = () => {
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
      type: ResultTripActionEnum.SetAdvancedFilterData,
      payload: {
        ...state.advanced_filter,
        shift: {
          ...state.advanced_filter.shift,
          selected: [],
        },
      },
    });
  };

  const handleSelectSort = (data: { id: string; name: string }) => {
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
      type: ResultTripActionEnum.SetAdvancedFilterData,
      payload: {
        ...state.advanced_filter,
        sort: {
          ...state.advanced_filter.sort,
          selected: data,
        },
      },
    });
  };

  const handleClickVehicleFilters = () => {
    dispatch({
      type: ResultTripActionEnum.SetVehicleFiltersData,
      payload: {
        ...state.vehicle_filters,
        is_open: true,
      },
    });
  };

  const totalFilterCount = React.useMemo(() => {
    return (
      state.advanced_filter.luggage.selected.length +
      state.advanced_filter.smoker.selected.length +
      state.advanced_filter.music.selected.length +
      state.advanced_filter.pets.selected.length +
      state.advanced_filter.driver_gender.selected.length +
      state.advanced_filter.shift.selected.length
    );
  }, [
    state.advanced_filter.luggage.selected.length,
    state.advanced_filter.smoker.selected.length,
    state.advanced_filter.music.selected.length,
    state.advanced_filter.pets.selected.length,
    state.advanced_filter.driver_gender.selected.length,
    state.advanced_filter.shift.selected.length,
  ]);

  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-between justify-items-start gap-[1.5rem]",
        "w-full",
        "bg-[white]"
      )}
    >
      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        <CarFacilityFilterCounterBadge
          {...dictionaries.advanced_filter.counter}
          count={totalFilterCount}
          onClick={handleClickVehicleFilters}
        />

        <div
          className={clsx(
            "hidden lg:grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1.5rem]",
            "w-full"
          )}
        >
          <CarFacilityFilterDropdown
            {...(dictionaries.advanced_filter
              .luggage as CarFacilityFilterDropdownProps)}
            items={globalDictionaries.vehicle.luggage.filter.option.items}
            selected={state.advanced_filter.luggage.selected}
            onSelect={(data) =>
              handleSelectLuggage({
                ...data,
                type: dictionaries.advanced_filter.luggage.variant,
              })
            }
            onReset={handleResetLuggage}
          />
          <CarFacilityFilterDropdown
            {...(dictionaries.advanced_filter
              .smoker as CarFacilityFilterDropdownProps)}
            items={globalDictionaries.vehicle.smoking.type.options.items}
            selected={state.advanced_filter.smoker.selected}
            onSelect={(data) =>
              handleSelectSmoker({
                ...data,
                type: dictionaries.advanced_filter.smoker.variant,
              })
            }
            onReset={handleResetSmoker}
          />
          <CarFacilityFilterDropdown
            {...(dictionaries.advanced_filter
              .music as CarFacilityFilterDropdownProps)}
            items={globalDictionaries.vehicle.music.type.options.items}
            selected={state.advanced_filter.music.selected}
            onSelect={(data) =>
              handleSelectMusic({
                ...data,
                type: dictionaries.advanced_filter.music.variant,
              })
            }
            onReset={handleResetMusic}
          />
          <CarFacilityFilterDropdown
            {...(dictionaries.advanced_filter
              .pets as CarFacilityFilterDropdownProps)}
            items={globalDictionaries.vehicle.pets.type.options.items}
            selected={state.advanced_filter.pets.selected}
            onSelect={(data) =>
              handleSelectPets({
                ...data,
                type: dictionaries.advanced_filter.pets.variant,
              })
            }
            onReset={handleResetPets}
          />
          <CarFacilityFilterDropdown
            {...(dictionaries.advanced_filter
              .driver_gender as CarFacilityFilterDropdownProps)}
            items={globalDictionaries.vehicle.driver_gender.type.options.items}
            selected={state.advanced_filter.driver_gender.selected}
            onSelect={(data) =>
              handleSelectDriverGender({
                ...data,
                type: dictionaries.advanced_filter.driver_gender.variant,
              })
            }
            onReset={handleResetDriverGender}
          />
          <CarFacilityFilterDropdown
            {...(dictionaries.advanced_filter
              .shift as CarFacilityFilterDropdownProps)}
            items={state.advanced_filter.shift.items}
            selected={state.advanced_filter.shift.selected}
            onSelect={(data) =>
              handleSelectShift({
                ...data,
                type: dictionaries.advanced_filter.pets.variant,
              })
            }
            onReset={handleResetShift}
          />
        </div>
      </div>

      {/* sort */}
      <CarSortDropdown
        {...dictionaries.advanced_filter.sort}
        items={dictionaries.advanced_filter.sort.option.items}
        selected={state.advanced_filter.sort.selected}
        onSelect={handleSelectSort}
      />
    </div>
  );
};
