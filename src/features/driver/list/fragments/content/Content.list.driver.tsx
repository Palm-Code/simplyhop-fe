"use client";
import * as React from "react";
import clsx from "clsx";
import {
  useGetDashboardOrganization,
  useGetDashboardSuperAdmin,
  useGetUserBlockList,
  useGetUserProfileId,
} from "../../react_query/hooks";
import { DataTableListDriver } from "../data_table";
import { UserProfileListDriver } from "../user_profile";
import { DeleteChatConfirmationListDriver } from "../delete_chat_confirmation";
import { DeleteAccountConfirmationListDriver } from "../delete_account_confirmation";
import { BlockedUserListDriver } from "../blocked_user";

export const ContentListDriver = () => {
  useGetDashboardOrganization();
  useGetDashboardSuperAdmin();
  useGetUserProfileId();
  useGetUserBlockList();
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
      <BlockedUserListDriver />
    </>
  );
};
