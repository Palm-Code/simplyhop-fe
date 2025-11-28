import * as React from "react";
import clsx from "clsx";
import { InformationAccountSupport } from "../fragments/information";
import SettingHeader from "@/core/components/setting_header/SettingHeader";
import { getDictionaries } from "../i18n";
import { NavigationDetailAccount } from "../fragments/navigation";

export const AccountSupportContainer = () => {
  const dictionaries = getDictionaries();
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <SettingHeader title={dictionaries.title} />
      <NavigationDetailAccount />
      <div
        className={clsx(
          "grid grid-cols-1 lg:grid-cols-2 place-content-start place-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        <InformationAccountSupport />
      </div>
    </div>
  );
};
