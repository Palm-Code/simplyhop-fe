import * as React from "react";
import clsx from "clsx";
import SVGIcon, { SVGIconProps } from "@/core/icons";

export interface CarFacilityItemProps {
  id?: string;
  icon?: SVGIconProps;
  name?: {
    label?: string;
    color?: string; // HEXCode
  };
}

export const CarFacilityItem = ({
  id = "",
  icon,
  name = {
    label: "",
    color: "#727272",
  },
}: CarFacilityItemProps) => {
  return (
    <div
      id={id}
      className={clsx(
        "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.375rem]"
      )}
    >
      <SVGIcon
        {...(icon as { name: SVGIconProps["name"] })}
        className={clsx("w-[1rem] h-[1rem]", icon?.className)}
      />
      {!!name.label?.length && (
        <p
          className={clsx("text-[0.75rem] font-medium")}
          style={{ color: name.color }}
        >
          {name.label}
        </p>
      )}
    </div>
  );
};
