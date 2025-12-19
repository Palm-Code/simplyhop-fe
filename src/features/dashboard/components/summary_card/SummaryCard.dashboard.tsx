import SVGIcon, { SVGIconProps } from "@/core/icons";
import * as React from "react";
import clsx from "clsx";
import Link from "next/link";

export interface SummaryCardDashboardProps {
  title?: string;
  icon?: SVGIconProps["name"];
  unit?: string;
  value?: string;
  href?: string;
}

export const SummaryCardDashboard = ({
  icon,
  title = "",
  unit = "",
  value = "",
  href = "",
}: SummaryCardDashboardProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-6",
        "w-full",
        "px-4 py-4",
        "bg-[white] dark:bg-[#232323]",
        "rounded-2xl",
        "border border-[#E9E6E6] dark:border-[#464646]"
      )}
    >
      <div className={clsx("flex items-center justify-between", "w-full")}>
        <div
          className={clsx("flex items-center justify-start gap-2", "w-full")}
        >
          {/* icon */}
          <div
            className={clsx(
              "flex items-center justify-center",
              "rounded-full",
              "w-6 h-6",
              "bg-[#EFF9EC] dark:bg-[#26531A]"
            )}
          >
            <SVGIcon
              name={icon as SVGIconProps["name"]}
              className={clsx("w-3 h-3", "text-[#26531A] dark:text-[#33CC33]")}
            />
          </div>
          <p
            className={clsx(
              "text-sm text-[#5B5B5B] dark:text-[#DADADA] font-normal whitespace-nowrap"
            )}
          >
            {title}
          </p>
        </div>

        {href && (
          <Link
            href={href}
            className={clsx(
              "flex items-center justify-center",
              "rounded-full",
              "w-6 h-6",
              "bg-transparent"
            )}
          >
            <SVGIcon
              name={"ArrowRight"}
              className={clsx(
                "w-3.5 h-3.5",
                "text-[#767676] dark:text-[#C3C3C3]"
              )}
            />
          </Link>
        )}
      </div>

      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-0",
          "w-full"
        )}
      >
        <p
          className={clsx("text-[#232323] dark:text-white text-2xl font-bold")}
        >
          {value}
        </p>
        <span
          className={clsx(
            "text-[#767676] dark:text-[#C3C3C3] text-sm font-normal"
          )}
        >
          {unit}
        </span>
      </div>
    </div>
  );
};
