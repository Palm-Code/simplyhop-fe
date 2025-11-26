import * as React from "react";
import clsx from "clsx";
import SVGIcon, { SVGIconProps } from "@/core/icons";

export interface UmwegBadgeProps {
  label?: string;
  icon?: SVGIconProps;
}

export const UmwegBadge = ({ label = "", icon }: UmwegBadgeProps) => {
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
        "bg-[#F0F0F0] dark:bg-[#767676]",
        "border border-[#E9E6E6] dark:border-[#464646]",
        "rounded-[0.375rem]",
        "px-[0.25rem] py-[0.25rem]"
      )}
    >
      <SVGIcon
        {...(icon as { name: SVGIconProps["name"] })}
        className={clsx(
          "w-[1rem] h-[1rem]",
          icon?.className
        )}
      />
      <p
        className={clsx(
          "text-[0.75rem] font-medium",
          "text-[#5B5B5B] dark:text-[#E9E6E6]"
        )}
      >
        {label}
      </p>
    </div>
  );
};
