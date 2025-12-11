import {
  Switch as SwitchComponent,
  SwitchProps as SwitchComponentProps,
  Field,
  Label,
} from "@headlessui/react";
import clsx from "clsx";

export interface SwitchProps extends SwitchComponentProps {
  label?: string;
  labelPosition?: "left" | "right";
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
}

export const Switch = ({
  label = "",
  labelPosition = "right",
  size = "md",
  variant = "primary",
  className,
  ...otherProps
}: SwitchProps) => {
  const sizeClasses = {
    sm: {
      switch: "h-5 w-9",
      thumb: "h-4 w-4",
      translate: "translate-x-4",
    },
    md: {
      switch: "h-6 w-11",
      thumb: "h-5 w-5",
      translate: "translate-x-5",
    },
    lg: {
      switch: "h-7 w-14",
      thumb: "h-6 w-6",
      translate: "translate-x-7",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <Field
      className={clsx(
        "flex items-center gap-2",
        labelPosition === "left" && "flex-row-reverse justify-end",
        className
      )}
    >
      {label && (
        <Label
          className={clsx(
            "text-sm font-normal",
            "text-[#232323] dark:text-[#FFFFFF]",
            "cursor-pointer"
          )}
        >
          {label}
        </Label>
      )}
      <SwitchComponent
        className={clsx(
          "relative inline-flex items-center rounded-full",
          "transition-colors duration-200 ease-in-out",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          currentSize.switch,
          otherProps.checked
            ? variant === "secondary"
              ? "bg-[#333FFF] focus-visible:ring-[#333FFF]"
              : "bg-[#249124] dark:bg-[#33CC33] focus-visible:ring-[#249124] dark:focus-visible:ring-[#33CC33]"
            : "bg-[#D1D1D6] dark:bg-[#5B5B5B] focus-visible:ring-[#D1D1D6] dark:focus-visible:ring-[#5B5B5B]",
          "cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        )}
        {...otherProps}
      >
        <span
          aria-hidden="true"
          className={clsx(
            "pointer-events-none inline-block rounded-full",
            "bg-white dark:bg-[#FFFFFF]",
            "shadow-lg ring-0",
            "transition-transform duration-200 ease-in-out",
            currentSize.thumb,
            otherProps.checked ? currentSize.translate : "translate-x-0.5"
          )}
        />
      </SwitchComponent>
    </Field>
  );
};
