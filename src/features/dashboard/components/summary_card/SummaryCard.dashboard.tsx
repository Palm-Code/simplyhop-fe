import SVGIcon, { SVGIconProps } from "@/core/icons";
import * as React from "react";
import clsx from "clsx";

export interface SummaryCardDashboardProps {
  title?: string;
  icon?: SVGIconProps["name"];
  unit?: string;
  value?: string;
}

export const SummaryCardDashboard = ({
  icon,
  title = "",
  unit = "",
  value = "",
}: SummaryCardDashboardProps) => {
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
            <p className={clsx("text-sm text-[#5B5B5B] font-normal")}>
              {title}
            </p>
          </div>

          <button
            className={clsx(
              "flex items-center justify-center",
              "rounded-full",
              "w-6 h-6",
              "bg-transparent"
            )}
          >
            <SVGIcon
              name={"ArrowRight"}
              className={clsx("w-3.5 h-3.5", "text-[#767676]")}
            />
          </button>
        </div>

        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-0",
            "w-full"
          )}
        >
          <p className={clsx("text-[#232323] text-2xl font-bold")}>{value}</p>
          <span className={clsx("text-[#767676] text-sm font-normal")}>
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
};
