import SVGIcon, { SVGIconProps } from "@/core/icons";
import * as React from "react";
import clsx from "clsx";
import Link from "next/link";

export interface DashboardCardProps {
  title?: string;
  icon?: SVGIconProps["name"];
  cta?: {
    primary: {
      children: React.ReactNode;
      href: string;
    };
  };
  children?: React.ReactNode;
  variant?: "green" | "white";
}

export const DashboardCard = ({
  title = "",
  icon,
  cta,
  children,
  variant = "green",
}: DashboardCardProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-6",
        "w-full h-full",
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
              "text-sm text-[#5B5B5B] dark:text-[#DADADA] font-semibold"
            )}
          >
            {title}
          </p>
        </div>

        {cta && (
          <Link
            className={clsx(
              "flex items-center justify-center",
              "rounded-full",
              "bg-transparent",
              "text-xs text-[#26531A] font-medium whitespace-nowrap",
              "px-1 py-1"
            )}
            href={cta.primary.href}
          >
            {cta.primary.children}
          </Link>
        )}
      </div>

      {/* journey card */}
      {variant === "green" && (
        <div
          className={clsx(
            "bg-[#FAFDF9] dark:bg-[#242623]",
            "px-4 py-4",
            "rounded-2xl",
            "w-full"
          )}
        >
          {children}
        </div>
      )}
      {variant === "white" && <>{children}</>}
    </div>
  );
};
