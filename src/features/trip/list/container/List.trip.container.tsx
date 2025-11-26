"use client";
import * as React from "react";
import clsx from "clsx";
import { HeaderListTrip } from "../fragments/header";
import { TabListTrip } from "../fragments/tab";
import { SectionListTrip } from "../fragments/section";
import { RideFilterListTrip } from "../fragments/ride_filter";
import { UserContext } from "@/core/modules/app/context";
import { BookingSectionListTrip } from "../fragments/booking_section";

export const ListTripContainer = () => {
  const { state: userState } = React.useContext(UserContext);
  return (
    <>
      <div className={clsx("w-full h-full", "pb-[3rem]", "relative")}>
        <div
          className={clsx(
            "grid grid-rows-1 grid-cols-1 items-start content-start justify-center justify-items-center",
            "w-full h-full",
            "px-[1rem]"
          )}
        >
          <div
            className={clsx(
              "grid grid-rows-1 grid-cols-1 place-content-start place-items-start gap-[1.5rem] sm:gap-[2.5rem]",
              "max-w-container w-full h-full"
            )}
          >
            <HeaderListTrip />
            {userState.profile?.is_driver && <TabListTrip />}

            <RideFilterListTrip />
            {userState.profile?.is_driver ? (
              <SectionListTrip />
            ) : (
              <BookingSectionListTrip />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
