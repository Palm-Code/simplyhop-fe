'use client'
import * as React from "react";
import clsx from "clsx";
import {
  useGetDashboardOrganization,
  useGetDashboardSuperAdmin,
  useGetUserProfileId,
} from "../../react_query/hooks";
import { DataTableListDriver } from "../data_table";
import { UserProfileListDriver } from "../user_profile";
import { DeleteChatConfirmationListDriver } from "../delete_chat_confirmation";
import { DeleteAccountConfirmationListDriver } from "../delete_account_confirmation";

export const ContentListDriver = () => {
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
      <DeleteChatConfirmationListDriver />
      <DeleteAccountConfirmationListDriver />
    </>
  );
};
