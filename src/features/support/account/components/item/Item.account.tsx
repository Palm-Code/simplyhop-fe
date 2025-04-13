import * as React from "react";
import clsx from "clsx";

export interface ItemAccountSupportProps {
  name?: string;
  value?: string;
}

export const ItemAccountSupport = ({
  name = "",
  value = "",
}: ItemAccountSupportProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.25rem]",
        "w-full"
      )}
    >
      <p className={clsx("text-[#606060] text-[0.875rem] font-normal")}>
        {name}
      </p>
      <p className={clsx("text-[#232323CC] text-[0.875rem] font-medium")}>
        {value}
      </p>
    </div>
  );
};
