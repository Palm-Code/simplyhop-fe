import { Card } from "@/core/components/card";
import clsx from "clsx";
import * as React from "react";

export interface PriceCardResultTripProps {
  label?: string;
  price?: string;
}

export const PriceCardResultTrip = ({
  label = "",
  price = "",
}: PriceCardResultTripProps) => {
  return (
    <Card
      className={clsx(
        "!grid-flow-col !items-center !content-center !justify-between",
        "!border-[#E9E6E6] dark:!border-[#464646]"
      )}
      style={{
        boxShadow: undefined,
        backdropFilter: undefined,
      }}
    >
      <span
        className={clsx(
          "text-[#5B5B5B] dark:text-[#DADADA] text-[0.75rem] font-normal"
        )}
      >
        {label}
      </span>

      <span
        className={clsx(
          "text-[#232323] dark:text-white text-[0.875rem] lg:text-[1.5rem] font-bold"
        )}
      >
        {price}
      </span>
    </Card>
  );
};
