import React, { forwardRef } from "react";
import clsx from "clsx";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>((props, ref) => {
  return (
    <textarea
      ref={ref}
      {...props}
      className={clsx(
        "peer",
        "w-full",
        "font-medium text-[0.875rem] leading-[1.25rem]",
        "text-[#000000] dark:text-white disabled:text-[#000000] dark:disabled:text-[#C3C3C3]",
        "placeholder:text-[#767676] dark:placeholder:text-[#C3C3C3] placeholder:text-[0.875rem]",
        "outline-none",
        "border-none",
        "appearance-none",
        "resize-none",
        props.className
      )}
    />
  );
});

Textarea.displayName = "Textarea";
