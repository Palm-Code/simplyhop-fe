import * as React from "react";
import clsx from "clsx";

export interface DurationItemProps {
  time?: string;
}

export const DurationItem = ({ time }: DurationItemProps) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center gap-[0.25rem]",
        "w-full"
      )}
    >
      <p
        className={clsx(
          "text-[0.75rem] text-[#8C8D89] dark:text-white font-normal text-center whitespace-nowrap"
        )}
      >
        {time}
      </p>
    </div>
  );
};
