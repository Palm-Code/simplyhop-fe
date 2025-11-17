"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { useSearchParams } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants";
import { TripFilterTabButton } from "@/core/components/trip_filter_tab_button";

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
          <TripFilterTabButton
            key={index}
            href={AppCollectionURL.private.myList(
              !params ? params : params.toString()
            )}
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
