"use client";
import * as React from "react";
import clsx from "clsx";
import { HeaderMyListTrip } from "../fragments/header";
import { TabMyListTrip } from "../fragments/tab";
import { useSearchParams } from "next/navigation";
import { BookMyListTrip } from "../fragments/book";
import { RideMyListTrip } from "../fragments/ride";
import { RideDetailMyListTrip } from "../fragments/ride_detail";
import { BookDetailMyListTrip } from "../fragments/book_detail";
import { UserContext } from "@/core/modules/app/context";
import { DeleteRideNotificationMyListTrip } from "../fragments/delete_ride_notification";
import { SuccessDeleteRideNotificationMyListTrip } from "../fragments/success_delete_ride_notification";
import { ShareRideNotificationMyListTrip } from "../fragments/share_ride_notification";
import { CancelBookNotificationMyListTrip } from "../fragments/cancel_book_notification";
import { SuccessCancelBookNotificationMyListTrip } from "../fragments/success_cancel_book_notification";
import { RideFilterMyListTrip } from "../fragments/ride_filter";
import { CompletedRideMyListTrip } from "../fragments/complete_ride_confirmation";

export const MyListTripContainer = () => {
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
              "grid grid-rows-1 grid-cols-1 place-content-start place-items-start gap-[1.5rem] sm:gap-[2.5rem]",
              "max-w-container w-full h-full"
            )}
          >
            <HeaderMyListTrip />
            <React.Suspense fallback={<div />}>
              <TabMyListTrip />
              <RideFilterMyListTrip />
            </React.Suspense>

            {type === "book" ? (
              <>
                <BookMyListTrip />
                <BookDetailMyListTrip />
                <CancelBookNotificationMyListTrip />
                <SuccessCancelBookNotificationMyListTrip />
              </>
            ) : !type && userState.profile?.is_driver === false ? (
              <>
                <BookMyListTrip />
                <BookDetailMyListTrip />
                <CancelBookNotificationMyListTrip />
                <SuccessCancelBookNotificationMyListTrip />
              </>
            ) : (
              <>
                <RideMyListTrip />
                <RideDetailMyListTrip />
                <DeleteRideNotificationMyListTrip />
                <SuccessDeleteRideNotificationMyListTrip />
                <CompletedRideMyListTrip />
                <ShareRideNotificationMyListTrip />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
