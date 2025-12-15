import React, { forwardRef } from "react";
import clsx from "clsx";

export const AutocompleteEmptyBox = forwardRef<
  HTMLDivElement,
  React.InputHTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={clsx(
        "relative cursor-default select-none",
        "p-[1rem]",
        "text-[0.875rem] text-[#201E2C] dark:text-white font-normal",
        props.className
      )}
    >
      {props.children}
    </div>
  );
});

AutocompleteEmptyBox.displayName = "AutocompleteEmptyBox";
