import * as React from "react";
import clsx from "clsx";
import { HeaderOrganizationTrip } from "../fragments/header";
import { ListTripProvider } from "../../list/context";
import { ListTripContainer } from "../../list/container";
import { AlertApp } from "@/core/modules/app/fragments/alert";

export const OrganizationTripContainer = () => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <HeaderOrganizationTrip />
      <ListTripProvider>
        <ListTripContainer />
        <AlertApp />
      </ListTripProvider>
    </div>
  );
};
