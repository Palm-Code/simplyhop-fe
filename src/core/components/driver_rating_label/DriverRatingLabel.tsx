import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/core/icons";

export interface DriverRatingLabelProps {
  label?: string;
}

export const DriverRatingLabel = ({ label }: DriverRatingLabelProps) => {
  if (!label) return null;
  return (
    <div className={clsx("flex items-center justify-start gap-1")}>
      <SVGIcon
        name="Star"
        className={clsx(
          "w-[0.75rem] h-[0.75rem]",
          "fill-[#FAC248] text-[#FAC248]"
        )}
      />
      <span
        className={clsx(
          "text-[#979797] dark:text-[#C3C3C3] text-[0.75rem] font-medium"
        )}
      >
        {label}
      </span>
    </div>
  );
};
