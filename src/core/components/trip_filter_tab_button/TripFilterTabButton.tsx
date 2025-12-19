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
        "px-[0.5rem] py-[0.5rem]",
        'border',
        isActive
          ? "bg-[#249124] dark:bg-[#33CC33] text-[white] dark:text-[#232323] border-[#249124] dark:border-[#33CC33]"
          : "bg-[#F0F0F0] dark:bg-[#232323] text-[#5B5B5B] dark:text-[#DADADA] border-[#E9E6E6] dark:border-[#464646]",
        "rounded-[0.75rem]",
        "text-[0.875rem] font-semibold",
        "whitespace-nowrap",
        className
      )}
      scroll={false}
    >
      {children}
    </Link>
  );
};
