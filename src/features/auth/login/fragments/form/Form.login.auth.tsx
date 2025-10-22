"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { Textfield } from "@/core/components/textfield";
import { LoginAuthActionEnum, LoginAuthContext } from "../../context";
import { Button } from "@/core/components/button";
import { getError } from "@/core/utils/form";
import { MoonLoader } from "@/core/components/moon_loader";
import { usePostAuthRequestOTP } from "../../react_query/hooks";

export const FormLoginAuth = () => {
  const dictionaries = getDictionaries();
  const globalDictionaries = getGlobalDictionaries();
  const { state, dispatch } = React.useContext(LoginAuthContext);
  const { mutate: postAuthRequestOTP, isPending: isPendingPostAuthRequestOTP } =
    usePostAuthRequestOTP();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.email.validations.items,
      value: e.currentTarget.value,
    });

    dispatch({
      type: LoginAuthActionEnum.SetFormData,
      payload: {
        ...state.form,
        email: {
          ...state.form.email,
          value: e.currentTarget.value,
          error: errorItem,
        },
      },
    });
  };

  const handleClickLogin = async () => {
    postAuthRequestOTP();
  };

  const isSubmitLoading = isPendingPostAuthRequestOTP;
  const isEmailHasNoLength = !state.form.email.value.length;
  const isEmailInvalid = !!state.form.email.error;

  const isSubmitDisabled =
    isPendingPostAuthRequestOTP || isEmailHasNoLength || isEmailInvalid;

  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-center content-center justify-start justify-items-start gap-[2rem]",
        "bg-[white]",
        "w-full h-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
          "w-full"
        )}
      >
        <h1 className={clsx("text-[#292929] text-[1.5rem] font-bold")}>
          {dictionaries.form.title}
        </h1>
        <p className={clsx("text-[#232323] text-[0.75rem] font-light")}>
          {dictionaries.form.description}
        </p>
      </div>

      {!!state.form.error?.code && (
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
        <Textfield
          labelProps={{ ...dictionaries.form.input.email.labelProps }}
          inputProps={{
            ...dictionaries.form.input.email.inputProps,
            value: state.form.email.value,
            onChange: handleChangeEmail,
          }}
          disabled={isSubmitLoading}
          error={state.form.email.error?.name}
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
          {dictionaries.form.cta.login.children}
        </Button>
      </div>
    </div>
  );
};
