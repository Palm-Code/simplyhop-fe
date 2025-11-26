"use client";
import * as React from "react";
import { InputLabel, InputLabelProps } from "../input_label";
import clsx from "clsx";
import { Textarea } from "../textarea/Textarea";
import { TextareaContainer } from "../textarea_container";

export interface TextareafieldNotesProps {
  inputContainerProps?: React.HTMLAttributes<HTMLDivElement>;
  inputProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  labelProps?: InputLabelProps;
}

export const TextareafieldNotes = ({
  inputContainerProps,
  inputProps,
  labelProps,
}: TextareafieldNotesProps) => {
  const textareaRef = React.useRef<null | HTMLTextAreaElement>(null);
  const [value, setValue] = React.useState<string>("");
  return (
    <TextareaContainer
      {...inputContainerProps}
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start",
        "relative",
        "!w-full",
        inputContainerProps?.className
      )}
    >
      <Textarea
        ref={textareaRef}
        {...inputProps}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setValue(e.currentTarget.value);
          if (!inputProps?.onChange) return;
          inputProps.onChange(e);
        }}
      />
      <InputLabel
        {...labelProps}
        className={clsx(
          !!value.length || !!inputProps?.value
            ? "top-[15%] left-[0.75rem] lg:left-[1.625rem] translate-y-[-50%] text-[0.75rem]"
            : "top-[25%] left-[0.75rem] lg:left-[1.625rem] translate-y-[-50%] text-[0.875rem]",
          "peer-focus:top-[15%] peer-focus:text-[0.75rem] !text-[#979797] dark:!text-[#C3C3C3] text-[0.75rem]"
        )}
        onClick={() => {
          textareaRef.current?.focus();
        }}
      />
    </TextareaContainer>
  );
};
