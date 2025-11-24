import * as React from "react";
import { Avatar, AvatarProps } from "../avatar";
import clsx from "clsx";

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
        "grid grid-cols-1 place-content-start place-items-start",
        "w-full",
        "px-[1px] py-[1px]",
        "rounded-2xl"
      )}
      style={{
        background:
          "linear-gradient(172.93deg, #F3F3F3 30.07%, #EBEBEB 94.49%)",
      }}
    >
      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-between justify-items-start gap-6",
          "w-full",
          "px-4 py-4",
          "bg-[white]",
          "rounded-2xl"
        )}
      >
        <h1 className={clsx("text-[1.5rem] text-[#232323] font-bold")}>
          {title}
        </h1>

        <div className={clsx("grid grid-cols-[2rem_1fr] items-center justify-end gap-[0.5rem]")}>
          <Avatar {...avatar} className={clsx("w-[2rem] h-[2rem]")} />
          <div
            className={clsx(
              "grid grid-cols-1 items-center content-center justify-start justify-items-start",
              "w-full"
            )}
          >
            <p className={clsx("text-[#232323] text-[0.75rem] font-medium")}>
              {name}
            </p>
            <p className={clsx("text-[#5B5B5B] text-[0.625rem] font-normal")}>
              {role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
