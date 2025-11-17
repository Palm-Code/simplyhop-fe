"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../i18n";
import { GeneralVehicleInformationFormVehicleUpdateSupport } from "../fragments/general_vehicle_information_form";
import { PictureVehicleInformationFormVehicleUpdateSupport } from "../fragments/picture_vehicle_information_form";
import { CapacityVehicleInformationFormVehicleUpdateSupport } from "../fragments/capacity_vehicle_information_form";
import { TripVehicleInformationFormVehicleUpdateSupport } from "../fragments/trip_vehicle_information_form";
import { CTAVehicleUpdateSupport } from "../fragments/cta";
import { NotificationVehicleUpdateSupport } from "../fragments/notification";
import { useGetVehicleId } from "../react_query/hooks/useGetVehicleId.vehicle_update.support";
import { DeleteNotificationVehicleUpdateSupport } from "../fragments/delete_notification";
import { SuccessDeleteNotificationVehicleUpdateSupport } from "../fragments/success_delete_notification";

export const VehicleUpdateSupportContainer = () => {
  const dictionaries = getDictionaries();
  useGetVehicleId();
  return (
    <>
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center",
          "w-full",
          "lg:pt-[2rem] lg:pb-[3rem] px-[1rem]"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
            "w-full max-w-container"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
              "w-full",
              "pt-[2rem] lg:pt-[0rem]",
              // "sticky top-[90px] z-[30]",
              "bg-[white]",
              "pb-[1.5rem]"
            )}
          >
            <h2
              className={clsx(
                "text-[#292929] text-[1.125rem] lg:text-[1.5rem] font-bold"
              )}
            >
              {dictionaries.vehicle_information.title}
            </h2>
          </div>

          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
              "w-full"
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
                "w-full"
              )}
            >
              <GeneralVehicleInformationFormVehicleUpdateSupport />
              <PictureVehicleInformationFormVehicleUpdateSupport />
              <CapacityVehicleInformationFormVehicleUpdateSupport />
              <TripVehicleInformationFormVehicleUpdateSupport />
            </div>

            <CTAVehicleUpdateSupport />
          </div>
        </div>
      </div>

      <NotificationVehicleUpdateSupport />
      <DeleteNotificationVehicleUpdateSupport />
      <SuccessDeleteNotificationVehicleUpdateSupport />
    </>
  );
};
