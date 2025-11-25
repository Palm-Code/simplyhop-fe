import * as React from "react";
import clsx from "clsx";
import { HeaderOrganizationTrip } from "../fragments/header";
import { ListTripProvider } from "../../list/context";
import { ListTripContainer } from "../../list/container";
import { AlertApp } from "@/core/modules/app/fragments/alert";
import { NavigationOrganizationTrip } from "../fragments/navigation";
import { SearchOrganizationTrip } from "../fragments/search";

export const OrganizationTripContainer = () => {
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
        <SearchOrganizationTrip />
      </div>
      <ListTripProvider>
        <ListTripContainer />
        <AlertApp />
      </ListTripProvider>
    </div>
  );
};
