"use client";
import * as React from "react";
import { InputLabel, InputLabelProps } from "../input_label";
import { InputContainer } from "../input_container";
import clsx from "clsx";
import { Input } from "../input";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";

export interface ChatFieldProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps?: InputLabelProps;
}

export const ChatField = ({ inputProps, labelProps }: ChatFieldProps) => {
  const inputRef = React.useRef<null | HTMLInputElement>(null);
  const { isLg } = useTailwindBreakpoint();
  React.useEffect(() => {
    if (!inputProps?.disabled && !isLg) {
      inputRef.current?.focus();
    }
  }, [inputProps?.disabled, isLg]);

  return (
    <InputContainer
      className={clsx("relative [&>input]:z-20", "!border-[0px]", "!h-[48px]")}
    >
      <Input
        {...inputProps}
        className="relative"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (!inputProps?.onChange) return;
          inputProps.onChange(e);
        }}
        onBlur={(e) => {
          if (!isLg) {
            inputRef.current?.focus();
          }

          if (!inputProps?.onBlur) return;
          inputProps?.onBlur(e);
        }}
      />
      <InputLabel
        {...labelProps}
        className={clsx(
          "z-10",
          "top-[50%] left-[0.75rem] lg:left-[1.625rem] translate-y-[-50%] text-[0.75rem]",
          inputProps?.disabled
            ? "!text-[#C7C3C3] text-[0.75rem] lg:text-[1rem]"
            : "peer-focus:top-[25%] peer-focus:text-[0.75rem] !text-[#C7C3C3] text-[0.75rem]",
          inputProps?.value &&
            inputProps?.value.toString().length > 0 &&
            "!top-[25%]"
        )}
      />
    </InputContainer>
  );
};
