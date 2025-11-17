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
        "grid grid-cols-1 lg:grid-cols-none grid-flow-row lg:grid-flow-col items-center content-center justify-center justify-items-center gap-[1rem]",
        "w-full"
      )}
    >
      {!!label && (
        <span className={clsx("text-[1.5rem] text-[black] font-bold")}>
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
            "border-b border-b-[black]",
            "h-[85px]"
          )}
        >
          <span className={clsx("text-[56px] text-[black] font-bold")}>
            {currency}
          </span>
          <InputPrice {...inputProps} />
        </div>
      </div>
    </div>
  );
};
