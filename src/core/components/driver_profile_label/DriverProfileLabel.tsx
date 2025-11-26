import * as React from "react";
import clsx from "clsx";
import { Avatar, AvatarProps } from "../avatar";
import SVGIcon, { SVGIconProps } from "@/core/icons";

export interface DriverProfileLabelProps {
  id?: string;
  avatar?: AvatarProps;
  name?: string;
  icon?: SVGIconProps | null;
  nameClassName?: string;
}

export const DriverProfileLabel = ({
  id,
  avatar,
  name = "",
  icon = {
    name: "User",
  },
  nameClassName,
}: DriverProfileLabelProps) => {
  return (
    <div
      id={id}
      className={clsx(
        "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem] lg:gap-[1rem]"
      )}
    >
      <Avatar {...avatar} className={clsx("w-[2rem] h-[2rem]")} />
      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.625rem]"
        )}
      >
        {!!icon && (
          <SVGIcon
            {...icon}
            className={clsx(
              "w-[1rem] h-[1rem]",
              "text-[black] dark:text-white"
            )}
          />
        )}

        <p
          className={clsx(
            "text-[1rem] text-[black] dark:text-white font-medium truncate text-ellipsis line-clamp-1 w-full",
            nameClassName
          )}
        >
          {name}
        </p>
      </div>
    </div>
  );
};
