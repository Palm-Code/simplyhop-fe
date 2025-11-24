"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { useSearchParams, usePathname } from "next/navigation";
import { TripFilterTabButton } from "@/core/components/trip_filter_tab_button";

export const RideFilterListTrip = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const dictionaries = getDictionaries();

  const rideStatus = searchParams.get("ride-status");
  const type = searchParams.get("type");

  return (
    <div
      className={clsx(
        "flex items-center justify-start gap-[0.5rem]",
        "w-full",
        "overflow-auto"
      )}
    >
      {dictionaries.filter.ride.items.map((item, index) => {
        let params = index === 0 ? undefined : new URLSearchParams();

        if (index !== 0) {
          params!.set("ride-status", item.id);
          if (type) {
            params!.set("type", type);
          }
        } else if (type) {
          params = new URLSearchParams();
          params.set("type", type);
        }

        return (
          <TripFilterTabButton
            key={index}
            href={!params ? pathname : `${pathname}?${params.toString()}`}
            isActive={
              (!rideStatus && index === 0) ||
              (!!rideStatus && item.id === rideStatus)
            }
          >
            {item.name}
          </TripFilterTabButton>
        );
      })}
    </div>
  );
};
