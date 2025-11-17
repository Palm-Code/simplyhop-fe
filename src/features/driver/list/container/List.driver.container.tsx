"use client";
import * as React from "react";
import clsx from "clsx";
import { DataTableListDriver } from "../fragments/data_table";
import {
  useGetDashboardSuperAdmin,
  useGetDashboardOrganization,
  useGetUserProfileId,
} from "../react_query/hooks";
import { UserProfileListDriver } from "../fragments/user_profile";

export const ListDriverContainer = () => {
  useGetDashboardOrganization();
  useGetDashboardSuperAdmin();
  useGetUserProfileId();
  return (
    <>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        <DataTableListDriver />
      </div>
      <UserProfileListDriver />
    </>
  );
};
