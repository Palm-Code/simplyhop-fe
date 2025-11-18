import * as React from "react";
import clsx from "clsx";

export interface PriceOfferedItemProps {
  label?: string;
  price?: string;
}

export const PriceOfferedItem = ({
  label = "",
  price = "",
}: PriceOfferedItemProps) => {
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-between justify-items-start gap-[0.5rem]",
        "w-full"
      )}
    >
      <p className={clsx("text-[#606060] text-[0.75rem] font-normal")}>
        {label}
      </p>
      <p className={clsx("text-[black] dark:text-white text-[0.875rem] lg:text-[1.5rem] font-bold")}>
        {price}
      </p>
    </div>
  );
};
