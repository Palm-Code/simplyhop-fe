"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../i18n";
import { TabRegistrationProfile } from "../fragments/tab";
import { PersonalInformationFormRegistrationProfile } from "../fragments/personal_information_form";
import { Divider } from "@/core/components/divider";
import { RidePlanFormRegistrationProfile } from "../fragments/ride_plan_form";
import { GeneralVehicleInformationFormRegistrationProfile } from "../fragments/general_vehicle_information_form";
import { RegistrationProfileContext } from "../context";
import { PictureVehicleInformationFormRegistrationProfile } from "../fragments/picture_vehicle_information_form";
import { CapacityVehicleInformationFormRegistrationProfile } from "../fragments/capacity_vehicle_information_form";
import { TripVehicleInformationFormRegistrationProfile } from "../fragments/trip_vehicle_information_form";
import { CTARegistrationProfile } from "../fragments/cta";
import { NotificationRegistrationProfile } from "../fragments/notification";
import { PicturePersonalInformationFormRegistrationProfile } from "../fragments/picture_personal_information_form";

export const RegistrationProfileContainer = () => {
  const dictionaries = getDictionaries();
  const { state } = React.useContext(RegistrationProfileContext);
  return (
    <>
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center",
          "w-full",
          "lg:pt-[2rem] px-[1rem]"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 lg:grid-cols-[421px_1fr] place-content-start place-items-start gap-[1.5rem] lg:gap-[100px]",
            "w-full max-w-container"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
              "w-full",
              "pt-[2rem] lg:pt-[0rem]",
              "sticky top-0 lg:top-[calc(90px+2rem)] z-[30]",
              "pb-[1.5rem]"
            )}
          >
            <h1
              className={clsx(
                "text-[#292929] dark:text-white text-[1.125rem] lg:text-[1.5rem] font-bold"
              )}
            >
              {dictionaries.title}
            </h1>
            <TabRegistrationProfile />
          </div>

          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
              "w-full",
              "px-[0rem] py-[0rem] lg:px-[1.5rem] lg:py-[1.5rem]"
            )}
          >
            <div
              id={dictionaries.personal_information.id}
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
                "w-full"
              )}
            >
              <h2 className={clsx("text-[1.5rem] text-[#292929] dark:text-white font-bold")}>
                {dictionaries.personal_information.form.title}
              </h2>
              <PicturePersonalInformationFormRegistrationProfile />
              <PersonalInformationFormRegistrationProfile />
            </div>
            <Divider />
            <RidePlanFormRegistrationProfile />
            {state.ride_plan.form.offer_trip.selected?.id === "yes" && (
              <div
                className={clsx(
                  "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
                  "w-full"
                )}
              >
                <h2 className={clsx("text-[1.5rem] text-[#292929] font-bold")}>
                  {dictionaries.vehicle_information.title}
                </h2>
                <GeneralVehicleInformationFormRegistrationProfile />
                <PictureVehicleInformationFormRegistrationProfile />
                <CapacityVehicleInformationFormRegistrationProfile />
                <TripVehicleInformationFormRegistrationProfile />
              </div>
            )}
            <CTARegistrationProfile />
          </div>
        </div>
      </div>

      <NotificationRegistrationProfile />
    </>
  );
};
