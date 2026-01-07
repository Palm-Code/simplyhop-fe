"use client";
import * as React from "react";
import clsx from "clsx";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { MoonLoader } from "@/core/components/moon_loader";

export interface UserUnblockConfirmationProps {
  // Modal state
  isOpen: boolean;
  onClose: () => void;
  
  // Content
  title: string;
  description: string;
  
  // Buttons
  cancelButton: {
    text: string;
    onClick: () => void;
  };
  
  confirmButton: {
    text: string;
    onClick: () => void;
    isLoading?: boolean;
    disabled?: boolean;
  };
  
  // Optional styling
  modalClassName?: string;
  contentClassName?: string;
}

export const UserUnblockConfirmation = ({
  isOpen,
  onClose,
  title,
  description,
  cancelButton,
  confirmButton,
  modalClassName,
  contentClassName,
}: UserUnblockConfirmationProps) => {
  const { isLg } = useTailwindBreakpoint();

  return (
    <AdaptiveModal
      variant={isLg ? "modal" : "bottom_sheet"}
      className={clsx(
        "!max-w-[100vw] lg:!max-w-[400px]",
        "h-[100vh] lg:!h-fit",
        "!rounded-[0px] lg:!rounded-[0.625rem]",
        "overflow-hidden",
        "!px-[0rem] !py-[0rem]",
        modalClassName
      )}
      open={isOpen}
      onClose={onClose}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[2rem]",
          "w-full h-full",
          "!px-[2rem] !py-[2rem]",
          contentClassName
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[0.5rem]",
            "w-full h-full"
          )}
        >
          <p className={clsx("text-[1.5rem] text-[#232323] dark:text-white font-bold")}>
            {title}
          </p>
          <span
            className={clsx(
              "text-[1rem] text-[#5B5B5B] dark:text-[#C3C3C3] font-normal text-center"
            )}
          >
            {description}
          </span>
        </div>
        
        {/* actions */}
        <div
          className={clsx(
            "grid sm:grid-cols-2 lg:grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
            "w-full"
          )}
        >
          <button
            className={clsx(
              "grid grid-cols-1 place-content-center place-items-center",
              "w-full",
              "px-[0.75rem] py-[0.75rem]",
              "bg-[white] dark:bg-[#232323]",
              "rounded-[0.375rem]",
              "text-[1rem] text-[#232323] dark:text-white font-semibold",
              "border border-[#464646]",
              "box-border",
              "cursor-pointer"
            )}
            onClick={cancelButton.onClick}
          >
            {cancelButton.text}
          </button>
          
          <button
            className={clsx(
              "grid grid-cols-1 place-content-center place-items-center",
              "w-full",
              "px-[0.75rem] py-[0.75rem]",
              "bg-[#249124] dark:bg-[#33CC33] disabled:bg-[#F6F6F6]",
              "text-[#232323] dark:text-[white] disabled:text-[#A6A6A6] text-[1rem] font-semibold",
              "rounded-[0.375rem]",
              "cursor-pointer"
            )}
            disabled={confirmButton.disabled || confirmButton.isLoading}
            onClick={confirmButton.onClick}
          >
            {confirmButton.isLoading && <MoonLoader size={20} color={"white"} />}
            {confirmButton.text}
          </button>
        </div>
      </div>
    </AdaptiveModal>
  );
};