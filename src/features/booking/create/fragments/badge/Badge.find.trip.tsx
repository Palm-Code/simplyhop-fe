"use client";
import * as React from "react";
import clsx from "clsx";
import SVGIcon, { SVGIconProps } from "@/core/icons";
import { getDictionaries } from "../../i18n";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AppCollectionURL } from "@/core/utils/router/constants";

export const BadgeFindTrip = () => {
  const dictionaries = getDictionaries();
  const pathname = usePathname();
  const isBooking = pathname.includes("mitfahrt-suchen");
  return (
    <div className={clsx("flex items-center justify-start gap-2", "pb-2")}>
      <div
        className={clsx(
          "grid grid-flow-col place-items-center place-content-center gap-2",
          "bg-green-500",
          "rounded-[0.75rem]",
          "px-[12px] py-[10px]",
          "text-[0.875rem] text-[#232323] font-bold",
          "w-fit"
        )}
      >
        <SVGIcon
          {...(dictionaries.badge.booking.icon as {
            name: SVGIconProps["name"];
          })}
          className={clsx("w-[1rem] h-[1rem] lg:w-4 lg:h-4", "text-[#232323]")}
        />
        {dictionaries.badge.booking.label}
      </div>

      <Link
        className={clsx(
          "grid grid-flow-col place-items-center place-content-center gap-3",
          "bg-[#767676]",
          "rounded-[0.75rem]",
          "px-[12px] py-[10px]",
          "text-white",
          "text-[0.875rem] font-bold",
          "w-fit"
        )}
        href={AppCollectionURL.private.ride()}
      >
        <SVGIcon
          {...(dictionaries.badge.ride.icon as { name: SVGIconProps["name"] })}
          className={clsx("w-[1rem] h-[1rem] lg:w-4 lg:h-4", "text-[white]")}
        />
        {dictionaries.badge.ride.label}
      </Link>
    </div>
  );
};
