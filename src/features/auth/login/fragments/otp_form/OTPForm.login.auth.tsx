"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { LoginAuthActionEnum, LoginAuthContext } from "../../context";
import { Button } from "@/core/components/button";
import { MoonLoader } from "@/core/components/moon_loader";
import {
  usePostAuthRequestOTP,
  usePostAuthVerifyOTP,
} from "../../react_query/hooks";
import { OtpField } from "@/core/components/otp_field";

export const OTPFormLoginAuth = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(LoginAuthContext);
  const { mutate: postAuthVerifyOTP, isPending: isPendingPostAuthVerifyOTP } =
    usePostAuthVerifyOTP();
  const { mutate: postAuthRequestOTP, isPending: isPendingPostAuthRequestOTP } =
    usePostAuthRequestOTP();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleChangeOTP = (value: string) => {
    dispatch({
      type: LoginAuthActionEnum.SetOTPFormData,
      payload: {
        ...state.otp_form,
        otp: {
          ...state.otp_form.otp,
          value: value,
        },
      },
    });
  };

  const handleClickLogin = async () => {
    setIsLoading(true);
    postAuthVerifyOTP();
  };

  const handleRequestOTP = () => {
    postAuthRequestOTP();
  };

  const isSubmitLoading =
    isPendingPostAuthVerifyOTP || isPendingPostAuthRequestOTP || isLoading;
  const isEmailHasNoLength = !state.form.email.value.length;
  const isEmailInvalid = !!state.form.email.error;
  const isOTPFilled = state.otp_form.otp.value.length === 6;
  const isSubmitDisabled =
    isPendingPostAuthVerifyOTP ||
    isEmailHasNoLength ||
    isEmailInvalid ||
    !isOTPFilled ||
    isPendingPostAuthRequestOTP ||
    isLoading;

  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-center content-center justify-start justify-items-start gap-[2rem]",
        "w-full h-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
          "w-full"
        )}
      >
        <h1
          className={clsx(
            "text-[#292929] dark:text-white text-[1.5rem] font-bold"
          )}
        >
          {dictionaries.otp_form.title}
        </h1>
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start",
            "w-full"
          )}
        >
          <p
            className={clsx(
              "text-[#5B5B5B] dark:text-[#E9E6E6] text-[1rem] font-normal"
            )}
            dangerouslySetInnerHTML={{
              __html: dictionaries.otp_form.description.replaceAll(
                "{{email}}",
                state.form.email.value
              ),
            }}
          />

          <p
            className={clsx(
              "text-[#5B5B5B] dark:text-[#E9E6E6] text-[1rem] font-normal"
            )}
          >
            {dictionaries.otp_form.description_2}
          </p>
        </div>
      </div>

      {!!state.otp_form.error?.code && (
        <div
          className={clsx(
            "px-[1rem] py-[0.5rem]",
            "w-full",
            "bg-[#F9E6E6]",
            "border border-[#C50707]",
            "rounded-[0.375rem]"
          )}
        >
          <span className={clsx("text-[#C50707] text-[0.875rem] font-medium")}>
            {state.otp_form.error?.code}
          </span>
        </div>
      )}

      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full h-full"
        )}
      >
        <OtpField
          value={state.otp_form.otp.value}
          disabled={isSubmitLoading}
          onChange={handleChangeOTP}
        />

        <Button
          aria-label={dictionaries.form.cta.login.children}
          name={dictionaries.form.cta.login.children}
          className={clsx("px-[1rem] py-[0.75rem]")}
          disabled={isSubmitDisabled}
          isLoading={isSubmitLoading}
          onClick={handleClickLogin}
        >
          {isSubmitLoading && <MoonLoader size={20} color={"white"} />}
          {dictionaries.otp_form.cta.verify_code.children}
        </Button>

        <div
          className={clsx(
            "flex items-center justify-center gap-[0.25rem]",
            "w-full"
          )}
        >
          <span
            className={clsx(
              "text-[#5B5B5B] dark:text-[#E9E6E6] text-[1rem] font-normal"
            )}
          >
            {dictionaries.otp_form.request_otp.description}
          </span>
          <button
            className={clsx(
              "cursor-pointer",
              "text-[#33CC33] text-[1rem] font-normal"
            )}
            onClick={handleRequestOTP}
          >
            {dictionaries.otp_form.request_otp.cta.request_otp.children}
          </button>
        </div>
      </div>
    </div>
  );
};
