import * as React from "react";
import clsx from "clsx";

export interface OrganizationInformationItemProps {
  name?: string;
  value?: string;
}

export const OrganizationInformationItem = ({
  name = "",
  value = "",
}: OrganizationInformationItemProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.25rem]",
        "w-full"
      )}
    >
      <p className={clsx("text-[#606060] dark:text-[#DADADA] text-[0.875rem] font-normal")}>
        {name}
      </p>
      <p className={clsx("text-[#232323CC] dark:text-[#DADADA] text-[0.875rem] font-medium")}>
        {value}
      </p>
    </div>
  );
};
