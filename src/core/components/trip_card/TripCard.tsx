"use client";
import * as React from "react";
import clsx from "clsx";
import {
  TripDesktopCard,
  TripDesktopCardProps,
} from "../trip_desktop_card/TripDesktopCard";
import { TripMobileCard } from "../trip_mobile_card/TripMobileCard";
import { TripSplitCard } from "../trip_split_card";

export interface TripCardProps extends TripDesktopCardProps {
  variant?: "split" | "merge";
}

export const TripCard = ({
  variant = "merge",
  ...otherProps
}: TripCardProps) => {
  if (variant === "split") {
    return <TripSplitCard {...otherProps} />;
  }

  return (
    <>
      <div
        className={clsx(
          "hidden lg:grid grid-cols-1 place-content-start place-items-start",
          "w-full"
        )}
      >
        <TripDesktopCard {...otherProps} />
      </div>
      <div
        className={clsx(
          "grid lg:hidden grid-cols-1 place-content-start place-items-start",
          "w-full"
        )}
      >
        <TripMobileCard {...otherProps} />
      </div>
    </>
  );
};
