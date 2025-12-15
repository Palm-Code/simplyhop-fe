"use client";
import * as React from "react";
import clsx from "clsx";
import { HeaderOrganizationTrip } from "../fragments/header";
import { ListTripProvider } from "../../list/context";
import { AlertApp } from "@/core/modules/app/fragments/alert";
import { NavigationOrganizationTrip } from "../fragments/navigation";
import { RideFilterListTrip } from "../../list/fragments/ride_filter";
import { RideSectionListTrip } from "../../list/fragments/ride_section";
import { useGetDashboardSuperAdminPerOrganizationId } from "../react_query/hooks";

export const OrganizationTripContainer = () => {
  useGetDashboardSuperAdminPerOrganizationId();
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <HeaderOrganizationTrip />
      <div className={clsx("flex items-center justify-between", "w-full")}>
        <NavigationOrganizationTrip />
      </div>
      <ListTripProvider>
        <RideFilterListTrip />
        <RideSectionListTrip />
        <AlertApp />
      </ListTripProvider>
    </div>
  );
};
