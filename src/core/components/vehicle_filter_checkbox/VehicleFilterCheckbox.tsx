import * as React from "react";
import clsx from "clsx";
import { Checkbox, CheckboxProps } from "../checkbox";
import { Radio, RadioProps } from "../radio";

export type VehicleFilterOptionProps = CheckboxProps &
  RadioProps & {
    optionVariant?: "checkbox" | "radio";
  };

export const VehicleFilterOption = (props: VehicleFilterOptionProps) => {
  const { label, optionVariant = "checkbox", ...otherProps } = props;
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-between justify-items-start",
        "w-full",
        "text-[#232323] dark:text-[#E9E6E6] text-[0.75rem] lg:text-[0.875rem] font-medium"
      )}
    >
      {label}
      {optionVariant === "checkbox" ? (
        <Checkbox {...otherProps} />
      ) : (
        <Radio {...otherProps} />
      )}
    </div>
  );
};
