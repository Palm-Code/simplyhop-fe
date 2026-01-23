"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { RegisterAuthActionEnum, RegisterAuthContext } from "../../context";
import { Button } from "@/core/components/button";
import { MoonLoader } from "@/core/components/moon_loader";
import {
  usePostAuthRequestOTPRegistration,
  usePostAuthVerifyOTP,
} from "../../react_query/hooks";
import { OtpField } from "@/core/components/otp_field";
import SVGIcon from "@/core/icons";

export const OTPFormRegisterAuth = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(RegisterAuthContext);
  const {
    mutateAsync: postAuthVerifyOTP,
    isPending: isPendingPostAuthVerifyOTP,
  } = usePostAuthVerifyOTP();
  const {
    mutate: postAuthRequestOTPRegistration,
    isPending: isPendingPostAuthRequestOTPRegistration,
  } = usePostAuthRequestOTPRegistration();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleChangeOTP = (value: string) => {
    dispatch({
      type: RegisterAuthActionEnum.SetOTPFormData,
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
    try {
      await postAuthVerifyOTP();
    } catch {
      setIsLoading(false);
    }
  };

  const handleRequestOTP = () => {
    dispatch({
      type: RegisterAuthActionEnum.SetOTPFormData,
      payload: {
        ...state.otp_form,
        otp: {
          ...state.otp_form.otp,
          value: "",
        },
        error: null,
      },
    });
    postAuthRequestOTPRegistration();
  };

  const handleClickBack = () => {
    dispatch({
      type: RegisterAuthActionEnum.SetStepData,
      payload: {
        ...state.step,
        name: "form",
      },
    });
    dispatch({
      type: RegisterAuthActionEnum.SetFormData,
      payload: {
        ...state.form,
        error: null,
      },
    });
    dispatch({
      type: RegisterAuthActionEnum.SetOTPFormData,
      payload: {
        ...state.otp_form,
        otp: {
          ...state.otp_form.otp,
          value: "",
        },
        error: null,
      },
    });
  };

  const isSubmitLoading =
    isPendingPostAuthVerifyOTP ||
    isPendingPostAuthRequestOTPRegistration ||
    isLoading;
  const isEmailHasNoLength = !state.form.email.value.length;
  const isEmailInvalid = !!state.form.email.error;
  const isOTPFilled = state.otp_form.otp.value.length === 6;
  const isSubmitDisabled =
    isPendingPostAuthVerifyOTP ||
    isEmailHasNoLength ||
    isEmailInvalid ||
    !isOTPFilled ||
    isPendingPostAuthRequestOTPRegistration ||
    isLoading;

  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-center content-center justify-start justify-items-start gap-[2rem]",
        "w-full h-full",
      )}
    >
      <button
        onClick={handleClickBack}
        className={clsx(
          "flex items-center justify-start gap-4",
          "cursor-pointer",
        )}
      >
        <SVGIcon
          name="ArrowLeft"
          className={clsx("w-6 h-6", "text-[#767676] dark:text-[#DADADA]")}
        />
        <p
          className={clsx(
            "text-[#232323] dark:text-white text-base font-normal",
          )}
        >
          {dictionaries.otp_form.cta.back.children}
        </p>
      </button>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
          "w-full",
        )}
      >
        <h1
          className={clsx(
            "text-[#292929] dark:text-white text-[1.5rem] font-bold",
          )}
        >
          {dictionaries.otp_form.title}
        </h1>
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start",
            "w-full",
          )}
        >
          <p
            className={clsx(
              "text-[#5B5B5B] dark:text-[#E9E6E6] text-[1rem] font-normal",
            )}
            dangerouslySetInnerHTML={{
              __html: dictionaries.otp_form.description.replaceAll(
                "{{email}}",
                state.form.email.value,
              ),
            }}
          />

          <p
            className={clsx(
              "text-[#5B5B5B] dark:text-[#E9E6E6] text-[1rem] font-normal",
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
            "rounded-[0.375rem]",
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
          "w-full h-full",
        )}
      >
        <OtpField
          value={state.otp_form.otp.value}
          disabled={isSubmitLoading}
          onChange={handleChangeOTP}
        />

        <Button
          aria-label={dictionaries.form.cta.save.children}
          name={dictionaries.form.cta.save.children}
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
            "w-full",
          )}
        >
          <span
            className={clsx(
              "text-[#5B5B5B] dark:text-[#E9E6E6] text-[1rem] font-normal",
            )}
          >
            {dictionaries.otp_form.request_otp.description}
          </span>
          <button
            className={clsx(
              "cursor-pointer",
              "text-[#33CC33] text-[1rem] font-normal",
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
