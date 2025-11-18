import React, { useRef } from "react";
import clsx from "clsx";
import { Input } from "../input/Input";
import { InputLabel, InputLabelProps } from "../input_label";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";

export interface InputRoute {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps?: InputLabelProps;
}

export const InputRoute = ({ inputProps, labelProps }: InputRoute) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const { isLg } = useTailwindBreakpoint();

  if (!isLg) {
    return (
      <div
        className={clsx(
          "grid grid-rows-1 grid-cols-1 gap-[1rem]",
          "items-end content-end",
          "w-full h-full",
          "relative"
        )}
        onClick={(e) => {
          inputProps?.onClick?.(e as any);
        }}
      >
        <div
          ref={ref}
          className={clsx(
            "peer",
            "w-full",
            // "bg-transparent",
            "font-medium text-[0.875rem] leading-[1.25rem]",
            "text-[#000000] disabled:text-[#000000]",
            "placeholder:text-[#767676] dark:placeholder:text-[#C3C3C3] placeholder:text-[0.875rem]",
            "outline-none",
            "border-none",
            "appearance-none",
            "text-ellipsis truncate"
          )}
        >
          {inputProps?.value}
        </div>

        <InputLabel
          {...labelProps}
          className={clsx(
            !!inputProps?.value
              ? "top-[25%] translate-y-[-50%] text-[0.75rem]"
              : "left-0 top-[50%] translate-y-[-50%] text-[0.75rem]",
            "peer-focus:top-[25%] peer-focus:text-[0.75rem]"
          )}
          onClick={(e) => {
            inputProps?.onClick?.(e as any);
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "grid grid-rows-1 grid-cols-1 gap-[1rem]",
        "items-end content-end",
        "w-full h-full",
        "relative"
      )}
    >
      <Input ref={ref} {...inputProps} />

      <InputLabel
        {...labelProps}
        className={clsx(
          !!inputProps?.value
            ? "top-[25%] translate-y-[-50%] text-[0.75rem]"
            : "left-0 top-[50%] translate-y-[-50%] text-[0.75rem]",
          "peer-focus:top-[25%] peer-focus:text-[0.75rem]"
        )}
        onClick={() => {
          ref.current?.focus();
        }}
      />
    </div>
  );
};
