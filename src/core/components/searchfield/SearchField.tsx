"use client";
import * as React from "react";
import { InputLabel, InputLabelProps } from "../input_label";
import { InputContainer } from "../input_container";
import clsx from "clsx";
import { Input } from "../input";
import SVGIcon from "@/core/icons";

export interface SearchFieldProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps?: InputLabelProps;
}

export const SearchField = ({ inputProps, labelProps }: SearchFieldProps) => {
  const inputRef = React.useRef<null | HTMLInputElement>(null);
  const [value, setValue] = React.useState<string>("");
  return (
    <InputContainer
      className={clsx(
        "relative",
        "!rounded-[1.25rem]",
        "!border !border-[#E8E8E8] dark:!border-[#464646]",
        "!px-[1rem] !py-[0.75rem]",
        "!grid-flow-col !grid-cols-none !items-center !content-center !justify-start !justify-items-start !gap-[14px]"
      )}
    >
      <SVGIcon
        name="Search"
        className={clsx("w-6 h-6", "text-[#C7C3C3] dark:text-[#C7C3C3]")}
      />
      <Input
        ref={inputRef}
        {...inputProps}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.currentTarget.value);

          if (!inputProps?.onChange) return;
          inputProps.onChange(e);
        }}
      />

      <InputLabel
        {...labelProps}
        className={clsx(
          // !!value.length || !!inputProps?.value
          //   ? "top-[25%] left-[0.75rem] lg:left-[1.625rem] translate-y-[-50%] text-[0.75rem]"
          //   : "top-[50%] left-[0.75rem] lg:left-[1.625rem] translate-y-[-50%] text-[0.875rem] lg:text-[1rem]",
          !!value.length || !!inputProps?.value
            ? "top-[25%] left-[3.25rem] lg:left-[3.375rem] translate-y-[-50%] text-[0.75rem]"
            : "top-[50%] left-[3.25rem] lg:left-[3.375rem] translate-y-[-50%] text-[0.875rem] lg:text-[1rem]",
          "peer-focus:top-[25%] peer-focus:text-[0.75rem] !text-[#C7C3C3] text-[0.75rem]"
        )}
        onClick={() => {
          inputRef.current?.focus();
        }}
      />
    </InputContainer>
  );
};
