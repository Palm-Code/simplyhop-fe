import * as React from "react";
import clsx from "clsx";
import { HeaderRideTrip } from "../fragments/header";
import { ListTripProvider } from "../../list/context";
import { AlertApp } from "@/core/modules/app/fragments/alert";
import { NavigationRideTrip } from "../fragments/navigation";

import { RideFilterListTrip } from "../../list/fragments/ride_filter";
import { RideSectionListTrip } from "../../list/fragments/ride_section";
import { SortListTrip } from "../../list/fragments/sort";

export const RideTripContainer = () => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <HeaderRideTrip />
      <div className={clsx("flex items-center justify-between", "w-full")}>
        <NavigationRideTrip />
      </div>
      <div
        className={clsx(
          "bg-[#FAFAFA] dark:bg-[#292929]",
          "w-full",
          "rounded-2xl",
          "p-4",
          "grid grid-cols-1 place-content-start place-items-start gap-4"
        )}
      >
        <ListTripProvider>
          <div
            className={clsx(
              "flex md:items-center justify-between gap-2",
              "w-full max-md:flex-col"
            )}
          >
            <RideFilterListTrip />
            <SortListTrip />
          </div>

          <RideSectionListTrip />
          <AlertApp />
        </ListTripProvider>
      </div>
    </div>
  );
};
