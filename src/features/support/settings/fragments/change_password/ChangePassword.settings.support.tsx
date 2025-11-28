"use client";
import * as React from "react";
import clsx from "clsx";
import {
  SettingsSupportActionEnum,
  SettingsSupportContext,
} from "../../context";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { Button } from "@/core/components/button";
import { Passwordfield } from "@/core/components/passwordfield";
import { Checkbox } from "@/core/components/checkbox";
import { usePostAuthChangePassword } from "../../react_query/hooks";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import SVGIcon from "@/core/icons";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { getError } from "@/core/utils/form";
import { MoonLoader } from "@/core/components/moon_loader";

export const ChangePasswordSettingsSupport = () => {
  const dictionaries = getDictionaries();
  const globalDictionaries = getGlobalDictionaries();
  const { state, dispatch } = React.useContext(SettingsSupportContext);
  const { isLg } = useTailwindBreakpoint();
  const {
    mutateAsync: postChangePassword,
    isPending: isPendingPostChangePassword,
  } = usePostAuthChangePassword();
  const isOpen = state.change_password.is_open;
  const handleClose = () => {
    dispatch({
      type: SettingsSupportActionEnum.SetChangePasswordData,
      payload: {
        ...state.change_password,
        is_open: false,
      },
    });
  };

  const handleChangeActualPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.password.validations.items,
      value: e.currentTarget.value,
    });
    dispatch({
      type: SettingsSupportActionEnum.SetChangePasswordData,
      payload: {
        ...state.change_password,
        form: {
          ...state.change_password.form,
          actual_password: {
            ...state.change_password.form.actual_password,
            value: e.currentTarget.value,
            error: errorItem,
          },
        },
      },
    });
  };

  const handleChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.password.validations.items,
      value: e.currentTarget.value,
    });
    dispatch({
      type: SettingsSupportActionEnum.SetChangePasswordData,
      payload: {
        ...state.change_password,
        form: {
          ...state.change_password.form,
          new_password: {
            ...state.change_password.form.new_password,
            value: e.currentTarget.value,
            error: errorItem,
          },
        },
      },
    });
  };

  const handleChangeConfirmNewPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const errorObj =
      globalDictionaries.form.confirm_password.validations.items.find(
        (item) => {
          return item.id === "unmatched_password";
        }
      );
    const err = !errorObj
      ? null
      : {
          id: errorObj.id,
          name: errorObj.name,
        };
    dispatch({
      type: SettingsSupportActionEnum.SetChangePasswordData,
      payload: {
        ...state.change_password,
        form: {
          ...state.change_password.form,
          confirm_new_password: {
            ...state.change_password.form.confirm_new_password,
            value: e.currentTarget.value,
            error:
              state.change_password.form.new_password.value !==
              e.currentTarget.value
                ? err
                : null,
          },
        },
      },
    });
  };

  const handleChangeTNC = () => {
    dispatch({
      type: SettingsSupportActionEnum.SetChangePasswordData,
      payload: {
        ...state.change_password,
        form: {
          ...state.change_password.form,
          tnc: {
            ...state.change_password.form.tnc,
            checked: !state.change_password.form.tnc.checked,
          },
        },
      },
    });
  };

  const handleClickChangePassword = async () => {
    const res = await postChangePassword();

    if (!res) return;
    dispatch({
      type: SettingsSupportActionEnum.SetChangePasswordData,
      payload: {
        ...state.change_password,
        is_open: false,
      },
    });
    dispatch({
      type: SettingsSupportActionEnum.SetChangePasswordNotificationData,
      payload: {
        ...state.change_password_notification,
        is_open: true,
      },
    });
  };

  const isSubmitDisabled =
    !state.change_password.form.actual_password.value.length ||
    !state.change_password.form.new_password.value.length ||
    !state.change_password.form.confirm_new_password.value.length ||
    !state.change_password.form.tnc.checked ||
    !!state.change_password.form.actual_password.error ||
    !!state.change_password.form.new_password.error ||
    !!state.change_password.form.confirm_new_password.error ||
    isPendingPostChangePassword;
  const isSubmitLoading = isPendingPostChangePassword;
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
          className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#5B5B5B]")}
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
        <h1
          className={clsx("text-[1.5rem] text-[black] dark:text-white font-bold text-center")}
        >
          {dictionaries.change_password.title}
        </h1>

        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
            "w-full"
          )}
        >
          <Passwordfield
            labelProps={{
              ...dictionaries.change_password.form.actual_password.password
                .labelProps,
            }}
            inputProps={{
              ...dictionaries.change_password.form.actual_password.password
                .inputProps,
              value: state.change_password.form.actual_password.value,
              onChange: handleChangeActualPassword,
            }}
            error={state.change_password.form.actual_password.error?.name}
          />
          <Passwordfield
            labelProps={{
              ...dictionaries.change_password.form.new_password.password
                .labelProps,
            }}
            inputProps={{
              ...dictionaries.change_password.form.new_password.password
                .inputProps,
              value: state.change_password.form.new_password.value,
              onChange: handleChangeNewPassword,
            }}
            error={state.change_password.form.new_password.error?.name}
          />
          <Passwordfield
            labelProps={{
              ...dictionaries.change_password.form.confirm_new_password.password
                .labelProps,
            }}
            inputProps={{
              ...dictionaries.change_password.form.confirm_new_password.password
                .inputProps,
              value: state.change_password.form.confirm_new_password.value,
              onChange: handleChangeConfirmNewPassword,
            }}
            error={state.change_password.form.confirm_new_password.error?.name}
          />
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]",
              "w-full"
            )}
          >
            <Checkbox
              checked={state.change_password.form.tnc.checked}
              onChange={handleChangeTNC}
            />
            <span
              className={clsx("text-[#232323] dark:text-white text-[0.75rem] font-light")}
              dangerouslySetInnerHTML={{
                __html: dictionaries.change_password.tnc.label,
              }}
            />
          </div>
        </div>

        <Button
          aria-label={dictionaries.change_password.cta.change_password.children}
          name={dictionaries.change_password.cta.change_password.children}
          className={clsx("py-[1rem]")}
          disabled={isSubmitDisabled}
          isLoading={isSubmitLoading}
          onClick={handleClickChangePassword}
        >
          {isSubmitLoading && <MoonLoader size={20} color={"white"} />}
          {dictionaries.change_password.cta.change_password.children}
        </Button>
      </div>
    </AdaptiveModal>
  );
};
