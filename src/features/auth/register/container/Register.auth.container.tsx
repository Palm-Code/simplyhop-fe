"use client";
import * as React from "react";
import clsx from "clsx";
import { RegisterAuthContext } from "../context";
import { OTPFormRegisterAuth } from "../fragments/otp_form";
import { FormRegisterAuth } from "../fragments/form";
import { OrganizationRegisterAuth } from "../fragments/organization";
import { NavigationBarRegisterAuth } from "../fragments/navigation_bar";
import { getDictionaries } from "../i18n";
import { PrivacyPolicy } from "@/core/components/privacy_policy";

export const RegisterAuthContainer = () => {
  const dictionaries = getDictionaries();
  const { state } = React.useContext(RegisterAuthContext);
  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-start content-start justify-center justify-items-center w-full h-full",
      )}
    >
      <NavigationBarRegisterAuth />
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start w-full max-w-[1092px] px-6 h-full",
          "pt-28",
        )}
      >
        {state.step.name === "otp" ? (
          <div
            className={clsx(
              "grid grid-cols-1 items-start content-start justify-center justify-items-center w-full h-full",
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start w-full max-w-[680px] gap-8 w-full",
              )}
            >
              <OTPFormRegisterAuth />
              <PrivacyPolicy
                privacyLabel={dictionaries.privacy_policy.label}
                creditMessage={dictionaries.privacy_policy.credit.message}
                logo={dictionaries.header.logo.image}
              />
            </div>
          </div>
        ) : state.step.name === "form" ? (
          <div
            className={clsx(
              "grid grid-cols-1 items-start content-start justify-center justify-items-center w-full h-full",
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start w-full max-w-[680px] gap-8 h-full",
              )}
            >
              <FormRegisterAuth />
              <PrivacyPolicy
                privacyLabel={dictionaries.privacy_policy.label}
                creditMessage={dictionaries.privacy_policy.credit.message}
                logo={dictionaries.header.logo.image}
              />
            </div>
          </div>
        ) : (
          <div
            className={clsx(
              "grid grid-cols-1 items-start content-start justify-center justify-items-center w-full h-full",
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start w-full h-full gap-8",
              )}
            >
              <OrganizationRegisterAuth />
              <PrivacyPolicy
                privacyLabel={dictionaries.privacy_policy.label}
                creditMessage={dictionaries.privacy_policy.credit.message}
                logo={dictionaries.header.logo.image}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
