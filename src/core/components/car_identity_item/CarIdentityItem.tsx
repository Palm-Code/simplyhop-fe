import * as React from "react";
import clsx from "clsx";

export interface CarIdentityItemProps {
  name?: string;
  number?: string | null;
  nameClassName?: string;
  numberClassName?: string;
}

export default function CarIdentityItem({
  name = "",
  number = null,
  nameClassName,
  numberClassName,
}: CarIdentityItemProps) {
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.25rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.375rem]",
          "w-full"
        )}
      >
        <p
          className={clsx(
            "text-[black] dark:text-white text-[1rem] lg:text-[1rem] font-medium truncate text-ellipsis",
            "w-full",
            nameClassName
          )}
        >
          {name}
        </p>
      </div>
      {!!number && (
        <>
          <div
            className={clsx(
              "w-[0.375rem] h-[0.375rem]",
              "rounded-[50%]",
              "bg-[#5B5B5B] dark:bg-white"
            )}
          />

          <p
            className={clsx(
              "text-[black] dark:text-white text-[1rem] lg:text-[1rem] font-medium truncate text-ellipsis",
              "w-full",
              numberClassName
            )}
          >
            {number}
          </p>
        </>
      )}
    </div>
  );
}
