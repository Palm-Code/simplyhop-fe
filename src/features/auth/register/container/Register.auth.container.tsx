"use client";
import * as React from "react";
import clsx from "clsx";
import { RegisterAuthContext } from "../context";
import { OTPFormRegisterAuth } from "../fragments/otp_form";
import { FormRegisterAuth } from "../fragments/form";
import { OrganizationRegisterAuth } from "../fragments/organization";
import { NavigationBarRegisterAuth } from "../fragments/navigation_bar";

export const RegisterAuthContainer = () => {
  const { state } = React.useContext(RegisterAuthContext);
  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-start content-start justify-center justify-items-center w-full h-full"
      )}
    >
      <NavigationBarRegisterAuth />
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start w-full max-w-[1068px] h-full",
          "pt-28"
        )}
      >
        {state.step.name === "otp" ? (
          <div
            className={clsx(
              "grid grid-cols-1 items-start content-start justify-center justify-items-center w-full h-full"
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start w-full max-w-[680px] w-full"
              )}
            >
              <OTPFormRegisterAuth />
            </div>
          </div>
        ) : state.step.name === "form" ? (
          <div
            className={clsx(
              "grid grid-cols-1 items-start content-start justify-center justify-items-center w-full h-full"
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start w-full max-w-[680px] h-full"
              )}
            >
              <FormRegisterAuth />
            </div>
          </div>
        ) : (
          <div
            className={clsx(
              "grid grid-cols-1 items-start content-start justify-center justify-items-center w-full h-full"
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start w-full h-full"
              )}
            >
              <OrganizationRegisterAuth />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
