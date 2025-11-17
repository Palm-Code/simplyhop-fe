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

export const DetailOrganizationContainer = () => {
  useGetDashboardSuperAdmin();
  useGetDashboardSuperAdminPerOrganizationId();
  useGetRidesSearch();
  return (
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
    </div>
  );
};
