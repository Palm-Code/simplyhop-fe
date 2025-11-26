import * as React from "react";
import clsx from "clsx";

export interface DividerProps {
  type?: "horizontal" | "vertical";
}

export const Divider = ({ type = "horizontal" }: DividerProps) => {
  if (type === "vertical") {
    return <div className={clsx("w-[1px] h-full", "bg-[#E9E6E6] dark:bg-[#464646]")} />;
  }
  return <div className={clsx("w-full h-[1px]", "bg-[#E9E6E6] dark:bg-[#464646]")} />;
};
