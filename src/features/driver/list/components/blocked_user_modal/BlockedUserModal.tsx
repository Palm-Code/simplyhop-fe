"use client";
import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/core/icons";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { Avatar, AvatarProps } from "@/core/components/avatar";
import { AdaptiveModal } from "@/core/components/adaptive_modal";

export interface BlockedUserModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;

  blocked_user?: {
    avatar?: AvatarProps;
    name: string;
  }[];
}

export const BlockedUserModal = ({
  isOpen = false,
  onClose,
  title,
  blocked_user = [],
}: BlockedUserModalProps) => {
  const { isLg } = useTailwindBreakpoint();
  return (
    <AdaptiveModal
      variant={isLg ? "modal" : "page_sheet"}
      className={clsx(
        "!max-w-[100vw] lg:!max-w-[584px]",
        "h-[100vh] lg:!h-fit",
        "!rounded-[0px] lg:!rounded-[0.625rem]",
        "overflow-hidden"
      )}
      open={isOpen}
      onClose={onClose}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[1rem]",
          "px-[0rem] sm:px-[2rem] py-[2rem]",
          "w-full h-full max-h-[80vh]",
          "overflow-auto"
        )}
      >
        {/* header */}
        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]",
            "w-full",
            "px-[2rem] sm:px-[0rem]"
          )}
        >
          <button
            aria-label={"Zurück"}
            name={"Zurück"}
            className={clsx("cursor-pointer")}
            onClick={onClose}
          >
            <SVGIcon
              name="X"
              className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#5B5B5B]")}
            />
          </button>
          <h2
            className={clsx(
              "text-[#292929] text-[1.125rem] lg:text-[1.5rem] font-bold"
            )}
          >
            {title}
          </h2>
        </div>

        {/* body */}
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
            "w-full",
            "bg-[#F6F6F6CC]",
            "px-[1rem] py-[1rem]",
            "rounded-[0.5rem]"
          )}
        >
          {blocked_user.map((item, index) => (
            <div
              key={index}
              className={clsx(
                "grid grid-cols-[40px_1fr] items-center content-center justify-start justify-items-start gap-[1rem]",
                "w-full"
              )}
            >
              <Avatar
                {...item.avatar}
                className={clsx("w-[2.5rem] h-[2.5rem]")}
              />
              <div
                className={clsx(
                  "grid grid-cols-1 place-content-start place-items-start gap-1",
                  "w-full"
                )}
              >
                <p
                  className={clsx(
                    "text-[#232323] dark:text-white font-semibold text-base"
                  )}
                >
                  {item.name}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/*  */}
      </div>
    </AdaptiveModal>
  );
};
