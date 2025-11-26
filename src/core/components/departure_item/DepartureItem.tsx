import * as React from "react";
import clsx from "clsx";
import { Tooltip as ReactTooltip } from "react-tooltip";
import SVGIcon from "@/core/icons";
import { PlaceItem } from "../place_item";
import { TimeItem } from "../time_item";

export interface DepartureItemProps {
  place?: string;
  time?: string;
}

export const DepartureItem = ({
  place = "",
  time = "",
}: DepartureItemProps) => {
  return (
    <div
      className={clsx("grid grid-cols-1 place-content-start place-items-start")}
    >
      <PlaceItem place={place} />
      <TimeItem time={time} />
    </div>
  );
};
