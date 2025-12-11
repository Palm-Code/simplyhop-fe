import React, { forwardRef } from "react";
import clsx from "clsx";

export const AutocompleteOption = forwardRef<
  HTMLDivElement,
  React.InputHTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={clsx(
        `relative cursor-pointer select-none`,
        "bg-[white] dark:bg-[#232323]",
        "text-[#232323] dark:text-white text-[0.875rem] leading-[1.25rem]",
        props.className
      )}
    >
      {props.children}
    </div>
  );
});

AutocompleteOption.displayName = "AutocompleteOption";
