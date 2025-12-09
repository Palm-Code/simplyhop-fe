"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../i18n";
import { PersonalInformationFormCreateOrganization } from "../fragments/personal_information_form";
import { Divider } from "@/core/components/divider";
import { CompanyTypeFormCreateOrganization } from "../fragments/company_type_form";
import { GeneralVehicleInformationFormCreateOrganization } from "../fragments/general_vehicle_information_form";
import { CreateOrganizationContext } from "../context";
import { PictureVehicleInformationFormCreateOrganization } from "../fragments/picture_vehicle_information_form";
import { CapacityVehicleInformationFormCreateOrganization } from "../fragments/capacity_vehicle_information_form";
import { TripVehicleInformationFormCreateOrganization } from "../fragments/trip_vehicle_information_form";
import { CTACreateOrganization } from "../fragments/cta";
import { NotificationCreateOrganization } from "../fragments/notification";
import SVGIcon from "@/core/icons";
import Link from "next/link";

export const CreateOrganizationContainer = () => {
  const dictionaries = getDictionaries();
  const { state } = React.useContext(CreateOrganizationContext);
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
            "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem] lg:gap-[100px]",
            "w-full max-w-[680px]"
          )}
        >
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
                "grid grid-cols-1 place-content-start place-items-start gap-6",
                "w-full"
              )}
            >
              <div className={clsx("flex items-center justify-start gap-4")}>
                <Link
                  href={dictionaries.cta.back.href}
                  aria-label={dictionaries.cta.back.name}
                >
                  <SVGIcon
                    name="ArrowLeft"
                    className={clsx(
                      "w-6 h-6",
                      "text-[#767676] dark:text-[#767676]"
                    )}
                  />
                </Link>
                <h2
                  className={clsx(
                    "text-[1.5rem] text-[#232323] dark:text-white font-bold"
                  )}
                >
                  {dictionaries.title}
                </h2>
              </div>

              <div
                className={clsx(
                  "grid grid-cols-1 place-content-start place-items-start gap-3",
                  "w-full"
                )}
              >
                <h2
                  className={clsx(
                    "text-[1rem] text-[#292929] dark:text-white font-bold"
                  )}
                >
                  {dictionaries.company_data.title}
                </h2>
                <CompanyTypeFormCreateOrganization />
              </div>

              <PersonalInformationFormCreateOrganization />
            </div>
            <Divider />

            {state.ride_plan.form.offer_trip.selected?.id === "yes" && (
              <div
                className={clsx(
                  "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
                  "w-full"
                )}
              >
                <h3
                  className={clsx(
                    "text-[1.5rem] text-[#292929] dark:text-white font-bold"
                  )}
                >
                  {dictionaries.vehicle_information.title}
                </h3>
                <GeneralVehicleInformationFormCreateOrganization />
                <PictureVehicleInformationFormCreateOrganization />
                <CapacityVehicleInformationFormCreateOrganization />
                <TripVehicleInformationFormCreateOrganization />
              </div>
            )}
            <CTACreateOrganization />
          </div>
        </div>
      </div>

      <NotificationCreateOrganization />
    </>
  );
};
