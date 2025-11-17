import { Card } from "@/core/components/card";
import clsx from "clsx";
import * as React from "react";

export interface PassengerCardChatTripProps {
  label?: string;
  passenger?: string;
}

export const PassengerCardChatTrip = ({
  label = "",
  passenger = "",
}: PassengerCardChatTripProps) => {
  return (
    <Card
      className={clsx(
        "!grid-flow-col !items-center !content-center !justify-between"
      )}
    >
      <span className={clsx("text-[#606060] text-[0.75rem] font-normal")}>
        {label}
      </span>

      <span
        className={clsx(
          "text-[black] text-[0.875rem] lg:text-[1.5rem] font-bold"
        )}
      >
        {passenger}
      </span>
    </Card>
  );
};
