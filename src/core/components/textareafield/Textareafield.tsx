"use client";
import * as React from "react";
import { InputLabelProps } from "../input_label";
import clsx from "clsx";
import { Textarea } from "../textarea/Textarea";
import { TextareaContainer } from "../textarea_container";
import { TextareaLabel } from "../textarea_label";

export interface TextareafieldProps {
  inputProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  labelProps?: InputLabelProps;
}

export const Textareafield = ({
  inputProps,
  labelProps,
}: TextareafieldProps) => {
  const textareaRef = React.useRef<null | HTMLTextAreaElement>(null);
  const [value, setValue] = React.useState<string>("");
  return (
    <TextareaContainer className={clsx("relative")}>
      <Textarea
        ref={textareaRef}
        {...inputProps}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setValue(e.currentTarget.value);
          if (!inputProps?.onChange) return;
          inputProps.onChange(e);
        }}
      />
      <TextareaLabel
        {...labelProps}
        className={clsx(
          !!value.length || !!inputProps?.value
            ? "top-[15%] left-[0.75rem] sm:left-[1.625rem] translate-y-[-50%] text-[0.75rem]"
            : "top-[25%] left-[0.75rem] sm:left-[1.625rem] translate-y-[-50%] text-[0.875rem]",
          "peer-focus:top-[15%] peer-focus:text-[0.75rem] !text-[#5B5B5B] dark:text-[#C3C3C3] text-[0.75rem]"
        )}
        onClick={() => {
          textareaRef.current?.focus();
        }}
      />
    </TextareaContainer>
  );
};
