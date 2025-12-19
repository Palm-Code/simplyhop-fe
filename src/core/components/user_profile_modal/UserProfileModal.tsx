"use client";
import * as React from "react";
import clsx from "clsx";
import { AdaptiveModal } from "../adaptive_modal";
import SVGIcon, { SVGIconProps } from "@/core/icons";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { Avatar, AvatarProps } from "../avatar";

export interface UserProfileModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  cta?: {
    open: {
      label: string;
      onClick: () => void;
    };
  };
  user?: {
    avatar?: AvatarProps;
    name: string;
    phone: string;
    summary: {
      value: string;
      id: string;
      name: string;
    }[];
    detail: {
      value: string;
      id: string;
      name: string;
      icon: string;
    }[];
    cta: {
      label: string;
      icon: string;
      onClick: () => void;
    }[];
  };
}

export const UserProfileModal = ({
  isOpen = false,
  onClose,
  title,
  cta,
  user = {
    avatar: undefined,
    name: "",
    phone: "",
    summary: [],
    detail: [],
    cta: [],
  },
}: UserProfileModalProps) => {
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
              className={clsx(
                "w-[1.5rem] h-[1.5rem]",
                "text-[#5B5B5B] dark:text-[#767676]"
              )}
            />
          </button>
          <h2
            className={clsx(
              "text-[#292929] dark:text-white text-[1.125rem] lg:text-[1.5rem] font-bold"
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
            "bg-[#F6F6F6CC] dark:bg-[#292929]",
            "px-[1rem] py-[1rem]",
            "rounded-[0.5rem]"
          )}
        >
          {/* profile */}
          <div
            className={clsx(
              "grid grid-cols-1 place-content-center place-items-center gap-[0.5rem]",
              "w-full"
            )}
          >
            {user.avatar && (
              <Avatar
                {...user.avatar}
                className={clsx("w-[2.25rem] h-[2.25rem]")}
              />
            )}

            <div
              className={clsx(
                "grid grid-cols-1 place-content-center place-items-center",
                "w-full"
              )}
            >
              <div
                className={clsx(
                  "grid grid-cols-1 place-content-center place-items-center",
                  "w-full"
                )}
              >
                <p
                  className={clsx(
                    "text-[1rem] text-[black] dark:text-white font-semibold"
                  )}
                >
                  {user.name}
                </p>
                <p
                  className={clsx(
                    "text-[0.875rem] text-[#767676] dark:text-[#C3C3C3] font-medium"
                  )}
                >
                  {user.phone}
                </p>
              </div>
            </div>

            {/* detail */}
            {cta?.open && (
              <button
                className={clsx(
                  "flex items-center justify-center",
                  "px-4 py-2",
                  "rounded-md",
                  "bg-[#249124] dark:bg-[#33CC33]",
                  "text-white dark:text-text-primary text-xs font-semibold",
                  "cursor-pointer"
                )}
                onClick={cta.open.onClick}
              >
                {cta.open.label}
              </button>
            )}
          </div>

          {/* summary */}
          {!!user.summary.length && (
            <div
              className={clsx(
                "grid place-content-center place-items-center gap-[0.5rem]",
                "w-full",
                "bg-[white] dark:bg-[#232323]",
                "px-[0.5rem] py-[0.5rem]",
                "rounded-[0.5rem]"
              )}
              style={{
                gridTemplateColumns: `repeat(${user.summary.length},1fr)`,
              }}
            >
              {user.summary.map((item, index) => (
                <div
                  key={index}
                  className={clsx(
                    "grid grid-cols-1 place-content-center place-items-center gap-[0.5rem]",
                    "w-full"
                  )}
                >
                  <p
                    className={clsx(
                      "text-[0.75rem] text-[#606060] dark:text-[#DADADA] font-normal"
                    )}
                  >
                    {item.name}
                  </p>
                  <div
                    className={clsx(
                      "flex items-center justify-center gap-[0.5rem]"
                    )}
                  >
                    {item.id === "ratings" && (
                      <SVGIcon
                        name="Star"
                        className={clsx(
                          "w-[1rem] h-[1rem]",
                          "fill-[#FAC248] text-[#FAC248]"
                        )}
                      />
                    )}
                    <p
                      className={clsx(
                        "text-[0.875rem] text-[#232323] dark:text-white font-bold"
                      )}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* detail */}
          {!!user.detail.length && (
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
                "w-full",
                "bg-[white] dark:bg-[#232323]",
                "px-[0.5rem] py-[0.5rem]",
                "rounded-[0.5rem]"
              )}
            >
              {user.detail.map((item, index) => (
                <div
                  key={index}
                  className={clsx(
                    "grid grid-flow-col place-content-start place-items-start gap-[0.5rem]",
                    "w-full"
                  )}
                >
                  <SVGIcon
                    name={item.icon as SVGIconProps["name"]}
                    className={clsx("w-[1rem] h-[1rem]", "text-[#767676] dark:text-[#F6F6F6]")}
                  />
                  <div
                    className={clsx(
                      "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
                      "w-full"
                    )}
                  >
                    <p
                      className={clsx(
                        "text-[0.75rem] text-[#606060] dark:text-[#DADADA] font-normal"
                      )}
                    >
                      {item.name}
                    </p>
                    <p
                      className={clsx(
                        "text-[0.875rem] text-[#232323] dark:text-[white] font-medium"
                      )}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* actions */}
          {!!user.cta.length && (
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
                "w-full",
                "bg-white dark:bg-[#232323]",
                "px-[0.5rem] py-[0.5rem]",
                "rounded-[0.5rem]"
              )}
            >
              {user.cta.map((item, index) => (
                <>
                  <button
                    key={`cta-${index}`}
                    className={clsx(
                      "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
                      "w-full",
                      "px-[0.75rem] py-[0.75rem]",
                      "rounded-[0.375rem]",
                      "text-[1rem] text-[#B30606] dark:text-[#D13939] font-normal",
                      "cursor-pointer"
                    )}
                    onClick={item.onClick}
                  >
                    <SVGIcon
                      name={item.icon as SVGIconProps["name"]}
                      className={clsx("w-[1rem] h-[1rem]", "text-[#C50707] dark:text-[#D13939]")}
                    />
                    {item.label}
                  </button>

                  {index < user.cta.length - 1 && (
                    <div
                      key={`divider-${index}`}
                      className={clsx("w-full h-[1px]", "bg-[#F6F6F6]")}
                    />
                  )}
                </>
              ))}
            </div>
          )}
        </div>
        {/*  */}
      </div>
    </AdaptiveModal>
  );
};
