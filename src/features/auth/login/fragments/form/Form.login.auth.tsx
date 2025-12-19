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
import Link from "next/link";

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
            "text-[#232323] dark:text-white text-[1.5rem] font-bold"
          )}
        >
          {dictionaries.form.title}
        </h1>
        <p
          className={clsx(
            "text-[#232323] dark:text-[#E9E6E6] text-base font-light"
          )}
        >
          {dictionaries.form.description}
        </p>
      </div>

      {!!state.form.error?.code && (
        <div
          className={clsx(
            "px-4 py-2",
            "w-full",
            "bg-[#F9E6E6]",
            "border border-[#C50707]",
            "rounded-md"
          )}
        >
          <span className={clsx("text-[#C50707] text-[0.875rem] font-medium")}>
            {state.form.error?.code}
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

        <div className={clsx("flex items-center justify-start gap-2", "w-full")}>
          <span
            className={clsx(
              "text-[#5B5B5B] dark:text-[#DADADA] text-base font-normal"
            )}
          >
            {dictionaries.form.register.message}{" "}
          </span>
          <Link
            href={dictionaries.form.register.cta.href}
            className={clsx(
              "text-[#249124] dark:text-[#33CC33] text-base font-normal underline"
            )}
          >
            {dictionaries.form.register.cta.children}
          </Link>
        </div>

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
