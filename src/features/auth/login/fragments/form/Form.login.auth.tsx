"use client";
import * as React from "react";
import clsx from "clsx";
import Image from "next/image";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { Textfield } from "@/core/components/textfield";
import { LoginAuthActionEnum, LoginAuthContext } from "../../context";
import { Button } from "@/core/components/button";
import { getError } from "@/core/utils/form";
import { MoonLoader } from "@/core/components/moon_loader";
import { usePostAuthLogin } from "../../react_query/hooks";

export const FormLoginAuth = () => {
  const dictionaries = getDictionaries();
  const globalDictionaries = getGlobalDictionaries();
  const { state, dispatch } = React.useContext(LoginAuthContext);
  const { mutate: postAuthLogin, isPending: isPendingPostAuthLogin } =
    usePostAuthLogin();

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
    postAuthLogin();
  };

  const isSubmitLoading = isPendingPostAuthLogin;
  const isEmailHasNoLength = !state.form.email.value.length;
  const isEmailInvalid = !!state.form.email.error;

  const isSubmitDisabled =
    isPendingPostAuthLogin || isEmailHasNoLength || isEmailInvalid;

  return (
    <div
      className={clsx(
        "grid grid-rows-[auto_1fr_auto] grid-cols-1 items-stretch content-between justify-start justify-items-start gap-[2rem]",
        "bg-[white]",
        // "px-[1rem] lg:px-[3rem] py-[3rem]",
        "rounded-[1.25rem]",
        "max-w-[508px] w-full h-full"
      )}
    >
      <div className="w-[148px] h-[40px] flex items-center justify-center">
        <Image
          {...dictionaries.form.header.logo}
          alt={dictionaries.form.header.logo.alt}
          className="w-[170px] h-[170px] object-contain"
        />
      </div>

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

        {!!state.form.error && (
          <div
            className={clsx(
              "px-[1rem] py-[0.5rem]",
              "w-full",
              "bg-[#F9E6E6]",
              "border border-[#C50707]",
              "rounded-[0.375rem]"
            )}
          >
            <span
              className={clsx("text-[#C50707] text-[0.875rem] font-medium")}
            >
              {
                "No user founded on this organization domain. Please ask your organization administrator"
              }
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
            __html: dictionaries.form.privacy_policy.label,
          }}
        />

        <div
          className={clsx(
            "grid grid-flow-col place-content-center place-items-center gap-[0.5rem]"
          )}
        >
          <div className="w-[52px] h-[52px] flex items-center justify-center">
            <Image
              {...dictionaries.form.header.logo}
              alt={dictionaries.form.header.logo.alt}
              className="w-[52px] h-[52px] object-contain"
            />
          </div>
          <p
            className={clsx(
              "text-[0.75rem] text-[#232323] font-normal text-center"
            )}
            dangerouslySetInnerHTML={{
              __html: dictionaries.form.privacy_policy.credit.message,
            }}
          />
        </div>
      </div>
    </div>
  );
};
