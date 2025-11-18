"use client";
import * as React from "react";
import clsx from "clsx";
import { MapPlanRideTrip } from "../fragments/map";
import { BadgePlanRideTrip } from "../fragments/badge";
import { FilterPlanRideTrip } from "../fragments/filter";
import { DetailPlanRideTrip } from "../fragments/detail";
import { NotificationPlanRideTrip } from "../fragments/notification";
import { IncompleteProfilePlaneRideTrip } from "../fragments/incomplete_profile";
import { useSetInitialContextValue } from "../context";

export const PlanRideTripContainer = () => {
  useSetInitialContextValue();

  return (
    <>
      <div className={clsx("w-full h-full", "relative")}>
        <MapPlanRideTrip />

        <div
          className={clsx(
            "hidden md:block",
            "absolute top-[1.5rem] right-[0px] translate-x-[-1.5rem] lg:translate-x-[calc(-1*(100vw-1344px)/2)] z-[10]",
            "rounded-[0.5rem] lg:rounded-[1.25rem]"
          )}
        >
          <IncompleteProfilePlaneRideTrip />
        </div>

        <div
          className={clsx(
            "absolute bottom-[0px] lg:bottom-[1.5rem] left-[50%] translate-x-[-50%] z-[10]",
            "rounded-[0.5rem] lg:rounded-[1.25rem]"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem] sm:gap-[0.5rem]",
              "w-[100vw] lg:w-[calc(100vw-2rem)] container:w-full container:max-w-container"
            )}
          >
            <div
              className={clsx(
                "block md:hidden",
                "rounded-[0.5rem] lg:rounded-[1.25rem]",
                "px-[1.5rem]"
              )}
            >
              <IncompleteProfilePlaneRideTrip />
            </div>
            <BadgePlanRideTrip />
            <FilterPlanRideTrip />
          </div>
        </div>
      </div>

      <DetailPlanRideTrip />
      <NotificationPlanRideTrip />
    </>
  );
};
