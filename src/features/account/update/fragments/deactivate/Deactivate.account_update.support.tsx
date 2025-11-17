"use client";
import * as React from "react";
import clsx from "clsx";
import {
  AccountUpdateSupportActionEnum,
  AccountUpdateSupportContext,
} from "../../context";
import { getDictionaries } from "../../i18n";
import SVGIcon from "@/core/icons";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";

export const DeactivateAccountUpdateSupport = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(AccountUpdateSupportContext);
  const { isLg } = useTailwindBreakpoint();
  const isOpen = state.deactivate.is_open;
  const handleClose = () => {
    dispatch({
      type: AccountUpdateSupportActionEnum.SetDeactivateData,
      payload: {
        ...state.deactivate,
        is_open: false,
      },
    });
  };

  const handleClickDeactivate = () => {
    dispatch({
      type: AccountUpdateSupportActionEnum.SetDeactivateData,
      payload: {
        ...state.deactivate,
        is_open: false,
      },
    });
    dispatch({
      type: AccountUpdateSupportActionEnum.SetDeactivateConfirmationData,
      payload: {
        ...state.deactivate_confirmation,
        is_open: true,
      },
    });
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
              "bg-[#F5F5F5]"
            )}
          >
            <SVGIcon
              name="OctagonX"
              className={clsx("w-[5rem] h-[5rem]", "text-[black]")}
            />
          </div>
        </div>

        <h1
          className={clsx(
            "text-[1.25rem] lg:text-[1.5rem] text-[black] font-bold text-center"
          )}
        >
          {dictionaries.deactivate.title}
        </h1>

        <p
          className={clsx(
            "text-[0.875rem] lg:text-[1rem] text-[#888888] font-normal text-center"
          )}
        >
          {dictionaries.deactivate.message}
        </p>

        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[1rem]",
            "w-full"
          )}
        >
          <p
            className={clsx(
              "text-[1rem] text-[#232323] font-semibold text-left"
            )}
          >
            {dictionaries.deactivate.tnc.title}
          </p>
          <ol className={clsx("list-disc", "px-[1rem]")}>
            {dictionaries.deactivate.tnc.items.map((item, itemIndex) => (
              <li
                key={itemIndex}
                id={item.id}
                className={clsx(
                  "text-[0.875rem] lg:text-[1rem] text-[#888888] font-normal text-left"
                )}
              >
                {item.name}
              </li>
            ))}
          </ol>
        </div>

        <button
          aria-label={dictionaries.deactivate.cta.deactivate.children}
          name={dictionaries.deactivate.cta.deactivate.children}
          className={clsx(
            "flex items-center justify-center",
            "w-full",
            "py-[1rem]",
            "text-[1rem] text-[#C50707] font-medium text-left",
            "cursor-pointer"
          )}
          onClick={handleClickDeactivate}
        >
          {dictionaries.deactivate.cta.deactivate.children}
        </button>
      </div>
    </AdaptiveModal>
  );
};
