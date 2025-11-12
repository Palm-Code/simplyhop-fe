"use client";
import * as React from "react";
import clsx from "clsx";
import { SummaryDashboard } from "../fragments/summary/Summary.dashboard";
import { UpcomingRidesDashboard } from "../fragments/upcoming_rides";
import { VehiclesDashboard } from "../fragments/vehicles";

export const DashboardSupportContainer = () => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <SummaryDashboard />
      <div
        className={clsx(
          "grid grid-cols-1 lg:grid-cols-2 place-content-start place-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        <UpcomingRidesDashboard />
        <VehiclesDashboard />
      </div>
    </div>
  );
};
