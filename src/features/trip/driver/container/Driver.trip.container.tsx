"use client";
import * as React from "react";
import clsx from "clsx";
import { HeaderDriverTrip } from "../fragments/header";
import { ListTripProvider } from "../../list/context";
import { AlertApp } from "@/core/modules/app/fragments/alert";
import { NavigationDriverTrip } from "../fragments/navigation";
import { TabListTrip } from "../../list/fragments/tab";
import { RideFilterListTrip } from "../../list/fragments/ride_filter";
import { SectionListTrip } from "../../list/fragments/section";
import { useGetUserProfileId } from "../react_query/hooks";

export const DriverTripContainer = () => {
  useGetUserProfileId();
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <HeaderDriverTrip />
      <div className={clsx("flex items-center justify-between", "w-full")}>
        <NavigationDriverTrip />
      </div>
      <ListTripProvider>
        <TabListTrip />
        <RideFilterListTrip />
        <SectionListTrip />
        <AlertApp />
      </ListTripProvider>
    </div>
  );
};
