"use client";
import * as React from "react";
import clsx from "clsx";
import {
  SettingsSupportActionEnum,
  SettingsSupportContext,
} from "../../context";
import { getDictionaries } from "../../i18n";
import SVGIcon from "@/core/icons";
import { Passwordfield } from "@/core/components/passwordfield";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { useDeleteDeactivateAccount } from "../../react_query/hooks";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants";

export const DeactivateConfirmationSettingsSupport = () => {
  const dictionaries = getDictionaries();
  const router = useRouter();
  const { state, dispatch } = React.useContext(SettingsSupportContext);
  const { isLg } = useTailwindBreakpoint();
  const { mutateAsync: deleteDeactivateAccount } = useDeleteDeactivateAccount();
  const isOpen = state.deactivate_confirmation.is_open;
  const handleClose = () => {
    dispatch({
      type: SettingsSupportActionEnum.SetDeactivateConfirmationData,
      payload: {
        ...state.deactivate_confirmation,
        is_open: false,
      },
    });
  };

  const handleEnterPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: SettingsSupportActionEnum.SetDeactivateConfirmationData,
      payload: {
        ...state.deactivate_confirmation,
        form: {
          ...state.deactivate_confirmation.form,
          password: {
            ...state.deactivate_confirmation.form.password,
            value: e.currentTarget.value,
          },
        },
      },
    });
  };

  const handleClickDeactivateConfirmation = async () => {
    const res = await deleteDeactivateAccount();
    if (!res) return;
    dispatch({
      type: SettingsSupportActionEnum.SetDeactivateConfirmationData,
      payload: {
        ...state.deactivate_confirmation,
        is_open: false,
      },
    });
    const cookies = new Cookies();
    cookies.remove("token", { path: "/" });
    router.push(AppCollectionURL.public.login());
  };
  return (
    <AdaptiveModal
      className={clsx(
        "!max-w-[100vw] lg:!max-w-[524px]",
        "h-[100vh] lg:h-fit",
        "!rounded-[0.625rem]",
        "overflow-auto",
        "!px-[0rem] !py-[0rem]"
      )}
      open={isOpen}
      variant={isLg ? "modal" : "page_sheet"}
      onClose={handleClose}
    >
      <button
        aria-label={"schließen"}
        name={"schließen"}
        className={clsx(
          "absolute top-[1.5rem] left-[1.5rem]",
          "block lg:hidden",
          "cursor-pointer"
        )}
        onClick={handleClose}
      >
        <SVGIcon
          name="X"
          className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#5B5B5B] dark:text-[#C3C3C3]")}
        />
      </button>
      <div
        className={clsx(
          "grid grid-cols-1 items-center content-center lg:items-start lg:content-start justify-center justify-items-center gap-[2rem]",
          "w-full h-full lg:h-fit",
          "overflow-auto",
          "px-[1rem] py-[1rem] lg:!px-[2rem] lg:!py-[2rem]"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-center justify-items-center",
            "w-full"
          )}
        >
          <div
            className={clsx(
              "flex items-center justify-center",
              "w-[120px] h-[120px]",
              "rounded-[50%]",
              "bg-[#F5F5F5] dark:bg-[#2A2A2A]"
            )}
          >
            <SVGIcon
              name="OctagonX"
              className={clsx("w-[5rem] h-[5rem]", "text-[black] dark:text-white")}
            />
          </div>
        </div>

        <h1
          className={clsx("text-[1.5rem] text-[black] dark:text-white font-bold text-center")}
        >
          {dictionaries.deactivate_confirmation.title}
        </h1>

        <p
          className={clsx("text-[1rem] text-[#888888] dark:text-[#C3C3C3] font-normal text-center")}
        >
          {dictionaries.deactivate_confirmation.message}
        </p>

        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
            "w-full"
          )}
        >
          <Passwordfield
            labelProps={{
              ...dictionaries.deactivate_confirmation.form.input.password
                .labelProps,
            }}
            inputProps={{
              ...dictionaries.deactivate_confirmation.form.input.password
                .inputProps,
              value: state.deactivate_confirmation.form.password.value,
              onChange: handleEnterPassword,
            }}
          />
        </div>

        <button
          aria-label={
            dictionaries.deactivate_confirmation.cta.deactivate.children
          }
          name={dictionaries.deactivate_confirmation.cta.deactivate.children}
          className={clsx(
            "flex items-center justify-center",
            "w-full",
            "py-[1rem]",
            "text-[1rem] text-[#C50707] font-medium text-left",
            "cursor-pointer"
          )}
          onClick={handleClickDeactivateConfirmation}
        >
          {dictionaries.deactivate_confirmation.cta.deactivate.children}
        </button>
      </div>
    </AdaptiveModal>
  );
};
