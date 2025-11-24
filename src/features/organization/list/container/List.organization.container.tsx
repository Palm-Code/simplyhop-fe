"use client";
import * as React from "react";
import clsx from "clsx";
import { DataTableListOrganization } from "../fragments/data_table";
import {
  useGetDashboardSuperAdminPerOrganization,
  useGetDashboardSuperAdminPerOrganizationId,
} from "../react_query/hooks";
import { UserProfileListOrganization } from "../fragments/user_profile";
import { HeaderListOrganization } from "../fragments/header";

export const ListOrganizationContainer = () => {
  useGetDashboardSuperAdminPerOrganization();
  useGetDashboardSuperAdminPerOrganizationId();
  return (
    <>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        <HeaderListOrganization />
        <DataTableListOrganization />
      </div>
      <UserProfileListOrganization />
    </>
  );
};
