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
          "grid grid-cols-1 place-content-start place-items-start gap-6",
          "w-full",
          "px-4 py-4",
          "bg-[white]",
          "rounded-2xl"
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
                "bg-[#EFF9EC]"
              )}
            >
              <SVGIcon
                name={icon as SVGIconProps["name"]}
                className={clsx("w-3 h-3", "text-[#26531A]")}
              />
            </div>
            <p className={clsx("text-sm text-[#5B5B5B] font-semibold")}>
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
              "bg-[#FAFDF9]",
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
    </div>
  );
};
