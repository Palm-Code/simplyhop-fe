import React, { forwardRef } from "react";
import clsx from "clsx";

export const DropdownSelectButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className={clsx(
        "relative",
        "w-full",
        "cursor-default",
        "overflow-hidden",
        "rounded-[0.375rem]",
        "border border-[#E2E2E2] dark:border-[#464646]",
        "px-[1.625rem] py-[0.5rem]",
        "h-[56px]",
        "bg-[white] dark:bg-[#232323]",
        "grid grid-rows-1 grid-flow-col justify-between justify-items-start gap-[0.5rem]",
        "items-end content-end",
        "cursor-pointer disabled:cursor-default",
        props.className
      )}
    >
      {props.children}
    </button>
  );
});

DropdownSelectButton.displayName = "DropdownSelectButton";
