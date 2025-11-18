"use client";
import * as React from "react";
import clsx from "clsx";
import { MapFindTrip } from "../fragments/map";
// import { BadgeFindTrip } from "../fragments/badge";
import { FilterFindTrip } from "../fragments/filter";
import { useSetInitialContextValue } from "../context";
import { WelcomeModal } from "@/core/components/welcome_modal";
import { BadgeFindTrip } from "../fragments/badge";

export const FindTripContainer = () => {
  useSetInitialContextValue();
  return (
    <div className={clsx("w-full h-full", "relative")}>
      <MapFindTrip />
      <WelcomeModal />

      <div
        className={clsx(
          "absolute bottom-[0px] lg:bottom-[1.5rem] left-[50%] translate-x-[-50%] z-[10]",
          "rounded-[0.5rem] lg:rounded-[1.25rem]",
          // 'grid grid-cols-1 place-content-start place-items-start gap-2'
        )}
      >
        <BadgeFindTrip />
        <FilterFindTrip />
      </div>
    </div>
  );
};
