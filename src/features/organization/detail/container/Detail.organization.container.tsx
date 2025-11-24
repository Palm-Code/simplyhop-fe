"use client";
import * as React from "react";
import clsx from "clsx";
import {
  useGetDashboardSuperAdmin,
  useGetDashboardSuperAdminPerOrganizationId,
  useGetRidesSearch,
} from "../react_query/hooks";
import { ProfileDetailOrganization } from "../fragments/profile";
import { RidesDetailOrganization } from "../fragments/rides";
import { DriversDetailOrganization } from "../fragments/drivers/Drivers.detail.organization";
import { EditDetailOrganization } from "../fragments/edit";
import { DeleteAccountConfirmationDetailOrganization } from "../fragments/delete_account_confirmation";
import { ListTripProvider } from "@/features/trip/list/context";
import { ListTripContainer } from "@/features/trip/list/container";
import { AlertApp } from "@/core/modules/app/fragments/alert";
import { TripDetailOrganization } from "../fragments/trip";

export const DetailOrganizationContainer = () => {
  useGetDashboardSuperAdmin();
  useGetDashboardSuperAdminPerOrganizationId();
  useGetRidesSearch();
  return (
    <>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-6",
          "w-full"
        )}
      >
        <ProfileDetailOrganization />
        <div
          className={clsx(
            "grid grid-cols-1 lg:grid-cols-2 place-content-start place-items-start gap-6",
            "w-full"
          )}
        >
          <RidesDetailOrganization />
          <DriversDetailOrganization />
        </div>
        <TripDetailOrganization />
      </div>
      <EditDetailOrganization />
      <DeleteAccountConfirmationDetailOrganization />
    </>
  );
};
