import * as React from "react";
import clsx from "clsx";
import { InformationAccountSupport } from "../fragments/information";
import { LogoutAccountSupport } from "../fragments/logout/Logout.account.support";

export const AccountSupportContainer = () => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <InformationAccountSupport />
      <LogoutAccountSupport />
    </div>
  );
};
