import React, { forwardRef } from "react";
import clsx from "clsx";

export const InputPrice = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  return (
    <input
      ref={ref}
      {...props}
      type="number"
      autoComplete="off"
      min="0"
      onWheel={handleWheel}
      className={clsx(
        "h-full w-[228px]",
        "bg-[white] dark:bg-[#232323]",
        "outline-none",
        "text-[56px] text-[black] dark:text-white font-bold",
        props.className
      )}
    />
  );
});

InputPrice.displayName = "InputPrice";
