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

  const updatePosition = React.useCallback(() => {
    const dropdownPosition =
      dropdownRef.current?.getBoundingClientRect().top ?? 0;
    const viewportHeight = window.innerHeight;

    if (dropdownPosition < viewportHeight / 2) {
      setPosition("below");
    } else {
      setPosition("above");
    }
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true); // true supaya dia bisa detect scroll dalam container juga
    }

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
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
