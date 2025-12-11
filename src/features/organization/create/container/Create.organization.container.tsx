"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../i18n";
import { Divider } from "@/core/components/divider";
import { CompanyDataFormCreateOrganization } from "../fragments/company_data_form";
import { CTACreateOrganization } from "../fragments/cta";
import { NotificationCreateOrganization } from "../fragments/notification";
import SVGIcon from "@/core/icons";
import Link from "next/link";
import { CompanyOfficeFormCreateOrganization } from "../fragments/company_office_form";
import { CreateOrganizationContext } from "../context";
import { PinPointCreateOrganization } from "../fragments/pin_point";
import { PinPointDeleteConfirmationCreateOrganization } from "../fragments/pin_point_delete_confirmation";

export const CreateOrganizationContainer = () => {
  const dictionaries = getDictionaries();
  const { state } = React.useContext(CreateOrganizationContext);
  return (
    <>
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center",
          "w-full",
          "lg:pt-8 px-4"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-6 lg:gap-[100px]",
            "w-full max-w-[680px]"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-6",
              "w-full",
              "px-0 py-0 lg:px-6 lg:py-6"
            )}
          >
            <div
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

              <CompanyDataFormCreateOrganization />
              {!!state.company_data.form.company_type.selected && (
                <>
                  <Divider />
                  <CompanyOfficeFormCreateOrganization />
                  <Divider />
                  <CTACreateOrganization />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <PinPointCreateOrganization />
      <NotificationCreateOrganization />
      <PinPointDeleteConfirmationCreateOrganization />
    </>
  );
};
