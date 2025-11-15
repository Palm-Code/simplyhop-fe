"use client";
import * as React from "react";
import clsx from "clsx";
import { HeaderTripSupport } from "../fragments/header";
import { TabTripSupport } from "../fragments/tab";
import { useSearchParams } from "next/navigation";
import { BookTripSupport } from "../fragments/book";
import { RideTripSupport } from "../fragments/ride";
import { RideDetailTripSupport } from "../fragments/ride_detail";
import { BookDetailTripSupport } from "../fragments/book_detail";
import { UserContext } from "@/core/modules/app/context";
import { DeleteRideNotificationTripSupport } from "../fragments/delete_ride_notification";
import { SuccessDeleteRideNotificationTripSupport } from "../fragments/success_delete_ride_notification";
import { ShareRideNotificationTripSupport } from "../fragments/share_ride_notification";
import { CancelBookNotificationTripSupport } from "../fragments/cancel_book_notification";
import { SuccessCancelBookNotificationTripSupport } from "../fragments/success_cancel_book_notification";
import { RideFilterTripSupport } from "../fragments/ride_filter";
import { CompletedRideTripSupport } from "../fragments/complete_ride_confirmation";

export const TripSupportContainer = () => {
  const { state: userState } = React.useContext(UserContext);
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

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
              "grid grid-rows-1 grid-cols-1 place-content-start place-items-start",
              "max-w-container w-full h-full"
            )}
          >
            <div
              className={clsx(
                "grid grid-rows-1 grid-cols-1 place-content-start place-items-start gap-[1.5rem] sm:gap-[2.5rem]",
                "w-full h-full",
                "sticky top-[90px] z-[10]",
                "bg-[white]",
                "pt-[3rem] pb-[2.5rem]"
              )}
            >
              <HeaderTripSupport />
              <React.Suspense fallback={<div />}>
                <TabTripSupport />
                <RideFilterTripSupport />
              </React.Suspense>
            </div>

            {type === "book" ? (
              <BookTripSupport />
            ) : !type && userState.profile?.is_driver === false ? (
              <BookTripSupport />
            ) : (
              <RideTripSupport />
            )}
          </div>
        </div>
      </div>

      <RideDetailTripSupport />

      <BookDetailTripSupport />
      <DeleteRideNotificationTripSupport />
      <SuccessDeleteRideNotificationTripSupport />
      <ShareRideNotificationTripSupport />
      <CancelBookNotificationTripSupport />
      <SuccessCancelBookNotificationTripSupport />
      <CompletedRideTripSupport />
    </>
  );
};
