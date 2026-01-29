import React, { forwardRef } from "react";
import clsx from "clsx";

interface AutocompleteOptionsContainerProps
  extends React.InputHTMLAttributes<HTMLDivElement> {
  position?: "top" | "bottom";
}

export const AutocompleteOptionsContainer = forwardRef<
  HTMLDivElement,
  AutocompleteOptionsContainerProps
>(({ position = "bottom", ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={clsx(
        "absolute z-9999",
        "w-full",
        "max-h-[160px]",
        "overflow-auto",
        position === "top" ? "bottom-full mb-[0.5rem]" : "top-full mt-[0.5rem]",
        "bg-[white] dark:bg-[#232323]",
        "border border-[#E2E2E2] dark:border-[#464646]",
        "focus:outline-none",
        "rounded-[0.375rem]",
        "z-[20]",
        props.className
      )}
      style={{
        boxShadow: "0px 0px 25px 0px #365F2B66",
      }}
    >
      {props.children}
    </div>
  );
});

AutocompleteOptionsContainer.displayName = "AutocompleteOptionsContainer";
