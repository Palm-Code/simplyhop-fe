import Link, { LinkProps } from "next/link";
import * as React from "react";
import clsx from "clsx";

export interface TripFilterTabButtonProps extends Omit<LinkProps, "children"> {
  isActive?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const TripFilterTabButton = ({
  isActive,
  children,
  className,
  ...linkProps
}: TripFilterTabButtonProps) => {
  return (
    <Link
      {...linkProps}
      className={clsx(
        "px-[1rem] py-[0.5rem]",
        isActive
          ? "bg-[#249124] dark:bg-[#33CC33]"
          : "bg-[#F6F6F6CC] dark:bg-[#767676]",
        "rounded-[0.75rem]",
        "text-[0.875rem] text-[#000] font-semibold",
        "whitespace-nowrap",
        className
      )}
      scroll={false}
    >
      {children}
    </Link>
  );
};
