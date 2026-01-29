"use client";
import React from "react";
import clsx from "clsx";

export const FormWrapperPassengerDetail = (
  props: React.HTMLAttributes<HTMLDivElement> & {
    isOpen?: boolean;
  }
) => {
  const { isOpen, ...restProps } = props;
  const [position, setPosition] = React.useState<"above" | "below">("below");

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const POSITION_BUFFER = 100; // Buffer zone to prevent flickering

  const updatePosition = React.useCallback(() => {
    const dropdownPosition =
      dropdownRef.current?.getBoundingClientRect().top ?? 0;
    const viewportHeight = window.innerHeight;
    const threshold = viewportHeight / 2;

    // Hysteresis: only change position if outside buffer zone
    if (dropdownPosition < threshold - POSITION_BUFFER) {
      setPosition("below");
    } else if (dropdownPosition > threshold + POSITION_BUFFER) {
      setPosition("above");
    }
    // In buffer zone: keep current position
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      // Lock position: only update once when dropdown opens
      updatePosition();
      // No event listeners - position stays fixed while open
    }
  }, [isOpen, updatePosition]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={dropdownRef}
      {...restProps}
      className={clsx(
        "absolute",
        position === "below" ? "top-[4rem]" : "top-[-100px]",
        "right-0",
        "grid grid-cols-1 place-content-start place-items-start gap-[0.75rem]",
        "px-[1rem] py-[0.75rem]",
        "min-w-[255px]",
        "bg-[white] dark:bg-[#232323]",
        "rounded-[0.625rem]"
      )}
      style={{
        boxShadow: "0px 0px 25px 0px #365F2B66",
      }}
    >
      {props.children}
    </div>
  );
};
