import * as React from "react";
import clsx from "clsx";
import { InputPrice } from "@/core/components/input_price";

export interface PriceInputResultTripProps {
  label?: string;
  currency?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const PriceInputResultTrip = ({
  label,
  currency = "€",
  inputProps,
}: PriceInputResultTripProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 grid-flow-row items-center content-center justify-center justify-items-center gap-[1rem]",
        "w-full"
      )}
    >
      {!!label && (
        <span className={clsx("text-[0.875rem] text-[#5B5B5B] dark:text-[#DADADA] font-normal")}>
          {label}
        </span>
      )}
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid grid-rows-1 grid-flow-col place-content-center place-items-center gap-[0.5rem]",
            "border-b border-b-[#E9E6E6] dark:border-b-[#464646]",
            "h-[85px]"
          )}
        >
          <span className={clsx("text-[56px] text-[#232323] dark:text-white font-bold")}>
            {currency}
          </span>
          <InputPrice {...inputProps} />
        </div>
      </div>
    </div>
  );
};
