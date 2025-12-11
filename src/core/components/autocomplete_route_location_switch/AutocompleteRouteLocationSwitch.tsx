import React from "react";
import clsx from "clsx";
import { Switch, SwitchProps } from "../switch";

export interface AutocompleteRouteLocationSwitchProps extends SwitchProps {
  children?: React.ReactNode;
}

export const AutocompleteRouteLocationSwitch = ({
  children,
  className,
  disabled,
  ...restProps
}: AutocompleteRouteLocationSwitchProps) => {
  return (
    <div className={clsx("flex items-center justify-end gap-2", className)}>
      <Switch {...restProps} disabled={disabled} />
      <span
        className={clsx(
          "text-[#232323] dark:text-[white] font-normal text-sm",
          disabled ? "opacity-50" : "opacity-100"
        )}
      >
        {children}
      </span>
    </div>
  );
};
