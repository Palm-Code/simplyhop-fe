import * as React from "react";
import clsx from "clsx";
import { DurationItem } from "../duration_item";
import { TravelPathItem } from "../travel_path_item";

export interface TravelTimeItemProps {
  time?: string;
  variant?: "primary" | "secondary";
}

export const TravelTimeItem = ({
  time = "",
  variant = "primary",
}: TravelTimeItemProps) => {
  return (
    <div
      className={clsx("grid grid-cols-1 place-content-start place-items-start")}
    >
      <TravelPathItem variant={variant} mode="horizontal" />

      <DurationItem time={time} />
    </div>
  );
};
