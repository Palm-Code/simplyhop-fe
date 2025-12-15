"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { Textfield } from "@/core/components/textfield";
import { RegisterAuthActionEnum, RegisterAuthContext } from "../../context";
import { Button } from "@/core/components/button";
import { getError } from "@/core/utils/form";
import { usePostAuthRequestOTPRegistration } from "../../react_query/hooks";
import SVGIcon from "@/core/icons";

export const FormRegisterAuth = () => {
  const dictionaries = getDictionaries();
  const globalDictionaries = getGlobalDictionaries();
  const { state, dispatch } = React.useContext(RegisterAuthContext);
  const {
    mutateAsync: postAuthRequestOTPRegistration,
    isPending: isPendingPostAuthRequestOTPRegistration,
  } = usePostAuthRequestOTPRegistration();
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.email.validations.items,
      value: e.currentTarget.value,
    });
    dispatch({
      type: RegisterAuthActionEnum.SetFormData,
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

  const handleChangeCompanyCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: RegisterAuthActionEnum.SetFormData,
      payload: {
        ...state.form,
        email: {
          ...state.form.email,
          value: e.currentTarget.value,
        },
      },
    });
  };

  const handleClickRegister = async () => {
    const res = await postAuthRequestOTPRegistration();
    if (!res) return;
    dispatch({
      type: RegisterAuthActionEnum.SetStepData,
      payload: {
        ...state.step,
        name: "otp",
      },
    });
  };

  const handleClickBack = () => {
    dispatch({
      type: RegisterAuthActionEnum.SetStepData,
      payload: {
        ...state.step,
        name: "organization",
      },
    });
  };

  const isEmailHasNoLength = !state.form.email.value.length;
  const isEmailInvalid = !!state.form.email.error;
  const isSubmitDisabled =
    isEmailHasNoLength ||
    isEmailInvalid ||
    isPendingPostAuthRequestOTPRegistration;
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[2rem]",
        "px-[1rem]",
        "rounded-[1.25rem]",
        "w-full h-full"
      )}
    >
      <button
        onClick={handleClickBack}
        className={clsx(
          "flex items-center justify-start gap-4",
          "cursor-pointer"
        )}
      >
        <SVGIcon
          name="ArrowLeft"
          className={clsx("w-6 h-6", "text-[#767676] dark:text-[#DADADA]")}
        />
        <p
          className={clsx(
            "text-[#232323] dark:text-white text-base font-normal"
          )}
        >
          {dictionaries.form.cta.back.children}
        </p>
      </button>

      <h1
        className={clsx(
          "text-[#232323] dark:text-white text-[1.5rem] font-bold"
        )}
      >
        {dictionaries.form.title}
      </h1>

      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        <Textfield
          labelProps={{
            ...dictionaries.form.email.labelProps,
          }}
          inputProps={{
            ...dictionaries.form.email.inputProps,
            value: state.form.email.value,
            onChange: handleChangeEmail,
          }}
          error={state.form.email.error?.name}
        />
        {!!state.form.organization?.organization_code && (
          <Textfield
            labelProps={{
              ...dictionaries.form.company_code.labelProps,
            }}
            inputProps={{
              ...dictionaries.form.company_code.inputProps,
              value: state.form.company_code.value,
              onChange: handleChangeCompanyCode,
            }}
            error={state.form.company_code.error?.name}
          />
        )}

        <Button
          aria-label={dictionaries.form.cta.save.children}
          name={dictionaries.form.cta.save.children}
          className={clsx("px-[1rem] py-[0.75rem]")}
          disabled={isSubmitDisabled}
          onClick={handleClickRegister}
        >
          {dictionaries.form.cta.save.children}
        </Button>
      </div>
    </div>
  );
};
