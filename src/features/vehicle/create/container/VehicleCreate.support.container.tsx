"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../i18n";
import { GeneralVehicleInformationFormVehicleCreateSupport } from "../fragments/general_vehicle_information_form";
import { PictureVehicleInformationFormVehicleCreateSupport } from "../fragments/picture_vehicle_information_form";
import { CapacityVehicleInformationFormVehicleCreateSupport } from "../fragments/capacity_vehicle_information_form";
import { TripVehicleInformationFormVehicleCreateSupport } from "../fragments/trip_vehicle_information_form";
import { CTAVehicleCreateSupport } from "../fragments/cta";
import { NotificationVehicleCreateSupport } from "../fragments/notification";

export const VehicleCreateSupportContainer = () => {
  const dictionaries = getDictionaries();

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
              <GeneralVehicleInformationFormVehicleCreateSupport />
              <PictureVehicleInformationFormVehicleCreateSupport />
              <CapacityVehicleInformationFormVehicleCreateSupport />
              <TripVehicleInformationFormVehicleCreateSupport />
            </div>

            <CTAVehicleCreateSupport />
          </div>
        </div>
      </div>

      <NotificationVehicleCreateSupport />
    </>
  );
};
