"use client";
import * as React from "react";
import clsx from "clsx";
import { MapFindTrip } from "../fragments/map";
// import { BadgeFindTrip } from "../fragments/badge";
import { FilterFindTrip } from "../fragments/filter";
import { useSetInitialContextValue } from "../context";

export const FindTripContainer = () => {
  useSetInitialContextValue();
  return (
    <div className={clsx("w-full h-full", "relative")}>
      <MapFindTrip />

      {/* <div
        className={clsx(
          "absolute top-[1.5rem] left-[0px] translate-x-[1.5rem] 2xl:translate-x-[calc(1*(100vw-1344px)/2)] z-[10]",
          "rounded-[0.5rem] lg:rounded-[1.25rem]"
        )}
      >
        <BadgeFindTrip />
      </div> */}

      <div
        className={clsx(
          "absolute bottom-[0px] lg:bottom-[1.5rem] left-[50%] translate-x-[-50%] z-[10]",
          "rounded-[0.5rem] lg:rounded-[1.25rem]"
        )}
      >
        <FilterFindTrip />
      </div>
    </div>
  );
};
