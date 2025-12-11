import React from "react";
import clsx from "clsx";
import SVGIcon from "@/core/icons";

export interface AutocompleteRouteResetLocationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const AutocompleteRouteResetLocationButton = ({
  children,
  className,
  disabled,
  ...restProps
}: AutocompleteRouteResetLocationButtonProps) => {
  return (
    <button
      className={clsx(
        "flex items-center justify-start gap-1",
        "text-[#249124] dark:text-[#33CC33] font-normal text-xs",
        disabled ? "opacity-50" : "opacity-100",
        className
      )}
      {...restProps}
    >
      <SVGIcon name="Locate" className={clsx("w-4 h-4")} />
      {children}
    </button>
  );
};
