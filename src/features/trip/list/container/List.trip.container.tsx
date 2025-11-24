"use client";
import * as React from "react";
import clsx from "clsx";
import { HeaderListTrip } from "../fragments/header";
import { TabListTrip } from "../fragments/tab";
import { useSearchParams } from "next/navigation";
import { BookListTrip } from "../fragments/book";
import { RideListTrip } from "../fragments/ride";
import { RideDetailListTrip } from "../fragments/ride_detail";
import { BookDetailListTrip } from "../fragments/book_detail";
import { UserContext } from "@/core/modules/app/context";
import { DeleteRideNotificationListTrip } from "../fragments/delete_ride_notification";
import { SuccessDeleteRideNotificationListTrip } from "../fragments/success_delete_ride_notification";
import { ShareRideNotificationListTrip } from "../fragments/share_ride_notification";
import { CancelBookNotificationListTrip } from "../fragments/cancel_book_notification";
import { SuccessCancelBookNotificationListTrip } from "../fragments/success_cancel_book_notification";
import { RideFilterListTrip } from "../fragments/ride_filter";
import { CompletedRideListTrip } from "../fragments/complete_ride_confirmation";

export const ListTripContainer = () => {
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
            <HeaderListTrip />
            <TabListTrip />
            <RideFilterListTrip />

            {type === "book" ? (
              <>
                <BookListTrip />
                <BookDetailListTrip />
                <CancelBookNotificationListTrip />
                <SuccessCancelBookNotificationListTrip />
              </>
            ) : !type && userState.profile?.is_driver === false ? (
              <>
                <BookListTrip />
                <BookDetailListTrip />
                <CancelBookNotificationListTrip />
                <SuccessCancelBookNotificationListTrip />
              </>
            ) : (
              <>
                <RideListTrip />
                <RideDetailListTrip />
                <DeleteRideNotificationListTrip />
                <SuccessDeleteRideNotificationListTrip />
                <CompletedRideListTrip />
                <ShareRideNotificationListTrip />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
