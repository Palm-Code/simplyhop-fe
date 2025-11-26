"use client";
import * as React from "react";
import clsx from "clsx";
import TripDesktopCard, {
  TripDesktopCardProps,
} from "../trip_desktop_card/TripDesktopCard";
import TripMobileCard from "../trip_mobile_card/TripMobileCard";

export interface TripCardProps extends TripDesktopCardProps {}

export const TripCard = (props: TripCardProps) => {
  return (
    <>
      <div
        className={clsx(
          "hidden lg:grid grid-cols-1 place-content-start place-items-start",
          "w-full"
        )}
      >
        <TripDesktopCard {...props} />
      </div>
      <div
        className={clsx(
          "grid lg:hidden grid-cols-1 place-content-start place-items-start",
          "w-full"
        )}
      >
        <TripMobileCard {...props} />
      </div>
    </>
  );
};
