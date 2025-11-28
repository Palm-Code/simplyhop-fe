import * as React from "react";
import clsx from "clsx";
import { InformationAccountSupport } from "../fragments/information";

export const AccountSupportContainer = () => {
  return (
    <div
      className={clsx(
        "grid grid-cols-2 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <InformationAccountSupport />
    </div>
  );
};
