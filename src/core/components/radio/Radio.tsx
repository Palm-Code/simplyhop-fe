import {
  Checkbox as CheckboxComponent,
  CheckboxProps as CheckboxComponentProps,
  Field,
  Label,
} from "@headlessui/react";
import clsx from "clsx";
import { useRef } from "react";

export interface RadioProps extends CheckboxComponentProps {
  label?: string;
  required?: boolean;
}

export const Radio = ({
  label = "",
  required = false,

  ...otherProps
}: RadioProps) => {
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
          "rounded-[50%]",
          "bg-[white] dark:bg-[#232323]",
          otherProps.checked
            ? "border-[1px] border-[#33CC33]"
            : "border-[1px] border-[#98989E]",
          "rounded-[0.25rem]",
          "flex items-center justify-center"
        )}
        {...otherProps}
      >
        <div
          className={clsx(
            "w-[0.625rem] h-[0.625rem]",
            otherProps.checked ? "bg-[#33CC33]" : "bg-[white]",
            "rounded-[50%]"
          )}
        />
      </CheckboxComponent>
      {!!label.length && (
        <Label className={clsx("text-[0.75rem] font-normal text-[#2C2C2E]")}>
          {label}
          {required && <span className={clsx("text-[#FF0066]")}>{"*"}</span>}
        </Label>
      )}
    </Field>
  );
};
