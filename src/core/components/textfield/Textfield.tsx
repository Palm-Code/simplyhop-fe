"use client";
import * as React from "react";
import { InputLabel, InputLabelProps } from "../input_label";
import { InputContainer } from "../input_container";
import clsx from "clsx";
import { Input } from "../input";

export interface TextfieldProps {
  inputContainerProps?: React.HTMLAttributes<HTMLDivElement>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps?: InputLabelProps;
  disabled?: boolean;
  error?: string;
}

export const Textfield = ({
  inputContainerProps,
  inputProps,
  labelProps,
  disabled = false,
  error,
}: TextfieldProps) => {
  const inputRef = React.useRef<null | HTMLInputElement>(null);
  const [value, setValue] = React.useState<string>("");

  const showError = error;

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.25rem]",
        "w-full"
      )}
    >
      <InputContainer
        {...inputContainerProps}
        className={clsx(
          "relative",
          disabled && "!bg-[#F6F6F6] !dark:bg-[#232323]",
          error && "!border-[#DA2323]",
          inputContainerProps?.className
        )}
      >
        <Input
          ref={inputRef}
          {...inputProps}
          disabled={disabled}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.currentTarget.value);
            if (!inputProps?.onChange) return;
            inputProps.onChange(e);
          }}
        />

        <InputLabel
          {...labelProps}
          className={clsx(
            inputProps?.type === "time"
              ? "top-[25%] left-[0.75rem] sm:left-[1.625rem] translate-y-[-50%] text-[0.75rem]"
              : !!value.length || !!inputProps?.value
              ? "top-[25%] left-[0.75rem] sm:left-[1.625rem] translate-y-[-50%] text-[0.75rem]"
              : "top-[50%] left-[0.75rem] sm:left-[1.625rem] translate-y-[-50%] text-[0.875rem]",
            "peer-focus:top-[25%] peer-focus:text-[0.75rem] text-[0.75rem]",
            error ? "!text-[#DA2323]" : "!text-[#5B5B5B] dark:text-[#C3C3C3]"
          )}
          onClick={() => {
            inputRef.current?.focus();
          }}
        />
      </InputContainer>
      {showError && (
        <span
          className={clsx(
            "text-[0.625rem] text-[#DA2323] font-normal",
            "pl-[0.5rem]"
          )}
        >
          {error}
        </span>
      )}
    </div>
  );
};
