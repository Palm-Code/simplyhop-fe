import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/core/icons";

export interface CarIdentityItemProps {
  name?: string;
  number?: string | null;
}

export default function CarIdentityItem({
  name = "",
  number = null,
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
        <SVGIcon
          name="Car"
          className={clsx("w-[1rem] h-[1rem]", "text-[black]")}
        />
        <p
          className={clsx(
            "text-[black] text-[0.875rem] lg:text-[0.875rem] font-medium line-clamp-2",
            "w-full"
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
              "bg-[#5B5B5B]"
            )}
          />

          <p
            className={clsx(
              "text-[black] text-[0.875rem] lg:text-[0.875rem] font-medium truncate text-ellipsis",
              "w-full"
            )}
          >
            {number}
          </p>
        </>
      )}
    </div>
  );
}
