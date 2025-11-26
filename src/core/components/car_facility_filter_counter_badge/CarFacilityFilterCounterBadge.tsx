import * as React from "react";
import clsx from "clsx";
import SVGIcon, { SVGIconProps } from "@/core/icons";

export interface CarFacilityFilterCounterBadgeProps {
  icon?: SVGIconProps["name"];
  label?: string;
  count?: number;
  onClick?: () => void;
}

export const CarFacilityFilterCounterBadge = ({
  icon = "SlidersHorizontal",
  label = "",
  count = 0,
  onClick = () => {},
}: CarFacilityFilterCounterBadgeProps) => {
  return (
    <button
      aria-label={label}
      name={label}
      className={clsx(
        "grid grid-flow-col place-content-center place-items-center gap-[0.5rem]",
        "px-[0.5rem] py-[0.25rem]",
        !!count
          ? "bg-[#FAFFF9] dark:bg-[#232323]"
          : "bg-white dark:bg-[#232323]",
        !!count
          ? "border border-[#33CC33] dark:border-[#464646]"
          : "border border-[#E9E6E6] dark:border-[#464646]",
        "rounded-[1.25rem]",
        "cursor-pointer"
      )}
      onClick={onClick}
    >
      <SVGIcon
        name={icon}
        className={clsx(
          "w-[0.75rem] h-[0.75rem]",
          !!count
            ? "text-[#33CC33] dark:text-[#E9E6E6]"
            : "text-[#636262] dark:text-[#E9E6E6]"
        )}
      />
      <span
        className={clsx(
          !!count
            ? "text-[#33CC33] dark:text-[#E9E6E6]"
            : "text-[#636262] dark:text-[#E9E6E6]",
          "text-[0.875rem] font-medium"
        )}
      >
        {label}
      </span>

      {!!count && (
        <div
          className={clsx(
            "flex items-center justify-center",
            "w-[1.25rem] h-[1.25rem]",
            "bg-[#33CC33]",
            "rounded-[50%]",
            "text-[white] text-[0.625rem] font-medium"
          )}
        >
          {count}
        </div>
      )}
    </button>
  );
};
