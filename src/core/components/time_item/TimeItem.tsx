import * as React from "react";
import clsx from "clsx";

export interface TimeItemProps {
  time?: string;
}

export const TimeItem = ({ time }: TimeItemProps) => {
  return (
    <p
      className={clsx(
        "text-[0.875rem] font-semibold text-[black] dark:text-white"
      )}
    >
      {time}
    </p>
  );
};
