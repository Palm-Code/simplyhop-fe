import React, { forwardRef } from "react";
import clsx from "clsx";

export const TabButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    selected?: boolean;
    variant?: "horizontal" | "vertical";
  }
>((props, ref) => {
  const { selected, variant, ...otherProps } = props;
  if (variant === "horizontal") {
    return (
      <button
        ref={ref}
        {...otherProps}
        className={clsx(
          "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]",
          "w-full",
          selected ? "bg-[#33CC330A]" : "bg-[transparent] hover:bg-[#33CC330A]",
          selected
            ? "text-[#232323] dark:text-[white] text-[1rem] font-semibold"
            : "text-[#828282] dark:text-[#C3C3C3] text-[1rem] font-normal hover:text-[#232323] dark:hover:text-[white] hover:text-[1rem] hover:text-semibold",
          selected
            ? "border-b border-b-[#249124] dark:border-b-[#33CC33]"
            : "border-b border-b-[white] dark:border-b-[#232323] hover:border-b hover:border-b-[white] dark:hover:border-b-[#232323]",
          "px-[1rem] py-[0.75rem]",
          "cursor-pointer",
          "whitespace-nowrap",
          "outline-none",
          props.className
        )}
      >
        {props.children}
      </button>
    );
  }
  return (
    <button
      ref={ref}
      {...otherProps}
      className={clsx(
        "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]",
        "w-full",
        selected ? "bg-[#33CC330A]" : "bg-[transparent] hover:bg-[#33CC330A]",
        "rounded-tr-[0.625rem] rounded-br-[0.625rem]",
        selected
          ? "text-[#232323] dark:text-white text-[1rem] font-semibold"
          : "text-[#828282] dark:text-[#C3C3C3] text-[1rem] font-normal hover:text-[#232323] dark:hover:text-white hover:text-[1rem] hover:font-semibold",
        selected
          ? "border-l border-l-[#249124] dark:border-l-[#33CC33]"
          : "border-l border-l-[white] dark:border-l-[#232323] hover:border-l hover:border-l-[#33CC33] dark:hover:border-l-[#232323]",
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

TabButton.displayName = "TabButton";
