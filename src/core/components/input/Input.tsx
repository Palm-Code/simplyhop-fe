import React, { forwardRef } from "react";
import clsx from "clsx";

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={clsx(
        "peer",
        "w-full",
        "font-medium text-[0.875rem] leading-[1.25rem]",
        "text-[#000000] dark:text-[white] disabled:text-[#000000] dark:disabled:text-[#FFFFFF]",
        "placeholder:text-[#666666] dark:placeholder:text-[#C3C3C3] placeholder:text-[0.875rem]",
        "outline-none",
        "border-none",
        "appearance-none",
        props.className
      )}
    />
  );
});

Input.displayName = "Input";
