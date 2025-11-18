import React, { forwardRef } from "react";
import clsx from "clsx";

export const TextareaContainer = forwardRef<
  HTMLDivElement,
  React.InputHTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={clsx(
        "relative",
        "w-full",
        "cursor-default",
        "overflow-hidden",
        "rounded-[0.375rem]",
        "border border-[#E2E2E2] dark:border-[#464646]",
        "px-[0.75rem] sm:px-[1.625rem] py-[1.375rem]",
        "h-[92px]",
        "bg-[white] dark:bg-[#232323]",
        "grid grid-rows-1 grid-cols-1 items-start content-start justify-between justify-items-start",
        "items-end content-end",
        props.className
      )}
    >
      {props.children}
    </div>
  );
});

TextareaContainer.displayName = "TextareaContainer";
