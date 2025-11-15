import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AppCollectionURL } from "@/core/utils/router/constants";

export const RideFilterMyListTrip = () => {
  const searchParams = useSearchParams();
  const dictionaries = getDictionaries();

  const rideStatus = searchParams.get("ride-status");
  const type = searchParams.get("type");

  if (!!type) return null;

  return (
    <div
      className={clsx(
        "flex items-center justify-start gap-[0.5rem]",
        "w-full",
        "overflow-auto"
      )}
    >
      {dictionaries.filter.ride.items.map((item, index) => {
        const params =
          index === 0
            ? undefined
            : new URLSearchParams({
                ["ride-status"]: item.id,
              });
        return (
          <Link
            key={index}
            href={AppCollectionURL.private.myList(
              !params ? params : params.toString()
            )}
            className={clsx(
              "px-[1rem] py-[0.5rem]",
              !rideStatus && index === 0
                ? "bg-[#33CC33]"
                : !!rideStatus && item.id === rideStatus
                ? "bg-[#33CC33]"
                : "bg-[#F6F6F6CC]",
              "rounded-[0.75rem]",
              "text-[0.875rem] text-[#000] font-semibold",
              "whitespace-nowrap"
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};
