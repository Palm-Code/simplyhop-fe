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
import { DeleteChatConfirmationListDriver } from "../fragments/delete_chat_confirmation";
import { DeleteAccountConfirmationListDriver } from "../fragments/delete_account_confirmation";
import { NavigationListDriver } from "../fragments/navigation";

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
        <NavigationListDriver />
        <DataTableListDriver />
      </div>
      <UserProfileListDriver />
      <DeleteChatConfirmationListDriver />
      <DeleteAccountConfirmationListDriver />
    </>
  );
};
