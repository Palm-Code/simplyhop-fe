"use client";
import * as React from "react";
import clsx from "clsx";
import TripDesktopCard, {
  TripDesktopCardProps,
} from "../trip_desktop_card/TripDesktopCard";
import TripMobileCard from "../trip_mobile_card/TripMobileCard";

export interface TripCardProps extends TripDesktopCardProps {
  mode?: "mobile" | "desktop" | "default";
}

export const TripCard = ({
  mode = "default",
  ...otherProps
}: TripCardProps) => {
  if (mode === "desktop") {
    return <TripDesktopCard {...otherProps} />;
  }
  if (mode === "mobile") {
    return <TripMobileCard {...otherProps} />;
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
