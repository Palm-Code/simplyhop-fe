import * as React from "react";
import clsx from "clsx";
import SVGIcon, { SVGIconProps } from "@/core/icons";
import { getDictionaries } from "../../i18n";
import Link from "next/link";
import { AppCollectionURL } from "@/core/utils/router/constants";

export const BadgePlanRideTrip = () => {
  const dictionaries = getDictionaries();

  return (
    <div className={clsx("flex items-center justify-start gap-2")}>
      <Link
        className={clsx(
          "grid grid-flow-col place-items-center place-content-center gap-2",
          "bg-[#767676]",
          "rounded-[0.75rem]",
          "px-[12px] py-[10px]",
          "text-[0.875rem] text-[white] font-bold",
          "w-fit"
        )}
        href={AppCollectionURL.private.trip()}
      >
        <SVGIcon
          {...(dictionaries.top_badge.booking.icon as {
            name: SVGIconProps["name"];
          })}
          className={clsx("w-[1rem] h-[1rem] lg:w-4 lg:h-4", "text-[#232323]")}
        />
        {dictionaries.top_badge.booking.label}
      </Link>
      <div
        className={clsx(
          "grid grid-flow-col place-items-center place-content-center gap-2",
          "bg-[#333FFF]",
          "rounded-[0.75rem]",
          "px-[12px] py-[10px]",
          "text-[0.875rem] text-neutral-50 font-bold",
          "w-fit"
        )}
      >
        <SVGIcon
          {...(dictionaries.top_badge.ride.icon as {
            name: SVGIconProps["name"];
          })}
          className={clsx("w-[1rem] h-[1rem] lg:w-6 lg:h-6", "text-neutral-50")}
        />
        {dictionaries.top_badge.ride.label}
      </div>
    </div>
  );
};
