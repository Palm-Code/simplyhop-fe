import React, { forwardRef } from "react";
import clsx from "clsx";

export const AdaptiveModalHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={clsx(
        "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
        "w-full",
        "bg-[white] dark:bg-[#232323]",
        "sticky top-[0px] z-[10]",
        "px-[1rem] py-[1rem] lg:px-[2rem] lg:py-[2rem]",
        props.className
      )}
    >
      {props.children}
    </div>
  );
});

AdaptiveModalHeader.displayName = "AdaptiveModalHeader";
