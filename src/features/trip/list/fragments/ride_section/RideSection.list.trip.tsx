import * as React from "react";
import { RideListTrip } from "../ride/Ride.list.trip";
import { RideDetailListTrip } from "../ride_detail";
import { DeleteRideNotificationListTrip } from "../delete_ride_notification";
import { SuccessDeleteRideNotificationListTrip } from "../success_delete_ride_notification";
import { CompletedRideListTrip } from "../complete_ride_confirmation";
import { ShareRideNotificationListTrip } from "../share_ride_notification";

export const RideSectionListTrip = () => {
  return (
    <>
      <RideListTrip />
      <RideDetailListTrip />
      <DeleteRideNotificationListTrip />
      <SuccessDeleteRideNotificationListTrip />
      <CompletedRideListTrip />
      <ShareRideNotificationListTrip />
    </>
  );
};
