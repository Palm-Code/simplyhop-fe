import React, { forwardRef } from "react";
import clsx from "clsx";

export const SettingTabButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    selected?: boolean;
  }
>((props, ref) => {
  const { selected, ...otherProps } = props;

  return (
    <button
      ref={ref}
      {...otherProps}
      className={clsx(
        "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]",
        "w-full",
        selected
          ? "bg-[#FAFAFA] dark:bg-[#292929]"
          : "bg-[transparent] hover:bg-[#FAFAFA] dark:hover:bg-[#292929]",
        selected
          ? "text-[#249124] dark:text-[#33CC33] text-[0.875rem] font-semibold"
          : "text-[#5B5B5B] dark:text-[#DADADA] text-[0.875rem] font-normal hover:text-[#249124] dark:hover:text-[#33CC33] hover:text-[0.875rem] hover:font-semibold",
        "rounded-[0.75rem]",
        "px-[1rem] py-[0.75rem]",
        "cursor-pointer",
        "outline-none",
        props.className
      )}
    >
      {props.children}
    </button>
  );
});

SettingTabButton.displayName = "SettingTabButton";
