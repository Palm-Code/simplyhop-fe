"use client";
import * as React from "react";
import clsx from "clsx";
import { FormLoginAuth } from "../fragments/form";
import Image from "next/image";
import { getDictionaries } from "../i18n";
import { LoginAuthContext } from "../context";
import { OTPFormLoginAuth } from "../fragments/otp_form";
import Link from "next/link";

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
          "bg-[white]",
          "px-[1rem] py-[1.5rem] sm:py-[80px]",
          "rounded-[1.25rem]",
          "max-w-[508px] w-full h-full"
        )}
      >
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

        {state.step.name === "otp" ? <OTPFormLoginAuth /> : <FormLoginAuth />}

        {/* privacy_policy */}
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[1rem]",
            "w-full"
          )}
        >
          <p
            className={clsx(
              "text-[0.75rem] text-[#232323] font-light text-center"
            )}
            dangerouslySetInnerHTML={{
              __html: dictionaries.privacy_policy.label,
            }}
          />

          <div
            className={clsx(
              "grid grid-flow-col place-content-center place-items-center gap-[0.5rem]"
            )}
          >
            <div className="w-[52px] h-[52px] flex items-center justify-center">
              <Image
                {...dictionaries.header.logo}
                alt={dictionaries.header.logo.alt}
                className="w-[52px] h-[52px] object-contain"
              />
            </div>
            <p
              className={clsx(
                "text-[0.75rem] text-[#232323] font-normal text-center"
              )}
              dangerouslySetInnerHTML={{
                __html: dictionaries.privacy_policy.credit.message,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
