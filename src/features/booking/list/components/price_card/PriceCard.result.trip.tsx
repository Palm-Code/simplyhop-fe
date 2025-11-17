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
    <Card className={clsx("!grid-flow-col !items-center !content-center !justify-between")}>
      <span className={clsx("text-[#606060] text-[0.75rem] font-normal")}>
        {label}
      </span>

      <span className={clsx("text-[black] text-[0.875rem] lg:text-[1.5rem] font-bold")}>
        {price}
      </span>
    </Card>
  );
};
