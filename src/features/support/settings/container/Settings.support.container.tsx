"use client";
import * as React from "react";
import clsx from "clsx";
import { AccountSettingsSupport } from "../fragments/account";
import { DeactivateSettingsSupport } from "../fragments/deactivate";
import { DeactivateConfirmationSettingsSupport } from "../fragments/deactivate_confirmation";
import { DeactivateNotificationSettingsSupport } from "../fragments/deactivate_notification";
import { ChangePasswordSettingsSupport } from "../fragments/change_password";
import { ChangePasswordNotificationSettingsSupport } from "../fragments/change_password_notification";

export const SettingsSupportContainer = () => {
  return (
    <>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[2rem]",
          "w-full h-full",
          "relative"
        )}
      >
        <AccountSettingsSupport />
      </div>
      <DeactivateSettingsSupport />
      <DeactivateConfirmationSettingsSupport />
      <DeactivateNotificationSettingsSupport />
      <ChangePasswordSettingsSupport />
      <ChangePasswordNotificationSettingsSupport />
    </>
  );
};
