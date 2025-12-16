"use client";
import * as React from "react";
import clsx from "clsx";
import { FormLoginAuth } from "../fragments/form";
import Image from "next/image";
import { getDictionaries } from "../i18n";
import { LoginAuthContext } from "../context";
import { OTPFormLoginAuth } from "../fragments/otp_form";
import Link from "next/link";
import { ThemeToggleButton } from "@/core/components/theme_toggle_button";
import { PrivacyPolicy } from "@/core/components/privacy_policy";

export const LoginAuthContainer = () => {
  const dictionaries = getDictionaries();
  const { state } = React.useContext(LoginAuthContext);
  return (
    <div
      className={clsx(
        "grid grid-rows-1 grid-cols-1 items-stretch content-between justify-center justify-items-center w-full h-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-rows-[auto_1fr_auto] grid-cols-1 items-stretch content-between justify-start justify-items-start gap-[2rem]",
          "px-[1rem] py-[1.5rem] sm:py-[80px]",
          "rounded-[1.25rem]",
          "max-w-[508px] w-full h-full"
        )}
      >
        <div className={clsx("flex items-center justify-between", "w-full")}>
          <Link
            href={process.env.NEXT_PUBLIC_SITE_URL ?? ""}
            className="w-[148px] h-[40px] flex items-center justify-center cursor-pointer"
          >
            <Image
              {...dictionaries.header.logo}
              alt={dictionaries.header.logo.alt}
              className="w-[170px] h-[170px] object-contain"
            />
          </Link>
          <ThemeToggleButton />
        </div>

        {state.step.name === "otp" ? <OTPFormLoginAuth /> : <FormLoginAuth />}

        <PrivacyPolicy
          privacyLabel={dictionaries.privacy_policy.label}
          creditMessage={dictionaries.privacy_policy.credit.message}
          logo={dictionaries.header.logo}
        />
      </div>
    </div>
  );
};
