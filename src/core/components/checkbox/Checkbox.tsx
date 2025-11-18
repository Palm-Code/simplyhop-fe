import {
  Checkbox as CheckboxComponent,
  CheckboxProps as CheckboxComponentProps,
  Field,
  Label,
} from "@headlessui/react";
import clsx from "clsx";
import { useRef } from "react";
import SVGIcon from "../../icons";

export interface CheckboxProps extends CheckboxComponentProps {
  label?: string;
  required?: boolean;
  variant?: "primary" | "secondary";
}

export const Checkbox = ({
  label = "",
  required = false,
  className,
  variant = "primary",
  ...otherProps
}: CheckboxProps) => {
  const ref = useRef<HTMLElement | null>(null);
  return (
    <Field
      className={clsx(
        "grid grid-flow-col gap-[0.5rem] justify-start justify-items-start"
      )}
      onClick={() => {
        if (!!ref.current) {
          ref.current.click();
        }
      }}
    >
      <CheckboxComponent
        className={clsx(
          "outline-none",
          "w-[1.25rem] h-[1.25rem]",
          otherProps.checked
            ? variant === "secondary"
              ? "bg-[#333FFF]"
              : "bg-[#33CC33]"
            : "bg-transparent",
          otherProps.checked
            ? variant === "secondary"
              ? "border-[1px] border-[#333FFF]"
              : "border-[1px] border-[#33CC33]"
            : "border-[1px] border-[#98989E]",
          "rounded-[0.25rem]",
          "flex items-center justify-center",
          "cursor-pointer disabled:cursor-default",
          className
        )}
        {...otherProps}
      >
        <SVGIcon
          name="Check"
          className={clsx(
            "w-[0.875rem] h-[0.875rem]",
            "text-[white]",
            otherProps.checked ? "opacity-100" : "opacity-0"
          )}
        />
      </CheckboxComponent>
      {!!label.length && (
        <Label className={clsx("text-[0.75rem] font-normal text-[#2C2C2E] dark:text-white")}>
          {label}
          {required && <span className={clsx("text-[#FF0066]")}>{"*"}</span>}
        </Label>
      )}
    </Field>
  );
};
