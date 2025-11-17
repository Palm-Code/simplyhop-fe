"use client";
import * as React from "react";
import clsx from "clsx";
import { FilterResultTrip } from "../fragments/filter";
import { VehicleFilterResulTrip } from "../fragments/vehicle_filter";
import { RidesResultTrip } from "../fragments/rides";
import { DetailResultTrip } from "../fragments/detail";
import { NotificationResultTrip } from "../fragments/notification";
import { getDictionaries } from "../i18n";
import { FilterDetailTrip } from "../fragments/filter_detail";
import { BottomSheet } from "@/core/components/bottom_sheet";
import { ResultTripActionEnum, ResultTripContext } from "../context";
import { VehicleFilters } from "../fragments/vehicle_filters";

export const ResultTripContainer = () => {
  const dictionaries = getDictionaries();

  const { state, dispatch } = React.useContext(ResultTripContext);
  const handleCloseFilter = () => {
    dispatch({
      type: ResultTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        is_open: false,
      },
    });
  };
  return (
    <>
      <div
        className={clsx(
          "grid grid-cols-1 grid-rows-1 place-content-start place-items-start",
          "w-full",
          "pb-[0.75rem] px-[1rem]",
          "relative"
        )}
      >
        <div
          className={clsx(
            "grid grid-rows-1 grid-cols-1 items-start content-start justify-center justify-items-center",
            "w-full h-full"
          )}
        >
          <div
            className={clsx(
              "grid grid-rows-1 grid-cols-1 place-content-start place-items-start lg:gap-[2.5rem]",
              "max-w-container w-full h-full"
            )}
          >
            <div
              className={clsx(
                "grid grid-rows-1 grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
                "w-full",
                "sticky top-[90px] py-[1.5rem] z-[10]",
                "bg-[white]"
              )}
            >
              <h2
                className={clsx(
                  "text-[#292929] text-[1.125rem] lg:text-[1.5rem] font-bold"
                )}
              >
                {dictionaries.ride.title}
              </h2>
              <div
                className={clsx(
                  "grid grid-rows-1 grid-cols-1 place-content-start place-items-start gap-[1rem] lg:gap-[2.5rem]",
                  "w-full"
                )}
              >
                <div className={clsx("hidden lg:block", "w-full")}>
                  <React.Suspense fallback={<div />}>
                    <FilterResultTrip />
                  </React.Suspense>
                </div>

                <div className={clsx("block lg:hidden", "w-full")}>
                  <React.Suspense fallback={<div />}>
                    <FilterDetailTrip />
                  </React.Suspense>
                </div>

                <div className={clsx("block lg:hidden", "w-full")}>
                  <React.Suspense fallback={<div />}>
                    <BottomSheet
                      open={state.filters.is_open}
                      onClose={handleCloseFilter}
                    >
                      <FilterResultTrip />
                    </BottomSheet>
                  </React.Suspense>
                </div>

                <VehicleFilterResulTrip />
              </div>
            </div>

            <React.Suspense fallback={<div />}>
              <RidesResultTrip />
            </React.Suspense>
          </div>
        </div>
      </div>
      <React.Suspense fallback={<div />}>
        <DetailResultTrip />
      </React.Suspense>
      <React.Suspense fallback={<div />}>
        <NotificationResultTrip />
      </React.Suspense>
      <React.Suspense fallback={<div />}>
        <VehicleFilters />
      </React.Suspense>
    </>
  );
};
