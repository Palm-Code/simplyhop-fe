import * as React from "react";
import clsx from "clsx";
import { FormAccountUpdateSupport } from "../fragments/form";
import { CTAAccountUpdateSupport } from "../fragments/cta/CTA.account_update.support";
import { DeactivateAccountUpdateSupport } from "../fragments/deactivate";
import { DeactivateConfirmationAccountUpdateSupport } from "../fragments/deactivate_confirmation";
import { DeactivateNotificationAccountUpdateSupport } from "../fragments/deactivate_notification";
import { PictureFormAccountUpdateSupport } from "../fragments/picture_form";
import { getDictionaries } from "../i18n";
import { NotificationAccountUpdateSupport } from "../fragments/notification";

export const AccountUpdateSupportContainer = () => {
  const dictionaries = getDictionaries();
  return (
    <>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
            "w-full",
            "px-[1.5rem] py-[1.5rem]",
            "relative",
            "border border-[#D3E7CE]",
            "rounded-[1.25rem]"
          )}
        >
          <h2 className={clsx("text-[#292929] text-[1.5rem] font-bold")}>
            {dictionaries.title}
          </h2>
          <PictureFormAccountUpdateSupport />
          <FormAccountUpdateSupport />
        </div>

        <CTAAccountUpdateSupport />
      </div>
      <DeactivateAccountUpdateSupport />
      <DeactivateConfirmationAccountUpdateSupport />
      <DeactivateNotificationAccountUpdateSupport />
      <React.Suspense fallback={<div />}>
        <NotificationAccountUpdateSupport />
      </React.Suspense>
    </>
  );
};
