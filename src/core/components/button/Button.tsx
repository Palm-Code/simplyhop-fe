import React, { forwardRef } from "react";
import clsx from "clsx";

export const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "tertiary";
    isLoading?: boolean;
  }
>((props, ref) => {
  const { variant, isLoading, className, ...restProps } = props;
  return (
    <button
      ref={ref}
      {...restProps}
      className={clsx(
        "grid grid-flow-col place-content-center place-items-center gap-[0.5rem]",
        "w-full",
        variant === "tertiary"
          ? "bg-[#333FFF]"
          : variant === "secondary"
          ? "bg-[white]"
          : "bg-[#249124] dark:bg-[#33CC33]",
        "py-[1rem]",
        "rounded-[0.375rem]",
        variant === "tertiary"
          ? isLoading
            ? "text-[1rem] text-[#FFFFFF] font-medium"
            : "text-[1rem] text-[#FFFFFF] disabled:text-[#5B5B5B] dark:disabled:text-[#DADADA] font-medium"
          : variant === "secondary"
          ? "text-[1rem] text-[#33CC33] disabled:text-[#5B5B5B] font-medium"
          : isLoading
          ? "text-[1rem] text-[white] dark:text-[#232323] font-medium"
          : "text-[1rem] text-[white] dark:text-[#232323] disabled:text-[#5B5B5B] dark:disabled:text-[#DADADA] font-medium",
        variant === "tertiary"
          ? isLoading
            ? ""
            : "hover:bg-[#333FFF] disabled:bg-[#F6F6F6] disabled:hover:bg-[#F6F6F6] dark:disabled:bg-[#5B5B5B] dark:disabled:hover:bg-[#5B5B5B]"
          : variant === "secondary"
          ? ""
          : isLoading
          ? ""
          : "hover:bg-[#249124] dark:hover:bg-[#7BD164] disabled:bg-[#F6F6F6] disabled:hover:bg-[#F6F6F6] dark:disabled:bg-[#5B5B5B] dark:disabled:hover:bg-[#5B5B5B]",
        variant === "tertiary"
          ? isLoading
            ? "border border-[#333FFF]"
            : "border border-[#333FFF] disabled:border disabled:border-[#F6F6F6] dark:disabled:border-[#5B5B5B] dark:disabled:hover:border-[#5B5B5B]"
          : variant === "secondary"
          ? "border border-[#33CC33]"
          : isLoading
          ? "border border-[#249124] dark:border-[#33CC33]"
          : "border border-[#249124] dark:border-[#33CC33] disabled:border disabled:border-[#F6F6F6] dark:disabled:border-[#5B5B5B] dark:disabled:hover:border-[#5B5B5B]",
        "cursor-pointer disabled:cursor-default",
        className
      )}
    />
  );
});

Button.displayName = "Button";
