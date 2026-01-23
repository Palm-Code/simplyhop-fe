"use client";
import * as React from "react";
import clsx from "clsx";
import {
  AccountUpdateSupportActionEnum,
  AccountUpdateSupportContext,
} from "../../context";
import { getDictionaries } from "../../i18n";
import SVGIcon from "@/core/icons";
import { MoonLoader } from "@/core/components/moon_loader";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants";
import {
  usePostAuthDeactivateAccountOTP,
  usePostAuthRequestOTPDeactivate,
} from "../../react_query/hooks";
import { OtpField } from "@/core/components/otp_field";

export const DeactivateConfirmationAccountUpdateSupport = () => {
  const dictionaries = getDictionaries();
  const router = useRouter();
  const { state, dispatch } = React.useContext(AccountUpdateSupportContext);
  const { isLg } = useTailwindBreakpoint();

  const isOpen = state.deactivate_confirmation.is_open;
  const {
    mutateAsync: postAuthDeactivateAccountOTP,
    isPending: isPendingPostAuthDeactivateAccountOTP,
  } = usePostAuthDeactivateAccountOTP();
  const {
    mutate: postAuthRequestOTPDeactivate,
    isPending: isPendingPostAuthRequestOTPDeactivate,
  } = usePostAuthRequestOTPDeactivate();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleClose = () => {
    dispatch({
      type: AccountUpdateSupportActionEnum.SetDeactivateConfirmationData,
      payload: {
        ...state.deactivate_confirmation,
        is_open: false,
      },
    });
  };

  const handleChangeOTP = (value: string) => {
    dispatch({
      type: AccountUpdateSupportActionEnum.SetDeactivateConfirmationData,
      payload: {
        ...state.deactivate_confirmation,
        form: {
          ...state.deactivate_confirmation.form,
          otp: {
            ...state.deactivate_confirmation.form.otp,
            value: value,
          },
        },
      },
    });
  };

  const handleRequestOTP = () => {
    dispatch({
      type: AccountUpdateSupportActionEnum.SetDeactivateConfirmationData,
      payload: {
        ...state.deactivate_confirmation,
        form: {
          ...state.deactivate_confirmation.form,
          otp: {
            ...state.deactivate_confirmation.form.otp,
            value: "",
          },
          error: null,
        },
      },
    });
    postAuthRequestOTPDeactivate();
  };

  const handleClickDeactivateConfirmation = async () => {
    setIsLoading(true);
    const res = await postAuthDeactivateAccountOTP();
    if (!res) {
      setIsLoading(false);
      return;
    }
    dispatch({
      type: AccountUpdateSupportActionEnum.SetDeactivateConfirmationData,
      payload: {
        ...state.deactivate_confirmation,
        is_open: false,
      },
    });
    const cookies = new Cookies();
    cookies.remove("token", { path: "/" });
    router.push(AppCollectionURL.public.login());
  };

  const isSubmitLoading =
    isPendingPostAuthDeactivateAccountOTP ||
    isPendingPostAuthRequestOTPDeactivate ||
    isLoading;
  const isOTPFilled = state.deactivate_confirmation.form.otp.value.length === 6;
  const isSubmitDisabled =
    isPendingPostAuthDeactivateAccountOTP ||
    !isOTPFilled ||
    isPendingPostAuthRequestOTPDeactivate ||
    isLoading;
  return (
    <AdaptiveModal
      className={clsx(
        "!max-w-[100vw] lg:!max-w-[524px]",
        "h-[100vh] lg:h-fit",
        "!rounded-[0.625rem]",
        "overflow-auto",
        "!px-[0rem] !py-[0rem]",
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
          "cursor-pointer",
        )}
        onClick={handleClose}
      >
        <SVGIcon
          name="X"
          className={clsx(
            "w-[1.5rem] h-[1.5rem]",
            "text-[#5B5B5B] dark:text-[#C3C3C3]",
          )}
        />
      </button>
      <div
        className={clsx(
          "grid grid-cols-1 items-center content-center lg:items-start lg:content-start justify-center justify-items-center gap-[2rem]",
          "w-full h-full lg:h-fit",
          "overflow-auto",
          "px-[1rem] py-[1rem] lg:!px-[2rem] lg:!py-[2rem]",
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-center justify-items-center",
            "w-full",
          )}
        >
          <div
            className={clsx(
              "flex items-center justify-center",
              "w-[120px] h-[120px]",
              "rounded-[50%]",
              "bg-[#F5F5F5]",
            )}
          >
            <SVGIcon
              name="OctagonX"
              className={clsx(
                "w-[5rem] h-[5rem]",
                "text-[black] dark:text-white",
              )}
            />
          </div>
        </div>

        <h1
          className={clsx(
            "text-[1.5rem] text-[black] dark:text-white font-bold text-center",
          )}
        >
          {dictionaries.deactivate_confirmation.title}
        </h1>

        <p
          className={clsx(
            "text-[1rem] text-[#888888] dark:text-[#C3C3C3] font-normal text-center",
          )}
        >
          {dictionaries.deactivate_confirmation.message}
        </p>

        {!!state.deactivate_confirmation.form.error?.code && (
          <div
            className={clsx(
              "px-[1rem] py-[0.5rem]",
              "w-full",
              "bg-[#F9E6E6]",
              "border border-[#C50707]",
              "rounded-[0.375rem]",
            )}
          >
            <span
              className={clsx("text-[#C50707] text-[0.875rem] font-medium")}
            >
              {state.deactivate_confirmation.form.error?.code}
            </span>
          </div>
        )}

        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
            "w-full",
          )}
        >
          <OtpField
            value={state.deactivate_confirmation.form.otp.value}
            disabled={isSubmitLoading}
            onChange={handleChangeOTP}
          />
        </div>

        <button
          aria-label={
            dictionaries.deactivate_confirmation.cta.deactivate.children
          }
          name={dictionaries.deactivate_confirmation.cta.deactivate.children}
          className={clsx(
            "flex items-center justify-center gap-[0.5rem]",
            "w-full",
            "py-[1rem]",
            "text-[1rem] text-[#C50707] font-medium text-left",
            "cursor-pointer",
          )}
          disabled={isSubmitDisabled}
          onClick={handleClickDeactivateConfirmation}
        >
          {isSubmitLoading && <MoonLoader size={20} color={"#C50707"} />}
          {dictionaries.deactivate_confirmation.cta.deactivate.children}
        </button>

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
            {
              dictionaries.deactivate_confirmation.otp_form.request_otp
                .description
            }{" "}
            <span
              className={clsx(
                "cursor-pointer",
                "text-[#33CC33] text-[1rem] font-normal",
              )}
              onClick={handleRequestOTP}
            >
              {
                dictionaries.deactivate_confirmation.otp_form.request_otp.cta
                  .request_otp.children
              }
            </span>
          </span>
        </div>
      </div>
    </AdaptiveModal>
  );
};
