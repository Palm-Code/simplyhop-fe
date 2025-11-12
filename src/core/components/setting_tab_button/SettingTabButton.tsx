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
    <div
      className={clsx("px-[1px] py-[1px]", "rounded-[0.75rem]")}
      style={{
        background: selected
          ? "linear-gradient(#EFF9ECC7, #EFF9ECC7) padding-box, linear-gradient(92.01deg, #E6F5E6 0.55%, #DAF0DA 100%) border-box"
          : undefined,
      }}
    >
      <button
        ref={ref}
        {...otherProps}
        className={clsx(
          "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]",
          "w-full",
          selected ? "bg-[#EFF9ECC7]" : "bg-[transparent] hover:bg-[#EFF9ECC7]",
          selected
            ? "text-[#26531A] text-[0.875rem] font-semibold"
            : "text-[#5B5B5B] text-[0.875rem] font-normal hover:text-[#26531A] hover:text-[0.875rem] hover:text-semibold",
          "rounded-[0.75rem]",
          "px-[1rem] py-[0.75rem]",
          "cursor-pointer",
          "outline-none",
          props.className
        )}
      >
        {props.children}
      </button>
    </div>
  );
});

SettingTabButton.displayName = "SettingTabButton";
