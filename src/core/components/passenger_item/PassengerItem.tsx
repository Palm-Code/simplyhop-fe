import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/core/icons";

export interface PassengerItemProps {
  label?: string;
  adult?: string;
  child?: string;
}

export const PassengerItem = ({
  label = "Passengiere",
  adult = "0",
  child = "0",
}: PassengerItemProps) => {
  return (
    <div
      className={clsx("grid grid-cols-1 place-content-start place-items-start")}
    >
      <p className={clsx("text-[#767676] text-[0.625rem] font-normal")}>
        {label}
      </p>
      <div className={clsx("flex items-center justify-start gap-3")}>
        <div className={clsx("flex items-center justify-start gap-1")}>
          <SVGIcon
            name="User2"
            className={clsx(
              "w-[0.75rem] h-[0.75rem]",
              "text-icon-primary-subdued]"
            )}
          />
          <span
            className={clsx("text-text-primary text-[0.625rem] font-normal")}
          >
            {adult}
          </span>
        </div>
        <div className={clsx("flex items-center justify-start gap-1")}>
          <SVGIcon
            name="Baby"
            className={clsx(
              "w-[0.75rem] h-[0.75rem]",
              "text-icon-primary-subdued]"
            )}
          />
          <span
            className={clsx("text-text-primary text-[0.625rem] font-normal")}
          >
            {child}
          </span>
        </div>
      </div>
    </div>
  );
};
