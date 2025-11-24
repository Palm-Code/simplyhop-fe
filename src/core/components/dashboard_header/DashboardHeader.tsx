import * as React from "react";
import { Avatar, AvatarProps } from "../avatar";
import clsx from "clsx";

export interface DashboardHeaderProps {
  title?: string;
  avatar?: AvatarProps;
}

export const DashboardHeader = ({ title, avatar }: DashboardHeaderProps) => {
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

        <Avatar {...avatar} className={clsx("w-[2rem] h-[2rem]")} />
      </div>
    </div>
  );
};
