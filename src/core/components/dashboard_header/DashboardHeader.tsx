import * as React from "react";
import { Avatar, AvatarProps } from "../avatar";
import clsx from "clsx";
import { ThemeToggleButton } from "../theme_toggle_button";

export interface DashboardHeaderProps {
  title?: string;
  avatar?: AvatarProps;
  name?: string;
  role?: string;
}

export const DashboardHeader = ({
  title,
  avatar,
  name,
  role,
}: DashboardHeaderProps) => {
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-between justify-items-start gap-6",
        "w-full",
        "px-4 py-4",
        "bg-[white] dark:bg-[#232323]",
        "rounded-2xl",
        "border border-[#E9E6E6] dark:border-[#464646]"
      )}
    >
      <h1
        className={clsx(
          "text-[1rem] lg:text-[1.5rem] text-[#232323] dark:text-white font-bold"
        )}
      >
        {title}
      </h1>

      <div className={clsx("flex items-center justify-center gap-2 lg:gap-4")}>
        {/* user profile */}
        <div
          className={clsx(
            "grid grid-cols-[2rem_1fr] items-center justify-end gap-[0.5rem]"
          )}
        >
          <Avatar {...avatar} className={clsx("w-6 h-6 lg:w-[2rem] lg:h-[2rem]")} />
          <div
            className={clsx(
              "grid grid-cols-1 items-center content-center justify-start justify-items-start",
              "w-full"
            )}
          >
            <p
              className={clsx(
                "text-[#232323] dark:text-white text-[0.75rem] font-medium truncate text-ellipsis w-full"
              )}
            >
              {name}
            </p>
            <p
              className={clsx(
                "text-[#5B5B5B] dark:text-[#DADADA] text-[0.625rem] font-normal truncate text-ellipsis w-full"
              )}
            >
              {role}
            </p>
          </div>
        </div>

        {/* divider */}
        <div
          className={clsx("h-[30px] w-[1px]", "bg-[#E9E6E6] dark:bg-[#E9E6E6]")}
        />

        {/* theme */}

        <ThemeToggleButton className="w-6! h-6! lg:w-8! lg:h-8!" />
      </div>
    </div>
  );
};
