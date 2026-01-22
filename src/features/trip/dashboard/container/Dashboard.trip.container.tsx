import * as React from "react";
import clsx from "clsx";
import { HeaderDashboardTrip } from "../fragments/header";
import { ListTripProvider } from "../../list/context";
import { ListTripContainer } from "../../list/container";
import { AlertApp } from "@/core/modules/app/fragments/alert";
import { NavigationDashboardTrip } from "../fragments/navigation";
import { SearchDashboardTrip } from "../fragments/search";

export const DashboardTripContainer = () => {
  return (
    <ListTripProvider>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full",
        )}
      >
        <HeaderDashboardTrip />
        <div className={clsx("flex items-center justify-between", "w-full")}>
          <NavigationDashboardTrip />
          <SearchDashboardTrip />
        </div>

        <ListTripContainer />
        <AlertApp />
      </div>
    </ListTripProvider>
  );
};
