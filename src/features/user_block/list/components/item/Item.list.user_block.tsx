import { Avatar, AvatarProps } from "@/core/components/avatar";
import * as React from "react";
import clsx from "clsx";

export interface ItemListUserBlockProps {
  avatar?: AvatarProps;
  name?: string;
  description?: string;
  cta?: {
    children?: React.ReactNode;
    onClick?: () => void;
  };
}

export const ItemListUserBlock = ({
  avatar,
  name,
  description,
  cta,
}: ItemListUserBlockProps) => {
  return (
    <div
      className={clsx("flex items-center justify-between gap-[1rem]", "w-full")}
    >
      <div
        className={clsx(
          "flex items-center justify-between gap-[1rem]",
          "w-full"
        )}
      >
        <Avatar {...avatar} />
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
            {name}
          </p>
          <p
            className={clsx(
              "text-[#5B5B5B] dark:text-[#DADADA] font-normal text-xs"
            )}
          >
            {description}
          </p>
        </div>

        {cta && (
          <button
            className={clsx(
              "flex items-center justify-center",
              "px-4 py-3",
              "text-[#249124] dark:text-[#33CC33] font-semibold text-xs"
            )}
            onClick={cta.onClick}
          >
            {cta?.children}
          </button>
        )}
      </div>
    </div>
  );
};
